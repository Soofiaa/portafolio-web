// Sistema de traducción ES/EN — carga i18n/es.json e i18n/en.json,
// aplica el idioma activo a [data-i18n] / [data-i18n-html], meta tags y <html lang>.
(function () {
  const STORAGE_KEY = 'lang-preference';
  const DEFAULT_LANG = 'es';
  let translations = null;

  function getNested(obj, path) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
  }

  function applyLang(lang) {
    const dict = translations && translations[lang];
    if (!dict) return;

    document.documentElement.lang = lang;
    document.documentElement.removeAttribute('data-lang-loading');

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = getNested(dict, el.getAttribute('data-i18n'));
      if (typeof value === 'string') el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const value = getNested(dict, el.getAttribute('data-i18n-html'));
      if (typeof value === 'string') el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = getNested(dict, el.getAttribute('data-i18n-placeholder'));
      if (typeof value === 'string') el.setAttribute('placeholder', value);
    });

    if (dict.meta) {
      document.title = dict.meta.title;
      const setMetaContent = (selector, value) => {
        const el = document.querySelector(selector);
        if (el && typeof value === 'string') el.setAttribute('content', value);
      };
      setMetaContent('meta[name="description"]', dict.meta.description);
      setMetaContent('meta[property="og:title"]', dict.meta.title);
      setMetaContent('meta[property="og:description"]', dict.meta.description);
    }

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
  }

  function initLangToggle() {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        localStorage.setItem(STORAGE_KEY, lang);
        applyLang(lang);
      });
    });
  }

  Promise.all([
    fetch('i18n/es.json').then((r) => r.json()),
    fetch('i18n/en.json').then((r) => r.json()),
  ])
    .then(([es, en]) => {
      translations = { es, en };
      const stored = localStorage.getItem(STORAGE_KEY);
      const initialLang = stored === 'en' || stored === 'es' ? stored : DEFAULT_LANG;
      initLangToggle();
      applyLang(initialLang);
    })
    .catch((err) => {
      console.error('No se pudieron cargar las traducciones:', err);
      document.documentElement.removeAttribute('data-lang-loading');
    });
})();
