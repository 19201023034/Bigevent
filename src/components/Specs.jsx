import { useEffect, useRef } from 'react';

const PRODUCTS = [
  {
    id: 'indoor',
    img: '/led-front.png',
    badge: 'INDOOR',
    model: 'P1.9',
    tagKey: 'ind_n6',
    specs: [
      { val: '1.9', unit: 'mm', nameKey: 'ind_n1', descKey: 'ind_d1' },
      { val: '7680', unit: 'Hz', nameKey: 'ind_n2', descKey: 'ind_d2' },
      { val: '5000', unit: ':1', nameKey: 'ind_n5', descKey: 'ind_d5' },
      { val: '94%', unit: 'DCI', nameKey: 'ind_n4', descKey: 'ind_d4' },
      { val: 'MX40', unit: 'Pro', nameKey: 'ind_n3', descKey: 'ind_d3' },
      { val: 'XR', unit: 'Set', nameKey: 'ind_n6', descKey: 'ind_d6' },
    ],
  },
  {
    id: 'outdoor',
    img: '/led-back.png',
    badge: 'OUTDOOR',
    model: 'P3.9',
    tagKey: 'out_n1',
    specs: [
      { val: '3.9', unit: 'mm', nameKey: 'out_n1', descKey: 'out_d1' },
      { val: '4000', unit: 'nit', nameKey: 'out_n3', descKey: 'out_d3' },
      { val: '8500', unit: ':1', nameKey: 'out_n2', descKey: 'out_d2' },
      { val: '7680', unit: 'Hz', nameKey: 'out_n4', descKey: 'out_d4' },
      { val: 'IP65', unit: '', nameKey: 'out_n5', descKey: 'out_d5' },
      { val: '10.2', unit: 'kg', nameKey: 'out_n6', descKey: 'out_d6' },
    ],
  },
];

export default function Specs({ t }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="specs" ref={sectionRef}>
      <div className="container">
        <div className="reveal">
          <p className="eyebrow">{t.specs_eyebrow}</p>
          <h2 className="section-title">{t.specs_h2}</h2>
        </div>

        <div className="specs-products-grid">
          {PRODUCTS.map((p, pi) => (
            <div key={p.id} className={`specs-product-card reveal reveal-d${pi + 1}`}>
              {/* Zdjęcie panelu */}
              <div className="specs-product-img-wrap">
                <img src={p.img} alt={p.model} />
                <div className="specs-product-badge">{p.badge}</div>
                <div className="specs-product-model">{p.model}</div>
              </div>

              {/* Lista parametrów */}
              <ul className="specs-product-list">
                {p.specs.map((s, si) => (
                  <li key={si} className="specs-product-item">
                    <div className="spi-val">
                      {s.val}<span className="spi-unit">{s.unit}</span>
                    </div>
                    <div className="spi-text">
                      <div className="spi-name">{t[s.nameKey]}</div>
                      <div className="spi-desc">{t[s.descKey]}</div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="specs-product-summary">
                {p.id === 'indoor' ? t.specs_indoor_summary : t.specs_outdoor_summary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
