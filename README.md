# Portafolio — Sofía Menzel

Sitio estático (HTML, CSS y JavaScript puro, sin framework ni build step) con mi
portafolio profesional: sobre mí, stack técnico, proyectos personales, experiencia y contacto.

## Correr localmente

No requiere instalación de dependencias. Basta con servir la carpeta con cualquier
servidor estático, por ejemplo:

```bash
python -m http.server 8000
```

Luego abrir [http://localhost:8000](http://localhost:8000).

También se puede abrir `index.html` directamente en el navegador, aunque algunas
funciones (como fuentes o rutas relativas) se comportan mejor servidas por HTTP.

## Deploy

Pensado para desplegarse en [Vercel](https://vercel.com) sin configuración adicional:
`index.html` está en la raíz del proyecto y no hay paso de build.
