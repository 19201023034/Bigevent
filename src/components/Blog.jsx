import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThumbImg = ({ src, alt }) => (
  <img src={src} alt={alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
);

const BLOG_POSTS = [
  {
    id: 1,
    catKey: 'blog1_cat',
    titleKey: 'blog1_title',
    excerptKey: 'blog1_excerpt',
    date: '10.04.2026',
    readKey: 'blog_read_min',
    readVal: '8',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p1-hero.jpg" alt={alt} />,
  },
  {
    id: 2,
    catKey: 'blog2_cat',
    titleKey: 'blog2_title',
    excerptKey: 'blog2_excerpt',
    date: '28.02.2025',
    readKey: 'blog_read_min',
    readVal: '7',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p3-hero.jpg" alt={alt} />,
  },
  {
    id: 3,
    catKey: 'blog3_cat',
    titleKey: 'blog3_title',
    excerptKey: 'blog3_excerpt',
    date: '10.01.2025',
    readKey: 'blog_read_min',
    readVal: '4',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p2-hero.jpg" alt={alt} />,
  },
  {
    id: 4,
    catKey: 'blog4_cat',
    titleKey: 'blog4_title',
    excerptKey: 'blog4_excerpt',
    date: '29.04.2026',
    readKey: 'blog_read_min',
    readVal: '5',
    Thumb: ({ alt }) => <ThumbImg src="/blog-pseo1-hero.jpg" alt={alt} />,
  },
  {
    id: 5,
    catKey: 'blog5_cat',
    titleKey: 'blog5_title',
    excerptKey: 'blog5_excerpt',
    date: '29.04.2026',
    readKey: 'blog_read_min',
    readVal: '4',
    Thumb: ({ alt }) => <ThumbImg src="/blog-pseo2-hero.jpg" alt={alt} />,
  },
  {
    id: 6,
    catKey: 'blog6_cat',
    titleKey: 'blog6_title',
    excerptKey: 'blog6_excerpt',
    date: '29.04.2026',
    readKey: 'blog_read_min',
    readVal: '6',
    Thumb: ({ alt }) => <ThumbImg src="/blog-pseo3-hero.jpg" alt={alt} />,
  },
  {
    id: 7,
    catKey: 'blog7_cat',
    titleKey: 'blog7_title',
    excerptKey: 'blog7_excerpt',
    date: '29.04.2026',
    readKey: 'blog_read_min',
    readVal: '5',
    Thumb: ({ alt }) => <ThumbImg src="/blog-pseo4-hero.jpg" alt={alt} />,
  },
  {
    id: 8,
    catKey: 'blog8_cat',
    titleKey: 'blog8_title',
    excerptKey: 'blog8_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '6',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p4-hero.jpg" alt={alt} />,
  },
  {
    id: 9,
    catKey: 'blog9_cat',
    titleKey: 'blog9_title',
    excerptKey: 'blog9_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '7',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p5-hero.jpg" alt={alt} />,
  },
  {
    id: 10,
    catKey: 'blog10_cat',
    titleKey: 'blog10_title',
    excerptKey: 'blog10_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '5',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p6-hero.jpg" alt={alt} />,
  },
  {
    id: 11,
    catKey: 'blog11_cat',
    titleKey: 'blog11_title',
    excerptKey: 'blog11_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '6',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p7-hero.jpg" alt={alt} />,
  },
  {
    id: 12,
    catKey: 'blog12_cat',
    titleKey: 'blog12_title',
    excerptKey: 'blog12_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '5',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p8-hero.jpg" alt={alt} />,
  },
  {
    id: 13,
    catKey: 'blog13_cat',
    titleKey: 'blog13_title',
    excerptKey: 'blog13_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '5',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p9-hero.jpg" alt={alt} />,
  },
  {
    id: 14,
    catKey: 'blog14_cat',
    titleKey: 'blog14_title',
    excerptKey: 'blog14_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '6',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p10-hero.jpg" alt={alt} />,
  },
  {
    id: 15,
    catKey: 'blog15_cat',
    titleKey: 'blog15_title',
    excerptKey: 'blog15_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '7',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p11-hero.jpg" alt={alt} />,
  },
  {
    id: 16,
    catKey: 'blog16_cat',
    titleKey: 'blog16_title',
    excerptKey: 'blog16_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '5',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p12-hero.jpg" alt={alt} />,
  },
  {
    id: 17,
    catKey: 'blog17_cat',
    titleKey: 'blog17_title',
    excerptKey: 'blog17_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '6',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p13-hero.jpg" alt={alt} />,
  },
  {
    id: 18,
    catKey: 'blog18_cat',
    titleKey: 'blog18_title',
    excerptKey: 'blog18_excerpt',
    date: '27.05.2026',
    readKey: 'blog_read_min',
    readVal: '5',
    Thumb: ({ alt }) => <ThumbImg src="/blog-p14-hero.jpg" alt={alt} />,
  },
];

export default function Blog({ t, lang }) {
  const [showAll, setShowAll] = useState(false);
  const displayedPosts = showAll ? BLOG_POSTS : BLOG_POSTS.slice(0, 3);

  useEffect(() => {
    if (showAll) {
      setTimeout(() => {
        document.querySelectorAll('#blog .reveal').forEach(el => el.classList.add('visible'));
      }, 50);
    }
  }, [showAll]);

  return (
    <section id="blog">
      <div className="container">
        <div className="blog-header reveal">
          <div>
            <p className="eyebrow">{t.blog_eyebrow}</p>
            <h2 className="section-title">{t.blog_h2}</h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--txt-2)', maxWidth: 360 }}>{t.blog_sub}</p>
        </div>

        <div className="blog-grid">
          {displayedPosts.map((post, i) => {
            const { Thumb } = post;

            // Map the blog post id to the correct markdown slug (React Router)
            let articleId = '';
            if (post.id === 1) articleId = 'p1';
            else if (post.id === 2) articleId = 'p3';
            else if (post.id === 3) articleId = 'p2';
            else if (post.id === 4) articleId = 'p-seo-1-de';
            else if (post.id === 5) articleId = 'p-seo-2-de';
            else if (post.id === 6) articleId = 'p-seo-3-de';
            else if (post.id === 7) articleId = 'p-seo-4-de';
            else if (post.id === 8) articleId = 'p4';
            else if (post.id === 9) articleId = 'p5';
            else if (post.id === 10) articleId = 'p6';
            else if (post.id === 11) articleId = 'p7';
            else if (post.id === 12) articleId = 'p8';
            else if (post.id === 13) articleId = 'p9';
            else if (post.id === 14) articleId = 'p10';
            else if (post.id === 15) articleId = 'p11';
            else if (post.id === 16) articleId = 'p12';
            else if (post.id === 17) articleId = 'p13';
            else if (post.id === 18) articleId = 'p14';
            else articleId = 'p1';

            // Use article title as SEO-friendly alt text for thumbnail images
            const imgAlt = t[post.titleKey] || '';

            const isLive = post.id === 1 || post.id === 2 || post.id === 3 || post.id >= 4;
            const postUrl = isLive ? `${lang === 'pl' ? '' : `/${lang}`}/blog/${articleId}` : '#';
            return (
              <Link
                to={postUrl}
                key={post.id}
                style={{ textDecoration: 'none', color: 'inherit', cursor: isLive ? 'pointer' : 'default' }}
                onClick={(e) => {
                  if (!isLive) e.preventDefault();
                }}
                aria-disabled={!isLive}
              >
                <article
                  className={`blog-card reveal reveal-d${i + 1}${!isLive ? ' blog-card--soon' : ''}`}
                >
                  <div className="blog-thumb">
                    <Thumb alt={imgAlt} />
                  </div>
                  <div className="blog-body">
                    <div className="blog-cat">{t[post.catKey]}</div>
                    <div className="blog-title">{t[post.titleKey]}</div>
                    <div className="blog-excerpt">{t[post.excerptKey]}</div>
                    <div className="blog-meta">
                      <span className="blog-date">{post.date}</span>
                      <span className="blog-read">
                        {post.readVal} {t[post.readKey]}
                        <svg viewBox="0 0 14 14" fill="none" stroke="#ADD034" strokeWidth="1.5" strokeLinecap="round" style={{width:12,height:12}}>
                          <path d="M2 7h10M8 3l4 4-4 4"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {!showAll && BLOG_POSTS.length > 3 && (
          <div style={{ textAlign: 'center', marginTop: '50px' }} className="reveal reveal-d3">
            <button 
              onClick={() => setShowAll(true)} 
              style={{ 
                padding: '14px 36px', 
                cursor: 'pointer', 
                background: 'transparent', 
                color: 'var(--lime)', 
                border: '1px solid var(--lime)', 
                borderRadius: '40px', 
                fontFamily: 'Syne, sans-serif', 
                fontWeight: '600', 
                letterSpacing: '0.04em', 
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'var(--lime)';
                e.target.style.color = '#000';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'var(--lime)';
              }}
            >
              {t.blog_read_more}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
