import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { marked } from 'marked';

// Derive hero image URL from article slug
function getHeroImage(slug) {
  if (!slug) return null;
  if (slug.startsWith('p-seo-')) {
    const num = slug.match(/p-seo-(\d+)/)?.[1];
    return num ? `/blog-pseo${num}-hero.jpg` : null;
  }
  return `/blog-${slug}-hero.jpg`;
}

export default function Article({ lang }) {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState({ title: '', description: '', date: '', dateRaw: '', category: '' });
  const [error, setError] = useState(false);

  const heroImage = getHeroImage(slug);
  const heroImageAbsolute = heroImage ? `https://bigevent.de${heroImage}` : 'https://bigevent.de/og-image.jpg';

  const uiTexts = {
    'pl': { back: 'Wróć', err: 'Nie udało się wczytać artykułu.' },
    'en': { back: 'Return', err: 'Failed to load article.' },
    'de': { back: 'Zurück', err: 'Artikel konnte nicht geladen werden.' }
  };
  const t = uiTexts[lang] || uiTexts['en'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      try {
        let fileToFetch = `/${slug}-${lang}.md`;
        if (slug && slug.startsWith('p-seo-')) {
          fileToFetch = `/${slug}.md`;
        }

        const response = await fetch(fileToFetch);
        if (!response.ok) throw new Error('File not found');
        const text = await response.text();

        const catMatch  = text.match(/category:\s*"([^"]+)"/);
        const dateMatch = text.match(/date:\s*"([^"]+)"/);
        const descMatch = text.match(/description:\s*"([^"]+)"/);
        const titleMatch = text.match(/^#\s+(.+)$/m);

        const parsedMeta = {
          category: catMatch  ? catMatch[1]  : 'Blog',
          dateRaw:  dateMatch ? dateMatch[1] : '',
          date:     dateMatch ? dateMatch[1] : '',
          description: descMatch  ? descMatch[1]  : '',
          title:    titleMatch ? titleMatch[1] : 'Blog Article',
        };

        if (parsedMeta.date) {
          try {
            const d = new Date(parsedMeta.date);
            parsedMeta.date = d.toLocaleDateString(
              lang === 'en' ? 'en-US' : lang === 'pl' ? 'pl-PL' : 'de-DE',
              { year: 'numeric', month: 'long', day: 'numeric' }
            );
          } catch(e) {}
        }

        setMeta(parsedMeta);

        // Remove frontmatter, parse markdown
        const rawContent = text.replace(/---[\s\S]*?---/, '');
        let htmlContent = marked.parse(rawContent);

        // Inject category • date under H1
        let metaHtml = '';
        if (parsedMeta.category || parsedMeta.date) {
          metaHtml = `<span class="article-meta">${parsedMeta.category} • ${parsedMeta.date}</span>`;
        }
        if (htmlContent.includes('<h1')) {
          htmlContent = htmlContent.replace(/(<h1[^>]*>.*?<\/h1>)/i, `$1\n${metaHtml}`);
        } else {
          htmlContent = metaHtml + htmlContent;
        }

        setContent(htmlContent);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };

    fetchArticle();
  }, [slug, lang]);

  const canonicalUrl = `https://bigevent.de${lang === 'pl' ? '' : `/${lang}`}/blog/${slug}`;

  return (
    <div className="article-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 20px 60px', color: 'var(--txt)', fontFamily: 'var(--font-body)', lineHeight: '1.6' }}>

      <Helmet>
        <title>{meta.title ? `${meta.title} | BigEvent Blog` : 'BigEvent Blog'}</title>
        {meta.description && <meta name="description" content={meta.description} />}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        {meta.title && <meta property="og:title" content={`${meta.title} | BigEvent Blog`} />}
        {meta.description && <meta property="og:description" content={meta.description} />}
        <meta property="og:url"   content={canonicalUrl} />
        <meta property="og:type"  content="article" />
        <meta property="og:image" content={heroImageAbsolute} />
        <meta property="og:image:width"  content="1600" />
        <meta property="og:image:height" content="900" />
        {meta.title && <meta property="og:image:alt" content={meta.title} />}

        {/* Twitter / X */}
        <meta name="twitter:card"        content="summary_large_image" />
        {meta.title && <meta name="twitter:title" content={`${meta.title} | BigEvent Blog`} />}
        {meta.description && <meta name="twitter:description" content={meta.description} />}
        <meta name="twitter:image" content={heroImageAbsolute} />

        {/* JSON-LD BlogPosting */}
        {meta.title && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": canonicalUrl,
              "headline": meta.title,
              "description": meta.description,
              "image": heroImageAbsolute,
              "datePublished": meta.dateRaw || "2026-05-27",
              "dateModified":  meta.dateRaw || "2026-05-27",
              "author": { "@type": "Organization", "name": "BigEvent", "url": "https://bigevent.de" },
              "publisher": {
                "@type": "Organization",
                "name": "BigEvent",
                "logo": { "@type": "ImageObject", "url": "https://bigevent.de/bigevent_logo.svg" }
              },
              "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
              "inLanguage": lang
            })}
          </script>
        )}
      </Helmet>

      {/* Back button */}
      <Link
        to={lang === 'pl' ? '/' : `/${lang}`}
        className="back-btn"
        style={{
          padding: '10px 20px', marginBottom: '32px',
          border: '1px solid rgba(173,208,52,0.3)', borderRadius: '40px',
          fontSize: '14px', fontWeight: '500', transition: '0.3s',
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          color: 'var(--lime)', textDecoration: 'none'
        }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
        </svg>
        <span>{t.back}</span>
      </Link>

      {/* Hero image */}
      {heroImage && !error && (
        <div style={{ marginBottom: '48px', borderRadius: '12px', overflow: 'hidden', aspectRatio: '16/9', background: '#141414' }}>
          <img
            src={heroImage}
            alt={meta.title || ''}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="eager"
          />
        </div>
      )}

      {/* Article body */}
      {error ? (
        <div style={{ textAlign: 'center', color: 'red', padding: '50px' }}>{t.err}</div>
      ) : content ? (
        <div id="rendered" className="article-content" dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666', fontFamily: 'var(--font-head)' }}>
          Loading…
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .article-meta {
          font-size: 12px; color: #666; text-transform: uppercase;
          letter-spacing: 0.12em; font-weight: 600; margin-bottom: 24px;
          display: block; font-family: var(--font-body);
        }
        .article-content h1, .article-content h2, .article-content h3 { font-family: var(--font-head); color: #ffffff; }
        .article-content h1 { font-size: 2.4rem; margin-bottom: 12px; letter-spacing: -0.02em; line-height: 1.15; }
        .article-content h2 { font-size: 1.6rem; color: var(--lime); margin-top: 50px; margin-bottom: 18px; }
        .article-content h3 { font-size: 1.25rem; margin-top: 30px; color: #ffffff; }
        .article-content p  { margin-bottom: 18px; color: #ccc; }
        .article-content a  { color: var(--lime); text-decoration: none; }
        .article-content a:hover { text-decoration: underline; }
        .article-content table { width: 100%; border-collapse: collapse; margin: 30px 0; background: #141414; border-radius: 8px; overflow: hidden; }
        .article-content th, .article-content td { border-bottom: 1px solid #222; padding: 14px 18px; text-align: left; }
        .article-content th { background: #1A1A1A; color: var(--lime); font-weight: 600; border-bottom: 2px solid var(--lime); font-family: var(--font-head); letter-spacing: 0.02em; }
        .article-content td { font-size: 15px; color: #ccc; }
        .article-content blockquote { border-left: 4px solid var(--lime); margin: 30px 0; color: #999; font-style: italic; background: #141414; padding: 20px 24px; border-radius: 0 8px 8px 0; font-size: 15px; }
        .article-content code { background: #1A1A1A; padding: 2px 7px; border-radius: 4px; font-family: monospace; color: var(--lime); font-size: 0.9em; }
        .article-content pre  { background: #141414; border-radius: 8px; padding: 20px; overflow-x: auto; margin: 24px 0; }
        .article-content pre code { background: none; padding: 0; }
        .article-content hr  { border: 0; height: 1px; background: #2a2a2a; margin: 48px 0; }
        .article-content img { max-width: 100%; border-radius: 8px; margin: 20px 0; }
        .article-content ul, .article-content ol { padding-left: 22px; color: #ccc; font-size: 16px; margin-bottom: 20px; }
        .article-content li  { margin-bottom: 10px; }
        .article-content strong { color: #fff; }
      `}} />
    </div>
  );
}
