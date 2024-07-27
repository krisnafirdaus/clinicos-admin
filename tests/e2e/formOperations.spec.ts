import { test, expect } from "@playwright/test";

test.describe("Anamnesis Form Operations", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('h1', { state: 'attached', timeout: 30000 });
  });

  test("should display the list of forms", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("Anamnesis Forms");
    await expect(page.locator("table")).toBeVisible();
  });

  test("should create a new form", async ({ page }) => {
    await page.goto("/create");
    await page.fill('input[id="title"]', "New Test Form");
    await page.fill('textarea[id="description"]', "This is a test form description");
    await page.click('button:text("Add Section")');
    await page.click('button:text("Create Form")');
    await expect(page.locator("table")).toContainText("New Test Form");
  });

  test("should edit an existing form", async ({ page }) => {
    await page.goto("/");

    const editButton = page.locator('button[aria-label="Edit"]');
    await editButton.first().waitFor({ state: "visible", timeout: 30000 });
    await editButton.first().click();

    const titleInput = page.locator('input[id="title"]');
    await titleInput.waitFor({ state: "visible", timeout: 30000 });
    await titleInput.fill("Updated Form Title");

    await page.click('button:text("Update")');

    await page.goto("/");
    await page.pause();
  });

  test("should delete a form", async ({ page }) => {
    await page.goto("/");

    const deleteButton = page.locator('button[aria-label="Delete"]');
    await deleteButton.first().waitFor({ state: "visible", timeout: 30000 });
    await deleteButton.first().click();

    const modal = page.locator('div[role="dialog"]');
    await modal.waitFor({ state: "visible", timeout: 30000 });

    // Verify modal buttons
    const confirmDeleteButton = modal.locator('button:text("Delete")');
    await confirmDeleteButton.waitFor({ state: "visible", timeout: 30000 });
    await confirmDeleteButton.click();

    await page.goto("/");
    await expect(page.locator("table")).not.toContainText("Form Title");
  });
});
