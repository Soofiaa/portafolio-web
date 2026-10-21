const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Espera a que i18n.js cargue i18n/i18n.json, registre el selector de idioma y aplique el idioma.
  await page.addInitScript(() => {
    document.addEventListener('i18n:changed', () => { window.__i18nReady = true; });
  });
  await page.goto('/404.html');
  await page.waitForFunction(() => window.__i18nReady === true);
});

test('la página 404 no se indexa y lleva de vuelta a la portada y a las apps', async ({ page }) => {
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('h1')).toHaveText('Esta página no existe');
  await expect(page.locator('.actions a[href="/"]')).toBeVisible();
  await page.locator('.actions a[href="/apps/"]').click();
  await expect(page).toHaveURL(/\/apps\/$/);
});

test('la página 404 cambia de idioma, de título y de tema', async ({ page }) => {
  await page.click('.lang-btn[data-lang="en"]');
  await expect(page.locator('h1')).toHaveText("This page doesn't exist");
  await expect(page).toHaveTitle('Page not found · Sofía Menzel');
  await page.click('#theme-toggle');
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(['light', 'dark']).toContain(theme);
});
