---
name: Evidencia verificable
description: Sistema de diseño del portafolio de Sofía Menzel (HTML/CSS/JS estático, ES/EN, claro/oscuro). Marca "Expediente + Circuit Bloom".
colors:
  light:
    bg: "#F7EEEB"
    bg-alt: "#EBDAD7"
    ink: "#3B2230"
    ink-soft: "#6B5360"
    border: "#D9C2C3"
    accent: "#8E2F50"
    on-accent: "#FFFFFF"
    accent-strong: "#741F40"
    accent-soft: "#F3E7E4"
    card-bg: "#FFFBF9"
    gold-fill: "#D6A84A"
    seal-bg: "#F3E2B8"
    seal-ink: "#5E4210"
    error: "#B42318"
  dark:
    bg: "#17101F"
    bg-alt: "#211733"
    ink: "#F5EDF3"
    ink-soft: "#BEACC9"
    border: "#3A2B4D"
    accent: "#F592B3"
    on-accent: "#17101F"
    accent-strong: "#FFB1C9"
    accent-soft: "#2F2245"
    card-bg: "#221834"
    gold-fill: "#EBC477"
    seal-bg: "#3A2C1A"
    seal-ink: "#F2D08F"
    error: "#FFA79B"
typography:
  display:
    fontFamily: Bricolage Grotesque
    weights: [500, 700, 800]
    use: nombre, títulos de sección, titulares de proyecto
  body:
    fontFamily: Instrument Sans
    weights: [400, 500, 600, 700]
  mono:
    fontFamily: JetBrains Mono
    weights: [400, 500]
    use: etiquetas de expediente (EV-01), chips de tecnología y código real
rounded:
  base: 16px
  large: 28px
  pill: 999px
layout:
  maxWidth: 1120px
  sectionPaddingTop: 112px
---

# DESIGN.md — Portafolio de Sofía Menzel

**Fuente de verdad del diseño.** Si este documento y el código se contradicen, gana el
código (`index.html`, bloque `<style>`): corrige este archivo. Reemplaza las secciones de
diseño de `CONTEXT.md`, que describen versiones anteriores (paletas morada, terracota y ciruela/rosa).

## 1. Idea

**Evidencia verificable.** Un portafolio que se lee como un expediente: cada proyecto abre con
su dato más fuerte (por ejemplo "+290 tests automatizados"), lleva un código `EV-0N` y un sello
dorado que dice qué se puede verificar. El **oro significa "verificado"**: solo aparece en
sellos, en el punto del estado y en detalles del Circuit Bloom; no se usa como color decorativo.
La pieza memorable es el nombre gigante del héroe junto al **Circuit Bloom** (una flor cuyos
pétalos se conectan con trazas de circuito: lo humano y lo técnico) y el resultado medido
("1 semana → ~3 min"). Todo lo demás es silencioso: mucho aire y poco movimiento.

## 2. Color

Dos temas de una misma marca: **rosa empolvado + oro** (claro) y **noche ciruela + oro**
(oscuro). Los tokens viven en `:root`; el modo oscuro está en tokens `--dark-*` que usan por
igual el bloque `prefers-color-scheme` y `[data-theme="dark"]`. No dupliques hex fuera de los tokens.

- **Rosa `--accent`** es para acciones (botón principal, enlace activo, foco) y para los números
  protagonistas (`--num`). Sobre rosa el texto va en `--on-accent`. No uses `#fff` fijo.
- **Oro** (`--gold-*`, `--seal-*`, `--warm`) = verificado. Los sellos usan `--seal-bg`/`--seal-ink`.
  Solo llevan sello los hechos comprobables (tests, CI, cliente real, auditoría). Los estados en curso
  ("en desarrollo", "en prueba cerrada") usan `.status-chip` (`assets/shared.css`): borde y texto
  `--ink-soft`, punto hueco, sin oro ni check. Las características de una app ("Sin cuenta",
  "Varias mascotas") usan `.feature-chip`: el mismo estilo neutro, sin punto.
- **Tarjetas de proyecto** usan `--card-bg`, `--card-border` y `--card-feature` (PetPal). Ya no
  existen los tokens `--t1-*` a `--t6-*`.
- **Panel del héroe** usa `--panel-*`; el Circuit Bloom usa `--petal*`, `--trace` y `--gold-line`.
- Todos los pares texto/fondo cumplen WCAG AA (4,5:1); axe-core no reporta violaciones en claro
  ni oscuro, ES ni EN, escritorio ni móvil. Si cambias un token, vuelve a medir.

## 3. Tipografía

- **Bricolage Grotesque** 800 para el nombre y los `h2`; 700 para títulos de tarjeta.
  Tracking ajustado (-0,035 a -0,055 em) y interlineado 0,85 a 1,05.
- **Instrument Sans** para el cuerpo (1,0625 rem, interlineado 1,6). Líneas de 62 caracteres
  como máximo en párrafos de lectura.
- Las tres fuentes están autoalojadas en `assets/fonts/` (variables, solo subconjunto latino;
  licencia OFL en `assets/fonts/OFL.txt`) y se declaran en `assets/shared.css`. Cada página precarga
  Bricolage Grotesque e Instrument Sans. No se usa Google Fonts.
- **JetBrains Mono** para las etiquetas de expediente (`EV-01`), los chips de tecnología y el código real. No la uses en párrafos ni titulares.
- Sin mayúsculas sostenidas, sin eyebrows con símbolos y sin acentuar una sola palabra de
  un titular.

## 4. Layout

- Héroe en dos columnas desde 880 px: nombre y mensaje a la izquierda; Circuit Bloom, resultado
  medido y foco profesional a la derecha. En móvil se apila.
- Orden de la portada, pensado para quien recluta: Héroe → Proyectos → Experiencia → Stack →
  Educación → Certificaciones → Sobre mí → Personal → Contacto. La navegación tiene 4 enlaces
  (Proyectos, Experiencia, Stack, Sobre mí) más Contacto; bajo 900 px van en un menú
  (`#nav-toggle`, `aria-expanded`, se cierra al elegir un enlace o con Escape).
- Proyectos ordenados por fuerza de evidencia, en 6 columnas desde 900 px: Aura a todo el ancho
  (fondo `--card-feature`), POS (2 columnas) y PetPal (4), Job-tracker a todo el ancho, y Finanzas y
  BudgetDesk (3 cada uno). Desde 640 px, 2 columnas con Aura y Job-tracker a todo el ancho; 1
  columna debajo. En las tarjetas a todo el ancho los párrafos se limitan a 62ch y la evidencia va en
  2 columnas desde 900 px. Las tarjetas con lista de evidencia muestran 2 puntos y no repiten el
  párrafo "Proceso"; el detalle completo vive en la página de cada app o en su repositorio.
- Los códigos `EV-0N` identifican cada proyecto y no cambian aunque cambie el orden.
- Contacto en dos columnas desde 960 px.
- Personal: dos tarjetas (juegos y música) de 780 px en total, con la foto de borde a borde en 16:9 y el
  reproductor de Spotify pegado al pie. Desde 1000 px la flor con circuito ocupa la columna libre de la
  derecha; bajo 1000 px se oculta. No hay material con derechos de autor ni tarjetas sin contenido propio.
- Secciones separadas por espacio (112 px arriba), sin líneas divisorias.

## 5. Movimiento

Pocas y con propósito. Solo si la persona no pidió reducir el movimiento
(`prefers-reduced-motion: no-preference`): entrada escalonada del mensaje, los botones y el estado
del héroe, el Circuit Bloom que se dibuja (pétalos que crecen, trazas que se trazan, nodos que
aparecen) y el panel de resultado. El `h1` no se anima a propósito: es el candidato a LCP.
Además, hover de botones y tarjetas (3 px), subrayado del enlace activo y scroll suave. No hay
animaciones al hacer scroll. Con `prefers-reduced-motion: reduce` todo queda estático.

**Foco.** `:focus-visible` dibuja un anillo de 2 px en `--accent` con un halo de `--bg`, no el contorno
por defecto del navegador. Las transiciones de botones y tarjetas duran 0,3 s con `ease-out`.

**Iconos.** Todos son de trazo (24×24, 2 px, extremos redondeados). Quedan rellenos solo los logos de
marca (GitHub, LinkedIn) y el sello dorado del monograma. El acento rosa se reserva para acciones y
estados activos: los eyebrows, los iconos decorativos y la flor de Personal usan `--ink-soft`.

## 6. Reglas para cambios futuros

1. Un dato concreto por proyecto como titular (`projects.<clave>.headline` en ambos idiomas).
2. Todo texto visible nuevo va con `data-i18n` y su valor en `i18n/i18n.json` (es y en); el texto
   por defecto del HTML debe coincidir con `es` (`scripts/check_i18n_sync.py`).
3. Mantén los ids y atributos que usan los tests (`#contact-form`, `#theme-toggle`,
   `#spotify-facade`, `data-i18n="hero.viewProjects"`, la clase `.project-card` y las claves
   `projects.aura.*`).
4. Sin build step: HTML, CSS y JS estáticos.
5. Antes de publicar: `npx html-validate index.html apps/index.html apps/*/index.html`, `python scripts/check_links.py`, `python scripts/check_i18n_sync.py`,
   `npm run test:e2e`.

## 7. Subpáginas de apps (`apps/<app>/index.html`)

Cada app con página propia (hoy Aura y PetPal) sigue la misma estructura: héroe con estado,
principios, capturas, qué hace, transparencia y cómo está construida. El índice `apps/index.html`
lista una tarjeta por app (captura, `EV-0N`, estado, nombre y una línea de descripción); toda la
tarjeta es clicable con un enlace estirado sobre el nombre. Los tokens, la base, el encabezado, los
botones y los sellos viven en `assets/shared.css` (lo cargan `index.html` y las subpáginas); los
estilos propios de cada página van inline en su HTML. Los textos van en `i18n/i18n.json` bajo una
clave propia (`auraPage`, `petpalPage`, `appsPage`; los compartidos en `store`) y la página la
declara con `data-i18n-meta` en `<html>` para sus metadatos. Las rutas de las subpáginas son
absolutas desde la raíz (`/assets/...`, `/i18n.js`). `check_links.py` y `check_i18n_sync.py`
recorren `apps/index.html` y `apps/*/index.html`, y el CI valida el HTML de cada una.

**Apoyo.** El bloque opcional "Apoya mi trabajo" (`.support`: borde punteado, etiqueta "Opcional" y
botón secundario con corazón, sin logo de PayPal) aparece en Contacto de la portada y al pie de cada
página de apps, con las mismas claves `contact.support.*`. Sus estilos viven en `assets/shared.css`.

**Tiendas.** No se enlaza a una tienda hasta que la app esté publicada. Mientras tanto se muestra
`.btn-store` como "Próximamente en Google Play": un `<a>` sin `href` con `role="link"` y
`aria-disabled="true"` (no recibe foco ni navega), borde punteado y texto `--ink-soft`, que cumple AA
en ambos temas. Para activarlo basta agregar el `href` y quitar `role` y `aria-disabled`; cada
botón lleva un comentario con los pasos.

## 8. Página 404 (`404.html`)

Vercel la sirve cuando una ruta no existe. Usa la misma marca, textos en `notFound` (ES/EN),
`noindex` y enlaces a la portada y a `/apps/`. Sus rutas son absolutas porque puede servirse desde
cualquier profundidad. El CI la valida igual que las demás páginas.

## 9. Activos de marca

- `assets/og-image.jpg` (1200×630): fondo noche ciruela, nombre en Bricolage 800 con "Menzel" en oro,
  Circuit Bloom a la derecha. La versión anterior quedó en `assets/og-alternativas/og-image.v1-ciruela.jpg`.
- `apple-touch-icon.png` (180×180): "SM" sobre ciruela con sello dorado.
- Favicon: SVG en línea dentro de `index.html` (cuadrado redondeado ciruela, "SM" claro, sello dorado).
- Monograma del encabezado (`.mark`): "SM" con sello dorado; es la misma firma del favicon.
