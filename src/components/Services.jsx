import { scrollTo } from '../utils/scrollTo';

const LED_OPACITIES = [
  0.9,0.4,0.85,0.15,0.95,0.3,0.7,0.5,0.8,0.25,0.6,0.9,0.4,0.75,0.2,0.85,
  0.5,0.95,0.3,0.7,0.4,0.8,0.15,0.9,0.6,0.35,0.85,0.5,0.7,0.25,0.9,0.6,
  0.8,0.4,0.95,0.2,0.7,0.55,0.85,0.3,0.6,0.9,0.45,0.75,0.15,0.8,0.5,0.95,
];

function LedVisual() {
  return (
    <div className="led-visual">
      {LED_OPACITIES.map((o, i) => (
        <div key={i} className="led-dot" style={{ '--o': o }} />
      ))}
    </div>
  );
}

function StudioVisual() {
  return (
    <div className="studio-visual">
      <svg viewBox="0 0 340 192" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
        <rect width="340" height="192" fill="#050508"/>
        <rect x="20" y="15" width="300" height="120" rx="4" fill="#0A0A10"/>
        <g opacity="0.6">
          {[22,38,54,70,86,102,118,134,150,166,182,198,214,230,246,262,278,294].map((x,i)=>(
            <rect key={i} x={x} y="17" width="14" height="10" rx="1" fill="#ADD034" opacity={[0.8,0.5,0.9,0.6,0.7,0.4,0.8,0.12,0.6,0.9,0.5,0.7,0.6,0.8,0.4,0.9,0.5,0.7][i]}/>
          ))}
          {[22,38,54,70,86,102,118,134,150,166,182,198,214,230,246,262,278,294].map((x,i)=>(
            <rect key={i} x={x} y="29" width="14" height="10" rx="1" fill="#ADD034" opacity={[0.5,0.8,0.6,0.4,0.1,0.9,0.7,0.5,0.6,0.12,0.8,0.4,0.7,0.9,0.6,0.5,0.7,0.8][i]}/>
          ))}
          {[41,53,65,77,89,101,113].map((y,i)=>(
            <rect key={i} x="22" y={y} width="286" height="10" rx="1" fill="#ADD034" opacity={[0.07,0.05,0.04,0.03,0.03,0.02,0.02][i]}/>
          ))}
        </g>
        <text x="170" y="82" textAnchor="middle" fontSize="11" fill="#ADD034" opacity="0.22" fontFamily="Syne,sans-serif" fontWeight="700" letterSpacing="4">VIRTUAL ENVIRONMENT</text>
        <rect x="20" y="15" width="300" height="120" rx="4" fill="none" stroke="#ADD034" strokeWidth="0.5" opacity="0.3"/>
        <rect x="20" y="140" width="300" height="8" rx="2" fill="#ADD034" opacity="0.06" stroke="#ADD034" strokeWidth="0.5" strokeOpacity="0.15"/>
        <rect x="136" y="155" width="68" height="32" rx="4" fill="#1A1A1A" stroke="#333" strokeWidth="0.7"/>
        <circle cx="170" cy="171" r="11" fill="#111" stroke="#444" strokeWidth="0.7"/>
        <circle cx="170" cy="171" r="7" fill="#0A0A0A" stroke="#333" strokeWidth="0.5"/>
        <circle cx="170" cy="171" r="3" fill="#050505"/>
        <circle cx="170" cy="171" r="11" fill="none" stroke="#ADD034" strokeWidth="0.4" opacity="0.3"/>
        <line x1="170" y1="187" x2="155" y2="192" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="170" y1="187" x2="170" y2="192" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="170" y1="187" x2="185" y2="192" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

function ScenoVisual() {
  return (
    <div className="studio-visual" style={{ background: '#0A0A0A' }}>
       <svg viewBox="0 0 340 192" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
        <g stroke="#ADD034" strokeWidth="1" opacity="0.3">
            {[40, 100, 160, 220, 280].map(x => (
                <g key={x}>
                    <line x1={x} y1="30" x2={x} y2="170" />
                    <line x1={x+20} y1="30" x2={x+20} y2="170" />
                    <path d={`M ${x} 50 L ${x+20} 70 M ${x} 70 L ${x+20} 50 M ${x} 110 L ${x+20} 130 M ${x} 130 L ${x+20} 110`} strokeWidth="0.5"/>
                </g>
            ))}
            <line x1="20" y1="170" x2="320" y2="170" strokeWidth="2" opacity="0.6"/>
            <line x1="20" y1="30" x2="320" y2="30" strokeWidth="2" opacity="0.6"/>
        </g>
        <rect x="110" y="60" width="120" height="80" rx="2" fill="#141414" stroke="#ADD034" strokeWidth="0.5" opacity="0.8"/>
        <text x="170" y="105" textAnchor="middle" fontSize="12" fill="#ADD034" opacity="0.7" fontFamily="var(--font-head)" fontWeight="500" letterSpacing="1">SCENOGRAPHY</text>
       </svg>
    </div>
  );
}

const ArrowIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="#ADD034" strokeWidth="1.5" strokeLinecap="round">
    <path d="M2 7h10M8 3l4 4-4 4"/>
  </svg>
);

export default function Services({ t }) {

  return (
    <section id="services">
      <div className="container">
        <div className="services-header reveal">
          <div>
            <p className="eyebrow">{t.services_eyebrow}</p>
            <h2 className="section-title">{t.services_h2}</h2>
          </div>
          <p>{t.services_sub}</p>
        </div>
        <div className="services-grid">

          {/* 01 — Studio Card → #studio */}
          <div className="service-card reveal reveal-d1">
            <div className="service-number">01</div>
            <div className="service-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3.5" fill="rgba(173,208,52,0.2)" stroke="#ADD034"/>
                <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" stroke="rgba(255,255,255,0.6)" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>{t.studio_h3_card}</h3>
            <p>{t.studio_p_card}</p>
            <StudioVisual />
            <div className="service-tags">
              {[t.tag_vp, t.tag_ads, t.tag_music, t.tag_daily].map((tag, i) => (
                <span key={i} className="tag-pill">{tag}</span>
              ))}
            </div>
            <div className="service-card-links">
              <a className="service-link service-link-primary" href="#studio"
                onClick={e => { e.preventDefault(); scrollTo('studio'); }}>
                <span>{t.studio_eyebrow || 'Studio'}</span>
                <ArrowIcon />
              </a>
              <a className="service-link service-link-secondary" href="#contact"
                onClick={e => { e.preventDefault(); scrollTo('contact'); }}>
                <span>{t.service_link}</span>
              </a>
            </div>
          </div>

          {/* 02 — LED Card → #specs */}
          <div className="service-card reveal reveal-d2">
            <div className="service-number">02</div>
            <div className="service-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="14" rx="2" stroke="rgba(255,255,255,0.7)"/>
                <circle cx="12" cy="11" r="2.5" fill="rgba(173,208,52,0.2)" stroke="#ADD034"/>
                <line x1="2" y1="8" x2="22" y2="8" stroke="rgba(255,255,255,0.15)"/>
                <line x1="2" y1="14" x2="22" y2="14" stroke="rgba(255,255,255,0.15)"/>
                <path d="M8 22h8M12 18v4" stroke="rgba(255,255,255,0.5)" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>{t.led_h3}</h3>
            <p>{t.led_p}</p>
            <LedVisual />
            <div className="service-tags">
              {[t.tag_fairs, t.tag_conf, t.tag_concerts, t.tag_outdoor, t.tag_indoor].map((tag, i) => (
                <span key={i} className="tag-pill">{tag}</span>
              ))}
            </div>
            <div className="service-card-links">
              <a className="service-link service-link-primary" href="#specs"
                onClick={e => { e.preventDefault(); scrollTo('specs'); }}>
                <span>{t.specs_eyebrow || 'Parametry LED'}</span>
                <ArrowIcon />
              </a>
              <a className="service-link service-link-secondary" href="#contact"
                onClick={e => { e.preventDefault(); scrollTo('contact'); }}>
                <span>{t.service_link}</span>
              </a>
            </div>
          </div>

          {/* 03 — Scenography Card → #portfolio */}
          <div className="service-card reveal reveal-d3">
            <div className="service-number">03</div>
            <div className="service-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <path d="M3 21L21 3 M3 3L21 21" stroke="rgba(255,255,255,0.15)" strokeLinecap="round"/>
                <rect x="5" y="5" width="14" height="14" rx="2" stroke="#ADD034" fill="rgba(173,208,52,0.1)"/>
                <circle cx="12" cy="12" r="2" fill="#ADD034"/>
              </svg>
            </div>
            <h3>{t.sceno_h3_card}</h3>
            <p>{t.sceno_p_card}</p>
            <ScenoVisual />
            <div className="service-tags">
              {[t.tag_sceno1, t.tag_sceno2, t.tag_sceno3, t.tag_sceno4].map((tag, i) => (
                <span key={i} className="tag-pill">{tag}</span>
              ))}
            </div>
            <div className="service-card-links">
              <a className="service-link service-link-primary" href="#portfolio"
                onClick={e => { e.preventDefault(); scrollTo('portfolio'); }}>
                <span>{t.portfolio_eyebrow || 'Realizacje'}</span>
                <ArrowIcon />
              </a>
              <a className="service-link service-link-secondary" href="#contact"
                onClick={e => { e.preventDefault(); scrollTo('contact'); }}>
                <span>{t.service_link}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
