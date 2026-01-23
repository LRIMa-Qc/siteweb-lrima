import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Check that the page loads successfully
    await expect(page).toHaveURL(/localhost:3000/)

    // Verify key navigation elements are present
    const header = page.locator('header')
    await expect(header).toBeVisible()

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('can navigate to French locale', async ({ page }) => {
    await page.goto('http://localhost:3000/fr')

    // Verify the page has French locale set
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'fr')
  })

  test('can navigate to English locale', async ({ page }) => {
    await page.goto('http://localhost:3000/en')

    // Verify the page has English locale set
    const html = page.locator('html')
    await expect(html).toHaveAttribute('lang', 'en')
  })

  test('root redirects to French locale', async ({ page }) => {
    await page.goto('http://localhost:3000/')

    // Should redirect to /fr
    await expect(page).toHaveURL(/\/fr/)
  })
})
