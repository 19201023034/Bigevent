import { useState, useEffect } from 'react';
import { useCMS } from './hooks/useCMS';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Services from './components/Services';
import Studio from './components/Studio';
import Specs from './components/Specs';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import Impressum from './components/Impressum';
import AdminPanel from './components/AdminPanel';
import Testimonials from './components/Testimonials';


export default function App() {
  const [lang,          setLang]          = useState('pl');
  const [theme,         setTheme]         = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    // First visit: follow OS preference
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  const [showImpressum, setShowImpressum] = useState(false);
  const [adminOpen,     setAdminOpen]     = useState(false);
  const [scrolled,      setScrolled]      = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { t, overrides, saveField, resetContent, images, saveImage } = useCMS(lang);

  // Apply theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll-reveal observer — disconnect fully before re-querying on lang change
  // to prevent elements being observed twice across re-runs
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  // Keyboard shortcut: Alt+Shift+A → open admin
  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && e.shiftKey && e.key === 'A') setAdminOpen(o => !o);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <>
{showImpressum && <Impressum onClose={() => setShowImpressum(false)} />}

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
      <Nav lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} t={t} />
      <Hero t={t} />
      <Services t={t} images={images} />
      <Studio t={t} images={images} />
      <Specs t={t} />
      <Portfolio t={t} images={images} />
      <Blog t={t} lang={lang} />
      <Testimonials t={t} images={images} />
      <About t={t} images={images} />
      <Contact t={t} />
      <Footer t={t} setLang={setLang} onImpressum={() => setShowImpressum(true)} />

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
