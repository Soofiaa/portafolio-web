# Portafolio — Sofía Menzel

[![CI](https://github.com/Soofiaa/portafolio-web/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/Soofiaa/portafolio-web/actions/workflows/ci.yml)

Sitio estático (HTML, CSS y JavaScript puro, sin framework ni build step) con mi
portafolio profesional: proyectos, experiencia, stack técnico, formación y contacto,
más una página propia para cada app.

Disponible en [portafolio-web-theta-coral.vercel.app](https://portafolio-web-theta-coral.vercel.app).

## Características

- **Proyectos con evidencia**: cada proyecto abre con su dato más fuerte (tests,
  cliente real, resultado medido) y un sello solo para lo que se puede verificar
- **Sección de apps** (`/apps/`): índice y página propia para Aura y PetPal, con
  capturas, principios de diseño, qué hace, transparencia y cómo está construida
- **Bilingüe ES/EN**: selector de idioma que traduce todo el sitio sin recargar
- **Modo claro y oscuro**, con preferencia guardada
- **Responsive**, con menú de navegación en móvil
- **Rendimiento**: fuentes autoalojadas, carga diferida de imágenes y sin build
  step; Lighthouse móvil 97–98 en las páginas principales (ver `AUDIT.md`)
- **Accesibilidad**: contraste AA en ambos temas y sin violaciones de axe-core
- **Página 404 propia** y sitemap con todas las páginas

## Stack técnico

- **HTML / CSS / JavaScript** puro — sin framework, sin build step
- **i18n** implementado a mano (sin librería externa), con los textos en `i18n/i18n.json`
- **Playwright** — tests end-to-end de idioma, tema, navegación, formulario y páginas de apps
- **GitHub Actions** — CI en cada push y pull request: validación HTML, enlaces
  locales, sincronía de textos ES/EN y tests e2e
- **Vercel** — deploy automático al mergear a `master`

## Desarrollo local

```bash
python -m http.server 8080        # sirve el sitio en http://127.0.0.1:8080
npm install
npx playwright install chromium
npm run test:e2e
npx --yes html-validate index.html 404.html apps/index.html apps/*/index.html
python scripts/check_links.py
python scripts/check_i18n_sync.py
```

El diseño (colores, tipografía, layout y reglas) está documentado en `DESIGN.md`, y el
estado del trabajo en `BACKLOG.md`.

## Autora

Sofía Menzel — [GitHub](https://github.com/Soofiaa) ·
[LinkedIn](https://linkedin.com/in/sofia-menzel-madrid)
