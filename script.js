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

const THEME_TOGGLE_LABELS = {
  es: { toDark: 'Cambiar a modo oscuro', toLight: 'Cambiar a modo claro' },
  en: { toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
};

const updateToggleUI = () => {
  const dark = isEffectivelyDark();
  const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? THEME_TOGGLE_LABELS[lang].toLight : THEME_TOGGLE_LABELS[lang].toDark);
};

if (themeToggle) {
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

  // El idioma activo cambia el aria-label del toggle de tema
  document.addEventListener('i18n:changed', updateToggleUI);
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

// Parallax sutil de los nodos de la columna de proceso según el scroll
if (!prefersReducedMotion && sections.length) {
  const parallaxItems = Array.from(sections)
    .map(section => ({ section, node: section.querySelector('.node') }))
    .filter(item => item.node);

  const PARALLAX_RANGE = 18;
  let ticking = false;

  const updateParallax = () => {
    const vh = window.innerHeight;
    parallaxItems.forEach(({ section, node }) => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      const offset = (progress - 0.5) * PARALLAX_RANGE * 2;
      node.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
    });
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateParallax();
}

// Envío del formulario de contacto vía fetch (Formspree), con fallback nativo sin JS
const CONTACT_FORM_LABELS = {
  es: {
    sending: 'Enviando...',
    success: '> ¡Gracias! Tu mensaje fue enviado, te responderé pronto.',
    error: '> Algo salió mal. Intenta de nuevo o escríbeme directo a soofiaa.menzel@gmail.com.',
  },
  en: {
    sending: 'Sending...',
    success: "> Thanks! Your message was sent, I'll get back to you soon.",
    error: '> Something went wrong. Please try again or email me directly at soofiaa.menzel@gmail.com.',
  },
};

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const statusEl = document.getElementById('form-status');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
    const labels = CONTACT_FORM_LABELS[lang];

    statusEl.textContent = labels.sending;
    statusEl.classList.remove('form-status-success', 'form-status-error');
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        statusEl.textContent = labels.success;
        statusEl.classList.add('form-status-success');
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      statusEl.textContent = labels.error;
      statusEl.classList.add('form-status-error');
    } finally {
      submitBtn.disabled = false;
    }
  });
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

// Fachada del embed de Spotify: el iframe real solo se inserta al hacer clic
function initSpotifyFacade() {
  const facade = document.getElementById('spotify-facade');
  if (!facade) return;
  facade.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = facade.dataset.embedSrc;
    iframe.width = '100%';
    iframe.height = '152';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.title = facade.dataset.embedTitle;
    const wrapper = document.createElement('div');
    wrapper.className = 'spotify-embed';
    wrapper.setAttribute('tabindex', '-1');
    wrapper.appendChild(iframe);
    facade.replaceWith(wrapper);
    wrapper.focus();
  });
}
initSpotifyFacade();
