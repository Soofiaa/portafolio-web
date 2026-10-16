const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/apps/aura/');
  await expect(page.locator('html')).not.toHaveAttribute('data-lang-loading', 'en');
});

test('la página de Aura cambia de idioma y de metadatos', async ({ page }) => {
  const tagline = page.locator('[data-i18n="auraPage.tagline"]');
  await expect(tagline).toHaveText('Entiende tu ciclo con calma');
  await expect(page).toHaveTitle(/Aura — Seguimiento de ciclo/);

  await page.click('.lang-btn[data-lang="en"]');
  await expect(tagline).toHaveText('Understand your cycle, calmly');
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
