const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Espera a que i18n.js cargue i18n/i18n.json, registre el selector de idioma y aplique el idioma.
  await page.addInitScript(() => {
    document.addEventListener('i18n:changed', () => { window.__i18nReady = true; });
  });
  await page.goto('/apps/');
  await page.waitForFunction(() => window.__i18nReady === true);
});

test('el índice de apps lista cada app con su estado y su captura', async ({ page }) => {
  const cards = page.locator('.app-card');
  await expect(cards).toHaveCount(2);
  for (const card of await cards.all()) {
    await expect(card.locator('h2 a')).toHaveAttribute('href', /^\/apps\/[a-z]+\/$/);
    await expect(card.locator('.seal')).not.toBeEmpty();
    expect(((await card.locator('img').getAttribute('alt')) || '').length).toBeGreaterThan(10);
  }
  await expect(page.locator('[data-i18n="appsPage.aura.status"]')).toHaveText('En prueba cerrada en Google Play');
});

test('el índice de apps cambia de idioma y de metadatos', async ({ page }) => {
  const lead = page.locator('[data-i18n="appsPage.lead"]');
  await expect(lead).toContainText('Apps que diseño y construyo');
  await page.click('.lang-btn[data-lang="en"]');
  await expect(lead).toContainText('Apps I design and build');
  await expect(page.locator('[data-i18n="appsPage.petpal.status"]')).toHaveText('In development · Not in stores yet');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveTitle('Apps · Sofía Menzel');
});

test('el toggle de tema funciona y persiste en el índice de apps', async ({ page }) => {
  await page.click('#theme-toggle');
  const theme = await page.locator('html').getAttribute('data-theme');
  expect(['light', 'dark']).toContain(theme);
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
});

test('cada tarjeta lleva a la página de su app y la portada enlaza al índice', async ({ page }) => {
  await page.locator('.app-card', { hasText: 'PetPal' }).click();
  await expect(page).toHaveURL(/\/apps\/petpal\/$/);
  await page.goto('/apps/');
  await page.locator('.app-card', { hasText: 'Aura' }).click();
  await expect(page).toHaveURL(/\/apps\/aura\/$/);
  await page.goto('/');
  await page.locator('a[href="apps/"]').click();
  await expect(page).toHaveURL(/\/apps\/$/);
});

test('las páginas de apps muestran el apoyo opcional por PayPal en ES y EN', async ({ page }) => {
  for (const url of ['/apps/', '/apps/aura/', '/apps/petpal/']) {
    await page.goto(url);
    await page.waitForFunction(() => window.__i18nReady === true);
    const link = page.locator('.support a');
    await expect(link).toHaveAttribute('href', 'https://www.paypal.com/paypalme/sofiamenzeldev');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(link).toHaveText('Donar por PayPal');
  }
  await page.click('.lang-btn[data-lang="en"]');
  await expect(page.locator('.support a')).toHaveText('Donate via PayPal');
  await expect(page.locator('.support a')).toHaveAttribute('aria-label', 'Donate via PayPal (opens in a new tab)');
});
