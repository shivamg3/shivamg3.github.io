import { Link } from 'react-router-dom';

const PAPER = 'https://www.sciencedirect.com/science/article/pii/S0278612526001056?via%3Dihub';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-portrait"><img src={`${import.meta.env.BASE_URL}me.jpg`} alt="Shivam Garg" /><span>Based in Urbana, Illinois</span></div>
        <div className="hero-words">
          <p className="kicker">Mechanical engineer, researcher & entrepreneur</p>
          <h1>I’m building a more open, intelligent future for manufacturing.</h1>
          <p className="hero-lede">I’m Shivam—a hands-on engineer who moves between machine shops, research labs, and startup rooms to turn ambitious ideas into working systems.</p>
          <div className="hero-actions"><Link className="text-link strong" to="/projects">See what I’m building <span>→</span></Link><Link className="text-link" to="/contact">Start a conversation <span>↗</span></Link></div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Highlights">
        <div><strong>First author</strong><span>Journal of Manufacturing Systems</span></div>
        <div><strong>NAMRC award</strong><span>Outstanding Paper, 2026</span></div>
        <div><strong>$5K winner</strong><span>ToolBit · Illinois deep tech</span></div>
      </section>

      <section className="feature-paper">
        <div className="paper-number">01</div>
        <div className="paper-copy"><p className="kicker">Selected research</p><h2>Cloud-Direct NC: A new generation of numerical control technology</h2><p>Our first-author paper reimagines the architecture behind CNC, connecting machine control with modern cloud, client, and embedded resources.</p><div className="paper-meta">Journal of Manufacturing Systems · Volume 86 · 2026</div></div>
        <a className="round-link" href={PAPER} target="_blank" rel="noreferrer" aria-label="Read the paper">↗</a>
      </section>

      <section className="home-stories">
        <div className="section-intro"><p className="kicker">A few recent chapters</p><h2>Work worth talking about.</h2></div>
        <div className="editorial-list">
          <Link to="/story"><span>Earlier chapter</span><h3>The IIT Delhi years</h3><p>Formula Racing, Infinity Hyperloop, engineering teams, service, and the experiences that shaped what came next.</p><b>Explore →</b></Link>
          <a href="https://csl.illinois.edu/news-and-media/ferreira-group-kicking-off-a-revolution-in-computer-numerical-control-for-manufacturing" target="_blank" rel="noreferrer"><span>Research</span><h3>Rethinking CNC for the cloud era</h3><p>The Illinois story behind our award-winning work and the beginnings of ToolBit.</p><b>Read ↗</b></a>
          <a href="https://landuyt.illinois.edu/news/82922" target="_blank" rel="noreferrer"><span>Entrepreneurship</span><h3>Leading ToolBit to a $5K win</h3><p>Building an open path to smarter CNC machines without replacing existing hardware.</p><b>Read ↗</b></a>
          <a href="https://studyandsave.blogspot.com/2024/07/mastering-your-budget-cost-efficient.html" target="_blank" rel="noreferrer"><span>Writing</span><h3>Lessons beyond engineering</h3><p>Practical thoughts on budgeting, student life, and making deliberate choices.</p><b>Read ↗</b></a>
        </div>
      </section>

      <section className="closing-note"><p>I care about serious engineering, generous collaboration, and building things that earn their place in the world.</p><Link to="/about">A little more about me →</Link></section>
    </div>
  );
}
