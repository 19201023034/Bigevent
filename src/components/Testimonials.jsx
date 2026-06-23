const TESTIMONIALS = [
  { n: 1, quoteKey: 'test1_quote', nameKey: 'test1_name', roleKey: 'test1_role', companyKey: 'test1_company', imgKey: 'test1_photo' },
  { n: 2, quoteKey: 'test2_quote', nameKey: 'test2_name', roleKey: 'test2_role', companyKey: 'test2_company', imgKey: 'test2_photo' },
  { n: 3, quoteKey: 'test3_quote', nameKey: 'test3_name', roleKey: 'test3_role', companyKey: 'test3_company', imgKey: 'test3_photo' },
];

function Avatar({ src, name }) {
  if (src) {
    return <img src={src} alt={name} className="testi-avatar" loading="lazy" />;
  }
  // initials fallback
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('');
  return <div className="testi-avatar testi-avatar--initials">{initials}</div>;
}

export default function Testimonials({ t, images }) {
  return (
    <section id="testimonials">
      <div className="container">
        <div className="testi-header reveal">
          <p className="eyebrow">{t.testimonials_eyebrow}</p>
          <h2 className="section-title">{t.testimonials_h2}</h2>
        </div>

        <div className="testi-grid">
          {TESTIMONIALS.map((item, i) => (
            <div key={item.n} className={`testi-card reveal reveal-d${i + 1}`}>
              {/* Quote mark */}
              <div className="testi-quote-mark" aria-hidden="true">"</div>
              <blockquote className="testi-quote">{t[item.quoteKey]}</blockquote>
              <div className="testi-author">
                <Avatar src={images[item.imgKey]} name={t[item.nameKey]} />
                <div className="testi-meta">
                  <div className="testi-name">{t[item.nameKey]}</div>
                  <div className="testi-role">{t[item.roleKey]} · {t[item.companyKey]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
