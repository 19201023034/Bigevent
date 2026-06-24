export default function Impressum({ onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-2)',
          border: '0.5px solid var(--border-hi)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          maxWidth: 520,
          width: '100%',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            background: 'var(--bg-4)', border: '0.5px solid var(--border)',
            borderRadius: '50%', width: 32, height: 32,
            cursor: 'pointer', color: 'var(--txt-2)',
            fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label="Close"
        >✕</button>

        <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>Impressum</p>
        <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          BigEvent
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: 14, color: 'var(--txt-2)', lineHeight: 1.7 }}>
          <div>
            <div style={{ color: 'var(--txt-3)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Firma</div>
            <div style={{ color: 'var(--txt)' }}>Bigevent — Product- &amp; Exhibition Design</div>
          </div>
          <div>
            <div style={{ color: 'var(--txt-3)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Adresse</div>
            <div style={{ color: 'var(--txt)' }}>Krantzstrasse 7<br/>Gebäude 27<br/>52070 Aachen</div>
          </div>
          <div>
            <div style={{ color: 'var(--txt-3)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Inhaber</div>
            <div style={{ color: 'var(--txt)' }}>Dipl.-Des. Thomas Kudla</div>
          </div>
          <div>
            <div style={{ color: 'var(--txt-3)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Kontakt</div>
            <div style={{ color: 'var(--txt)' }}>
              T: +49 (0)163 771 674 4<br/>
              F: +49 (0)321 212 814 00<br/>
              <a href="mailto:info@bigevent.de" style={{ color: 'var(--lime)' }}>info@bigevent.de</a>
            </div>
          </div>
          <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: '1rem', marginTop: '0.25rem' }}>
            <div style={{ color: 'var(--txt-3)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>Credits</div>
            <div>Konzept &amp; Layout: <a href="https://www.semastudio.pl" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lime)' }}>www.semastudio.pl</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
