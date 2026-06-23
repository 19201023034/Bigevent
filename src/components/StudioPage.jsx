import { useEffect } from 'react';

export default function StudioPage({ t, onClose }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    '/WhatsApp Image 2026-04-17 at 14.22.32.jpeg',
    '/WhatsApp Image 2026-04-17 at 14.22.33 (1).jpeg',
    '/WhatsApp Image 2026-04-17 at 14.22.33 (2).jpeg',
    '/WhatsApp Image 2026-04-17 at 14.22.33 (3).jpeg',
    '/WhatsApp Image 2026-04-17 at 14.22.33 (4).jpeg',
    '/IMG_4155.jpg'
  ];

  return (
    <div className="studio-page-wrapper">
      {/* Nvigation Bar for Subpage */}
      <nav className="sp-nav">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="sp-back-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            {t.sp_back || 'Wróć do strony głównej'}
          </button>
          <img src="/logo.svg" alt="BigEvent" style={{ height: '30px' }} />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="sp-hero">
        <div className="sp-hero-bg">
          <img src="/WhatsApp Image 2026-04-17 at 14.22.33.jpeg" alt="Virtual Production Studio" className="sp-cinematic-img" />
          <div className="sp-hero-overlay"></div>
        </div>
        <div className="container sp-hero-content">
          <span className="eyebrow">{t.sp_hero_eyebrow || 'Studio Wirtualnej Produkcji'}</span>
          <h1 className="sp-hero-title">{t.sp_hero_title || 'Kreuj rzeczywistość bez kompromisów.'}</h1>
          <p className="sp-hero-sub">{t.sp_hero_sub || 'Wykorzystaj moc ekranów LED i silnika Unreal Engine. Kręć sceny w dowolnym miejscu we wszechświecie nie wychodząc z naszego studia.'}</p>
          <button className="form-submit" style={{ width: 'auto', marginTop: '2rem' }} onClick={() => document.getElementById('sp-contact').scrollIntoView({behavior: 'smooth'})}>
            {t.sp_cta || 'Zarezerwuj studio'}
          </button>
        </div>
      </header>

      {/* Intro & Specs Section */}
      <section className="sp-section">
        <div className="container">
          <div className="sp-grid-2">
            <div className="sp-text-block">
              <h2>{t.sp_intro_h2 || 'Dlaczego Virtual Production?'}</h2>
              <p>{t.sp_intro_p1 || 'Zastępujemy zielony ekran interaktywnym środowiskiem LED. Zyskujesz idealne, naturalne oświetlenie na aktorach i obiektach fizycznych (refleksy na karoserii, szybach), których nie da się w realistyczny sposób podrobić w postprodukcji.'}</p>
              <p>{t.sp_intro_p2 || 'Aktorzy widzą środowisko wokół siebie, a reżyser widzi gotowy obraz w monitorze podglądowym — bez czekania na wielotygodniowy rendering.'}</p>
            </div>
            
            <div className="sp-specs-box">
              <h3>{t.sp_specs_title || 'Parametry Techniczne Studia'}</h3>
              <ul className="sp-specs-list">
                <li><strong>{t.sp_spec1_n || 'Wymiar Głównego Ekranu:'}</strong> <span>{t.sp_spec1_v || '10m x 4m (P1.9)'}</span></li>
                <li><strong>{t.sp_spec2_n || 'Rozdzielczość Ściany:'}</strong> <span>{t.sp_spec2_v || '5120 x 2048 px (4K+)'}</span></li>
                <li><strong>{t.sp_spec3_n || 'System Śledzenia:'}</strong> <span>{t.sp_spec3_v || 'OptiTrack / Mo-Sys (Live Camera Tracking)'}</span></li>
                <li><strong>{t.sp_spec4_n || 'Silnik Środowiska:'}</strong> <span>{t.sp_spec4_v || 'Unreal Engine 5 (Real-time Rendering)'}</span></li>
                <li><strong>{t.sp_spec5_n || 'Udogodnienia:'}</strong> <span>{t.sp_spec5_v || 'Garderoba, Make-up Room, strefa klienta z podglądem, parking.'}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="sp-section sp-gallery-section">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>{t.sp_gallery_title || 'Zdjęcia ze Studia / Behind The Scenes'}</h2>
          <div className="sp-gallery-grid">
            {galleryImages.map((src, i) => (
              <div key={i} className="sp-gallery-item">
                <img src={src} alt={`Studio Behind the Scenes ${i + 1}`} className="sp-cinematic-img" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section id="sp-contact" className="sp-section sp-dark-section">
        <div className="container">
          <div className="sp-booking-wrap">
            <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{t.sp_booking_h2 || 'Zapytaj o rezerwację studia'}</h2>
            <p style={{ textAlign: 'center', color: 'var(--txt-2)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
              {t.sp_booking_p || 'Wypełnij poniższy formularz, a my wrócimy do Ciebie z potwierdzeniem dostępności terminu i dedykowaną wyceną.'}
            </p>

            <form className="cq-form sp-booking-form" action="https://formspree.io/f/TWOJE_ID_FORMSPREE" method="POST">
              <input type="hidden" name="Usługa" value="Rezerwacja Studia Filmowego" />
              <div className="form-row">
                <div className="form-group">
                  <label>{t.form_name || 'Imię i nazwisko'}</label>
                  <input type="text" name="Name" required />
                </div>
                <div className="form-group">
                  <label>{t.form_company || 'Firma / Dom Produkcyjny'}</label>
                  <input type="text" name="Company" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t.cq_email || 'Email'}</label>
                  <input type="email" name="Email" required />
                </div>
                <div className="form-group">
                  <label>{t.cq_phone || 'Telefon'}</label>
                  <input type="tel" name="Phone" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>{t.sp_booking_dates || 'Preferowane daty (od - do)'}</label>
                  <input type="text" name="Dates" placeholder="np. 15.08.2026 - 17.08.2026" required />
                </div>
                <div className="form-group">
                  <label>{t.sp_booking_type || 'Rodzaj produkcji'}</label>
                  <select name="Production_Type">
                    <option value="commercial">{t.sp_pt_comm || 'Reklama'}</option>
                    <option value="musicvideo">{t.sp_pt_music || 'Teledysk'}</option>
                    <option value="film">{t.sp_pt_film || 'Film / Serial'}</option>
                    <option value="photo">{t.sp_pt_photo || 'Sesja Zdjęciowa'}</option>
                    <option value="other">{t.sp_pt_other || 'Inne'}</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>{t.form_msg || 'Wiadomość / Dodatkowe wymagania (np. środowisko Unreal, oświetlenie)'}</label>
                <textarea name="Message" rows="4"></textarea>
              </div>
              <button type="submit" className="form-submit" style={{ maxWidth: '300px', margin: '2rem auto 0 auto', display: 'block' }}>
                {t.sp_booking_submit || 'Wyślij zapytanie'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Simple Footer for Subpage */}
      <footer className="sp-footer">
        <div className="container" style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--txt-2)', fontSize: '13px' }}>
          © {new Date().getFullYear()} BigEvent. {t.footer_rights || 'Wszelkie prawa zastrzeżone.'}
        </div>
      </footer>
    </div>
  );
}
