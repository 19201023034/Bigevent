const BigEventLogoSmall = () => (
  <div className="footer-logo-wrap" style={{ display: 'flex', position: 'relative', marginLeft: '0', marginBottom: '1.5rem', alignSelf: 'flex-start' }}>
    <img
      src="/logo.svg"
      alt="BigEvent"
      style={{ height: 60, width: 'auto', transform: 'scale(3.0)', transformOrigin: 'left center' }}
    />
    <img 
      src="/pictures.svg" 
      alt="pictures" 
      style={{ height: 66, position: 'absolute', bottom: '26px', left: '138px' }}
    />
  </div>
);

export default function Footer({ t, setLang, onImpressum }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <BigEventLogoSmall />
            <div className="footer-tagline">{t.footer_tagline}</div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h5>{t.footer_col1}</h5>
              <ul>
                <li>{t.footer_led}</li>
                <li>{t.footer_studio}</li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>{t.footer_col2}</h5>
              <ul>
                <li onClick={() => scrollTo('about')}>{t.footer_about}</li>
                <li onClick={() => scrollTo('portfolio')}>{t.footer_portfolio}</li>
                <li onClick={() => scrollTo('contact')}>{t.footer_contact_link}</li>
              </ul>
            </div>
            <div className="footer-col">
              <h5>{t.footer_col3}</h5>
              <ul>
                <li onClick={() => setLang('pl')}>Polski</li>
                <li onClick={() => setLang('en')}>English</li>
                <li onClick={() => setLang('de')}>Deutsch</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">{t.footer_copy}</span>
          <div className="footer-legal">
            <a href="#">{t.footer_privacy}</a>
            <a href="#">{t.footer_rodo}</a>
            <a href="#" onClick={e => { e.preventDefault(); onImpressum(); }}>{t.footer_imprint}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
