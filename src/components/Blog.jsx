// Blog thumbnail SVGs
function ThumbLED() {
  return (
    <svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="270" fill="#060608"/>
      <defs>
        <radialGradient id="bg1" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ADD034" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#ADD034" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="480" height="270" fill="url(#bg1)"/>
      {/* LED wall grid */}
      <rect x="40" y="30" width="400" height="180" rx="4" fill="#0A0A10"/>
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((i) => (
        <rect key={i} x={42 + i*19} y="32" width="16" height="11" rx="1" fill="#ADD034"
          opacity={(Math.sin(i * 1.4) * 0.3 + 0.65).toFixed(2)}/>
      ))}
      {[43,55,67,79,91,103,115,127].map((y, i) => (
        <rect key={i} x="42" y={y} width="396" height="11" rx="1" fill="#ADD034"
          opacity={(0.07 - i*0.008).toFixed(3)}/>
      ))}
      <text x="240" y="140" textAnchor="middle" fontSize="28" fill="#ADD034" opacity="0.10"
        fontFamily="Syne,sans-serif" fontWeight="800" letterSpacing="8">LED WALL</text>
      <rect x="40" y="30" width="400" height="180" rx="4" fill="none" stroke="#ADD034" strokeWidth="0.6" opacity="0.2"/>
      {/* Floor */}
      <rect x="40" y="215" width="400" height="6" rx="2" fill="#ADD034" opacity="0.05"/>
      <text x="240" y="255" textAnchor="middle" fontSize="9" fill="#ADD034" opacity="0.25"
        fontFamily="Syne,sans-serif" letterSpacing="4">PIXEL PITCH · TRADE FAIR · LED</text>
    </svg>
  );
}

function ThumbVP() {
  return (
    <svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="270" fill="#040406"/>
      <defs>
        <radialGradient id="bg2" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#ADD034" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#ADD034" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="480" height="270" fill="url(#bg2)"/>
      <rect x="30" y="25" width="420" height="170" rx="5" fill="#060612"/>
      <rect x="32" y="27" width="416" height="166" rx="4" fill="#ADD034" opacity="0.04"/>
      <text x="240" y="122" textAnchor="middle" fontSize="18" fill="#ADD034" opacity="0.18"
        fontFamily="Syne,sans-serif" fontWeight="800" letterSpacing="6">VIRTUAL PRODUCTION</text>
      <rect x="30" y="25" width="420" height="170" rx="5" fill="none" stroke="#ADD034" strokeWidth="0.7" opacity="0.22"/>
      {/* Camera */}
      <rect x="195" y="205" width="90" height="45" rx="5" fill="#111" stroke="#2A2A2A" strokeWidth="0.8"/>
      <circle cx="240" cy="227" r="16" fill="#0A0A0A" stroke="#ADD034" strokeWidth="0.6" opacity="0.5"/>
      <circle cx="240" cy="227" r="9" fill="#060606"/>
      <circle cx="240" cy="227" r="4" fill="#020202"/>
      <line x1="240" y1="250" x2="222" y2="268" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
      <line x1="240" y1="250" x2="240" y2="270" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
      <line x1="240" y1="250" x2="258" y2="268" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="272" cy="211" r="5" fill="#FF3B30" opacity="0.9"/>
    </svg>
  );
}

function ThumbExpo() {
  return (
    <svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="480" height="270" fill="#050505"/>
      <defs>
        <radialGradient id="bg3" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#ADD034" stopOpacity="0.10"/>
          <stop offset="100%" stopColor="#ADD034" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <rect width="480" height="270" fill="url(#bg3)"/>
      {/* Expo hall columns */}
      {[60,160,260,360].map((x, i) => (
        <rect key={i} x={x} y="20" width="8" height="200" rx="2" fill="#ADD034" opacity="0.06"/>
      ))}
      {/* Booth */}
      <rect x="80" y="60" width="320" height="150" rx="4" fill="#0A0A0C"/>
      <rect x="80" y="60" width="320" height="8" rx="1" fill="#ADD034" opacity="0.5"/>
      <rect x="80" y="60" width="8" height="150" rx="1" fill="#ADD034" opacity="0.3"/>
      <rect x="392" y="60" width="8" height="150" rx="1" fill="#ADD034" opacity="0.3"/>
      {/* Screen on booth */}
      <rect x="140" y="80" width="200" height="100" rx="3" fill="#060608"/>
      <rect x="140" y="80" width="200" height="100" rx="3" fill="#ADD034" opacity="0.05"/>
      <text x="240" y="136" textAnchor="middle" fontSize="12" fill="#ADD034" opacity="0.2"
        fontFamily="Syne,sans-serif" fontWeight="700" letterSpacing="2">EXPO 2025</text>
      <rect x="140" y="80" width="200" height="100" rx="3" fill="none" stroke="#ADD034" strokeWidth="0.5" opacity="0.2"/>
      {/* Table */}
      <rect x="120" y="215" width="240" height="8" rx="2" fill="#1A1A1A"/>
      <rect x="150" y="223" width="5" height="30" rx="1" fill="#1A1A1A"/>
      <rect x="325" y="223" width="5" height="30" rx="1" fill="#1A1A1A"/>
      <text x="240" y="258" textAnchor="middle" fontSize="9" fill="#ADD034" opacity="0.22"
        fontFamily="Syne,sans-serif" letterSpacing="3">EXHIBITION · STAND · DISPLAY</text>
    </svg>
  );
}

const BLOG_POSTS = [
  {
    id: 1,
    catKey: 'blog1_cat',
    titleKey: 'blog1_title',
    excerptKey: 'blog1_excerpt',
    date: '10.04.2026',
    readKey: 'blog_read_min',
    readVal: '8',
    Thumb: ThumbLED,
    url: '/blog-broadcast-led.html'
  },
  {
    id: 2,
    catKey: 'blog2_cat',
    titleKey: 'blog2_title',
    excerptKey: 'blog2_excerpt',
    date: '28.02.2025',
    readKey: 'blog_read_min',
    readVal: '7',
    Thumb: ThumbVP,
    url: '#'
  },
  {
    id: 3,
    catKey: 'blog3_cat',
    titleKey: 'blog3_title',
    excerptKey: 'blog3_excerpt',
    date: '10.01.2025',
    readKey: 'blog_read_min',
    readVal: '4',
    Thumb: ThumbExpo,
    url: '#'
  },
];

export default function Blog({ t, lang }) {
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
          {BLOG_POSTS.map((post, i) => {
            const { Thumb } = post;
            
            // Map the blog post id to the correct markdown id
            let articleId = '';
            if (post.id === 1) articleId = 'p1';
            else if (post.id === 2) articleId = 'p3';
            else articleId = 'p1'; // fallback or placeholder logic

            const currentLang = lang || 'pl';
            const postUrl = post.id <= 2 ? `/article.html?id=${articleId}&lang=${currentLang}` : '#';

            const isLive = postUrl !== '#';
            return (
              <a
                href={isLive ? postUrl : undefined}
                key={post.id}
                style={{ textDecoration: 'none', color: 'inherit', cursor: isLive ? 'pointer' : 'default' }}
                aria-disabled={!isLive}
              >
                <article
                  className={`blog-card reveal reveal-d${i + 1}${!isLive ? ' blog-card--soon' : ''}`}
                >
                  <div className="blog-thumb">
                    <Thumb />
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
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
