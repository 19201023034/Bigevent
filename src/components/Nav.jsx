import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BigEventLogo = ({ theme }) => (
  <img
    src={theme === 'light' ? '/be_pictureswhite.png' : '/be_picturesblack.png'}
    alt="BigEvent pictures"
    className="nav-logo-img"
    style={{ height: 'var(--logo-h)', width: 'auto', display: 'block', transition: 'opacity 0.2s' }}
  />
);

const SECTION_IDS = ['services', 'portfolio', 'blog', 'testimonials', 'about', 'contact'];

export default function Nav({ lang, setLang, theme, toggleTheme, t }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const [activeId,   setActiveId]   = useState('');
  const observerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver to track which section is in view (only on homepage)
  useEffect(() => {
    if (!['/', '/en', '/de'].includes(location.pathname)) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) observerRef.current.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [location.pathname]);

  const prefix = lang === 'pl' ? '' : `/${lang}`;
  const links = [
    { id: 'services',       label: t.nav_services,     path: `${prefix}/#services` },
    { id: 'studio',         label: t.nav_studio,       path: `${prefix}/#studio` },
    { id: 'led-calculator', label: t.nav_calc,         path: `${prefix}/#led-calculator` },
    { id: 'portfolio',      label: t.nav_portfolio,    path: `${prefix}/#portfolio` },
    { id: 'blog',           label: t.nav_blog,         path: `${prefix}/#blog` },
    { id: 'testimonials',   label: t.nav_testimonials, path: `${prefix}/#testimonials` },
    { id: 'about',          label: t.nav_about,        path: `${prefix}/#about` },
    { id: 'contact',        label: t.nav_contact,      path: `${prefix}/#contact` },
  ];

  return (
    <>
      <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
        <Link className="nav-logo" to={prefix || '/'} aria-label="BigEvent home">
          <BigEventLogo theme={theme} />
        </Link>

        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}>
              <Link
                to={l.path}
                className={(activeId === l.id || location.pathname === l.path) ? 'active' : ''}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <div className="lang-switcher">
            {['pl', 'en', 'de'].map(l => (
              <button key={l} className={`lang-btn${lang === l ? ' active' : ''}`}
                onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
          </button>
          <Link className="btn-cta-nav" style={{ textDecoration: 'none' }} to={`${prefix}/#contact`}>{t.nav_cta}</Link>
          <button
            className={`hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
          >
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}${scrolled ? ' scrolled' : ''}`}>
        {links.map(l => (
          <Link key={l.id} to={l.path}
            className={(activeId === l.id || location.pathname === l.path) ? 'active' : ''}
            onClick={() => setMobileOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link
          to={`${prefix}/#contact`}
          onClick={() => setMobileOpen(false)}
          style={{
            display: 'block', textAlign: 'center', padding: '13px 24px',
            background: 'var(--lime)', color: '#000', borderRadius: '40px',
            fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '14px',
            letterSpacing: '0.04em', textDecoration: 'none', marginTop: '0.4rem',
          }}
        >
          {t.nav_cta}
        </Link>

        <div className="mobile-menu-footer">
          <div className="mobile-lang-switcher">
            {['pl', 'en', 'de'].map(l => (
              <button key={l} className={`lang-btn${lang === l ? ' active' : ''}`}
                onClick={() => { setLang(l); setMobileOpen(false); }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="theme-toggle" onClick={() => { toggleTheme(); setMobileOpen(false); }} aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
