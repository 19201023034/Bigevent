import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCMS } from './hooks/useCMS';
import Nav from './components/Nav';
import CookieBanner from './components/CookieBanner';
import Footer from './components/Footer';
import Impressum from './components/Impressum';
import AdminPanel from './components/AdminPanel';

// Pages
import Home from './pages/Home';
import Rental from './pages/Rental';
import Studio from './pages/Studio';
import Article from './pages/Article';

function NotFound({ lang }) {
  const prefix = lang === 'pl' ? '' : `/${lang}`;
  const msgs = { pl: ['Strona nie istnieje', 'Wróć na stronę główną'], en: ['Page not found', 'Back to homepage'], de: ['Seite nicht gefunden', 'Zur Startseite'] };
  const [title, btn] = msgs[lang] ?? msgs.pl;
  return (
    <div style={{ textAlign: 'center', padding: '160px 20px 100px', color: 'var(--txt)', fontFamily: 'var(--font-body)' }}>
      <p style={{ fontFamily: 'var(--font-head)', fontSize: '7rem', fontWeight: 800, color: 'var(--lime)', margin: 0, lineHeight: 1 }}>404</p>
      <p style={{ color: '#888', marginBottom: '2.5rem', fontSize: '1.1rem' }}>{title}</p>
      <a href={prefix || '/'} style={{ padding: '12px 32px', background: 'var(--lime)', color: '#000', borderRadius: '40px', fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '14px', textDecoration: 'none', letterSpacing: '0.05em' }}>{btn}</a>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}

// Derive language from pathname — no useState needed
function getLangFromPath(path) {
  const parts = path.split('/');
  if (parts[1] === 'en') return 'en';
  if (parts[1] === 'de') return 'de';
  return 'pl';
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // lang is derived purely from the URL — no state required
  const lang = getLangFromPath(location.pathname);

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const [adminOpen, setAdminOpen] = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLangChange = (newLang) => {
    const currentPath = location.pathname;

    // Strip existing language prefix
    let cleanPath = currentPath;
    if (currentPath.startsWith('/en')) {
      cleanPath = currentPath.substring(3);
    } else if (currentPath.startsWith('/de')) {
      cleanPath = currentPath.substring(3);
    }

    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }

    let newPath;
    if (newLang === 'en') {
      newPath = '/en' + (cleanPath === '/' ? '' : cleanPath);
    } else if (newLang === 'de') {
      newPath = '/de' + (cleanPath === '/' ? '' : cleanPath);
    } else {
      newPath = cleanPath;
    }

    newPath = newPath.replace(/\/+/g, '/');
    if (newPath === '') newPath = '/';
    if (location.search) newPath += location.search;
    if (location.hash)   newPath += location.hash;

    localStorage.setItem('lang_pref', newLang);
    navigate(newPath);
  };

  // Auto-detect browser language on very first visit (no stored preference)
  useEffect(() => {
    if (localStorage.getItem('lang_pref')) return;
    if (location.pathname !== '/') return;

    const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    let target = 'pl';
    if (browserLang.startsWith('de')) target = 'de';
    else if (!browserLang.startsWith('pl')) target = 'en';

    localStorage.setItem('lang_pref', target);
    if (target !== 'pl') navigate(`/${target}`, { replace: true });
  }, []);

  const { t, overrides, saveField, resetContent, images, saveImage } = useCMS(lang);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const meta = useMemo(() => ({
    pl: {
      lang: 'pl',
      title: 'BigEvent — Wynajem ekranów LED & Studio filmowe | Aachen',
      description: 'BigEvent: wynajem ekranów LED (P1.9–P3.9) na targi, konferencje i eventy + własne studio wirtualnej produkcji 4K. Szybka wycena, transport, montaż. Aachen / Niemcy.',
    },
    en: {
      lang: 'en',
      title: 'BigEvent — LED Screen Rental & Virtual Production Studio | Aachen',
      description: 'BigEvent: LED screen rental (P1.9–P3.9) for trade fairs, conferences and events + in-house 4K virtual production studio. Fast quote, transport, installation. Aachen, Germany.',
    },
    de: {
      lang: 'de',
      title: 'BigEvent — LED-Screen-Verleih & Virtuelle Produktion | Aachen',
      description: 'BigEvent: LED-Screen-Verleih (P1.9–P3.9) für Messen, Konferenzen und Events + eigenes 4K Virtual-Production-Studio. Schnelles Angebot, Transport, Montage. Aachen.',
    },
  }), []);

  // Sync html lang attribute directly from derived lang — no setState in effect
  useEffect(() => {
    document.documentElement.lang = meta[lang]?.lang ?? 'pl';
  }, [lang, meta]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
      return () => observer.disconnect();
    }, 100);
    return () => clearTimeout(timeout);
  }, [lang, location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && e.shiftKey && e.key === 'A') setAdminOpen(o => !o);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const currentMeta = meta[lang] ?? meta.pl;

  return (
    <>
      <ScrollToTop />
      <Helmet>
        <html lang={lang} />
        <title>{currentMeta.title}</title>
        <meta name="description" content={currentMeta.description} />
        {(location.pathname === '/' || location.pathname === '/en' || location.pathname === '/de') && (
          <link rel="canonical" href={`https://bigevent.de${lang === 'pl' ? '' : `/${lang}`}/`} />
        )}
      </Helmet>

      {adminOpen && (
        <AdminPanel
          t={t}
          overrides={overrides}
          lang={lang}
          onSaveField={saveField}
          onReset={resetContent}
          images={images}
          onSaveImage={saveImage}
          onClose={() => setAdminOpen(false)}
        />
      )}

      <CookieBanner t={t} />
      <Nav lang={lang} setLang={handleLangChange} theme={theme} toggleTheme={toggleTheme} t={t} />

      <Routes>
        {/* PL Routes (default) */}
        <Route path="/" element={<Home t={t} images={images} lang={lang} />} />
        <Route path="/wynajem-ekranow-led" element={<Rental t={t} lang={lang} />} />
        <Route path="/studio-wirtualnej-produkcji" element={<Studio t={t} images={images} lang={lang} />} />
        <Route path="/blog/:slug" element={<Article lang={lang} />} />
        <Route path="/impressum" element={<Impressum onClose={() => window.history.back()} />} />

        {/* EN Routes */}
        <Route path="/en" element={<Home t={t} images={images} lang={lang} />} />
        <Route path="/en/wynajem-ekranow-led" element={<Rental t={t} lang={lang} />} />
        <Route path="/en/studio-wirtualnej-produkcji" element={<Studio t={t} images={images} lang={lang} />} />
        <Route path="/en/blog/:slug" element={<Article lang={lang} />} />
        <Route path="/en/impressum" element={<Impressum onClose={() => window.history.back()} />} />

        {/* DE Routes */}
        <Route path="/de" element={<Home t={t} images={images} lang={lang} />} />
        <Route path="/de/wynajem-ekranow-led" element={<Rental t={t} lang={lang} />} />
        <Route path="/de/studio-wirtualnej-produkcji" element={<Studio t={t} images={images} lang={lang} />} />
        <Route path="/de/blog/:slug" element={<Article lang={lang} />} />
        <Route path="/de/impressum" element={<Impressum onClose={() => window.history.back()} />} />

        {/* 404 */}
        <Route path="*" element={<NotFound lang={lang} />} />
      </Routes>

      <Footer t={t} setLang={handleLangChange} lang={lang} theme={theme} />

      {/* Back to top */}
      <button
        className={`back-to-top${scrolled ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Wróć na górę"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>

      {/* Hidden admin trigger button (bottom-right) */}
      <button
        className="admin-trigger"
        onClick={() => setAdminOpen(o => !o)}
        title="Admin panel (Alt+Shift+A)"
        aria-label="Otwórz panel admina"
      >
        ⚙
      </button>
    </>
  );
}
