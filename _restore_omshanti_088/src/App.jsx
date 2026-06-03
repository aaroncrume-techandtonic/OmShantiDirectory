import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Compass, FlaskConical, Sparkles, Zap } from 'lucide-react';
import './App.css';

const services = [
  {
    title: 'Launch Sites',
    description:
      'You get marketing pages that explain your offer fast, reduce friction, and turn attention into action.',
  },
  {
    title: 'Automation Systems',
    description:
      'You get connected workflows and tooling that remove manual drag and keep your team moving.',
  },
  {
    title: 'AI Prototypes',
    description:
      'You get practical AI prototypes built quickly, with enough structure to scale into real products.',
  },
];

const process = [
  {
    step: '01',
    title: 'Signal',
    detail: 'You identify what is blocked, what is working, and what should be built first.',
  },
  {
    step: '02',
    title: 'Blend',
    detail: 'You align strategy, design, and development into one cohesive execution loop.',
  },
  {
    step: '03',
    title: 'Launch',
    detail: 'You launch with measurable outcomes, then iterate quickly using real user data.',
  },
];

const proofPoints = [
  'You move from idea to first launch faster',
  'You get clear product logic, not just polished screens',
  'You launch with performance, accessibility, and SEO included',
];

const credibilityPoints = [
  'You work directly with a founder from discovery to deployment',
  'You receive weekly updates with visible progress',
  'You get launch-ready code with practical handoff',
  'You can keep momentum with post-launch support',
];

const visitorOutcomes = [
  {
    title: 'If your offer is unclear',
    detail:
      'We sharpen your message and structure so visitors understand what you do and why it matters in seconds.',
  },
  {
    title: 'If your process feels heavy',
    detail:
      'We simplify delivery with a focused scope, fast iteration cycle, and direct communication from build to launch.',
  },
];

const directoryCategories = ['All', 'Featured', 'Learning', 'Tools', 'Store', 'Audio', 'Legacy'];

const directoryLinks = [
  {
    title: 'Om Shanti Directory (Featured)',
    category: 'Featured',
    blurb:
      'Featured experience on Tech and Tonic: a guided spiritual learning platform with immersive modules, audio, and progression pathways.',
    url: 'https://aaroncrume-techandtonic.github.io/OmShantiDirectory/',
  },
  {
    title: 'Indigenous Learning Library',
    category: 'Learning',
    blurb:
      'Guided reading space with organized Indigenous knowledge and clear pathways. KILT is an independent land trust and is not affiliated with any tribal entity.',
    url: 'https://aaroncrume-techandtonic.github.io/indigenous-pages/',
  },
  {
    title: 'Modoc History Archive',
    category: 'Learning',
    blurb: 'Historical archive connecting timeline, place, and source material.',
    url: 'https://aaroncrume-techandtonic.github.io/Modoc-War/',
  },
  {
    title: 'Klamath Watershed Story Map',
    category: 'Learning',
    blurb: 'Interactive regional map of rivers, landscapes, and relationships.',
    url: 'https://aaroncrume-techandtonic.github.io/klamath-watershed/',
  },
  {
    title: 'OmniCosmos V3.0',
    category: 'Tools',
    blurb: 'Interactive cosmic reading experience with personalized interpretation.',
    url: 'https://aaroncrume-techandtonic.github.io/OmniCosmosV2.1/?v=3.0.4',
  },
  {
    title: 'Klamath Language App: Medicine Wheel Edition',
    category: 'Tools',
    blurb: 'Interactive Klamath and Modoc vocabulary practice tool.',
    url: 'https://aaroncrume-techandtonic.github.io/klamath-app-medicine-wheel/',
  },
  {
    title: 'Oracle of the Wheel',
    category: 'Tools',
    blurb: 'Numerology and symbolic reflection companion tool.',
    url: 'https://aaroncrume-techandtonic.github.io/OracleNeumero/',
  },
  {
    title: 'Shop Digital Offerings',
    category: 'Store',
    blurb: 'Main storefront for digital releases, tools, and products.',
    url: 'https://techandtonic.store/',
  },
  {
    title: 'Free Guide: Hidden Language of Trauma',
    category: 'Store',
    blurb: 'Free guide and companion resources for reflective study.',
    url: 'https://techandtonic.store/shop/583c5bec-b36c-49f4-bc1d-e06eeaf6ce9f?pageViewSource=lib_view',
  },
  {
    title: 'Featured Product Spotlight',
    category: 'Store',
    blurb: 'Direct access to one highlighted digital offer.',
    url: 'https://techandtonic.store/shop/4440aedc-a40d-45f1-824c-4ca4fe42a3b6',
  },
  {
    title: 'The Basin Beat',
    category: 'Audio',
    blurb: 'Featured long-form show on Spotify.',
    url: 'https://open.spotify.com/show/3ZAlwYu3kQbb2qYhu84X2Y',
  },
  {
    title: 'Romeo Strikes Back',
    category: 'Audio',
    blurb: 'Featured album listening link on Spotify.',
    url: 'https://open.spotify.com/album/3TcPEUdfLsr5Tt1bHnrfqC',
  },
  {
    title: 'Legacy Link Hub',
    category: 'Legacy',
    blurb: 'Bridge hub for familiar legacy routes and prior pathways.',
    url: 'https://beacons.ai/techandtonic',
  },
  {
    title: 'Creators Portfolio',
    category: 'Legacy',
    blurb: 'Creator profile with background, project constellation, and experience.',
    url: 'https://techandtonic.tech/compound-portfolio.html',
  },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favoriteTitles, setFavoriteTitles] = useState(() => {
    const raw = localStorage.getItem('ttDirectoryFavorites');

    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [copiedUrl, setCopiedUrl] = useState('');

  useEffect(() => {
    localStorage.setItem('ttDirectoryFavorites', JSON.stringify(favoriteTitles));
  }, [favoriteTitles]);

  useEffect(() => {
    if (!copiedUrl) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedUrl('');
    }, 1300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copiedUrl]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleDirectoryLinks = useMemo(() => {
    return directoryLinks.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const searchMatch =
        !normalizedQuery ||
        `${item.title} ${item.category} ${item.blurb}`.toLowerCase().includes(normalizedQuery);
      const favoritesMatch = !favoritesOnly || favoriteTitles.includes(item.title);

      return categoryMatch && searchMatch && favoritesMatch;
    });
  }, [activeCategory, normalizedQuery, favoritesOnly, favoriteTitles]);

  const handleToggleFavorite = (title) => {
    setFavoriteTitles((prev) => {
      if (prev.includes(title)) {
        return prev.filter((item) => item !== title);
      }

      return [...prev, title];
    });
  };

  const handleCopyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
    } catch {
      setCopiedUrl('');
    }
  };

  return (
    <div className="tt-shell">
      <div className="tt-noise" aria-hidden="true" />

      <header className="tt-nav">
        <a className="tt-wordmark" href="#top" aria-label="Tech and Tonic home">
          Tech and Tonic
        </a>
        <a className="tt-nav-link" href="#contact">
          Start a project
        </a>
      </header>

      <main id="top">
        <section className="tt-hero">
          <p className="tt-kicker">Your Cure for the Common Day</p>
          <h1>
            Tech that earns attention.
            <span>Systems that keep working after launch.</span>
          </h1>
          <p className="tt-lede">
            You turn rough ideas into credible launches with one focused build partner. Your
            strategy, design, and implementation stay in a single loop, so you move faster without
            sacrificing quality.
          </p>
          <div className="tt-hero-cta">
            <a className="tt-btn tt-btn-primary" href="#contact">
              Book intro call
              <ArrowRight size={18} />
            </a>
            <a className="tt-btn tt-btn-ghost" href="#directory">
              Browse links
            </a>
          </div>
          <div className="tt-proof-strip" role="list" aria-label="Value points">
            {proofPoints.map((item) => (
              <p role="listitem" key={item}>
                <Sparkles size={14} />
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className="tt-panel" id="services" aria-labelledby="services-title">
          <div className="tt-panel-head">
            <h2 id="services-title">What you can launch</h2>
            <p>You get focused delivery built for traction, not process theater.</p>
          </div>
          <div className="tt-grid tt-services-grid">
            {services.map((service, index) => (
              <article className="tt-card" key={service.title} style={{ '--delay': `${index * 120}ms` }}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tt-panel" aria-labelledby="process-title">
          <div className="tt-panel-head">
            <h2 id="process-title">How your project moves</h2>
            <p>You get small-team speed, fast feedback, and clear tradeoffs at every step.</p>
          </div>
          <div className="tt-grid tt-process-grid">
            {process.map((item, index) => (
              <article className="tt-process" key={item.step} style={{ '--delay': `${index * 100}ms` }}>
                <p className="tt-step">{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tt-panel tt-tonic" aria-labelledby="difference-title">
          <div>
            <h2 id="difference-title">Why Tech and Tonic</h2>
            <p>
              You get product-minded technical execution without handoff gaps. Your offer becomes
              clearer, your experience becomes stronger, and your visitors get a confident next step.
            </p>
          </div>
          <div className="tt-tonic-icons" aria-hidden="true">
            <Compass size={20} />
            <FlaskConical size={20} />
            <Zap size={20} />
          </div>
        </section>

        <section className="tt-panel" aria-labelledby="proof-title">
          <div className="tt-panel-head">
            <h2 id="proof-title">Why visitors convert here</h2>
            <p>
              Every section is tuned to answer the three questions your visitors always ask: Is this
              credible, is this clear, and what do I do next?
            </p>
          </div>
          <div className="tt-logo-row" aria-label="Credibility points">
            {credibilityPoints.map((point) => (
              <div className="tt-logo-chip" key={point}>
                {point}
              </div>
            ))}
          </div>
          <div className="tt-grid tt-testimonial-grid">
            {visitorOutcomes.map((item) => (
              <article className="tt-testimonial" key={item.title}>
                <p className="tt-attribution">{item.title}</p>
                <p className="tt-role">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tt-panel" id="directory" aria-labelledby="directory-title">
          <div className="tt-panel-head">
            <h2 id="directory-title">Explore original Tech and Tonic destinations</h2>
            <p>
              This is the Tech and Tonic hub. Om Shanti Directory is featured here alongside your
              learning, tools, store, audio, and legacy destinations.
            </p>
          </div>

          <div className="tt-directory-filters" role="tablist" aria-label="Directory categories">
            {directoryCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`tt-filter ${activeCategory === category ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="tt-directory-toolbar">
            <input
              className="tt-directory-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search links, categories, or topics"
              aria-label="Search destination links"
            />
            <button
              type="button"
              className={`tt-filter ${favoritesOnly ? 'is-active' : ''}`}
              onClick={() => setFavoritesOnly((prev) => !prev)}
              aria-pressed={favoritesOnly}
            >
              Favorites only
            </button>
          </div>

          <p className="tt-directory-count">{visibleDirectoryLinks.length} destinations shown</p>

          <div className="tt-grid tt-directory-grid">
            {visibleDirectoryLinks.map((item) => (
              <article className="tt-directory-card" key={item.title}>
                <p className="tt-directory-tag">{item.category}</p>
                <h3>{item.title}</h3>
                <p>{item.blurb}</p>
                <div className="tt-directory-actions">
                  <a href={item.url} target="_blank" rel="noreferrer noopener">
                    Open destination
                    <ArrowRight size={16} />
                  </a>
                  <button
                    type="button"
                    className={`tt-link-btn ${favoriteTitles.includes(item.title) ? 'is-active' : ''}`}
                    onClick={() => handleToggleFavorite(item.title)}
                    aria-label={`Toggle favorite for ${item.title}`}
                  >
                    {favoriteTitles.includes(item.title) ? 'Unfavorite' : 'Favorite'}
                  </button>
                  <button
                    type="button"
                    className="tt-link-btn"
                    onClick={() => handleCopyLink(item.url)}
                    aria-label={`Copy link for ${item.title}`}
                  >
                    {copiedUrl === item.url ? 'Copied' : 'Copy link'}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="tt-contact" id="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">Ready to launch your next release?</h2>
          <p>
            Email hello@techandtonic.tech with your goal, timeline, and budget range. You will get a
            practical response and a clear next-step recommendation.
          </p>
          <a className="tt-btn tt-btn-primary" href="mailto:hello@techandtonic.tech">
            Contact hello@techandtonic.tech
            <ArrowRight size={18} />
          </a>
        </section>
      </main>
    </div>
  );
}