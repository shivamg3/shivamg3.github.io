import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const storyAsset = (name) => `${import.meta.env.BASE_URL}story/${name}`;

export default function IITDelhiStory() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const previousDescription = description?.content;
    const previousCanonical = canonical?.href;

    document.title = 'The IIT Delhi Years — Shivam Garg';
    if (description) description.content = 'An early chapter in Shivam Garg’s story: IIT Delhi, Formula Racing, Infinity Hyperloop, engineering, teaching, teams, and the experiences that shaped what came next.';
    if (canonical) canonical.href = 'https://shivamg3.github.io/story/';

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
    };
  }, []);

  return (
    <article className="iit-story-page">
      <header className="iit-story-hero">
        <div className="iit-story-intro">
          <p className="kicker">Archive chapter · IIT Delhi · 2019–2023</p>
          <h1>The years that made engineering personal.</h1>
          <p className="iit-story-lede">Before Illinois—and before the research, products, and ventures that followed—there was a formative chapter at IIT Delhi: learning to build, bringing teams together, and discovering the kind of engineer I wanted to become.</p>
          <aside className="chapter-context" aria-label="Story context">
            <span>Important context</span>
            <strong>This is one early chapter, not my complete story.</strong>
            <p>The source deck was assembled before my time at UIUC. This page preserves that period while the rest of this website carries the work forward.</p>
          </aside>
          <div className="iit-story-actions">
            <a className="text-link strong" href="#beginning">Read the chapter <span>↓</span></a>
            <Link className="text-link" to="/projects">See current work <span>→</span></Link>
          </div>
        </div>
        <figure className="iit-story-portrait">
          <img src={storyAsset('graduation.jpg')} alt="Shivam Garg with his parents at his IIT Delhi graduation" />
          <figcaption>Graduation day, with the people who made it possible.</figcaption>
        </figure>
      </header>

      <nav className="chapter-nav" aria-label="IIT Delhi story chapters">
        <a href="#beginning"><span>01</span>Beginning</a>
        <a href="#formula"><span>02</span>Formula Racing</a>
        <a href="#hyperloop"><span>03</span>Infinity Hyperloop</a>
        <a href="#service"><span>04</span>Service</a>
        <a href="#beyond"><span>05</span>Beyond campus</a>
      </nav>

      <section className="iit-beginning story-section" id="beginning">
        <div className="story-section-heading">
          <p className="kicker">Production & Industrial Engineering</p>
          <h2>It started with learning how things are made.</h2>
        </div>
        <div className="iit-beginning-copy">
          <p className="story-dropcap">IIT Delhi gave me a rigorous foundation in production and industrial engineering—and the room to turn theory into things I could hold, test, rebuild, and improve.</p>
          <div className="story-facts">
            <div><strong>Grade A</strong><span>Bachelor’s thesis: Design and Manufacturing of Nano Heat Sinks</span></div>
            <div><strong>2×</strong><span>IIT Delhi Merit Award for academic excellence</span></div>
            <div><strong>Teaching</strong><span>Undergraduate teaching assistant in Solid Mechanics</span></div>
          </div>
        </div>
      </section>

      <section className="story-section story-feature" id="formula">
        <div className="story-feature-copy">
          <p className="kicker">From engineering solutions</p>
          <h2>Learning composites by building for the track.</h2>
          <p>With AXLR8R Formula Racing, engineering stopped being a set of clean diagrams. It became resin, vacuum bags, carbon fiber, deadlines, and a bodywork system that had to work on a real race car.</p>
          <p>As a junior engineer, I helped ideate and develop vacuum-bagged CFRP bodywork—an early lesson in hands-on manufacturing and in the quiet persistence behind every finished component.</p>
        </div>
        <div className="story-formula-gallery">
          <figure className="story-image-tall"><img loading="lazy" src={storyAsset('formula-panel.jpg')} alt="Shivam holding a newly fabricated carbon-fiber body panel" /></figure>
          <figure><img loading="lazy" src={storyAsset('formula-composites.jpg')} alt="Formula Racing teammates preparing a composite layup" /></figure>
          <figure><img loading="lazy" src={storyAsset('formula-team.jpg')} alt="The AXLR8R Formula Racing team with its race car" /></figure>
        </div>
      </section>

      <section className="story-section hyperloop-story" id="hyperloop">
        <div className="story-section-heading">
          <p className="kicker">To engineering teams</p>
          <h2>Infinity Hyperloop began as an idea—and became a community.</h2>
        </div>
        <div className="hyperloop-lead">
          <p>Founding and heading IIT Delhi’s first hyperloop team taught me that ambitious engineering is also an exercise in trust. I ran daily briefings, mentored the brakes department, secured sponsorships, and helped establish the team as an official campus entity.</p>
          <figure><img loading="lazy" src={storyAsset('hyperloop-briefing.jpg')} alt="An outdoor Infinity Hyperloop team briefing at IIT Delhi" /><figcaption>Building alignment before building hardware.</figcaption></figure>
        </div>
        <div className="hyperloop-grid">
          <figure><img loading="lazy" src={storyAsset('hyperloop-workshop.jpg')} alt="Infinity Hyperloop teammates working together in a lecture hall" /></figure>
          <figure className="hyperloop-pod"><img loading="lazy" src={storyAsset('hyperloop-pod.jpg')} alt="Infinity Hyperloop team members with their Prithvi pod" /></figure>
          <figure><img loading="lazy" src={storyAsset('hyperloop-award.jpg')} alt="Infinity Hyperloop team members receiving sponsorship support" /></figure>
        </div>
        <blockquote>“The most lasting thing we built was the team itself.”</blockquote>
        <figure className="story-wide-team"><img loading="lazy" src={storyAsset('hyperloop-team.jpg')} alt="The Infinity Hyperloop team together at IIT Delhi" /></figure>
      </section>

      <section className="story-section service-story" id="service">
        <div className="service-copy">
          <p className="kicker">Social conscience</p>
          <h2>Educate to empower.</h2>
          <div className="service-points">
            <article><span>01</span><div><h3>She Codes India</h3><p>Facilitated basic computer-skills sessions for more than 80 girls aged 13–14.</p></div></article>
            <article><span>02</span><div><h3>Unnati Teaching Project</h3><p>Mentored students in classes IX and X as they explored pathways into STEM.</p></div></article>
          </div>
        </div>
        <div className="service-gallery">
          <img loading="lazy" src={storyAsset('she-codes.jpg')} alt="Shivam helping students during a She Codes India session" />
          <img loading="lazy" src={storyAsset('computer-lab.jpg')} alt="Students learning computer skills together in a lab" />
        </div>
      </section>

      <section className="story-section beyond-story" id="beyond">
        <div className="story-section-heading">
          <p className="kicker">Beyond the work</p>
          <h2>Curiosity needed a wider world.</h2>
          <p>Travel, food, long drives, mountains, and the occasional well-earned nap kept life larger than the next deadline.</p>
        </div>
        <div className="beyond-gallery">
          <figure><img loading="lazy" src={storyAsset('mountains.jpg')} alt="Shivam standing in the mountains on a winter trip" /><figcaption>Wander often</figcaption></figure>
          <figure><img loading="lazy" src={storyAsset('window.jpg')} alt="Shivam looking through a patterned window toward the landscape" /><figcaption>Look differently</figcaption></figure>
          <figure><img loading="lazy" src={storyAsset('beach.jpg')} alt="Shivam relaxing on a beach chair" /><figcaption>Rest deliberately</figcaption></figure>
        </div>
      </section>

      <section className="what-came-next">
        <p className="kicker">What came next</p>
        <h2>This archive stops in 2024. The work did not.</h2>
        <p>Since this deck was assembled, my path has expanded through UIUC, published manufacturing research, award-winning CNC work, ToolBit, and projects that are still taking shape. Those chapters live across the rest of this website—and will keep evolving.</p>
        <div className="what-next-links">
          <Link to="/">See the latest highlights <span>→</span></Link>
          <Link to="/projects">Explore current work <span>→</span></Link>
          <Link to="/about">Meet the person behind it <span>→</span></Link>
        </div>
        <a className="archive-deck-link" href={storyAsset('glimpse-of-shivam-garg-2024.pdf')} target="_blank" rel="noreferrer">View the original pre-UIUC deck <span>↗</span></a>
      </section>
    </article>
  );
}
