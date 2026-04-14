import { useState } from 'react';

// ── Formspree endpoint ──────────────────────────────────────────────────────
// 1. Zarejestruj się na https://formspree.io (free tier: 50 wiadomości/miesiąc)
// 2. Utwórz nowy formularz, skopiuj ID (np. "xpzvjkqr")
// 3. Zastąp poniższe TWOJE_ID_FORMSPREE
const FORMSPREE_URL = 'https://formspree.io/f/TWOJE_ID_FORMSPREE';

export default function Contact({ t }) {
  const [sent,    setSent]    = useState(false);
  const [sending, setSending] = useState(false);
  const [error,   setError]   = useState(false);
  const [gdpr,    setGdpr]    = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!gdpr) return;
    setSending(true);
    setError(false);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-left reveal">
            <p className="eyebrow">{t.contact_eyebrow}</p>
            <h2 className="section-title">{t.contact_h2}</h2>
            <p>{t.contact_p}</p>
            <div className="contact-info">
              <div className="contact-item">
                <div className="ci-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="#ADD034" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M1 3.5h14v9a1 1 0 01-1 1H2a1 1 0 01-1-1V3.5z"/>
                    <path d="M1 3.5l7 6 7-6"/>
                  </svg>
                </div>
                <div>
                  <div className="ci-label">{t.ci_email_label}</div>
                  <a className="ci-value" href="mailto:info@bigevent.de">info@bigevent.de</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="#ADD034" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M2.5 1.5h3l1.5 3-1.75 1a9.5 9.5 0 004.25 4.25l1-1.75 3 1.5v3c0 .83-.67 1.5-1.5 1.5C5.5 14.5 1.5 10.5 1.5 3A1.5 1.5 0 012.5 1.5z"/>
                  </svg>
                </div>
                <div>
                  <div className="ci-label">{t.ci_phone_label}</div>
                  <a className="ci-value" href="tel:+491637716744">+49 (0)163 771 674 4</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="ci-icon">
                  <svg viewBox="0 0 16 16" fill="none" stroke="#ADD034" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M8 1C5.24 1 3 3.24 3 6c0 3.5 5 9 5 9s5-5.5 5-9c0-2.76-2.24-5-5-5z"/>
                    <circle cx="8" cy="6" r="1.5"/>
                  </svg>
                </div>
                <div>
                  <div className="ci-label">{t.ci_loc_label}</div>
                  <a
                    className="ci-value"
                    href="https://maps.google.com/?q=Krantzstrasse+7,+52070+Aachen"
                    target="_blank"
                    rel="noopener noreferrer"
                  >{t.ci_loc_val}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-d2">
            {sent ? (
              <div style={{padding:'2rem', background:'var(--bg-3)', border:'0.5px solid var(--border-hi)', borderRadius:'var(--radius-lg)', textAlign:'center'}}>
                <div style={{fontSize:'2rem', color:'var(--lime)', marginBottom:'0.75rem'}}>✓</div>
                <h3 style={{fontFamily:'var(--font-head)', marginBottom:'0.5rem'}}>{t.thanks_h}</h3>
                <p style={{fontSize:'14px', color:'var(--txt-2)'}}>{t.thanks_p}</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cf-name">{t.form_name}</label>
                    <input id="cf-name" type="text" name="name" placeholder={t.form_name_ph} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-company">{t.form_company}</label>
                    <input id="cf-company" type="text" name="company" placeholder={t.form_company_ph} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="cf-email">{t.form_email}</label>
                  <input id="cf-email" type="email" name="email" placeholder={t.form_email_ph} required />
                </div>
                <div className="form-group">
                  <label htmlFor="cf-service">{t.form_service}</label>
                  <select id="cf-service" name="service">
                    <option value="led">{t.form_opt_led}</option>
                    <option value="studio">{t.form_opt_studio}</option>
                    <option value="both">{t.form_opt_both}</option>
                    <option value="other">{t.form_opt_other}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="cf-msg">{t.form_msg}</label>
                  <textarea id="cf-msg" name="message" placeholder={t.form_msg_ph} />
                </div>
                <label className="form-gdpr">
                  <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)} required />
                  <span>{t.form_gdpr}</span>
                </label>
                {error && (
                  <p style={{fontSize:'13px', color:'#ff5252', marginTop:'0.5rem'}}>{t.form_error}</p>
                )}
                <button type="submit" className="form-submit" disabled={!gdpr || sending}>
                  {sending ? '...' : t.form_submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
