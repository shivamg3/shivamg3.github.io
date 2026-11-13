import { Link } from 'react-router-dom';
import ManufacturingSlider from './ManufacturingSlider';
import TravelMap from './TravelMap';

export default function About() {
  return <div className="editorial-page about-page">
    <header className="page-lead"><h1>About</h1></header>
    <section className="about-profile">
      <figure className="profile-photo"><img src="/me.jpg" alt="Shivam Garg" fetchPriority="high" /></figure>
      <div className="profile-details">
        <h2>Shivam Garg</h2>
        <dl className="facts-list">
          <div><dt>Based in</dt><dd>Urbana, Illinois</dd></div>
          <div><dt>Education</dt><dd>Mechanical Engineering, UIUC<br />Production &amp; Industrial Engineering, IIT Delhi</dd></div>
          <div><dt>Work</dt><dd>CNC systems, motion control, manufacturing</dd></div>
          <div><dt>Tools</dt><dd>Python, C++, microcontrollers, FastAPI</dd></div>
        </dl>
        <Link className="text-link" to="/education">Education <span>→</span></Link>
      </div>
    </section>
    <section className="page-section">
      <div className="section-heading"><h2>IIT Delhi</h2><Link className="text-link" to="/story">2019–2023 <span>→</span></Link></div>
      <Link className="archive-preview" to="/story"><img loading="lazy" src="/story/hyperloop-team.jpg" alt="The Infinity Hyperloop team at IIT Delhi" /><div><h3>Formula Racing &amp;<br />Infinity Hyperloop</h3><span>Archive →</span></div></Link>
    </section>
    <section className="page-section"><div className="section-heading"><h2>Manufacturing</h2></div><ManufacturingSlider /></section>
    <section className="page-section"><div className="section-heading"><h2>Places</h2></div><TravelMap /></section>
  </div>;
}
