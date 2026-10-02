---
name: Ciruela y rosa
description: Sistema de diseño del portafolio de Sofía Menzel (HTML/CSS/JS estático, ES/EN, claro/oscuro).
colors:
  light:
    bg: "#F7F3F8"
    bg-alt: "#EDE5F2"
    ink: "#2A1638"
    ink-soft: "#66557A"
    border: "#D9CCE5"
    accent: "#C42F68"
    on-accent: "#FFFFFF"
    accent-strong: "#A8235A"
    accent-soft: "#E7DDF3"
    accent-muted: "#7C4B9E"
    card-bg: "#FFFFFF"
    error: "#B42318"
  dark:
    bg: "#1B0F26"
    bg-alt: "#26163A"
    ink: "#F3ECF7"
    ink-soft: "#BDAACE"
    border: "#4B3562"
    accent: "#F0679A"
    on-accent: "#1B0F26"
    accent-strong: "#FF8DB6"
    accent-soft: "#3A2455"
    accent-muted: "#D2AEF0"
    card-bg: "#2A183D"
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
    use: solo elementos de código (archivo del panel, chips de tecnología, barra del formulario)
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
diseño de `CONTEXT.md`, que describen versiones anteriores (paleta morada y luego terracota).

## 1. Idea

Un portafolio que se lee como evidencia, no como decoración. La pieza memorable es el
nombre gigante en el héroe; los proyectos son un mosaico de tarjetas de color donde cada
una abre con su dato más fuerte (por ejemplo "+180 tests automatizados"). Todo lo demás
es silencioso: mucho aire, un solo acento y poco movimiento.

## 2. Color

La paleta es ciruela (tinta y paneles), rosa (acción y acento) y lila (superficies suaves).
Los tokens viven en `:root`; el modo oscuro está en tokens `--dark-*` que usan por igual el
bloque `prefers-color-scheme` y `[data-theme="dark"]`. No dupliques hex fuera de los tokens.

- **Rosa `--accent`** es para acciones (botón principal, enlace activo, foco). Sobre rosa
  el texto va en `--on-accent` (blanco en claro, ciruela oscuro en oscuro). No uses `#fff`
  fijo sobre el acento.
- **Tarjetas de proyecto** usan tokens `--t1-*` a `--t5-*` (fondo, tinta, tinta suave,
  titular, píldora, borde). Cada tarjeta recibe su juego con la clase `pc-N`.
- **Panel del héroe** usa `--panel-*`.
- Todos los pares texto/fondo cumplen WCAG AA (4,5:1); axe-core no reporta violaciones de
  contraste en claro ni oscuro, ES ni EN, escritorio ni móvil. Si cambias un token,
  vuelve a medir.

## 3. Tipografía

- **Bricolage Grotesque** 800 para el nombre y los `h2`; 700 para títulos de tarjeta.
  Tracking ajustado (-0,035 a -0,055 em) y interlineado 0,85 a 1,05.
- **Instrument Sans** para el cuerpo (1,0625 rem, interlineado 1,6). Líneas de 62 caracteres
  como máximo en párrafos de lectura.
- **JetBrains Mono** solo donde hay código real. No la uses para etiquetas decorativas.
- Sin mayúsculas sostenidas, sin eyebrows con símbolos y sin acentuar una sola palabra de
  un titular.

## 4. Layout

- Héroe en dos columnas desde 820 px: nombre a la izquierda; panel de estado y foco
  profesional a la derecha. En móvil se apila.
- Proyectos en un mosaico de 6 columnas desde 900 px (PetPal ocupa 3 columnas y 2 filas);
  2 columnas desde 640 px; 1 columna debajo.
- Contacto en dos columnas desde 960 px.
- Secciones separadas por espacio (112 px arriba), sin líneas divisorias.

## 5. Movimiento

Solo respuestas a una acción: hover de botones y tarjetas (3 px), subrayado del enlace
activo, scroll suave. No hay animaciones al cargar ni al hacer scroll. `prefers-reduced-motion`
anula transiciones.

## 6. Reglas para cambios futuros

1. Un dato concreto por proyecto como titular (`projects.<clave>.headline` en ambos idiomas).
2. Todo texto visible nuevo va con `data-i18n` y su valor en `i18n/i18n.json` (es y en); el texto
   por defecto del HTML debe coincidir con `es` (`scripts/check_i18n_sync.py`).
3. Mantén los ids y atributos que usan los tests (`#contact-form`, `#theme-toggle`,
   `#spotify-facade`, `data-i18n="hero.viewProjects"`).
4. Sin build step: HTML, CSS y JS estáticos.
5. Antes de publicar: `npx html-validate index.html`, `python scripts/check_i18n_sync.py`,
   `npm run test:e2e`.

## 7. Activos de marca

- `assets/og-image.jpg` (1200×630): fondo ciruela, nombre en Bricolage 800, círculo rosa.
- `apple-touch-icon.png` (180×180): "SM" sobre ciruela con punto rosa.
- Favicon: SVG en línea dentro de `index.html` (cuadrado redondeado ciruela, "SM" claro).
