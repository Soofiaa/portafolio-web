const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Espera a que i18n.js cargue i18n/i18n.json, registre el selector de idioma y aplique el idioma.
  await page.addInitScript(() => {
    document.addEventListener('i18n:changed', () => { window.__i18nReady = true; });
  });
  await page.goto('/apps/petpal/');
  await page.waitForFunction(() => window.__i18nReady === true);
});

test('la página de PetPal cambia de idioma y de metadatos', async ({ page }) => {
  const tagline = page.locator('[data-i18n="petpalPage.tagline"]');
  await expect(tagline).toHaveText('La salud de tus mascotas, en un solo lugar');
  await expect(page).toHaveTitle(/PetPal — La salud de tus mascotas/);

  await page.click('.lang-btn[data-lang="en"]');
  await expect(tagline).toHaveText("Your pets' health, all in one place");
  await expect(page).toHaveTitle(/PetPal — Your pets' health/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('[data-i18n="petpalPage.status"]')).toHaveText('In development · Android · Not in stores yet');
});

test('la página de PetPal declara su estado y enlaza el repositorio', async ({ page }) => {
  await expect(page.locator('[data-i18n="petpalPage.status"]')).toHaveText('En desarrollo · Android · Aún no está en tiendas');
  await expect(page.locator('[data-i18n-html="petpalPage.transparency.t1"]')).toContainText('Organiza, no diagnostica');
  const repo = page.locator('a[href="https://github.com/Soofiaa/pet_pal"]').first();
  await expect(repo).toBeVisible();
});

test('el toggle de tema funciona y persiste en la página de PetPal', async ({ page }) => {
  await page.click('#theme-toggle');
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(['light', 'dark']).toContain(theme);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
});

test('el botón de Google Play de PetPal está deshabilitado y no es un enlace navegable', async ({ page }) => {
  const store = page.locator('.btn-store');
  await expect(store).toHaveText('Próximamente en Google Play');
  await expect(store).toHaveAttribute('aria-disabled', 'true');
  await expect(store).toBeDisabled();
  expect(await store.getAttribute('href')).toBeNull();

  await store.focus();
  await expect(store).not.toBeFocused();
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement.classList.contains('btn-store'))).toBe(false);
  }

  await store.click({ force: true });
  await expect(page).toHaveURL(/\/apps\/petpal\/$/);

  await page.click('.lang-btn[data-lang="en"]');
  await expect(store).toHaveText('Coming soon to Google Play');
});

test('las capturas de PetPal tienen texto alternativo y el portafolio enlaza a la página', async ({ page }) => {
  const imgs = page.locator('.shot img');
  await expect(imgs).toHaveCount(5);
  for (const img of await imgs.all()) {
    expect(((await img.getAttribute('alt')) || '').length).toBeGreaterThan(10);
  }
  await page.goto('/');
  await page.locator('a[href="apps/petpal/"]').click();
  await expect(page).toHaveURL(/\/apps\/petpal\/$/);
});
