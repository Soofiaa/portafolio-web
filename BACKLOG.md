# Backlog — Portafolio Web

Estado vivo del backlog del portafolio. Ver también `AUDIT.md` para el detalle
de la auditoría Lighthouse (tickets `ARQ-04` y derivados).

**Leyenda:** ✅ Resuelto · 🟡 Parcial / decisión pendiente · ⏳ Pendiente

---

## Épica 1 — Contenido y posicionamiento estratégico

| ID | Título | Estado |
|----|--------|--------|
| CONT-01 | Evidencia de testing/CI en PetPal | ✅ |
| CONT-02 | Evidencia de auditoría/remediación en BudgetDesk | ✅ |
| CONT-03 | Evidencia de revisión de código en Jobbi | ✅ |
| CONT-04 | Evidencia de refactor por fases en Cervecería POS | ✅ |
| CONT-05 | Revisar MySQL en el stack | ✅ — confirmado como hands-on real, sin cambios |
| CONT-06 | Revisar Power BI en el stack | ✅ — reclasificado como "curso" |
| CONT-07 | Auditar Postman, Figma, StarUML, draw.io | ✅ — Postman/Figma reclasificados "uso puntual"; StarUML/draw.io confirmados reales |
| CONT-08 | Botón de descarga de CV | ✅ — ver nota de reubicación abajo |
| CONT-09 | Reencuadrar certificación SENCE | ✅ |
| CONT-10 | Foto profesional (opcional) | ✅ — decisión consciente: mantener diseño tipografía-first, sin foto |

## Épica 2 — SEO técnico y compartibilidad

| ID | Título | Estado |
|----|--------|--------|
| SEO-01 | Imagen og:image / twitter:card | 🟡 — meta tags implementados; imagen rediseñada (ver `VIS-02`) |
| SEO-02 | JSON-LD schema.org/Person | ✅ |
| SEO-03 | robots.txt y sitemap.xml | ✅ |
| SEO-04 | rel="canonical" | ✅ |

## Épica 3 — Arquitectura, performance y código

| ID | Título | Estado |
|----|--------|--------|
| ARQ-01 | Evitar flash de idioma incorrecto (FOUC) | ✅ |
| ARQ-02 | Combinar es.json + en.json | ✅ — ahora `i18n/i18n.json` |
| ARQ-03 | GitHub Action de validación (CI) | ✅ |
| ARQ-04 | Auditoría Lighthouse/accesibilidad | ✅ — cerrado, ver `AUDIT.md` (3 runs, Performance 55→91, Accessibility 96→100) |
| ARQ-05 | apple-touch-icon | ✅ |
| ARQ-06 | Sistema de tokens de espaciado | ⏳ — explícitamente pospuesto, bajo impacto |

## Backlog de bajo impacto original

Todo lo de esta categoría (`SEO-03`, `SEO-04`, `ARQ-05`, `CONT-10`) ya está
resuelto — ver tablas arriba.

---

## Ronda de revisión front-end (buenas prácticas)

| ID | Título | Estado |
|----|--------|--------|
| CSS-01 | `.nav-cta{ color:#fff !important }` innecesario | ✅ — quitado; se ajustó `nav a:hover` con `:not(.nav-cta)` para no romper el hover |
| CSS-02 | `.chip-conceptual` con 3x `!important` | ✅ — selector cambiado a `li.chip-conceptual`, empata especificidad con `.chips li` y gana por orden de aparición |
| VIS-01 | Diferenciar botón "Descargar CV" de "Contactar" | ✅ — superado: el CV se sacó del hero y se movió a `.contact-links` (ver P0-02 abajo), con su propio ícono de descarga, en vez de quedarse en el hero con un ícono |
| VIS-02 | Rediseñar `assets/og-image.jpg` (usar el lienzo 1200×630 completo) | ✅ — rediseñado con la marca "Evidencia verificable" (Circuit Bloom); la versión anterior se guardó en `assets/og-alternativas/` — pendiente de la revisión de la usuaria |
| P0-01 | Falta `scroll-margin-top` — header sticky tapa secciones al navegar | ✅ |
| P0-02 | Mover botón "Descargar CV" del hero a Contacto | ✅ — hero vuelve a 2 CTAs (`Ver proyectos` + `Contactar`); CV ahora es un 4º ítem en `.contact-links` con ícono + `.mono-tag` + texto, mismo patrón que Email/LinkedIn/GitHub |
| P1-01 | Duplicación completa de la paleta de modo oscuro | ✅ — refactor a tokens `--dark-*` como fuente única de verdad; ambos bloques (`@media` y `[data-theme="dark"]`) solo referencian esos tokens |
| P1-02 | Tokenizar color de error del formulario | ✅ — nuevo token `--error` / `--dark-error`, mismo mecanismo que P1-01 |
| P1-03 | Hover de `.nav-cta` no reacciona al tema | ✅ — nuevo token `--accent-strong` / `--dark-accent-strong` (mismo ratio de oscurecimiento que el valor fijo original, aplicado sobre el accent de cada tema) |

---

## Ronda de revisión front-end (segunda pasada)

| ID | Título | Estado |
|----|--------|--------|
| PERF-01 | `loading="lazy"` en imagen de Overwatch (LCP) | ✅ — quitado; la sección queda muy arriba y Lighthouse la marcó como elemento LCP |
| A11Y-01 | Foco perdido al activar la fachada de Spotify | ✅ — el wrapper del iframe recibe `tabindex="-1"` + `.focus()` explícito, con estilo `:focus` visible a juego con el resto del sitio |
| CI-01 | Smoke tests de comportamiento (Playwright) | ✅ — `tests/e2e/site.spec.js` cubre formulario/validación nativa, persistencia de tema, cambio de idioma y fachada de Spotify; job `e2e` nuevo en `ci.yml`, no afecta el deploy (sigue sin build step) |
| ARQ-07 | CSS inline en `index.html` (~1240 líneas) | ⏳ — sin acción por ahora; ver nota abajo |
| VIS-03 | Los estados en curso ("v1.2 · en desarrollo", "En prueba cerrada", "En desarrollo · Aún no está en tiendas") usaban el sello dorado de "verificado" | ✅ — ahora usan `.status-chip`, neutro, y las características del encabezado de cada app ("Sin cuenta", "Varias mascotas"…) usan `.feature-chip`; el sello queda solo para evidencia comprobable |

**Nota ARQ-07:** si se agrega otra sección grande o componente interactivo
nuevo, evaluar separar el CSS a un archivo aparte con estrategia de critical
CSS (inline solo lo del primer viewport, resto cargado de forma diferida) en
vez de seguir creciendo el `<style>` inline. Al tamaño actual, mantenerlo
inline para evitar una request de CSS bloqueante sigue siendo la decisión
correcta.

---

## Fuera de backlog original (agregado durante la sesión)

- **Sección "Personal"** — nueva sección `#personal` entre Hero y "Sobre mí" (Mascota, Juego favorito, Música), con link de nav "Personal" primero en el `<nav>`. Reutiliza el patrón visual de Stack técnico (`stack-grid` + `stack-group`), sin CSS nuevo salvo `.stack-group p`. ✅
- **Íconos en sección "Personal"** — huella/mira/nota musical, mismo tratamiento SVG que `.theme-toggle`/`.contact-icon` (stroke + `currentColor`). Nuevo token de estilo `.stack-group-icon` (reusa `--accent-muted`). Verificado en navegador: peso visual parejo entre los 3, color correcto en ambos temas, ambos idiomas OK, nav highlight funcionando. ✅
- **APP-01 — Página propia de Aura (`/apps/aura/`) con capturas de Play Store, ES/EN** — ✅ enlazada desde la tarjeta de Aura. Botón de Google Play agregado como "Próximamente en Google Play", deshabilitado (`<a>` sin `href`, `role="link"`, `aria-disabled="true"`, no recibe foco). 🟡 Falta activarlo con el enlace real cuando Aura salga de la prueba cerrada: los pasos están en un comentario junto al botón en `apps/aura/index.html`.

## Sección de apps

| ID | Título | Estado |
|----|--------|--------|
| APP-02 | Índice `/apps/` con una tarjeta por app (nombre, descripción, estado, captura), enlazado desde la sección de proyectos de la portada ("Ver todas las apps") y desde la navegación de cada página de app | ✅ — lista solo las apps con página propia (decisión de la usuaria) |
| APP-03 | Página propia de PetPal (`/apps/petpal/`), ES/EN, con la estructura de `/apps/aura/` | ✅ — enlazada desde la tarjeta de PetPal; capturas tomadas en el emulador con datos de ejemplo, desde el código de `pet_pal` en `HEAD` |
| APP-04 | Botón "Próximamente en Google Play" deshabilitado en las apps que no están en una tienda (estilo `.btn-store` en `assets/shared.css`) | ✅ — Aura y PetPal; 🟡 activar cada uno al publicar (ver comentario en su HTML) |
| APP-05 | Tests e2e de la sección de apps (`tests/e2e/apps.spec.js`, `petpal.spec.js` y el botón de tienda en `aura.spec.js`) | ✅ |
| APP-06 | `check_links.py`, `check_i18n_sync.py` y el `html-validate` del CI recorren también `apps/index.html` | ✅ |
| APP-07 | Páginas propias de Job-tracker, Finanzas, POS y BudgetDesk | ⏳ — descartadas por ahora (decisión de la usuaria); siguen solo como tarjetas en la portada |
| APP-08 | `og:image` propia para `/apps/` y `/apps/petpal/` (hoy usan `assets/og-image.jpg`) | ⏳ |
| APP-09 | Bloque opcional "Apoya mi trabajo" (PayPal) también al pie de `/apps/`, `/apps/aura/` y `/apps/petpal/` | ✅ — mismo bloque y claves (`contact.support.*`) que en Contacto (PR #5); sus estilos y `.mono-tag` pasaron a `assets/shared.css` |
