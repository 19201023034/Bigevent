import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Studio from '../components/Studio';
import Specs from '../components/Specs';
import LedCalculator from '../components/LedCalculator';
import Portfolio from '../components/Portfolio';
import Blog from '../components/Blog';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import Contact from '../components/Contact';

const faqTranslations = {
  pl: [
    {
      q: "Jaki pixel pitch ekranu LED wybrać na targi?",
      a: "Na targi z odległością oglądania 3–5 m polecamy P3.9. Przy bliższym kontakcie (1–2 m, np. stoisko premium) lepszy będzie P1.9 indoor z gęstością 512 pikseli/m."
    },
    {
      q: "Jak szybko mogę otrzymać wycenę na wynajem ekranu LED?",
      a: "Odpowiadamy na każde zapytanie w ciągu 24 godzin. Wystarczy podać datę eventu, lokalizację i szacunkowy rozmiar ekranu — resztą zajmiemy się my."
    },
    {
      q: "Czy BigEvent zajmuje się transportem i montażem ekranów LED?",
      a: "Tak — obsługujemy kompleksowo: transport, montaż, obsługę techniczną na miejscu i demontaż. Działamy w całej Polsce i Niemczech."
    },
    {
      q: "Na czym polega wirtualna produkcja w studiu LED?",
      a: "Studio wirtualnej produkcji używa wysokorozdzielczej ściany LED tła sterowanego w czasie rzeczywistym przez Unreal Engine. Eliminuje green screen i kosztowną postprodukcję."
    },
    {
      q: "Czy ekrany LED BigEvent działają na zewnątrz?",
      a: "Tak. Nasze panele outdoor P3.9 mają ochronę IP65, jasność 4000 nit i kontrast 8500:1 — widoczne w pełnym słońcu na festiwalach i eventach plenerowych."
    }
  ],
  en: [
    {
      q: "Which LED screen pixel pitch should I choose for a trade fair?",
      a: "For trade fairs with a viewing distance of 3–5 m, we recommend P3.9. For closer viewing (1–2 m, e.g., premium booth), P1.9 indoor is better."
    },
    {
      q: "How quickly can I get a quote for LED screen rental?",
      a: "We reply to every inquiry within 24 hours. Just provide the event date, location, and estimated screen size."
    },
    {
      q: "Does BigEvent handle transport and installation of LED screens?",
      a: "Yes — we offer a full-service package: transport, installation, on-site technical support, and dismantling. We operate in Germany and Poland."
    },
    {
      q: "What is virtual production in an LED studio?",
      a: "A virtual production studio uses a high-resolution LED wall as a background controlled in real time by Unreal Engine. It eliminates green screen and costly post-production."
    },
    {
      q: "Do BigEvent's LED screens work outdoors?",
      a: "Yes. Our P3.9 outdoor panels feature IP65 protection, 4000 nits brightness, and an 8500:1 contrast ratio — fully visible in direct sunlight."
    }
  ],
  de: [
    {
      q: "Welchen LED-Pixelabstand sollte ich für eine Messe wählen?",
      a: "Für Messen mit einem Betrachtungsabstand von 3–5 m empfehlen wir P3.9. Für nähere Betrachtung (1–2 m, z. B. Premium-Stand) ist P1.9 Indoor besser."
    },
    {
      q: "Wie schnell erhalte ich ein Angebot für die LED-Screen-Miete?",
      a: "Wir antworten auf jede Anfrage innerhalb von 24 Stunden. Geben Sie einfach das Eventdatum, den Ort und die geschätzte Bildschirmgröße an."
    },
    {
      q: "Übernimmt BigEvent den Transport und die Montage der LED-Screens?",
      a: "Ja — wir bieten einen Full-Service: Transport, Montage, technischen Support vor Ort und Demontage. Wir sind in Deutschland und Polen tätig."
    },
    {
      q: "Was ist virtuelle Produktion in einem LED-Studio?",
      a: "Ein Virtual-Production-Studio nutzt eine hochauflösende LED-Wand als Hintergrund, der in Echtzeit von der Unreal Engine gesteuert wird. Es ersetzt Greenscreens."
    },
    {
      q: "Sind die LED-Screens von BigEvent für den Außenbereich geeignet?",
      a: "Ja. Unsere P3.9 Outdoor-Panels verfügen über Schutzart IP65, 4000 Nits Helligkeit und ein Kontrastverhältnis von 8500:1 — auch bei direktem Sonnenlicht gut lesbar."
    }
  ]
};

export default function Home({ t, images, lang }) {
  const navigate = useNavigate();
  const faqList = faqTranslations[lang] || faqTranslations.pl;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <main>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      <Hero t={t} />
      <Services t={t} images={images} />
      <Studio t={t} images={images} onNavigate={() => navigate('/studio-wirtualnej-produkcji')} />
      <Specs t={t} />
      <LedCalculator t={t} />
      
      {/* Przycisk przejścia do podstrony SEO Wynajmu */}
      <div className="container" style={{ textAlign: 'center', paddingBottom: '80px' }}>
         <button className="form-submit reveal reveal-d2" style={{ width: 'auto' }} onClick={() => navigate('/wynajem-ekranow-led')}>
            Więcej o wynajmie LED ➔
         </button>
      </div>

      <Portfolio t={t} images={images} />
      <Blog t={t} lang={lang} />
      <Testimonials t={t} images={images} />
      <About t={t} images={images} />
      <Contact t={t} />
    </main>
  );
}
