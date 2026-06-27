import { useState, useEffect } from 'react';
import { legalTranslations } from '../utils/legalTranslations';

export default function PrivacyModal({ lang, activeTab = 'privacy', onClose }) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const t = legalTranslations[lang] || legalTranslations.pl;

  // Consent states
  const [consentPrefs, setConsentPrefs] = useState(() => {
    try {
      const saved = localStorage.getItem('cookie_consent_prefs');
      return saved ? JSON.parse(saved) : { essential: true, functional: true, analytics: false, marketing: false };
    } catch {
      return { essential: true, functional: true, analytics: false, marketing: false };
    }
  });

  const handleSavePrefs = () => {
    localStorage.setItem('cookie_consent_prefs', JSON.stringify(consentPrefs));
    localStorage.setItem('cookie_consent', 'accepted');
    // Dispatch custom event to let the CookieBanner know
    window.dispatchEvent(new Event('cookie_prefs_changed'));
    onClose();
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-2)',
          border: '0.5px solid var(--border-hi)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '900px',
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.5rem 2rem', borderBottom: '0.5px solid var(--border)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.5rem', fontWeight: 800 }}>
            {t.title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-4)', border: '0.5px solid var(--border)',
              borderRadius: '50%', width: 36, height: 36,
              cursor: 'pointer', color: 'var(--txt)',
              fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lime)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            aria-label="Close"
          >✕</button>
        </div>

        {/* Inner container */}
        <div className="privacy-modal-layout" style={{
          display: 'flex', flex: 1, overflow: 'hidden',
        }}>
          {/* Sidebar Navigation */}
          <div className="privacy-modal-sidebar" style={{
            width: '240px', borderRight: '0.5px solid var(--border)',
            padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem',
            background: 'rgba(0,0,0,0.15)',
          }}>
            <button
              onClick={() => setCurrentTab('privacy')}
              style={{
                textAlign: 'left', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
                border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-head)', fontWeight: 600,
                background: currentTab === 'privacy' ? 'var(--lime)' : 'transparent',
                color: currentTab === 'privacy' ? '#000' : 'var(--txt-2)',
                transition: 'var(--transition)',
              }}
            >
              {t.tab_privacy}
            </button>
            <button
              onClick={() => setCurrentTab('cookies')}
              style={{
                textAlign: 'left', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
                border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-head)', fontWeight: 600,
                background: currentTab === 'cookies' ? 'var(--lime)' : 'transparent',
                color: currentTab === 'cookies' ? '#000' : 'var(--txt-2)',
                transition: 'var(--transition)',
              }}
            >
              {t.tab_cookies}
            </button>
            <button
              onClick={() => setCurrentTab('gdpr')}
              style={{
                textAlign: 'left', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
                border: 'none', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-head)', fontWeight: 600,
                background: currentTab === 'gdpr' ? 'var(--lime)' : 'transparent',
                color: currentTab === 'gdpr' ? '#000' : 'var(--txt-2)',
                transition: 'var(--transition)',
              }}
            >
              {t.tab_gdpr}
            </button>
          </div>

          {/* Scrollable Content Panel */}
          <div style={{
            flex: 1, padding: '2rem', overflowY: 'auto',
            lineHeight: 1.6, fontSize: 14, color: 'var(--txt-2)',
          }}>
            
            {/* TAB: PRIVACY */}
            {currentTab === 'privacy' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--txt)', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 700 }}>
                  {t.privacy_title}
                </h3>
                <p style={{ marginBottom: '1.5rem' }}>{t.privacy_intro}</p>
                
                {t.privacy_sections.map((section, idx) => (
                  <div key={idx} style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-head)', color: 'var(--txt)', fontSize: '1.05rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                      {section.h}
                    </h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{section.p}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: COOKIES */}
            {currentTab === 'cookies' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--txt)', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 700 }}>
                  {t.cookies_title}
                </h3>
                <p style={{ marginBottom: '1.5rem' }}>{t.cookies_intro}</p>

                {/* Preferences Manager Form */}
                <div style={{
                  background: 'var(--bg-3)', border: '0.5px solid var(--border)',
                  borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '2rem'
                }}>
                  <h4 style={{ fontFamily: 'var(--font-head)', color: 'var(--txt)', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                    {t.cookie_settings_title}
                  </h4>
                  <p style={{ fontSize: 13, marginBottom: '1.25rem' }}>{t.cookie_settings_desc}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Essential */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '0.5px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                      <div style={{ paddingRight: '1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--txt)' }}>{t.cookie_cat_essential}</div>
                        <div style={{ fontSize: 12, color: 'var(--txt-3)' }}>{t.cookie_cat_essential_desc}</div>
                      </div>
                      <span style={{ fontSize: 12, background: 'var(--bg-4)', color: 'var(--lime)', padding: '4px 8px', borderRadius: '40px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                        {t.always_active}
                      </span>
                    </div>

                    {/* Functional */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '0.5px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                      <div style={{ paddingRight: '1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--txt)' }}>{t.cookie_cat_functional}</div>
                        <div style={{ fontSize: 12, color: 'var(--txt-3)' }}>{t.cookie_cat_functional_desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={consentPrefs.functional}
                        onChange={e => setConsentPrefs(prev => ({ ...prev, functional: e.target.checked }))}
                        style={{ width: 18, height: 18, accentColor: 'var(--lime)', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Analytics */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '0.5px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                      <div style={{ paddingRight: '1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--txt)' }}>{t.cookie_cat_analytics}</div>
                        <div style={{ fontSize: 12, color: 'var(--txt-3)' }}>{t.cookie_cat_analytics_desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={consentPrefs.analytics}
                        onChange={e => setConsentPrefs(prev => ({ ...prev, analytics: e.target.checked }))}
                        style={{ width: 18, height: 18, accentColor: 'var(--lime)', cursor: 'pointer' }}
                      />
                    </div>

                    {/* Marketing */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ paddingRight: '1rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--txt)' }}>{t.cookie_cat_marketing}</div>
                        <div style={{ fontSize: 12, color: 'var(--txt-3)' }}>{t.cookie_cat_marketing_desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={consentPrefs.marketing}
                        onChange={e => setConsentPrefs(prev => ({ ...prev, marketing: e.target.checked }))}
                        style={{ width: 18, height: 18, accentColor: 'var(--lime)', cursor: 'pointer' }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSavePrefs}
                    style={{
                      marginTop: '1.5rem', width: '100%', padding: '10px 24px',
                      background: 'var(--lime)', color: '#000', border: 'none',
                      borderRadius: '40px', fontFamily: 'var(--font-head)', fontWeight: 700,
                      cursor: 'pointer', transition: 'var(--transition)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
                    onMouseLeave={e => e.currentTarget.style.opacity = 1}
                  >
                    {t.save_prefs}
                  </button>
                </div>

                {/* Cookies Table */}
                <h4 style={{ fontFamily: 'var(--font-head)', color: 'var(--txt)', fontSize: '1.1rem', marginBottom: '0.75rem', fontWeight: 600 }}>
                  {t.cookies_table_title}
                </h4>
                <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                        {t.cookies_table_headers.map((h, i) => (
                          <th key={i} style={{ padding: '8px 12px', color: 'var(--txt)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.cookies_table_rows.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '0.5px solid var(--border)' }}>
                          <td style={{ padding: '10px 12px', fontWeight: 600, color: 'var(--txt)' }}><code>{row[0]}</code></td>
                          <td style={{ padding: '10px 12px' }}>{row[1]}</td>
                          <td style={{ padding: '10px 12px' }}>{row[2]}</td>
                          <td style={{ padding: '10px 12px' }}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Disable Instructions */}
                <h4 style={{ fontFamily: 'var(--font-head)', color: 'var(--txt)', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                  {t.cookies_disable_title}
                </h4>
                <p style={{ marginBottom: '0.75rem' }}>{t.cookies_disable_desc}</p>
                <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {t.cookies_browsers.map((b, i) => (
                    <li key={i}>
                      <a href={b.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lime)', textDecoration: 'none' }}>
                        {b.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* TAB: GDPR */}
            {currentTab === 'gdpr' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-head)', color: 'var(--txt)', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 700 }}>
                  {t.gdpr_title}
                </h3>
                <p style={{ marginBottom: '1.5rem' }}>{t.gdpr_desc}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                  {t.gdpr_rights_list.map((r, i) => (
                    <div key={i} style={{ borderLeft: '3px solid var(--lime)', paddingLeft: '1rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--txt)', marginBottom: 2 }}>{r.name}</div>
                      <div style={{ fontSize: 13 }}>{r.desc}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: 'var(--bg-3)', border: '0.5px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                  <p style={{ margin: 0 }}>{t.gdpr_contact_action}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
