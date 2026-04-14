export default function About({ t }) {
  return (
    <section id="about">
      <div className="container">
        <div className="about-inner">
          <div className="about-text reveal">
            <p className="eyebrow">{t.about_eyebrow}</p>
            <h2 className="section-title">{t.about_h2}</h2>
            <p>{t.about_p1}</p>
            <p>{t.about_p2}</p>
            <div className="about-nums">
              <div className="about-num-card">
                <div className="an-num">500+</div>
                <div className="an-label">{t.an1}</div>
              </div>
              <div className="about-num-card">
                <div className="an-num">14</div>
                <div className="an-label">{t.an2}</div>
              </div>
              <div className="about-num-card">
                <div className="an-num">1500<span style={{fontSize:'1.4rem'}}>m²</span></div>
                <div className="an-label">{t.an3}</div>
              </div>
              <div className="about-num-card">
                <div className="an-num">24/7</div>
                <div className="an-label">{t.an4}</div>
              </div>
            </div>
          </div>
          <div className="about-image-block reveal reveal-d2">
            <div className="about-img-main">
              <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
                <rect width="480" height="360" fill="#060607"/>
                <defs>
                  <radialGradient id="wh_bg" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="#ADD034" stopOpacity="0.05"/>
                    <stop offset="100%" stopColor="#ADD034" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <rect width="480" height="360" fill="url(#wh_bg)"/>
                <rect x="40" y="80" width="120" height="180" rx="4" fill="#0D0D0D" stroke="#1A1A1A" strokeWidth="1"/>
                <rect x="44" y="84" width="112" height="172" rx="2" fill="#080808"/>
                <g fill="#ADD034">
                  {[46,56,66,76,86,96,106,116,126,136,146].map((x,i)=>(
                    <rect key={i} x={x} y="86" width="8" height="6" rx="1" opacity={[0.7,0.4,0.9,0.3,0.8,0.5,0.7,0.6,0.4,0.8,0.5][i]}/>
                  ))}
                  <rect x="46" y="94" width="110" height="6" rx="1" opacity="0.04"/>
                </g>
                <text x="100" y="180" textAnchor="middle" fontSize="13" fill="#ADD034" opacity="0.12" fontFamily="Syne,sans-serif" fontWeight="800" letterSpacing="1">BIGEVENT</text>
                <rect x="200" y="110" width="90" height="140" rx="3" fill="#0D0D0D" stroke="#1A1A1A" strokeWidth="0.8"/>
                <rect x="204" y="114" width="82" height="132" rx="2" fill="#070707"/>
                <rect x="330" y="130" width="110" height="140" rx="3" fill="#0D0D0D" stroke="#1A1A1A" strokeWidth="0.8"/>
                <rect x="334" y="134" width="102" height="132" rx="2" fill="#070707"/>
                <rect x="0" y="310" width="480" height="50" fill="#020202" opacity="0.8"/>
                <rect x="0" y="310" width="480" height="1" fill="#ADD034" opacity="0.08"/>
                <text x="240" y="340" textAnchor="middle" fontSize="10" fill="#ADD034" opacity="0.2" fontFamily="Syne,sans-serif" fontWeight="700" letterSpacing="4">BIGEVENT STOCK · WROCŁAW</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
