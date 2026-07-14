import { NavLink, Route, Routes } from 'react-router-dom';
import Starfield from './components/Starfield';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Education from './components/Education';

const navItems = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/education', 'Education'],
  ['/projects', 'Projects'],
  ['/contact', 'Contact'],
];

export default function App() {
  return (
    <div className="site-shell">
      <Starfield starCount={140} />

      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="Shivam Garg, home">
          <span className="brand-mark">SG</span>
          <span>Shivam Garg</span>
        </NavLink>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="site-footer">
        © {new Date().getFullYear()} Shivam Garg · Designed and built by me
      </footer>
    </div>
  );
}
