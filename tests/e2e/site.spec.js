const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // Espera a que i18n.js termine de cargar i18n/i18n.json y aplique el idioma.
  await expect(page.locator('html')).not.toHaveAttribute('data-lang-loading', 'en');
});

test('el formulario de contacto no se envía si falta el email', async ({ page }) => {
  await page.fill('#contact-name', 'Ada Lovelace');
  await page.fill('#contact-message', 'Hola, quiero conversar sobre una oportunidad.');

  const emailInput = page.locator('#contact-email');
  const urlBefore = page.url();

  await page.click('#contact-form button[type="submit"]');

  // La validación nativa del navegador bloquea el submit: seguimos en la misma página
  // y el campo email queda marcado como inválido.
  await expect(page).toHaveURL(urlBefore);
  await expect(emailInput).toHaveJSProperty('validity.valid', false);
});

test('el toggle de tema cambia data-theme y persiste tras recargar', async ({ page }) => {
  const html = page.locator('html');
  await expect(html).not.toHaveAttribute('data-theme', /.+/);

  await page.click('#theme-toggle');
  await expect(html).toHaveAttribute('data-theme', 'dark');

  await page.reload();
  await expect(html).not.toHaveAttribute('data-lang-loading', 'en');
  await expect(html).toHaveAttribute('data-theme', 'dark');
});

test('el selector de idioma cambia el texto visible', async ({ page }) => {
  const viewProjects = page.locator('[data-i18n="hero.viewProjects"]');
  await expect(viewProjects).toHaveText('Ver proyectos');

  await page.click('.lang-btn[data-lang="en"]');
  await expect(viewProjects).toHaveText('View projects');
});

test('la fachada de Spotify se reemplaza por un iframe al hacer clic', async ({ page }) => {
  const facade = page.locator('#spotify-facade');
  await expect(facade).toBeVisible();

  await facade.click();

  await expect(facade).toHaveCount(0);

  const iframe = page.locator('.spotify-embed iframe');
  await expect(iframe).toHaveAttribute('src', /open\.spotify\.com/);

  const focusedHasWrapperClass = await page.evaluate(
    () => document.activeElement?.classList.contains('spotify-embed') ?? false
  );
  expect(focusedHasWrapperClass).toBe(true);
});
