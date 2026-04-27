import { expect, test } from '@playwright/test';

test('home page visual', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveScreenshot('home.png', { fullPage: true });
});
