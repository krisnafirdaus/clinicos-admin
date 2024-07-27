import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');

    await page.click('text=Create New Form');
    await expect(page).toHaveURL('/create');

    await page.click('text=Home');
    await expect(page).toHaveURL('/');
  });
});