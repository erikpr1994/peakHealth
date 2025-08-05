import { Page, expect } from '@playwright/test';

export const navigateToExercises = async (page: Page) => {
  await page.goto('/exercises');
  await page.waitForSelector('[data-slot="card"]');
};

export const getFirstExerciseCard = async (page: Page) => {
  await page.waitForSelector('[data-slot="card"]');
  return page.locator('[data-slot="card"]').first();
};

export const clickFirstExercise = async (page: Page) => {
  const firstCard = await getFirstExerciseCard(page);
  const exerciseName = await firstCard.locator('h3').textContent();
  await firstCard.click();
  return exerciseName;
};

export const searchExercises = async (page: Page, searchTerm: string) => {
  const searchInput = page.locator('input[placeholder*="Search"]');
  await searchInput.fill(searchTerm);
  await page.waitForTimeout(1000); // Wait for search results
};

export const filterByCategory = async (page: Page, category: string) => {
  await page.click(`text=${category}`);
  await page.waitForTimeout(1000); // Wait for filtered results
};

export const openFilterDialog = async (page: Page) => {
  await page.click('button:has-text("Filters")');
  await expect(page.locator('text=Filter Exercises')).toBeVisible();
};

export const applyDifficultyFilter = async (page: Page, difficulty: string) => {
  await openFilterDialog(page);
  await page.click(`text=${difficulty}`);
  await page.click('button:has-text("Apply Filters")');
  await expect(page.locator('text=Filter Exercises')).not.toBeVisible();
};

export const toggleFavoriteOnDetailPage = async (page: Page) => {
  const favoriteButton = page.locator('button:has(svg)').first();
  await favoriteButton.click();
  await page.waitForTimeout(500); // Wait for state change
};

export const expectExerciseDetailPage = async (
  page: Page,
  exerciseName?: string
) => {
  await expect(page).toHaveURL(/\/exercises\/[^/]+$/);
  if (exerciseName) {
    await expect(page.locator('h1')).toContainText(exerciseName);
  }
  await expect(page.locator('text=Category')).toBeVisible();
  await expect(page.locator('text=Equipment')).toBeVisible();
  await expect(page.locator('text=Difficulty')).toBeVisible();
  await expect(page.locator('text=Focus')).toBeVisible();
  await expect(page.locator('text=Description')).toBeVisible();
  await expect(page.locator('text=Primary Muscles')).toBeVisible();
};

export const expectExerciseListPage = async (page: Page) => {
  await expect(page).toHaveURL('/exercises');
  await expect(page.locator('h1')).toContainText('Exercises');
  await expect(
    page.locator(
      'text=Discover and explore exercises for your fitness journey.'
    )
  ).toBeVisible();
};

export const expectExerciseCardsVisible = async (
  page: Page,
  expectedCount?: number
) => {
  const cards = page.locator('[data-slot="card"]');
  if (expectedCount !== undefined) {
    await expect(cards).toHaveCount(expectedCount);
  } else {
    await expect(cards).toBeVisible();
  }
};

export const expectSearchResults = async (page: Page, searchTerm: string) => {
  const cards = page.locator('[data-slot="card"]');
  const cardCount = await cards.count();

  for (let i = 0; i < Math.min(cardCount, 3); i++) {
    const cardText = await cards.nth(i).textContent();
    expect(cardText?.toLowerCase()).toContain(searchTerm.toLowerCase());
  }
};

export const expectNoSearchResults = async (page: Page) => {
  const cards = page.locator('[data-slot="card"]');
  const cardCount = await cards.count();
  expect(cardCount).toBe(0);
};

export const setMobileViewport = async (page: Page) => {
  await page.setViewportSize({ width: 375, height: 667 });
};

export const setTabletViewport = async (page: Page) => {
  await page.setViewportSize({ width: 768, height: 1024 });
};

export const expectMobileLayout = async (page: Page) => {
  await expect(page.locator('h1')).toContainText('Exercises');
  await expect(page.locator('[data-slot="card"]')).toBeVisible();
  await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  await expect(page.locator('button:has-text("Filters")')).toBeVisible();
};
