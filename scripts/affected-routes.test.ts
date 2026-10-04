import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, expect, it } from 'vitest';

const script = fileURLToPath(new URL('./affected-routes.ts', import.meta.url));
let root: string;
let env: NodeJS.ProcessEnv;

function write(path: string, content: string) {
	const target = join(root, path);
	mkdirSync(dirname(target), { recursive: true });
	writeFileSync(target, content);
}

function git(...args: string[]) {
	return execFileSync('git', args, { cwd: root, env, encoding: 'utf8' }).trim();
}

beforeEach(() => {
	root = mkdtempSync(join(tmpdir(), 'affected-routes-'));
	env = {
		...process.env,
		HOME: root,
		XDG_CONFIG_HOME: root,
		GIT_CONFIG_NOSYSTEM: '1',
		GIT_CONFIG_GLOBAL: '/dev/null',
		GIT_AUTHOR_NAME: 'Test',
		GIT_AUTHOR_EMAIL: 'test@example.invalid',
		GIT_COMMITTER_NAME: 'Test',
		GIT_COMMITTER_EMAIL: 'test@example.invalid'
	};
	delete env.GITHUB_OUTPUT;
	git('init', '--quiet');
	write('src/lib/value.ts', 'export const value = 1;');
	write('src/lib/state.svelte.ts', 'export const state = 1;');
	write(
		'src/lib/foo.ts',
		"export { value } from './value.js';\nexport { state } from './state.svelte.js';"
	);
	write(
		'src/routes/example/+page.svelte',
		"<script>import { value } from '#lib/foo.js';</script>{value}"
	);
	write('src/lib/unrelated.ts', 'export const unrelated = 1;');
	write('package.json', '{}');
	write('vite.config.ts', 'export default {};');
	git('add', '.');
	git('commit', '--quiet', '-m', 'fixture');
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

function affectedBy(path: string, content: string) {
	const base = git('rev-parse', 'HEAD');
	write(path, content);
	git('add', '.');
	git('commit', '--quiet', '-m', 'change');
	return execFileSync(process.execPath, ['--experimental-strip-types', script, base], {
		cwd: root,
		env,
		encoding: 'utf8'
	});
}

it.each(['src/lib/foo.ts', 'src/lib/value.ts', 'src/lib/state.svelte.ts'])(
	'traces #lib and relative .js imports to changed TypeScript source %s',
	(path) => {
		expect(affectedBy(path, 'export const value = 2;')).toBe('run=true\ngrep=(?:^|\\s)/example$\n');
	}
);

it('skips unrelated source changes', () => {
	expect(affectedBy('src/lib/unrelated.ts', 'export const unrelated = 2;')).toBe('run=false\n');
});

it.each(['package.json', 'vite.config.ts'])('runs all routes for %s changes', (path) => {
	expect(affectedBy(path, '{}\n')).toBe('run=true\ngrep=\n');
});
