// Resalta el link de navegación de la sección visible
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.site-header nav a');

const setActive = (id) => {
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
  });
};

if ('IntersectionObserver' in window && sections.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Toggle manual de modo claro/oscuro, con persistencia
const THEME_KEY = 'theme-preference';
const themeToggle = document.getElementById('theme-toggle');
const darkSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

const isEffectivelyDark = () => {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark') return true;
  if (stored === 'light') return false;
  return darkSchemeQuery.matches;
};

const updateToggleUI = () => {
  const dark = isEffectivelyDark();
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
};

if (themeToggle) {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') {
    document.documentElement.setAttribute('data-theme', stored);
  }
  updateToggleUI();

  themeToggle.addEventListener('click', () => {
    const next = isEffectivelyDark() ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
    updateToggleUI();
  });

  darkSchemeQuery.addEventListener('change', () => {
    if (!localStorage.getItem(THEME_KEY)) updateToggleUI();
  });
}

// Revela secciones y "dibuja" la columna de proceso a medida que entran en pantalla
const revealTargets = document.querySelectorAll('.hero, .section');
if ('IntersectionObserver' in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

  revealTargets.forEach(target => revealObserver.observe(target));
} else {
  revealTargets.forEach(target => target.classList.add('in-view'));
}

// Inclinación sutil de las tarjetas de proyecto según la posición del cursor
if (!prefersReducedMotion) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
