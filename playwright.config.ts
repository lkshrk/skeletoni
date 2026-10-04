import { defineConfig, devices, type ReporterDescription } from '@playwright/test';
import { shiplightConfig } from 'shiplightai';

const shiplight = shiplightConfig();
const reporters: ReporterDescription[] =
	typeof shiplight.reporter === 'string' ? [[shiplight.reporter]] : (shiplight.reporter ?? []);

export default defineConfig({
	...shiplight,
	testDir: './tests/e2e',
	testMatch: '**/*.yaml.spec.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? [['github'], ...reporters] : shiplight.reporter,
	// Absorb sub-percent font/anti-aliasing differences between the local (darwin)
	// and CI (linux) renderers. Local-vs-local comparisons stay effectively exact.
	expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.02 } },
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry'
	},
	projects: [
		{
			name: 'functional',
			testMatch: 'tests/e2e/*.yaml.spec.ts',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'visual',
			testMatch: 'tests/e2e/visual/*.yaml.spec.ts',
			use: { ...devices['Desktop Chrome'] }
		}
	],
	webServer: {
		command: 'pnpm build && pnpm preview',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI
	}
});
