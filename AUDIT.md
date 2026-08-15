# Auditoría Lighthouse

## Run del 2026-08-15

Corrido en Chrome DevTools contra `localhost:8000` (modo Navigation, Desktop).

| Categoría | Puntaje |
|---|---|
| Performance | 55 |
| Accessibility | 96 |
| Best Practices | 96 |
| SEO | 100 |

### Nota sobre contaminación del entorno

Este run se hizo con el navegador normal (no Incógnito), y al menos dos
extensiones de Chrome contaminaron los resultados:

- **"Fitly"** (auto-postulación laboral) inyectó un overlay
  (`div#fitly-auto-apply-overlay`) responsable de prácticamente todo el
  Cumulative Layout Shift reportado (0.194) — no es CSS/HTML del sitio.
- Otra extensión con un `CVService` intentó sincronizar datos contra
  `http://localhost:8000/api/cvs` (ruta que no existe en este sitio),
  generando los 404 y `console.error` que aparecen en Best Practices.
- Parte del bootup time y del Total Blocking Time incluye scripts
  `chrome-extension://...`, no solo `script.js`/`i18n.js` del sitio.

Los puntajes de Accessibility, Best Practices y SEO no se ven afectados
de forma material por este ruido. Performance sí está inflado hacia abajo
por el layout shift ajeno; el número real en una corrida limpia
(Incógnito o perfil sin extensiones) sería más alto que 55.

### Hallazgos reales y acción tomada

| # | Hallazgo | Categoría | Estado |
|---|---|---|---|
| 1 | Botón de idioma activo (`.lang-btn[aria-pressed="true"]`) con contraste 2.5:1 en modo oscuro (blanco sobre `--accent-muted`), bajo el mínimo WCAG AA de 4.5:1 | Accessibility | **Corregido** — cambiado a `var(--accent)`, mismo token ya usado en `.nav-cta`. Resultado: 4.65:1 en oscuro, 7.57:1 en claro |
| 2 | Google Fonts (`<link rel="stylesheet">`) y `i18n.js`/`script.js` bloqueaban el render inicial (~840ms estimados) | Performance | **Corregido** — fuente cargada con patrón `preload` + swap (con fallback `<noscript>`); scripts con `defer` |
| 3 | Sin cache headers en `style.css`/`script.js`/`i18n.js` (~25 KB de ahorro potencial) | Performance | **No aplica en local** — `python -m http.server` no envía cache headers; pendiente re-verificar contra la URL de producción en Vercel, que cachea assets estáticos por defecto |
| 4 | 404 de `/_vercel/insights/script.js` en local | Best Practices | **Esperado** — ese script solo existe corriendo en infraestructura de Vercel, no es un bug |
| 5 | CSS/JS sin minificar | Performance | **Decisión pendiente** — el proyecto es intencionalmente "sin build step" (ver README). Minificar implicaría introducir una herramienta de build. Evaluar como ticket aparte si el ahorro justifica la complejidad |

### Próximos pasos sugeridos

- Re-correr Lighthouse en Incógnito (o perfil limpio) contra la URL de
  producción para obtener un número de Performance sin ruido de
  extensiones ni de servidor de desarrollo, y actualizar esta tabla.
- Si el cache-headers finding persiste en producción, agregar
  `vercel.json` con `Cache-Control` explícito para `*.css`/`*.js`.
