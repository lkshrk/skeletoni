import { expect, test } from '@playwright/test';

test.describe('navbar', () => {
	test('renders logo and all nav links', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('link', { name: /skeletoni/i }).first()).toBeVisible();
		const nav = page.getByRole('navigation', { name: 'Main' });
		await expect(nav).toBeVisible();
		for (const label of ['Home', 'About', 'Docs']) {
			await expect(nav.getByRole('link', { name: label })).toBeVisible();
		}
	});

	test('highlights active link on current page', async ({ page }) => {
		await page.goto('/about');
		const nav = page.getByRole('navigation', { name: 'Main' });
		await expect(nav.getByRole('link', { name: 'About' })).toHaveClass(/text-brand/);
		await expect(nav.getByRole('link', { name: 'Home' })).not.toHaveClass(/text-brand/);
	});
});

test.describe('navigation', () => {
	test('home page heading visible', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('navigates to /about', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'About' }).click();
		await expect(page).toHaveURL('/about');
		await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
	});

	test('navigates to /docs', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Docs' }).click();
		await expect(page).toHaveURL('/docs');
		await expect(page.getByRole('heading', { name: 'Docs' })).toBeVisible();
	});
});

test.describe('footer', () => {
	test('renders with nav landmark', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('contentinfo')).toBeVisible();
		await expect(page.getByRole('navigation', { name: 'Footer' })).toBeVisible();
	});
});

test.describe('skip link', () => {
	test('becomes focused on first Tab', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('Tab');
		await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
	});
});

test.describe('dark mode', () => {
	test('toggle flips dark class on html element', async ({ page }) => {
		await page.goto('/');
		const html = page.locator('html');
		const wasDark = await html.evaluate((el) => el.classList.contains('dark'));
		const label = wasDark ? 'Switch to light mode' : 'Switch to dark mode';
		await page.getByRole('button', { name: label }).click();
		const isDark = await html.evaluate((el) => el.classList.contains('dark'));
		expect(isDark).toBe(!wasDark);
	});

	test('theme persists across hard reload via localStorage', async ({ page }) => {
		await page.goto('/');
		const html = page.locator('html');
		// Force dark mode on
		const isDark = await html.evaluate((el) => el.classList.contains('dark'));
		if (!isDark) {
			await page.getByRole('button', { name: 'Switch to dark mode' }).click();
		}
		await page.reload();
		await expect(html).toHaveClass(/dark/);
	});
});

test.describe('mobile nav', () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test('hamburger is visible, desktop nav is hidden', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('button', { name: 'Toggle menu' })).toBeVisible();
		await expect(page.getByRole('navigation', { name: 'Main' })).not.toBeVisible();
	});

	test('sheet opens on hamburger click and closes after nav', async ({ page }) => {
		await page.goto('/');
		await page.getByRole('button', { name: 'Toggle menu' }).click();
		const mobileNav = page.getByRole('navigation', { name: 'Mobile' });
		await expect(mobileNav).toBeVisible();
		await mobileNav.getByRole('link', { name: 'About' }).click();
		await expect(page).toHaveURL('/about');
		await expect(mobileNav).not.toBeVisible();
	});
});
