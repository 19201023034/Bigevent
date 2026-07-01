import { useState, useEffect, useRef } from 'react';

export default function LedCalculator({ t }) {
  const [pitch, setPitch] = useState('P3.9'); // 'P1.9' or 'P3.9'
  const [width, setWidth] = useState(3.0); // meters
  const [height, setHeight] = useState(2.0); // meters
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const density = pitch === 'P1.9' ? 512 : 256;
  const pixelWidth = Math.round(width * density);
  const pixelHeight = Math.round(height * density);
  const totalPixels = pixelWidth * pixelHeight;
  const area = (width * height);
  
  // Power consumption calculations (Watts to kW)
  const avgPowerW = pitch === 'P3.9' ? 220 : 215;
  const maxPowerW = pitch === 'P3.9' ? 660 : 645;
  const powerAvgKw = ((area * avgPowerW) / 1000).toFixed(1);
  const powerMaxKw = ((area * maxPowerW) / 1000).toFixed(1);
  const weightKg = Math.round(area * 30);
  const areaString = area.toFixed(2);
  
  // Calculate aspect ratio string roughly
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  const wInt = Math.round(width * 10);
  const hInt = Math.round(height * 10);
  const divisor = gcd(wInt, hInt);
  const ratioW = wInt / divisor;
  const ratioH = hInt / divisor;
  const ratioString = `${ratioW}:${ratioH}`;

  const handleWidthChange = (e) => {
    setWidth(parseFloat(e.target.value));
  };

  const handleHeightChange = (e) => {
    setHeight(parseFloat(e.target.value));
  };

  const is16by9 = Math.abs((width / height) - (16/9)) < 0.05;
  
  const [showForm, setShowForm] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const res = await fetch('https://formspree.io/pictures@bigevent.de', {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) setSent(true);
      else setError(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="led-calculator" ref={sectionRef} className="led-calc-section">
      <div className="container">
        <div className="reveal">
          <p className="eyebrow">{t.calc_eyebrow || 'Kalkulator'}</p>
          <h2 className="section-title">{t.calc_h2 || 'Oblicz rozdzielczość ekranu LED'}</h2>
          <p className="calc-sub">{t.calc_sub || 'Wybierz technologię i dostosuj wymiary, aby sprawdzić dokładną rozdzielczość Twojego ekranu.'}</p>
        </div>

        <div className="calc-container reveal reveal-d1">
          <div className="calc-controls">
            
            <div className="calc-group">
              <label>{t.calc_pitch_label || 'Technologia (Pixel Pitch)'}</label>
              <div className="calc-pitch-toggle">
                <button 
                  className={pitch === 'P3.9' ? 'active' : ''} 
                  onClick={() => setPitch('P3.9')}
                >
                  P3.9 (Outdoor)
                </button>
                <button 
                  className={pitch === 'P1.9' ? 'active' : ''} 
                  onClick={() => setPitch('P1.9')}
                >
                  P1.9 (Indoor)
                </button>
              </div>
              <p className="calc-hint">
                {pitch === 'P3.9' ? (t.calc_p39_hint || '256 px na każdy metr bieżący') : (t.calc_p19_hint || '512 px na każdy metr bieżący')}
              </p>
            </div>

            <div className="calc-group">
              <div className="calc-slider-header">
                <label>{t.calc_width_label || 'Szerokość'}</label>
                <div className="calc-val-display">{width.toFixed(1)} m</div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                step="0.5" 
                value={width} 
                onChange={handleWidthChange} 
                className="custom-slider"
              />
            </div>

            <div className="calc-group">
              <div className="calc-slider-header">
                <label>{t.calc_height_label || 'Wysokość'}</label>
                <div className="calc-val-display">{height.toFixed(1)} m</div>
              </div>
              <input 
                type="range" 
                min="1" 
                max="15" 
                step="0.5" 
                value={height} 
                onChange={handleHeightChange} 
                className="custom-slider"
              />
            </div>

          </div>

          <div className="calc-results">
            <div className="calc-result-main">
              <span className="res-label">{t.calc_res_label || 'Rozdzielczość'}</span>
              <div className="res-value">{pixelWidth} × {pixelHeight} <span className="res-unit">px</span></div>
            </div>
            
            <div className="calc-stats-grid">
              <div className="calc-stat">
                <span className="stat-name">{t.calc_area_label || 'Powierzchnia'}</span>
                <span className="stat-val">{areaString} m²</span>
              </div>
              <div className="calc-stat">
                <span className="stat-name">{t.calc_total_px_label || 'Suma pikseli'}</span>
                <span className="stat-val">{totalPixels.toLocaleString()}</span>
              </div>
              <div className="calc-stat">
                <span className="stat-name">{t.calc_ratio_label || 'Proporcje (ok.)'}</span>
                <span className="stat-val" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {ratioString}
                  {is16by9 && (
                    <span className="badge-169">{t.calc_169_badge || '16:9 TV'}</span>
                  )}
                </span>
              </div>
              <div className="calc-stat">
                <span className="stat-name">{t.calc_power_avg_label || 'Pobór mocy (Avg)'}</span>
                <span className="stat-val">{powerAvgKw} kW</span>
              </div>
              <div className="calc-stat">
                <span className="stat-name">{t.calc_power_max_label || 'Pobór mocy (Max)'}</span>
                <span className="stat-val">{powerMaxKw} kW</span>
              </div>
              <div className="calc-stat">
                <span className="stat-name">{t.calc_weight_label || 'Waga ekranu'}</span>
                <span className="stat-val">{weightKg.toLocaleString()} kg</span>
              </div>
            </div>

            <div className="calc-visualizer">
              <div 
                className="calc-scene-wrapper"
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  aspectRatio: `${width + 0.8} / ${Math.max(height, 1.8)}`,
                  width: ((width + 0.8) / Math.max(height, 1.8)) > 2.5 ? '100%' : 'auto',
                  height: ((width + 0.8) / Math.max(height, 1.8)) > 2.5 ? 'auto' : '100%',
                  maxHeight: '100%',
                  maxWidth: '100%'
                }}
              >
                <div 
                  className="calc-screen-preview" 
                  style={{ 
                    width: `${(width / (width + 0.8)) * 100}%`,
                    height: `${(height / Math.max(height, 1.8)) * 100}%`
                  }}
                >
                  <div className="calc-screen-grid" style={{
                    backgroundSize: pitch === 'P1.9' ? '10px 10px' : '20px 20px'
                  }}></div>
                </div>
                
                <div 
                  className="calc-human-scale-2d"
                  style={{
                    width: `${(0.6 / (width + 0.8)) * 100}%`,
                    height: `${(1.8 / Math.max(height, 1.8)) * 100}%`,
                    marginLeft: `${(0.2 / (width + 0.8)) * 100}%`
                  }}
                >
                  <svg viewBox="0 0 64 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 30C38.627 30 44 24.627 44 18C44 11.373 38.627 6 32 6C25.373 6 20 11.373 20 18C20 24.627 25.373 30 32 30ZM45 34H19C12.925 34 8 38.925 8 45V90C8 92.209 9.791 94 12 94C14.209 94 16 92.209 16 90V50H20V144C20 150.627 25.373 156 32 156C38.627 156 44 150.627 44 144V50H48V90C48 92.209 49.791 94 52 94C54.209 94 56 92.209 56 90V45C56 38.925 51.075 34 45 34Z" fill="currentColor"/>
                  </svg>
                  <div className="human-label">1.8m</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Przycisk i formularz wyceny --- */}
        <div className="calc-quote-section reveal reveal-d2">
          {!showForm && !sent && (
            <button className="calc-quote-btn" onClick={() => setShowForm(true)}>
              {t.calc_quote_btn || 'Zapytaj o wycenę tego ekranu'}
            </button>
          )}

          {showForm && !sent && (
            <div className="calc-quote-form-wrap">
              <div className="cq-header">
                <h3>{t.cq_title || 'Szczegóły wynajmu'}</h3>
                <button className="cq-close" onClick={() => setShowForm(false)}>✕</button>
              </div>
              <p className="cq-subtitle">{t.cq_subtitle || 'Prześlij dodatkowe informacje, abyśmy mogli przygotować dokładną wycenę dla wybranego ekranu.'}</p>
              
              <form className="cq-form" onSubmit={handleSubmit}>
                {/* Ukryte pole ze specyfikacją z kalkulatora */}
                <input type="hidden" name="Led_Spec" value={`Pitch: ${pitch}, Rozmiar: ${width}m x ${height}m (${areaString}m2), Waga: ${weightKg}kg, Zasilanie: ${powerMaxKw}kW`} />

                <div className="form-row">
                  <div className="form-group">
                    <label>{t.cq_date || 'Data montażu'}</label>
                    <input type="date" name="Setup_Date" required />
                  </div>
                  <div className="form-group">
                    <label>{t.cq_days || 'Liczba dni eventu'}</label>
                    <input type="number" name="Event_Days" min="1" placeholder="np. 3" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t.cq_location || 'Lokalizacja (Miasto / Kod)'}</label>
                    <input type="text" name="Location" placeholder={t.cq_location_ph || 'np. Warszawa, 00-123'} required />
                  </div>
                  <div className="form-group">
                    <label>{t.cq_env || 'Otoczenie'}</label>
                    <select name="Environment">
                      <option value="Indoor">{t.cq_env_in || 'Wewnątrz (Indoor)'}</option>
                      <option value="Outdoor">{t.cq_env_out || 'Na zewnątrz (Outdoor)'}</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>{t.cq_mount || 'Sposób montażu'}</label>
                  <select name="Mounting_Type">
                    <option value="Flown">{t.cq_mount_flown || 'Podwieszany (Flown / Truss)'}</option>
                    <option value="Ground">{t.cq_mount_ground || 'Stojący (Ground Support)'}</option>
                    <option value="Wall">{t.cq_mount_wall || 'Mocowany do ściany zabudowy'}</option>
                    <option value="Unknown">{t.cq_mount_unk || 'Jeszcze nie wiem'}</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>{t.cq_email || 'Twój Email'}</label>
                    <input type="email" name="Email" placeholder="adres@email.com" required />
                  </div>
                  <div className="form-group">
                    <label>{t.cq_phone || 'Telefon (opcjonalnie)'}</label>
                    <input type="tel" name="Phone" placeholder="+48 ..." />
                  </div>
                </div>

                {error && <p style={{color: '#ff5252', fontSize:'14px', marginBottom:'1rem'}}>{t.form_error || 'Wystąpił błąd. Spróbuj ponownie.'}</p>}
                
                <button type="submit" className="form-submit" disabled={sending}>
                  {sending ? '...' : (t.cq_submit || 'Wyślij zapytanie')}
                </button>
              </form>
            </div>
          )}

          {sent && (
            <div className="calc-quote-success">
              <div style={{fontSize:'2.5rem', color:'var(--lime)', marginBottom:'1rem'}}>✓</div>
              <h3>{t.cq_thanks_h || 'Zapytanie wysłane!'}</h3>
              <p>{t.cq_thanks_p || 'Otrzymaliśmy specyfikację Twojego ekranu. Odeślemy wycenę najszybciej jak to możliwe.'}</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
