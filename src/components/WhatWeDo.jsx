import { scrollTo } from '../utils/scrollTo';

const LEDIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" width="28" height="28">
    <rect x="2" y="4" width="20" height="14" rx="2" stroke="rgba(255,255,255,0.5)"/>
    <circle cx="7"  cy="11" r="1.5" fill="#ADD034"/>
    <circle cx="12" cy="11" r="1.5" fill="#ADD034" opacity="0.7"/>
    <circle cx="17" cy="11" r="1.5" fill="#ADD034" opacity="0.9"/>
    <line x1="2" y1="8" x2="22" y2="8" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
    <path d="M8 20h8" stroke="rgba(255,255,255,0.3)" strokeLinecap="round"/>
  </svg>
);

const StudioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" width="28" height="28">
    <circle cx="12" cy="12" r="3.5" fill="rgba(173,208,52,0.2)" stroke="#ADD034"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
      stroke="rgba(255,255,255,0.5)" strokeLinecap="round"/>
  </svg>
);

const ScenoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" width="28" height="28">
    <path d="M2 20h20" stroke="rgba(255,255,255,0.4)" strokeLinecap="round"/>
    <path d="M5 20V9l7-6 7 6v11" stroke="rgba(255,255,255,0.4)" strokeLinejoin="round"/>
    <rect x="9" y="12" width="6" height="8" rx="1" fill="rgba(173,208,52,0.2)" stroke="#ADD034"/>
  </svg>
);

const SpecsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" width="28" height="28">
    <rect x="7" y="7" width="10" height="10" rx="1" fill="rgba(173,208,52,0.15)" stroke="#ADD034"/>
    <circle cx="12" cy="12" r="2" fill="#ADD034"/>
    <path d="M7 9H4M7 15H4M17 9h3M17 15h3M9 7V4M15 7V4M9 17v3M15 17v3"
      stroke="rgba(255,255,255,0.35)" strokeLinecap="round"/>
  </svg>
);

const PortfolioIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" width="28" height="28">
    <rect x="2"  y="2"  width="9" height="9" rx="1.5" fill="rgba(173,208,52,0.15)" stroke="#ADD034"/>
    <rect x="13" y="2"  width="9" height="9" rx="1.5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)"/>
    <rect x="2"  y="13" width="9" height="9" rx="1.5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)"/>
    <rect x="13" y="13" width="9" height="9" rx="1.5" fill="rgba(173,208,52,0.08)" stroke="#ADD034" opacity="0.6"/>
  </svg>
);

const AboutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" width="28" height="28">
    <circle cx="12" cy="8" r="3.5" stroke="rgba(255,255,255,0.5)"/>
    <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#ADD034" strokeLinecap="round"/>
  </svg>
);

export default function WhatWeDo({ t }) {
  const items = [
    {
      num: '01', target: 'services',
      label: t.led_h3,
      sub: `${t.tag_fairs} · ${t.tag_concerts}`,
      Icon: LEDIcon,
    },
    {
      num: '02', target: 'studio',
      label: t.studio_h3_card,
      sub: t.tag_vp,
      Icon: StudioIcon,
    },
    {
      num: '03', target: 'services',
      label: t.sceno_h3_card,
      sub: `${t.tag_sceno1} · ${t.tag_sceno4}`,
      Icon: ScenoIcon,
    },
    {
      num: '04', target: 'specs',
      label: t.specs_h2,
      sub: 'P1.9 · P3.9',
      Icon: SpecsIcon,
    },
    {
      num: '05', target: 'portfolio',
      label: t.portfolio_h2,
      sub: t.portfolio_eyebrow,
      Icon: PortfolioIcon,
    },
    {
      num: '06', target: 'about',
      label: t.about_eyebrow,
      sub: '25+ lat',
      Icon: AboutIcon,
    },
  ];

  return (
    <section id="what-we-do" className="wwd-section" aria-label={t.aria_nav_sections || "Nawigacja po sekcjach"}>
      {/* Animated light beams sweeping across the section */}
      <div className="wwd-beams" aria-hidden="true">
        <div className="wwd-beam" style={{ '--b-delay': '0s',  '--b-dur': '9s'  }} />
        <div className="wwd-beam" style={{ '--b-delay': '3.5s','--b-dur': '12s' }} />
        <div className="wwd-beam" style={{ '--b-delay': '7s',  '--b-dur': '10s' }} />
      </div>

      <div className="container">
        <div className="wwd-grid">
          {items.map((item, i) => (
            <button
              key={i}
              className="wwd-card reveal"
              style={{ transitionDelay: `${i * 0.07}s` }}
              onClick={() => scrollTo(item.target)}
              aria-label={`${t.aria_go_to || "Przejdź do: "}${item.label}`}
            >
              {/* Per-card hover beam */}
              <div className="wwd-card-beam" aria-hidden="true" />

              <span className="wwd-num">{item.num}</span>
              <div className="wwd-icon-wrap">
                <item.Icon />
              </div>
              <span className="wwd-label">{item.label}</span>
              <span className="wwd-sub">{item.sub}</span>
              <span className="wwd-arrow" aria-hidden="true">
                <svg viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1 5h12M8 1l4 4-4 4"/>
                </svg>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
