# Auditoría Lighthouse

## Run #1 — 2026-08-15

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

---

## Run #2 — 2026-08-15, ~15 min después

Mismo entorno (`localhost:8000`, navegador normal con extensiones activas),
corrido para verificar los fixes del Run #1.

| Categoría | Puntaje | vs. Run #1 |
|---|---|---|
| Performance | 87 | +32 |
| Accessibility | — | `color-contrast` en 1 (0 elementos fallando) |
| Best Practices | — | sin cambios reales (el ruido de extensiones sigue igual) |
| SEO | — | sin cambios |

**Confirmado por datos del reporte:**
- `render-blocking-insight` ya no incluye `script.js` ni `i18n.js` — el
  `defer` del Run #1 funcionó.
- `i18n.js` sigue haciendo un único fetch a `i18n/i18n.json` (ARQ-02
  se mantiene resuelto).
- El fix de contraste del botón de idioma quedó confirmado: `color-contrast`
  pasa a score 1, sin elementos fallando.
- El CLS (0.159) y los errores de consola siguen siendo 100% ruido de las
  mismas extensiones de Chrome documentadas en el Run #1 (overlay de
  "Fitly" y el `CVService` apuntando a `/api/cvs`, que no existe en este
  sitio) — no se tocó nada relacionado a eso, es ruido del entorno de
  testing, no un bug del sitio.

**Hallazgo nuevo:**

| # | Hallazgo | Categoría | Estado |
|---|---|---|---|
| 6 | `style.css` seguía siendo el único recurso render-blocking restante | Performance | **Corregido** — la hoja de estilos completa (700 líneas) se incrustó como `<style>` en `<head>` de `index.html`, eliminando el request de red por completo. A diferencia de Google Fonts, diferir el CSS propio del sitio sí hubiera causado un flash real de contenido sin estilo (sin layout, sin modo oscuro), así que no se usó el patrón preload+swap acá — se evaluó con la usuaria y se optó por inline completo sobre un split de critical CSS, priorizando cero riesgo de FOUC. `style.css` se eliminó del repo; `index.html` es ahora la única fuente de verdad para los estilos |

### Próximos pasos sugeridos

- Re-correr Lighthouse en Incógnito (o perfil limpio) contra la URL de
  producción para obtener un número de Performance sin ruido de
  extensiones ni de servidor de desarrollo, y actualizar esta tabla con
  ese número "limpio" de referencia — en curso.
- Si el cache-headers finding persiste en producción, agregar
  `vercel.json` con `Cache-Control` explícito para `*.js` (ya no aplica a
  `style.css`, que ahora va inline en el HTML).
