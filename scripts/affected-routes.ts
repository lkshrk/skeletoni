/**
 * Detect which SvelteKit routes are visually affected by changed source files.
 *
 * Strategy:
 *   1. Diff changed files against a base commit.
 *   2. If any "global" file changed (root layout, app.css, vite config…),
 *      every route is affected → run all visual tests.
 *   3. Otherwise, build a reverse import graph over src/ and BFS from each
 *      changed file to find which +page / +layout route files are reachable.
 *   4. Map those route files to their URL paths and emit a Playwright grep pattern.
 *
 * Usage:
 *   node --experimental-strip-types scripts/affected-routes.ts [base-sha]
 *
 * Output (written to $GITHUB_OUTPUT when set, otherwise stdout):
 *   run=true|false     — whether to run visual tests at all
 *   grep=<pattern>     — playwright --grep regex; empty string means run all
 */

import { appendFileSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join, relative, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const SRC = join(ROOT, 'src');
const ROUTES = join(SRC, 'routes');
const LIB = join(SRC, 'lib');

// Changes to these files mean every route could be visually affected.
const GLOBAL_TRIGGERS = new Set([
	join(SRC, 'app.html'),
	join(SRC, 'app.css'),
	join(ROUTES, '+layout.svelte'),
	join(ROUTES, '+layout.ts'),
	join(ROUTES, '+layout.server.ts'),
	join(ROOT, 'vite.config.ts'),
	join(ROOT, 'svelte.config.js')
]);

// Sentinel returned when git diff itself fails (shallow clone, new branch, etc.)
const ALL_SENTINEL = '__all__';

function changedFiles(base: string): string[] {
	try {
		return execSync(`git diff --name-only ${base} HEAD`, { encoding: 'utf8' })
			.trim()
			.split('\n')
			.filter(Boolean)
			.map((f) => join(ROOT, f));
	} catch {
		// Shallow clone, first push to branch, or other git failure — be safe.
		return [ALL_SENTINEL];
	}
}

function scanSrc(dir: string, out: string[] = []): string[] {
	try {
		for (const name of readdirSync(dir)) {
			if (name.startsWith('.') || name === 'node_modules') continue;
			const full = join(dir, name);
			if (statSync(full).isDirectory()) {
				scanSrc(full, out);
			} else if (/\.(svelte|ts|js)$/.test(name)) {
				out.push(full);
			}
		}
	} catch {
		// Ignore unreadable dirs.
	}
	return out;
}

function resolveImport(importPath: string, fromFile: string): string | null {
	let abs: string;
	if (importPath.startsWith('$lib/')) {
		abs = join(LIB, importPath.slice('$lib/'.length));
	} else if (importPath.startsWith('.')) {
		abs = join(dirname(fromFile), importPath);
	} else {
		return null; // external package — not part of our graph
	}

	const candidates = [
		abs,
		abs + '.ts',
		abs + '.js',
		abs + '.svelte',
		join(abs, 'index.ts'),
		join(abs, 'index.js')
	];
	for (const c of candidates) {
		try {
			statSync(c);
			return c;
		} catch {
			// try next
		}
	}
	return null;
}

function parseImports(file: string): string[] {
	try {
		const src = readFileSync(file, 'utf8');
		const results = new Set<string>();

		// static: import x from '...', export * from '...', from '...'
		for (const match of src.matchAll(/(?:^|\s)(?:import|export|from)\s+['"]([^'"]+)['"]/gm)) {
			const resolved = resolveImport(match[1], file);
			if (resolved) results.add(resolved);
		}

		// dynamic: import('...')
		for (const match of src.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/gm)) {
			const resolved = resolveImport(match[1], file);
			if (resolved) results.add(resolved);
		}

		return [...results];
	} catch {
		return [];
	}
}

/** importedBy[dep] = set of files that directly import dep */
function buildReverseGraph(files: string[]): Map<string, Set<string>> {
	const graph = new Map<string, Set<string>>();
	for (const file of files) {
		if (!graph.has(file)) graph.set(file, new Set());
		for (const dep of parseImports(file)) {
			if (!graph.has(dep)) graph.set(dep, new Set());
			graph.get(dep)!.add(file);
		}
	}
	return graph;
}

/** BFS from seeds through importedBy edges; returns every transitively reachable file */
function reachableFrom(seeds: string[], graph: Map<string, Set<string>>): Set<string> {
	const visited = new Set<string>();
	const queue = [...seeds];
	while (queue.length) {
		const file = queue.shift()!;
		if (visited.has(file)) continue;
		visited.add(file);
		for (const importer of graph.get(file) ?? []) queue.push(importer);
	}
	return visited;
}

function routeFileToUrlPath(file: string): string {
	const rel = relative(ROUTES, file);
	// Drop the filename (+page.svelte, +layout.ts, etc.) — keep the directory.
	const dir = rel.replace(/\/?[^/]*$/, '');
	return '/' + dir.replace(/\\/g, '/');
}

function escapeRegex(s: string): string {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function emit(key: string, value: string): void {
	const ghOutput = process.env.GITHUB_OUTPUT;
	if (ghOutput) {
		appendFileSync(ghOutput, `${key}=${value}\n`);
	} else {
		process.stdout.write(`${key}=${value}\n`);
	}
}

// ── main ─────────────────────────────────────────────────────────────────────

const base = process.argv[2] ?? 'HEAD~1';
const changed = changedFiles(base);

// No changes at all — nothing to test.
if (changed.length === 0) {
	emit('run', 'false');
	process.exit(0);
}

// Git diff failed (new branch, shallow clone…) — run everything to be safe.
if (changed.includes(ALL_SENTINEL)) {
	emit('run', 'true');
	emit('grep', '');
	process.exit(0);
}

// A global file changed — all routes are potentially affected.
if (changed.some((f) => GLOBAL_TRIGGERS.has(f))) {
	emit('run', 'true');
	emit('grep', '');
	process.exit(0);
}

// Only src/ changes can affect visual output.
const srcChanged = changed.filter((f) => f.startsWith(SRC));
if (srcChanged.length === 0) {
	emit('run', 'false');
	process.exit(0);
}

const allSrc = scanSrc(SRC);
const graph = buildReverseGraph(allSrc);
const reachable = reachableFrom(srcChanged, graph);

const affectedRouteFiles = [...reachable].filter(
	(f) => f.startsWith(ROUTES) && /\+(page|layout)(\.server)?\.(svelte|ts|js)$/.test(f)
);

if (affectedRouteFiles.length === 0) {
	emit('run', 'false');
	process.exit(0);
}

const urlPaths = [...new Set(affectedRouteFiles.map(routeFileToUrlPath))];

// Visual tests are named by their URL path (e.g. test('/', ...)).
// Build an OR-pattern with anchors so '/about' doesn't match '/'.
const pattern = urlPaths.map((p) => `^${escapeRegex(p)}$`).join('|');

emit('run', 'true');
emit('grep', pattern);
