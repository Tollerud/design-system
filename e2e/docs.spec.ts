import { expect, test } from '@playwright/test'
import packageJson from '../package.json' with { type: 'json' }

test.describe('docs site', () => {
  test('overview page loads with hero copy', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.ds-shell')).toBeVisible()
    await expect(page).toHaveTitle(/Tollerud UI/)
    await expect(page.getByText('Dark. Monochrome.')).toBeVisible()
  })

  test('getting started page loads install section', async ({ page }) => {
    await page.goto('/getting-started/')
    await expect(page.getByRole('heading', { name: 'Getting started' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Install' })).toBeVisible()
    await expect(page.getByText('npm install @tollerud/ui').first()).toBeVisible()
  })

  test('components gallery route renders button section', async ({ page }) => {
    await page.goto('/components/')
    await expect(page.getByRole('heading', { name: 'Components', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Deploy' }).first()).toBeVisible()
  })

  test('deep link /components/button/ scrolls to button section', async ({ page }) => {
    await page.goto('/components/button/')
    await expect(page.getByRole('heading', { name: 'Components', exact: true })).toBeVisible()
    const buttonSection = page.locator('#button')
    await expect(buttonSection).toBeVisible()
    await expect(buttonSection.getByRole('button', { name: 'Deploy' }).first()).toBeVisible()
  })

  test('legacy route redirects to charts', async ({ page }) => {
    await page.goto('/datablocks/')
    await expect(page).toHaveURL(/\/charts\/?$/)
    await expect(page.locator('h1.ds-pagetitle', { hasText: 'Charts' })).toBeVisible()
  })

  test('resources guides page loads', async ({ page }) => {
    await page.goto('/resources/')
    await expect(page.getByRole('heading', { name: 'Guides' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Migration' })).toBeVisible()
  })

  test('changelog page loads entries', async ({ page }) => {
    await page.goto('/changelog/')
    await expect(page.getByRole('heading', { name: 'Changelog' })).toBeVisible()
    await expect(page.getByText(packageJson.version, { exact: false }).first()).toBeVisible({ timeout: 15_000 })
  })

  test('command palette opens with Meta+K', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Meta+k')
    await expect(page.getByPlaceholder('Search pages, sections, components…')).toBeVisible()
  })
})
