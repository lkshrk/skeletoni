import { expect, test } from '@playwright/test';

// Tests are named by URL path so affected-routes.ts can filter them with
// --grep. Add a new entry here whenever a new route is added to the app.
const routes = [{ path: '/', snapshot: 'home' }] as const;

for (const { path, snapshot } of routes) {
	test(path, async ({ page }) => {
		await page.goto(path);
		await expect(page).toHaveScreenshot(`${snapshot}.png`, { fullPage: true });
	});
}
