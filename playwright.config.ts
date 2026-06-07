import { defineConfig, devices } from '@playwright/test';
import { shiplightConfig } from 'shiplightai';

const shiplight = shiplightConfig();

export default defineConfig({
	...shiplight,
	testDir: './tests/e2e',
	testMatch: '**/*.yaml.spec.ts',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? [['github'], ...shiplight.reporter] : shiplight.reporter,
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
