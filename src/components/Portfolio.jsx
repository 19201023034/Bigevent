function PortfolioP1() {
  return (
    <svg viewBox="0 0 600 265" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}} aria-hidden="true">
      <rect width="600" height="265" fill="#040405"/>
      <rect x="20" y="20" width="560" height="200" rx="4" fill="#060608"/>
      <defs><radialGradient id="c_glow" cx="50%" cy="50%" r="55%"><stop offset="0%" stopColor="#ADD034" stopOpacity="0.14"/><stop offset="100%" stopColor="#ADD034" stopOpacity="0"/></radialGradient></defs>
      <g fill="#ADD034">
        {[22,36,50,64,78,92,106,120,134,148,162,176,190,204,218,232,246,260,274,288,302,316,330,344,358,372,386,400,414,428,442,456,470,484,498,512,526,540,554].map((x,i)=>(
          <rect key={i} x={x} y="22" width="12" height="9" rx="1" opacity={(Math.sin(i*0.9+1)*0.3+0.6).toFixed(2)}/>
        ))}
        <rect x="22" y="33" width="546" height="9" rx="1" opacity="0.05"/>
        <rect x="22" y="44" width="546" height="9" rx="1" opacity="0.04"/>
        <rect x="22" y="55" width="546" height="9" rx="1" opacity="0.03"/>
      </g>
      <rect x="20" y="20" width="560" height="200" rx="4" fill="url(#c_glow)"/>
      <text x="300" y="130" textAnchor="middle" fontSize="22" fill="#ADD034" opacity="0.12" fontFamily="Syne,sans-serif" fontWeight="800" letterSpacing="8">10 × 10 m</text>
      <rect x="20" y="20" width="560" height="200" rx="4" fill="none" stroke="#ADD034" strokeWidth="0.6" opacity="0.2"/>
    </svg>
  );
}

function PortfolioP2() {
  return (
    <svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
      <rect width="260" height="200" fill="#040406"/>
      <rect x="15" y="15" width="230" height="130" rx="3" fill="#060610"/>
      <defs><radialGradient id="s_glow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ADD034" stopOpacity="0.2"/><stop offset="100%" stopColor="#ADD034" stopOpacity="0"/></radialGradient></defs>
      <rect x="15" y="15" width="230" height="130" rx="3" fill="url(#s_glow)"/>
      <text x="130" y="90" textAnchor="middle" fontSize="11" fill="#ADD034" opacity="0.2" fontFamily="Syne,sans-serif" fontWeight="700" letterSpacing="3">VIRTUAL BG</text>
      <rect x="15" y="15" width="230" height="130" rx="3" fill="none" stroke="#ADD034" strokeWidth="0.5" opacity="0.2"/>
      <rect x="100" y="158" width="60" height="28" rx="3" fill="#111" stroke="#222" strokeWidth="0.7"/>
      <circle cx="130" cy="172" r="9" fill="#0A0A0A" stroke="#ADD034" strokeWidth="0.5" opacity="0.5"/>
      <circle cx="130" cy="172" r="4" fill="#050505"/>
      <line x1="130" y1="186" x2="118" y2="198" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="130" y1="186" x2="130" y2="200" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="130" y1="186" x2="142" y2="198" stroke="#222" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function PortfolioP3() {
  return (
    <svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
      <rect width="260" height="200" fill="#040404"/>
      <rect x="20" y="20" width="220" height="140" rx="3" fill="#070706"/>
      <rect x="20" y="20" width="220" height="4" rx="1" fill="#ADD034" opacity="0.5"/>
      <rect x="20" y="156" width="220" height="4" rx="1" fill="#ADD034" opacity="0.35"/>
      <rect x="20" y="22" width="4" height="136" rx="1" fill="#ADD034" opacity="0.3"/>
      <rect x="236" y="22" width="4" height="136" rx="1" fill="#ADD034" opacity="0.3"/>
      <g fill="#333" opacity="0.6">
        {[50,65,80,95,110,125,140,155,170,185,200].map((cx,i)=>(
          <circle key={i} cx={cx} cy="170" r="3"/>
        ))}
      </g>
      <text x="130" y="100" textAnchor="middle" fontSize="10" fill="#ADD034" opacity="0.18" fontFamily="Syne,sans-serif" fontWeight="700" letterSpacing="2">CONCERT STAGE</text>
    </svg>
  );
}

function PortfolioP4() {
  return (
    <svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
      <rect width="260" height="200" fill="#040405"/>
      <rect x="30" y="30" width="200" height="110" rx="4" fill="#0A0A0C"/>
      <rect x="30" y="30" width="200" height="6" rx="1" fill="#ADD034" opacity="0.4"/>
      <rect x="50" y="55" width="80" height="50" rx="2" fill="#ADD034" opacity="0.06"/>
      <rect x="145" y="55" width="70" height="22" rx="2" fill="#ADD034" opacity="0.05"/>
      <rect x="145" y="83" width="70" height="22" rx="2" fill="#ADD034" opacity="0.04"/>
      <text x="90" y="85" textAnchor="middle" fontSize="8" fill="#ADD034" opacity="0.2" fontFamily="Syne,sans-serif" fontWeight="700">EXPO 2024</text>
      <rect x="30" y="30" width="200" height="110" rx="4" fill="none" stroke="#ADD034" strokeWidth="0.5" opacity="0.15"/>
      <rect x="50" y="145" width="160" height="8" rx="2" fill="#1A1A1A"/>
      <rect x="70" y="153" width="4" height="30" rx="1" fill="#1A1A1A"/>
      <rect x="186" y="153" width="4" height="30" rx="1" fill="#1A1A1A"/>
    </svg>
  );
}

export default function Portfolio({ t }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="portfolio">
      <div className="container">
        <div className="portfolio-header reveal">
          <div>
            <p className="eyebrow">{t.portfolio_eyebrow}</p>
            <h2 className="section-title">{t.portfolio_h2}</h2>
          </div>
          <a className="service-link" href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact'); }}>
            <span>{t.portfolio_all}</span>
            <svg viewBox="0 0 14 14" fill="none" stroke="#ADD034" strokeWidth="1.5" strokeLinecap="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
          </a>
        </div>
        <div className="portfolio-grid">
          <div className="portfolio-item big reveal reveal-d1">
            <div className="p-visual"><PortfolioP1/></div>
            <div className="p-info">
              <div className="p-cat">{t.p1_cat}</div>
              <div className="p-title">{t.p1_title}</div>
              <div className="p-sub">{t.p1_sub}</div>
            </div>
          </div>
          <div className="portfolio-item reveal reveal-d2">
            <div className="p-visual"><PortfolioP2/></div>
            <div className="p-info">
              <div className="p-cat">{t.p2_cat}</div>
              <div className="p-title">{t.p2_title}</div>
              <div className="p-sub">{t.p2_sub}</div>
            </div>
          </div>
          <div className="portfolio-item reveal reveal-d1">
            <div className="p-visual"><PortfolioP3/></div>
            <div className="p-info">
              <div className="p-cat">{t.p3_cat}</div>
              <div className="p-title">{t.p3_title}</div>
              <div className="p-sub">{t.p3_sub}</div>
            </div>
          </div>
          <div className="portfolio-item reveal reveal-d3">
            <div className="p-visual"><PortfolioP4/></div>
            <div className="p-info">
              <div className="p-cat">{t.p4_cat}</div>
              <div className="p-title">{t.p4_title}</div>
              <div className="p-sub">{t.p4_sub}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
