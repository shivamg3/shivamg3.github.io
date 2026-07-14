import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContent } from '../data/searchData';

const stories = [
  {
    type: 'Recognition',
    date: 'July 2026',
    title: 'Outstanding Paper in Manufacturing Systems',
    description: 'Our Cloud-Direct NC research received the NAMRC Outstanding Paper award—and is helping rethink how CNC machines connect to cloud intelligence.',
    url: 'https://csl.illinois.edu/news-and-media/ferreira-group-kicking-off-a-revolution-in-computer-numerical-control-for-manufacturing',
  },
  {
    type: 'Venture',
    date: 'May 2026',
    title: 'ToolBit wins $5,000 at Illinois',
    description: 'I led ToolBit to third place in the TE 598 deep-tech pitch competition with an open platform for smarter existing CNC machines.',
    url: 'https://landuyt.illinois.edu/news/82922',
  },
  {
    type: 'From my blog',
    date: 'July 2024',
    title: 'Mastering your budget',
    description: 'A practical guide to cost-efficient living, written for students who want to make thoughtful financial choices.',
    url: 'https://studyandsave.blogspot.com/2024/07/mastering-your-budget-cost-efficient.html',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [showNews, setShowNews] = useState(true);

  const results = query.trim()
    ? searchContent.filter((item) => `${item.title} ${item.content}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  useEffect(() => {
    const timer = window.setTimeout(() => setShowNews(true), 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="home-layout">
      <section className="hero-card glass-card">
        <div className="profile-wrap">
          <img src="/me.jpg" alt="Shivam Garg" className="profile-photo" />
          <div className="availability"><span /> Building the future of manufacturing</div>
        </div>

        <p className="eyebrow">Mechanical engineer · Researcher · Founder</p>
        <h1>Hi, I’m Shivam.</h1>
        <p className="hero-copy">
          I build intelligent CNC systems at the intersection of manufacturing, cloud software, and entrepreneurship.
        </p>

        <div className="hero-actions">
          <button onClick={() => navigate('/projects')} className="button primary">Explore my work</button>
          <button onClick={() => navigate('/contact')} className="button secondary">Let’s connect</button>
        </div>

        <div className="search-wrap">
          <label htmlFor="portfolio-search">Search this portfolio</label>
          <div className="search-control">
            <span aria-hidden="true">⌕</span>
            <input
              id="portfolio-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try CNC, projects, or education"
            />
            {query && <button onClick={() => setQuery('')} aria-label="Clear search">×</button>}
          </div>
          {query && (
            <div className="search-results">
              {results.length ? results.map((item) => (
                <button key={item.id} onClick={() => navigate(item.url)}>
                  <strong>{item.title}</strong><span>{item.content}</span>
                </button>
              )) : <p>No matching pages yet.</p>}
            </div>
          )}
        </div>
      </section>

      <aside className="stories-panel" aria-labelledby="stories-title">
        <div className="stories-heading">
          <div><p className="eyebrow">Featured</p><h2 id="stories-title">Notes & milestones</h2></div>
          <span className="live-dot">Latest</span>
        </div>
        <div className="story-list">
          {stories.map((story) => (
            <a className="story-card" href={story.url} target="_blank" rel="noreferrer" key={story.title}>
              <div className="story-meta"><span>{story.type}</span><time>{story.date}</time></div>
              <h3>{story.title}</h3>
              <p>{story.description}</p>
              <span className="read-more">Read story <b aria-hidden="true">↗</b></span>
            </a>
          ))}
        </div>
        <p className="editorial-note">More writing on manufacturing, industry, travel, and the things I’m learning—coming soon.</p>
      </aside>

      {showNews && (
        <div className="news-toast" role="status">
          <button onClick={() => setShowNews(false)} aria-label="Dismiss announcement">×</button>
          <span className="toast-label">In the news</span>
          <strong>Our CNC research won a NAMRC Outstanding Paper award.</strong>
          <a href={stories[0].url} target="_blank" rel="noreferrer">Read the Illinois story →</a>
        </div>
      )}
    </div>
  );
}
