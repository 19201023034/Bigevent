import { useState, useEffect } from 'react';

export default function CookieBanner({ t }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) {
      setVisible(true);
    }
  }, []);

  const close = (accepted) => {
    localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'rejected');
    setVisible(false);
  };

  return (
    <div id="cookie-banner" className={visible ? '' : 'hidden'}>
      <p className="cookie-text" dangerouslySetInnerHTML={{ __html: t.cookie_txt }} />
      <div className="cookie-btns">
        <button className="btn-reject" onClick={() => close(false)}>{t.cookie_reject}</button>
        <button className="btn-accept" onClick={() => close(true)}>{t.cookie_accept}</button>
      </div>
    </div>
  );
}
