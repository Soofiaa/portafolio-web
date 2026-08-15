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
| SEO-01 | Imagen og:image / twitter:card | 🟡 — meta tags implementados; imagen actual pendiente de rediseño (ver `VIS-02`) |
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
| VIS-02 | Rediseñar `assets/og-image.jpg` (usar el lienzo 1200×630 completo) | ⏳ — pendiente, a propósito no se tocó esta sesión; usuaria quiere revisar el resultado antes de aceptarlo |
| P0-01 | Falta `scroll-margin-top` — header sticky tapa secciones al navegar | ✅ |
| P0-02 | Mover botón "Descargar CV" del hero a Contacto | ✅ — hero vuelve a 2 CTAs (`Ver proyectos` + `Contactar`); CV ahora es un 4º ítem en `.contact-links` con ícono + `.mono-tag` + texto, mismo patrón que Email/LinkedIn/GitHub |
| P1-01 | Duplicación completa de la paleta de modo oscuro | ✅ — refactor a tokens `--dark-*` como fuente única de verdad; ambos bloques (`@media` y `[data-theme="dark"]`) solo referencian esos tokens |
| P1-02 | Tokenizar color de error del formulario | ✅ — nuevo token `--error` / `--dark-error`, mismo mecanismo que P1-01 |
| P1-03 | Hover de `.nav-cta` no reacciona al tema | ✅ — nuevo token `--accent-strong` / `--dark-accent-strong` (mismo ratio de oscurecimiento que el valor fijo original, aplicado sobre el accent de cada tema) |

---

## Fuera de backlog original (agregado durante la sesión)

- **Sección "Personal"** — nueva sección `#personal` entre Hero y "Sobre mí" (Mascota, Juego favorito, Música), con link de nav "Personal" primero en el `<nav>`. Reutiliza el patrón visual de Stack técnico (`stack-grid` + `stack-group`), sin CSS nuevo salvo `.stack-group p`. ✅
- **Íconos en sección "Personal"** — huella/mira/nota musical, mismo tratamiento SVG que `.theme-toggle`/`.contact-icon` (stroke + `currentColor`). Nuevo token de estilo `.stack-group-icon` (reusa `--accent-muted`). Verificado en navegador: peso visual parejo entre los 3, color correcto en ambos temas, ambos idiomas OK, nav highlight funcionando. ✅
