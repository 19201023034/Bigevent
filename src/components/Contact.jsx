import { useState } from 'react';

export default function Contact({ t }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
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
                  <div className="ci-value">info@bigevent.de</div>
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
                  <div className="ci-value">+49 (0)163 771 674 4</div>
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
                  <div className="ci-value">{t.ci_loc_val}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-d2">
            {!sent ? (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>{t.form_name}</label>
                    <input type="text" placeholder={t.form_name_ph} required />
                  </div>
                  <div className="form-group">
                    <label>{t.form_company}</label>
                    <input type="text" placeholder={t.form_company_ph} />
                  </div>
                </div>
                <div className="form-group">
                  <label>{t.form_email}</label>
                  <input type="email" placeholder="jan@firma.pl" required />
                </div>
                <div className="form-group">
                  <label>{t.form_service}</label>
                  <select>
                    <option value="led">{t.form_opt_led}</option>
                    <option value="studio">{t.form_opt_studio}</option>
                    <option value="both">{t.form_opt_both}</option>
                    <option value="other">{t.form_opt_other}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t.form_msg}</label>
                  <textarea placeholder={t.form_msg_ph} />
                </div>
                <button type="submit" className="form-submit">{t.form_submit}</button>
              </form>
            ) : (
              <div style={{padding:'2rem', background:'var(--bg-3)', border:'0.5px solid var(--border-hi)', borderRadius:'var(--radius-lg)', textAlign:'center'}}>
                <div style={{fontSize:'2rem', color:'var(--lime)', marginBottom:'0.75rem'}}>✓</div>
                <h3 style={{fontFamily:'var(--font-head)', marginBottom:'0.5rem'}}>{t.thanks_h}</h3>
                <p style={{fontSize:'14px', color:'var(--txt-2)'}}>{t.thanks_p}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
