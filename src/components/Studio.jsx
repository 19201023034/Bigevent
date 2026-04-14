export default function Studio({ t }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="studio">
      <div className="container">
        <div className="studio-inner">
          <div className="studio-text reveal">
            <p className="eyebrow">{t.studio_eyebrow}</p>
            <h2 className="section-title">{t.studio_h2}</h2>
            <p>{t.studio_p1}</p>
            <p>{t.studio_p2}</p>
            <div className="studio-features">
              <div className="studio-feature">
                <div className="feat-icon">
                  <svg viewBox="0 0 18 18" fill="none" stroke="#ADD034" strokeWidth="1.4" strokeLinecap="round">
                    <rect x="1" y="2" width="16" height="12" rx="2"/><circle cx="9" cy="8" r="2.5"/>
                  </svg>
                </div>
                <div className="feat-text">
                  <h4>{t.feat1_h}</h4>
                  <p>{t.feat1_p}</p>
                </div>
              </div>
              <div className="studio-feature">
                <div className="feat-icon">
                  <svg viewBox="0 0 18 18" fill="none" stroke="#ADD034" strokeWidth="1.4" strokeLinecap="round">
                    <circle cx="9" cy="9" r="7"/><path d="M9 4v5l3 2"/>
                  </svg>
                </div>
                <div className="feat-text">
                  <h4>{t.feat2_h}</h4>
                  <p>{t.feat2_p}</p>
                </div>
              </div>
              <div className="studio-feature">
                <div className="feat-icon">
                  <svg viewBox="0 0 18 18" fill="none" stroke="#ADD034" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M3 9l4 4 8-8"/>
                  </svg>
                </div>
                <div className="feat-text">
                  <h4>{t.feat3_h}</h4>
                  <p>{t.feat3_p}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="studio-scene reveal reveal-d2">
            <div className="studio-big-visual">
              <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
                <rect width="480" height="360" fill="#040406"/>
                <rect x="30" y="25" width="420" height="220" rx="6" fill="#060610"/>
                <defs>
                  <radialGradient id="rg_bg" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#ADD034" stopOpacity="0.18"/>
                    <stop offset="100%" stopColor="#ADD034" stopOpacity="0.0"/>
                  </radialGradient>
                </defs>
                <rect x="30" y="25" width="420" height="220" rx="6" fill="url(#rg_bg)"/>
                <g fill="#ADD034">
                  {[34,44,54,64,74,84,94,104,114,124,134,144,154,164,174,184,194,204,214,224,234,244,254,264,274,284,294,304,314,324,334,344,354,364,374,384,394,404,414,424,434].map((x,i)=>(
                    <rect key={i} x={x} y="29" width="8" height="6" rx="1" opacity={(Math.sin(i*1.3)*0.3+0.6).toFixed(2)}/>
                  ))}
                  {[37,45,53].map((y,i)=>(
                    <rect key={i} x="34" y={y} width="418" height="6" rx="1" opacity={[0.04,0.03,0.025][i]}/>
                  ))}
                </g>
                <text x="240" y="150" textAnchor="middle" fontSize="16" fill="#ADD034" opacity="0.15" fontFamily="Syne,sans-serif" fontWeight="800" letterSpacing="6">LIVE ENVIRONMENT</text>
                <rect x="30" y="25" width="420" height="220" rx="6" fill="none" stroke="#ADD034" strokeWidth="0.8" opacity="0.25"/>
                <rect x="30" y="250" width="420" height="12" rx="2" fill="#ADD034" opacity="0.04" stroke="#ADD034" strokeWidth="0.5" strokeOpacity="0.1"/>
                <circle cx="240" cy="285" r="14" fill="#1A1A1A"/>
                <rect x="226" y="299" width="28" height="44" rx="4" fill="#1A1A1A"/>
                <rect x="310" y="290" width="60" height="36" rx="4" fill="#131313" stroke="#2A2A2A" strokeWidth="0.7"/>
                <circle cx="340" cy="308" r="13" fill="#0A0A0A" stroke="#333" strokeWidth="0.8"/>
                <circle cx="340" cy="308" r="8" fill="#060606"/>
                <circle cx="340" cy="308" r="4" fill="#020202"/>
                <circle cx="340" cy="308" r="13" fill="none" stroke="#ADD034" strokeWidth="0.5" opacity="0.4"/>
                <line x1="340" y1="326" x2="322" y2="345" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
                <line x1="340" y1="326" x2="340" y2="347" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
                <line x1="340" y1="326" x2="358" y2="345" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="362" cy="294" r="4" fill="#FF3B30" opacity="0.9"/>
                <circle cx="362" cy="294" r="7" fill="none" stroke="#FF3B30" strokeWidth="0.7" opacity="0.5"/>
              </svg>
              <div className="studio-badge-float">
                <div className="sbf-label">{t.sbf_label}</div>
                <div className="sbf-value">{t.sbf_value}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
