import { useState, useEffect } from 'react';

export default function CookieBanner({ t, onOpenSettings }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const handlePrefsChanged = () => {
      if (localStorage.getItem('cookie_consent')) {
        setVisible(false);
      }
    };
    window.addEventListener('cookie_prefs_changed', handlePrefsChanged);
    return () => window.removeEventListener('cookie_prefs_changed', handlePrefsChanged);
  }, []);

  const close = (accepted) => {
    localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'rejected');
    if (accepted) {
      localStorage.setItem('cookie_consent_prefs', JSON.stringify({
        essential: true, functional: true, analytics: true, marketing: true
      }));
    } else {
      localStorage.setItem('cookie_consent_prefs', JSON.stringify({
        essential: true, functional: false, analytics: false, marketing: false
      }));
    }
    setVisible(false);
  };

  return (
    <div id="cookie-banner" className={visible ? '' : 'hidden'}>
      <p className="cookie-text" dangerouslySetInnerHTML={{ __html: t.cookie_txt }} />
      <div className="cookie-btns">
        <button className="btn-reject" onClick={() => close(false)}>{t.cookie_reject}</button>
        <button className="btn-settings" onClick={onOpenSettings} style={{
          padding: '8px 16px', background: 'var(--bg-3)', border: '0.5px solid var(--border)',
          borderRadius: '20px', color: 'var(--txt)', fontSize: '13px', cursor: 'pointer',
          fontFamily: 'var(--font-head)', fontWeight: 600, transition: 'var(--transition)'
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--lime)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >{t.cookie_settings || 'Settings'}</button>
        <button className="btn-accept" onClick={() => close(true)}>{t.cookie_accept}</button>
      </div>
    </div>
  );
}

