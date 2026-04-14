import { useEffect, useRef, useState } from 'react';
import { scrollTo } from '../utils/scrollTo';

// 3 kolumny x 2 rzędy = 6 paneli LED wlatujących z różnych kierunków
const GRID_COLS = 3;
const GRID_ROWS = 2;

function buildPanels() {
  const panels = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      // Kierunek wlotu: skrajne kolumny z boków, rzędy z góry/dołu, środek z góry
      let fromX = '0%', fromY = '0%';
      if (c === 0)            fromX = '-110%';
      if (c === GRID_COLS-1)  fromX = '110%';
      if (r === 0)            fromY = '-110%';
      if (r === GRID_ROWS-1)  fromY = '110%';
      if (c === 1 && r === 0) { fromX = '0%'; fromY = '-110%'; }
      if (c === 1 && r === 1) { fromX = '0%'; fromY = '110%'; }

      // Diagonalne opóźnienie – układają się jak fala
      const delay = (c * 0.12 + r * 0.2).toFixed(2);
      panels.push({ id: r * GRID_COLS + c, row: r, col: c, fromX, fromY, delay });
    }
  }
  return panels;
}

const PANELS = buildPanels();

export default function Hero({ t }) {
  const canvasRef   = useRef(null);
  const phaseRef    = useRef(0);
  const [assembled, setAssembled] = useState(false);
  const [textIn,    setTextIn]    = useState(false);

  useEffect(() => {
    // Animacja assemblu po krótkim czasie
    const t1 = setTimeout(() => setAssembled(true), 300);
    // Tekst pojawia się gdy panele już prawie na miejscu
    const t2 = setTimeout(() => setTextIn(true), 1400);

    // ── CANVAS ─────────────────────────────────────
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion — skip animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }

    const ctx = canvas.getContext('2d', { alpha: false });
    let animId, time = 0;
    let running = true;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      if (!running) return;
      // Pause when tab is hidden to save battery
      if (document.visibilityState === 'hidden') {
        animId = requestAnimationFrame(draw);
        return;
      }

      time += 0.012;
      const pSize = 10, totalP = 12;

      ctx.fillStyle = '#030304';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width  / totalP);
      const rows = Math.ceil(canvas.height / totalP);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v1 = (Math.sin(x * 0.05 + time) + Math.cos(y * 0.05 - time)) * 0.5;
          const v2 = (Math.sin(x * 0.08 - time * 1.5) + Math.cos(y * 0.04 + time * 0.8)) * 0.5;
          const n1 = Math.pow(Math.max(0, (v1+1)/2), 3);
          const n2 = Math.pow(Math.max(0, (v2+1)/2), 2.5);

          const pR = Math.min(255, 10 + n1*260);
          const pG = Math.min(255, 10 + n1*312 + n2*80);
          const pB = Math.min(255, 15 + n1*78  + n2*255);

          const px = x * totalP;
          const py = y * totalP;

          ctx.fillStyle = '#020202';
          ctx.fillRect(px, py, pSize, pSize);

          const s = (pSize - 4) / 3;
          ctx.fillStyle = `rgb(${pR},0,0)`;
          ctx.fillRect(px+1, py+1, s, pSize-2);
          ctx.fillStyle = `rgb(0,${pG},0)`;
          ctx.fillRect(px+1+s+1, py+1, s, pSize-2);
          ctx.fillStyle = `rgb(0,0,${pB})`;
          ctx.fillRect(px+1+s*2+2, py+1, s, pSize-2);
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      running = false;
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);


  return (
    <section id="hero">
      <div className="hero-sticky-container">

        {/* Tło – canvas LED zaczyna zgaszony, zapala się przy textIn */}
        <canvas
          className={`pixel-canvas hero-canvas ${textIn ? 'powered-on' : ''}`}
          ref={canvasRef}
          role="img"
          aria-label="Animowane tło z pikseli LED"
        />

        {/* Grid paneli wlatujących z różnych stron */}
        <div className="hero-panels-grid">
          {PANELS.map(p => (
            <div
              key={p.id}
              className={`hero-panel-module ${assembled ? 'landed' : ''}`}
              style={{
                '--from-x': p.fromX,
                '--from-y': p.fromY,
                '--delay':  `${p.delay}s`,
                gridRow:    p.row + 1,
                gridColumn: p.col + 1,
              }}
            />
          ))}
        </div>

        {/* Treść główna */}
        <div className={`hero-content-overlay ${textIn ? 'text-in' : ''}`}>
          <div className="container">
            <div className="hero-content">
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                <span>{t.hero_badge}</span>
              </div>
              <h1 className="display" dangerouslySetInnerHTML={{ __html: t.hero_h1 }} />
              <p className="hero-sub">{t.hero_sub}</p>
              <div className="hero-btns">
                <button className="btn-primary"   onClick={() => scrollTo('services')}>{t.hero_btn1}</button>
                <button className="btn-secondary" onClick={() => scrollTo('studio')}>{t.hero_btn2}</button>
              </div>
              <div className="hero-stats">
                <div className="stat"><div className="stat-num">500+</div><div className="stat-label">{t.stat1}</div></div>
                <div className="stat"><div className="stat-num">1500<span style={{fontSize:'1.2rem'}}>m²</span></div><div className="stat-label">{t.stat2}</div></div>
                <div className="stat"><div className="stat-num">4K</div><div className="stat-label">{t.stat3}</div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Ogólna winieta na krawędziach */}
        <div className="hero-glow" />
      </div>
    </section>
  );
}
