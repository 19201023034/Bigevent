import React from 'react';
import { Helmet } from 'react-helmet-async';
import Specs from '../components/Specs';
import LedCalculator from '../components/LedCalculator';
import Contact from '../components/Contact';

// Per-language SEO titles and descriptions for the rental page
const rentalMeta = {
  pl: {
    title: 'Wynajem Ekranów LED na Targi i Eventy — Kalkulator i Specyfikacje | BigEvent',
    description: 'Wynajem ekranów LED P1.9 i P3.9 na targi, konferencje i eventy w Polsce i Niemczech. Skorzystaj z kalkulatora wynajmu i sprawdź pełne specyfikacje techniczne. Transport, montaż, obsługa. Aachen.',
    h1: 'Wynajem Ekranów LED — Targi, Konferencje, Eventy',
    sub: 'Skorzystaj z naszego kalkulatora, aby wstępnie oszacować koszt wynajmu ekranu LED P1.9 lub P3.9. Poniżej znajdziesz pełną specyfikację techniczną naszych urządzeń.',
  },
  en: {
    title: 'LED Screen Rental for Trade Fairs & Events — Calculator & Specs | BigEvent',
    description: 'LED screen rental (P1.9 & P3.9) for trade fairs, conferences and events in Germany and Poland. Use our rental calculator and check full technical specifications. Transport & installation. Aachen.',
    h1: 'LED Screen Rental — Trade Fairs, Conferences, Events',
    sub: 'Use our calculator to get an initial estimate for your LED screen rental. Below you will find the full technical specifications for our P1.9 and P3.9 panels.',
  },
  de: {
    title: 'LED-Screen-Vermietung für Messen & Events — Rechner & Specs | BigEvent',
    description: 'LED-Screen-Vermietung (P1.9 & P3.9) für Messen, Konferenzen und Events in Deutschland und Polen. Nutzen Sie unseren Mietrechner und prüfen Sie die technischen Daten. Transport & Montage. Aachen.',
    h1: 'LED-Screen-Vermietung — Messen, Konferenzen, Events',
    sub: 'Nutzen Sie unseren Rechner, um die Kosten für Ihre LED-Screen-Miete vorab zu schätzen. Darunter finden Sie die vollständigen technischen Daten unserer P1.9- und P3.9-Panels.',
  },
};

export default function Rental({ t, images, lang = 'pl' }) {
  const m = rentalMeta[lang] || rentalMeta.pl;

  return (
    <main className="rental-page" style={{ paddingTop: '80px' }}>
      <Helmet>
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <link rel="canonical" href={`https://bigevent.de${lang === 'pl' ? '' : `/${lang}`}/wynajem-ekranow-led`} />
        <meta property="og:title" content={m.title} />
        <meta property="og:description" content={m.description} />
        <meta property="og:url" content={`https://bigevent.de${lang === 'pl' ? '' : `/${lang}`}/wynajem-ekranow-led`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                "@id": `https://bigevent.de${lang === 'pl' ? '' : `/${lang}`}/wynajem-ekranow-led#panel-p19`,
                "name": lang === 'de' ? "LED-Wand Indoor P1.9 — Absen NT1.9 V2" : (lang === 'en' ? "LED Panel Indoor P1.9 — Absen NT1.9 V2" : "Panel LED Indoor P1.9 — Absen NT1.9 V2"),
                "description": lang === 'de' 
                  ? "Hochauflösendes Indoor-LED-Panel mit 1,9 mm Pixelabstand, 7680 Hz Bildwiederholrate, 5000:1 Kontrast, HDR10+. Perfekt für virtuelle Produktionen und XR-Studios."
                  : (lang === 'en'
                    ? "High-resolution indoor LED panel with 1.9 mm pixel pitch, 7680 Hz refresh rate, 5000:1 contrast ratio, HDR10+ color space. Designed for Virtual Production, TV and XR."
                    : "Wysokorozdzielczy panel LED indoor z pixel pitch 1.9 mm, odświeżanie 7680 Hz, kontrast 5000:1, przestrzeń barw HDR10+ (94% DCI-P3). Dedykowany do Virtual Production, TV i studio XR."),
                "brand": { "@type": "Brand", "name": "Absen" },
                "offers": {
                  "@type": "Offer",
                  "seller": { "@type": "Organization", "name": "BigEvent", "url": "https://bigevent.de" },
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "EUR",
                  "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "description": lang === 'de' ? "Preis auf Anfrage" : (lang === 'en' ? "Price on request" : "Cena na zapytanie") }
                }
              },
              {
                "@type": "Product",
                "@id": `https://bigevent.de${lang === 'pl' ? '' : `/${lang}`}/wynajem-ekranow-led#panel-p39`,
                "name": lang === 'de' ? "LED-Wand Outdoor P3.9 — Absen NT3.9W V2" : (lang === 'en' ? "LED Panel Outdoor P3.9 — Absen NT3.9W V2" : "Panel LED Outdoor P3.9 — Absen NT3.9W V2"),
                "description": lang === 'de'
                  ? "Outdoor-LED-Panel mit 3,9 mm Pixelabstand, 4000 Nits Helligkeit, 8500:1 Kontrast, IP65 Schutzklasse. Ideal für Festivals, Konzerte und Open-Air-Events."
                  : (lang === 'en'
                    ? "Outdoor LED panel with 3.9 mm pixel pitch, 4000 nits brightness, 8500:1 contrast ratio, IP65 waterproof. Ideal for festivals, live concerts and outdoor events."
                    : "Panel LED outdoor z pixel pitch 3.9 mm, jasność 4000 nit, kontrast 8500:1, odświeżanie 7680 Hz, ochrona IP65. Idealne na festiwale, targi i events plenerowe."),
                "brand": { "@type": "Brand", "name": "Absen" },
                "offers": {
                  "@type": "Offer",
                  "seller": { "@type": "Organization", "name": "BigEvent", "url": "https://bigevent.de" },
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "EUR",
                  "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "description": lang === 'de' ? "Preis auf Anfrage" : (lang === 'en' ? "Price on request" : "Cena na zapytanie") }
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <section className="rental-header" style={{ textAlign: 'center', padding: '60px 20px 20px' }}>
        <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '3rem', color: '#fff', marginBottom: '20px' }}>
          {m.h1}
        </h1>
        <p style={{ color: '#ccc', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          {m.sub}
        </p>
      </section>

      <LedCalculator t={t} />
      <Specs t={t} />
      <Contact t={t} />
    </main>
  );
}
