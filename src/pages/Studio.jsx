import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import StudioPage from '../components/StudioPage';

// Per-language SEO titles and descriptions for the studio page
const studioMeta = {
  pl: {
    title: 'Studio Wirtualnej Produkcji LED 4K — Unreal Engine | BigEvent Aachen',
    description: 'Profesjonalne studio wirtualnej produkcji z ekranem LED P1.9 (10×4 m, 4K+). Zastąp green screen technologią Unreal Engine 5. Wynajem studia per dzień. Aachen, Niemcy.',
  },
  en: {
    title: 'Virtual Production LED Studio 4K — Unreal Engine | BigEvent Aachen',
    description: 'Professional virtual production studio with P1.9 LED wall (10×4 m, 4K+). Replace green screen with Unreal Engine 5 technology. Daily studio rental. Aachen, Germany.',
  },
  de: {
    title: 'Virtual-Production-Studio LED 4K — Unreal Engine | BigEvent Aachen',
    description: 'Professionelles Virtual-Production-Studio mit P1.9 LED-Wand (10×4 m, 4K+). Ersetzen Sie Green Screen durch Unreal Engine 5. Tageweise Studiomiete. Aachen.',
  },
};

export default function Studio({ t, images, lang = 'pl' }) {
  const navigate = useNavigate();
  const m = studioMeta[lang] || studioMeta.pl;

  return (
    <>
      <Helmet>
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <link rel="canonical" href={`https://bigevent.de${lang === 'pl' ? '' : `/${lang}`}/studio-wirtualnej-produkcji`} />
        <meta property="og:title" content={m.title} />
        <meta property="og:description" content={m.description} />
        <meta property="og:url" content={`https://bigevent.de${lang === 'pl' ? '' : `/${lang}`}/studio-wirtualnej-produkcji`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <StudioPage t={t} onClose={() => navigate('/')} images={images} />
    </>
  );
}
