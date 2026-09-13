# Portafolio — Sofía Menzel

[![CI](https://github.com/Soofiaa/portafolio-web/actions/workflows/ci.yml/badge.svg?branch=dev)](https://github.com/Soofiaa/portafolio-web/actions/workflows/ci.yml)

Sitio estático (HTML, CSS y JavaScript puro, sin framework ni build step) con mi
portafolio profesional: sobre mí, stack técnico, proyectos personales, experiencia y contacto.

Disponible en [portafolio-web-theta-coral.vercel.app](https://portafolio-web-theta-coral.vercel.app).

## Características

- **Soporte bilingüe ES/EN**: toggle de idioma que traduce todo el contenido del
  sitio (secciones, proyectos, experiencia) sin recargar la página
- **Rendimiento optimizado**: puntaje Lighthouse mejorado de 55 a 91 mediante
  optimización de assets, carga diferida y reducción de bloqueos de renderizado
- **Sección Personal**: espacio dedicado a intereses y contexto más allá de lo
  estrictamente profesional
- **Tests automatizados con Playwright**: smoke tests que verifican navegación,
  toggle de idioma y renderizado correcto de las secciones principales
- Diseño responsive, sin dependencias externas de framework

## Stack técnico

- **HTML / CSS / JavaScript** puro — sin framework, sin build step
- **i18n** implementado a mano (sin librería externa) para el toggle ES/EN
- **Playwright** — suite de smoke tests end-to-end
- **GitHub Actions** — CI que corre los tests automáticamente en cada push
- **Vercel** — deploy sin configuración adicional

## Correr localmente

No requiere instalación de dependencias. Basta con servir la carpeta con cualquier
servidor estático, por ejemplo:

```bash
python -m http.server 8000
```

Luego abrir [http://localhost:8000](http://localhost:8000).

También se puede abrir `index.html` directamente en el navegador, aunque algunas
funciones (como fuentes o rutas relativas) se comportan mejor servidas por HTTP.

## Testing

Para correr la suite de Playwright localmente:

```bash
npm install
npx playwright test
```

Cada push corre estos tests automáticamente vía GitHub Actions
(`.github/workflows/ci.yml`).

## Deploy

Pensado para desplegarse en [Vercel](https://vercel.com) sin configuración adicional:
`index.html` está en la raíz del proyecto y no hay paso de build.

## Autor

Sofía Menzel — [GitHub](https://github.com/Soofiaa) ·
[LinkedIn](https://linkedin.com/in/sofia-menzel-madrid)
