import { useState, useRef } from 'react';
import { ADMIN_PASSWORD } from '../hooks/useCMS';

// Sections and their editable fields
// Each entry: { key: translationKey, label: display label, multiline?: true }
const SECTIONS = [
  {
    id: 'hero',
    label: '01 — Hero',
    fields: [
      { key: 'hero_badge',  label: 'Badge (górny chip)' },
      { key: 'hero_h1',    label: 'Nagłówek H1 (HTML)', multiline: true },
      { key: 'hero_sub',   label: 'Pod-nagłówek', multiline: true },
      { key: 'hero_btn1',  label: 'Przycisk 1' },
      { key: 'hero_btn2',  label: 'Przycisk 2' },
      { key: 'stat1',      label: 'Statystyka 1 — opis' },
      { key: 'stat2',      label: 'Statystyka 2 — opis' },
      { key: 'stat3',      label: 'Statystyka 3 — opis' },
    ],
  },
  {
    id: 'services',
    label: '02 — Usługi',
    fields: [
      { key: 'services_eyebrow', label: 'Eyebrow' },
      { key: 'services_h2',      label: 'Tytuł sekcji' },
      { key: 'services_sub',     label: 'Opis sekcji', multiline: true },
      { key: 'led_h3',           label: 'LED — Nagłówek' },
      { key: 'led_p',            label: 'LED — Opis', multiline: true },
      { key: 'studio_h3_card',   label: 'Studio — Nagłówek' },
      { key: 'studio_p_card',    label: 'Studio — Opis', multiline: true },
      { key: 'sceno_h3_card',    label: 'Scenografie — Nagłówek' },
      { key: 'sceno_p_card',     label: 'Scenografie — Opis', multiline: true },
    ],
  },
  {
    id: 'studio',
    label: '03 — Studio',
    fields: [
      { key: 'studio_eyebrow', label: 'Eyebrow' },
      { key: 'studio_h2',     label: 'Tytuł sekcji' },
      { key: 'studio_p1',     label: 'Akapit 1', multiline: true },
      { key: 'studio_p2',     label: 'Akapit 2', multiline: true },
      { key: 'feat1_h',       label: 'Feature 1 — tytuł' },
      { key: 'feat1_p',       label: 'Feature 1 — opis' },
      { key: 'feat2_h',       label: 'Feature 2 — tytuł' },
      { key: 'feat2_p',       label: 'Feature 2 — opis' },
      { key: 'feat3_h',       label: 'Feature 3 — tytuł' },
      { key: 'feat3_p',       label: 'Feature 3 — opis' },
    ],
  },
  {
    id: 'specs',
    label: '04 — Parametry LED',
    fields: [
      { key: 'specs_eyebrow', label: 'Eyebrow' },
      { key: 'specs_h2',     label: 'Tytuł sekcji' },
      { key: 'ind_n1', label: 'Indoor spec 1 — nazwa' },
      { key: 'ind_d1', label: 'Indoor spec 1 — opis', multiline: true },
      { key: 'ind_n2', label: 'Indoor spec 2 — nazwa' },
      { key: 'ind_d2', label: 'Indoor spec 2 — opis', multiline: true },
      { key: 'out_n1', label: 'Outdoor spec 1 — nazwa' },
      { key: 'out_d1', label: 'Outdoor spec 1 — opis', multiline: true },
      { key: 'out_n2', label: 'Outdoor spec 2 — nazwa' },
      { key: 'out_d2', label: 'Outdoor spec 2 — opis', multiline: true },
    ],
  },
  {
    id: 'portfolio',
    label: '05 — Realizacje',
    fields: [
      { key: 'portfolio_eyebrow', label: 'Eyebrow' },
      { key: 'portfolio_h2',      label: 'Tytuł sekcji' },
      { key: 'p1_cat',   label: 'Projekt 1 — kategoria' },
      { key: 'p1_title', label: 'Projekt 1 — tytuł' },
      { key: 'p1_sub',   label: 'Projekt 1 — podtytuł' },
      { key: 'p2_cat',   label: 'Projekt 2 — kategoria' },
      { key: 'p2_title', label: 'Projekt 2 — tytuł' },
      { key: 'p2_sub',   label: 'Projekt 2 — podtytuł' },
      { key: 'p3_cat',   label: 'Projekt 3 — kategoria' },
      { key: 'p3_title', label: 'Projekt 3 — tytuł' },
      { key: 'p3_sub',   label: 'Projekt 3 — podtytuł' },
      { key: 'p4_cat',   label: 'Projekt 4 — kategoria' },
      { key: 'p4_title', label: 'Projekt 4 — tytuł' },
      { key: 'p4_sub',   label: 'Projekt 4 — podtytuł' },
    ],
  },
  {
    id: 'blog',
    label: '06 — Blog',
    fields: [
      { key: 'blog_eyebrow', label: 'Eyebrow' },
      { key: 'blog_h2',      label: 'Tytuł sekcji' },
      { key: 'blog_sub',     label: 'Opis sekcji', multiline: true },
      { key: 'blog1_cat',    label: 'Post 1 — kategoria' },
      { key: 'blog1_title',  label: 'Post 1 — tytuł' },
      { key: 'blog1_excerpt',label: 'Post 1 — zajawka', multiline: true },
      { key: 'blog2_cat',    label: 'Post 2 — kategoria' },
      { key: 'blog2_title',  label: 'Post 2 — tytuł' },
      { key: 'blog2_excerpt',label: 'Post 2 — zajawka', multiline: true },
      { key: 'blog3_cat',    label: 'Post 3 — kategoria' },
      { key: 'blog3_title',  label: 'Post 3 — tytuł' },
      { key: 'blog3_excerpt',label: 'Post 3 — zajawka', multiline: true },
    ],
  },
  {
    id: 'about',
    label: '07 — O nas',
    fields: [
      { key: 'about_eyebrow', label: 'Eyebrow' },
      { key: 'about_h2',     label: 'Tytuł sekcji' },
      { key: 'about_p1',    label: 'Akapit 1', multiline: true },
      { key: 'about_p2',    label: 'Akapit 2', multiline: true },
      { key: 'an1',         label: 'Liczba 1 — opis' },
      { key: 'an2',         label: 'Liczba 2 — opis' },
      { key: 'an3',         label: 'Liczba 3 — opis' },
      { key: 'an4',         label: 'Liczba 4 — opis' },
    ],
  },
  {
    id: 'contact',
    label: '08 — Kontakt',
    fields: [
      { key: 'contact_eyebrow', label: 'Eyebrow' },
      { key: 'contact_h2',     label: 'Tytuł sekcji' },
      { key: 'contact_p',      label: 'Opis', multiline: true },
      { key: 'ci_loc_val',     label: 'Adres' },
      { key: 'footer_tagline', label: 'Footer — tagline' },
      { key: 'footer_copy',    label: 'Footer — copyright' },
    ],
  },
];

const IMAGE_SLOTS = [
  { key: 'portfolio_1', label: 'Realizacja 1' },
  { key: 'portfolio_2', label: 'Realizacja 2' },
  { key: 'portfolio_3', label: 'Realizacja 3' },
  { key: 'portfolio_4', label: 'Realizacja 4' },
  { key: 'about_photo', label: 'O nas — zdjęcie' },
  { key: 'studio_photo', label: 'Studio — zdjęcie' },
];

function ImageSlot({ slotKey, label, images, onSave }) {
  const inputRef = useRef(null);
  const current = images[slotKey];

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onSave(slotKey, ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-img-item">
      <label>{label}</label>
      <div
        className="admin-img-preview"
        onClick={() => inputRef.current?.click()}
        title="Kliknij aby wgrać zdjęcie"
      >
        {current
          ? <img src={current} alt={label} />
          : <span>+ Wgraj</span>
        }
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </div>
  );
}

function SectionGroup({ section, lang, t, overrides, onSave }) {
  const [open, setOpen] = useState(false);
  const langOverrides = overrides[lang] || {};

  return (
    <div className="admin-section-group">
      <button className="admin-section-toggle" onClick={() => setOpen(o => !o)}>
        {section.label}
        <span className="asto-icon">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="admin-fields">
          {section.fields.map(f => {
            const current = langOverrides[f.key] ?? t[f.key] ?? '';
            return (
              <div key={f.key} className="admin-field">
                <label>{f.label}</label>
                {f.multiline ? (
                  <textarea
                    defaultValue={current}
                    rows={3}
                    onBlur={e => onSave(lang, f.key, e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    defaultValue={current}
                    onBlur={e => onSave(lang, f.key, e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AdminPanel({
  t, overrides, lang,
  onSaveField, onReset,
  images, onSaveImage,
  onClose,
}) {
  const [authed, setAuthed]     = useState(() => localStorage.getItem('bigevent_cms_auth') === '1');
  const [pw, setPw]             = useState('');

  const [pwErr, setPwErr]       = useState(false);
  const [activeLang, setActiveLang] = useState(lang);
  const [imgOpen, setImgOpen]   = useState(false);
  const [saved, setSaved]       = useState(false);

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem('bigevent_cms_auth', '1');
      setAuthed(true);
    } else {
      setPwErr(true);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Przywrócić domyślne treści? Zmiany zostaną utracone.')) {
      onReset();
    }
  };

  return (
    <>
      <div className="admin-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <aside className="admin-panel" role="dialog" aria-label="Panel admina">

          {/* Header */}
          <div className="admin-head">
            <h2>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ADD034" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Admin <span>CMS</span>
            </h2>
            <button className="admin-close" onClick={onClose} aria-label="Zamknij">✕</button>
          </div>

          {!authed ? (
            /* ── Login ── */
            <div className="admin-login">
              <p>Wpisz hasło dostępu do panelu CMS.</p>
              <input
                type="password"
                placeholder="Hasło..."
                value={pw}
                onChange={e => { setPw(e.target.value); setPwErr(false); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                autoFocus
              />
              {pwErr && <span className="admin-login-err">Błędne hasło</span>}
              <button className="admin-save" onClick={handleLogin}>Zaloguj →</button>
            </div>
          ) : (
            <>
              {/* ── Lang tabs ── */}
              <div className="admin-lang-tabs">
                {['pl','en','de'].map(l => (
                  <button
                    key={l}
                    className={`admin-lang-btn ${activeLang === l ? 'active' : ''}`}
                    onClick={() => setActiveLang(l)}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* ── Scrollable body ── */}
              <div className="admin-body">

                {/* Image uploads */}
                <div className="admin-img-section">
                  <button
                    className="admin-section-toggle"
                    style={{ padding: '0 0 0.75rem 0', width: '100%' }}
                    onClick={() => setImgOpen(o => !o)}
                  >
                    📷 Zdjęcia & Media
                    <span className="asto-icon">{imgOpen ? '▲' : '▼'}</span>
                  </button>
                  {imgOpen && (
                    <div className="admin-img-grid">
                      {IMAGE_SLOTS.map(slot => (
                        <ImageSlot
                          key={slot.key}
                          slotKey={slot.key}
                          label={slot.label}
                          images={images}
                          onSave={onSaveImage}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Text sections */}
                {SECTIONS.map(section => (
                  <SectionGroup
                    key={section.id}
                    section={section}
                    lang={activeLang}
                    t={t}
                    overrides={overrides}
                    onSave={onSaveField}
                  />
                ))}

              </div>

              {/* Footer actions */}
              <div className="admin-foot">
                <button className="admin-save" onClick={handleSave}>
                  ✓ Zapisano
                </button>
                <button className="admin-reset" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </>
          )}

        </aside>
      </div>

      {saved && <div className="admin-saved-toast">✓ Zmiany zapisane w localStorage</div>}
    </>
  );
}
