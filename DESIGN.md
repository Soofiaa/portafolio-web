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
- **JetBrains Mono** para las etiquetas de expediente (`EV-01`), los chips de tecnología y el código real. No la uses en párrafos ni titulares.
- Sin mayúsculas sostenidas, sin eyebrows con símbolos y sin acentuar una sola palabra de
  un titular.

## 4. Layout

- Héroe en dos columnas desde 880 px: nombre y mensaje a la izquierda; Circuit Bloom, resultado
  medido y foco profesional a la derecha. En móvil se apila.
- Proyectos en 6 columnas desde 900 px: PetPal y Job-tracker (3 columnas cada uno), Aura a todo el
  ancho, y Finanzas, POS y BudgetDesk (2 columnas cada uno). Desde 640 px, 2 columnas con Aura y
  BudgetDesk a todo el ancho; 1 columna debajo. Los párrafos de Aura se limitan a 62ch y su
  evidencia va en 2 columnas desde 900 px.
- Contacto en dos columnas desde 960 px.
- Secciones separadas por espacio (112 px arriba), sin líneas divisorias.

## 5. Movimiento

Pocas y con propósito. Solo si la persona no pidió reducir el movimiento
(`prefers-reduced-motion: no-preference`): entrada escalonada del mensaje, los botones y el estado
del héroe, el Circuit Bloom que se dibuja (pétalos que crecen, trazas que se trazan, nodos que
aparecen) y el panel de resultado. El `h1` no se anima a propósito: es el candidato a LCP.
Además, hover de botones y tarjetas (3 px), subrayado del enlace activo y scroll suave. No hay
animaciones al hacer scroll. Con `prefers-reduced-motion: reduce` todo queda estático.

## 6. Reglas para cambios futuros

1. Un dato concreto por proyecto como titular (`projects.<clave>.headline` en ambos idiomas).
2. Todo texto visible nuevo va con `data-i18n` y su valor en `i18n/i18n.json` (es y en); el texto
   por defecto del HTML debe coincidir con `es` (`scripts/check_i18n_sync.py`).
3. Mantén los ids y atributos que usan los tests (`#contact-form`, `#theme-toggle`,
   `#spotify-facade`, `data-i18n="hero.viewProjects"`, la clase `.project-card` y las claves
   `projects.aura.*`).
4. Sin build step: HTML, CSS y JS estáticos.
5. Antes de publicar: `npx html-validate index.html`, `python scripts/check_i18n_sync.py`,
   `npm run test:e2e`.

## 7. Activos de marca

- `assets/og-image.jpg` (1200×630): fondo noche ciruela, nombre en Bricolage 800 con "Menzel" en oro,
  Circuit Bloom a la derecha. La versión anterior quedó en `assets/og-alternativas/og-image.v1-ciruela.jpg`.
- `apple-touch-icon.png` (180×180): "SM" sobre ciruela con sello dorado.
- Favicon: SVG en línea dentro de `index.html` (cuadrado redondeado ciruela, "SM" claro, sello dorado).
- Monograma del encabezado (`.mark`): "SM" con sello dorado; es la misma firma del favicon.
