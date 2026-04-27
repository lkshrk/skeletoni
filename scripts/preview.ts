/**
 * Capture screenshots of every route in light and dark mode, then stitch
 * them into demo/preview.gif via ffmpeg.
 *
 * Usage: node --experimental-strip-types scripts/preview.ts
 * Requires: ffmpeg (brew install ffmpeg)
 */

import { execSync, spawn, type ChildProcess } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from '@playwright/test';

const FRAMES_DIR = join('demo', 'frames');
const CONCAT_FILE = join(FRAMES_DIR, 'concat.txt');
const GIF_OUT = join('demo', 'preview.gif');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const VIEWPORT = { width: 1280, height: 760 };
const SLIDE_DURATION = 2; // seconds each slide is shown

const slides = [
	{ path: '/', file: '01-home-light.png', dark: false },
	{ path: '/about', file: '02-about-light.png', dark: false },
	{ path: '/docs', file: '03-docs-light.png', dark: false },
	{ path: '/', file: '04-home-dark.png', dark: true },
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function log(msg: string) {
	process.stdout.write(`\n▶ ${msg}\n`);
}

async function waitFor(url: string, timeoutMs = 30_000): Promise<void> {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			await fetch(url, { signal: AbortSignal.timeout(1_000) });
			return;
		} catch {
			await new Promise((r) => setTimeout(r, 250));
		}
	}
	throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`);
}

// ─── Lifecycle ─────────────────────────────────────────────────────────────

let server: ChildProcess | null = null;

process.on('exit', () => server?.kill());
process.on('SIGINT', () => {
	server?.kill();
	process.exit(130);
});
process.on('SIGTERM', () => {
	server?.kill();
	process.exit(143);
});

// ─── Main ──────────────────────────────────────────────────────────────────

log('Building…');
execSync('pnpm build', { stdio: 'inherit' });

log('Preparing frames directory…');
if (existsSync(FRAMES_DIR)) rmSync(FRAMES_DIR, { recursive: true });
mkdirSync(FRAMES_DIR, { recursive: true });

log('Starting preview server…');
server = spawn('pnpm', ['preview', '--port', String(PORT)], {
	stdio: 'ignore',
	detached: false,
});

await waitFor(BASE_URL);
log(`Server ready → ${BASE_URL}`);

log('Capturing screenshots…');
const browser = await chromium.launch();

for (const slide of slides) {
	const ctx = await browser.newContext({ viewport: VIEWPORT });

	if (slide.dark) {
		// Set theme before the app's inline script runs so it picks up 'dark'.
		await ctx.addInitScript(() => localStorage.setItem('theme', 'dark'));
	}

	const page = await ctx.newPage();
	await page.goto(`${BASE_URL}${slide.path}`, { waitUntil: 'networkidle' });
	await page.screenshot({ path: join(FRAMES_DIR, slide.file) });
	process.stdout.write(`  ✓ ${slide.file}\n`);
	await ctx.close();
}

await browser.close();
server.kill();
server = null;

log('Writing ffconcat manifest…');
const lines: string[] = ['ffconcat version 1.0'];
for (const slide of slides) {
	lines.push(`file '${slide.file}'`, `duration ${SLIDE_DURATION}`);
}
// Repeat the last frame without a duration — required by the concat demuxer
// to correctly apply the duration of the second-to-last entry.
lines.push(`file '${slides.at(-1)!.file}'`);
writeFileSync(CONCAT_FILE, lines.join('\n') + '\n');

log('Generating GIF (two-pass palette)…');
execSync(
	[
		'ffmpeg -y',
		`-f concat -safe 0 -i "${CONCAT_FILE}"`,
		'-vf "fps=8,scale=1280:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5"',
		`"${GIF_OUT}"`,
	].join(' '),
	{ stdio: 'inherit' }
);

log(`Done → ${GIF_OUT}`);
