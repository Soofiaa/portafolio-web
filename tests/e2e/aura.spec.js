const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Espera a que i18n.js cargue i18n/i18n.json, registre el selector de idioma y aplique el idioma.
  await page.addInitScript(() => {
    document.addEventListener('i18n:changed', () => { window.__i18nReady = true; });
  });
  await page.goto('/apps/aura/');
  await page.waitForFunction(() => window.__i18nReady === true);
});

test('la página de Aura cambia de idioma y de metadatos', async ({ page }) => {
  const tagline = page.locator('[data-i18n="auraPage.tagline"]');
  const pregnancy = page.locator('[data-i18n-html="auraPage.features.f7"]');
  await expect(tagline).toHaveText('Entiende tu ciclo con calma');
  await expect(pregnancy).toContainText('modo embarazo');
  await expect(page).toHaveTitle(/Aura — Seguimiento de ciclo/);

  await page.click('.lang-btn[data-lang="en"]');
  await expect(tagline).toHaveText('Understand your cycle, calmly');
  await expect(pregnancy).toContainText('pregnancy mode');
  await expect(page).toHaveTitle(/Aura — Cycle tracking/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('la página de Aura declara el aviso y enlaza la política de privacidad', async ({ page }) => {
  await expect(page.locator('.disclaimer')).toContainText('no es un método anticonceptivo');
  const privacy = page.locator('a[href="https://soofiaa.github.io/Aura/privacy.html"]').first();
  await expect(privacy).toBeVisible();
});

test('el toggle de tema funciona y persiste en la subpágina', async ({ page }) => {
  await page.click('#theme-toggle');
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(['light', 'dark']).toContain(theme);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
});

test('las capturas tienen texto alternativo y el portafolio enlaza a la página', async ({ page }) => {
  const imgs = page.locator('.shot img');
  await expect(imgs).toHaveCount(5);
  for (const img of await imgs.all()) {
    expect(((await img.getAttribute('alt')) || '').length).toBeGreaterThan(10);
  }
  await page.goto('/');
  await page.locator('a[href="apps/aura/"]').click();
  await expect(page).toHaveURL(/\/apps\/aura\/$/);
});

test('el botón de Google Play está deshabilitado y no es un enlace navegable', async ({ page }) => {
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
  await expect(page).toHaveURL(/\/apps\/aura\/$/);

  await page.click('.lang-btn[data-lang="en"]');
  await expect(store).toHaveText('Coming soon to Google Play');
});

test('la página de Aura enlaza al índice de apps', async ({ page }) => {
  await page.locator('nav a[href="/apps/"]').click();
  await expect(page).toHaveURL(/\/apps\/$/);
});
