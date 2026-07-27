import { Link } from 'react-router-dom';
import ManufacturingSlider from './ManufacturingSlider';
import TravelMap from './TravelMap';

export default function About() {
  return <div className="editorial-page">
    <header className="page-lead"><p className="kicker">My story</p><h1>Curious by nature.<br />Hands-on by choice.</h1><p>I’m most at home where hardware, software, and people meet. My work began in production engineering and grew into a fascination with how manufacturing systems can become more open, intelligent, and useful.</p></header>
    <section className="personal-note"><div className="large-quote">“I like getting close enough to a problem to hear what the machine—and the person using it—is really saying.”</div><div><p>I build with Python, C++, microcontrollers, and whatever else the problem calls for. The technology matters, but only after the problem is understood.</p><p>Beyond engineering, I write, travel, explore startup ideas, and collect stories from the people and places that change how I see the world.</p></div></section>
    <section className="story-entry"><div><p className="kicker">An earlier chapter</p><h2>The IIT Delhi years, preserved as they felt then.</h2><p>A visual story of Formula Racing, founding Infinity Hyperloop, teaching, teams, and the experiences that set everything after them in motion.</p></div><Link to="/story">Explore the chapter <span>→</span></Link></section>
    <section className="showcase"><div className="section-intro"><p className="kicker">In the workshop</p><h2>Made with my hands.</h2></div><ManufacturingSlider /></section>
    <section className="showcase"><div className="section-intro"><p className="kicker">Out in the world</p><h2>Places that shaped me.</h2></div><TravelMap /></section>
  </div>;
}
