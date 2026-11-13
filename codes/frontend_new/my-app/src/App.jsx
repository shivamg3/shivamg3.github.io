import { useEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Education from './components/Education';
import IITDelhiStory from './components/IITDelhiStory';
import IndiaElectronicsArticle from './components/IndiaElectronicsArticle';
import InvalidInvitation from './components/scheduling/InvalidInvitation';
import PersonalizedMeetingExperience from './components/scheduling/PersonalizedMeetingExperience';
import { verifyInvitationToken } from './invitations/verifyInvitation';

const navItems = [['/', 'Home'], ['/about', 'Story'], ['/projects', 'Work'], ['/education', 'Journey'], ['/contact', 'Connect']];
const homeNavItems = [['/projects', 'Work'], ['/about', 'Story'], ['/contact', 'Say hello']];

export default function App({ initialInvitationToken = null }) {
  const { pathname } = useLocation();
  const routePath = pathname.replace(/\/+$/, '') || '/';
  const isHome = routePath === '/' || !['/about', '/projects', '/education', '/story', '/articles/india-electronics-manufacturing', '/contact'].includes(routePath);
  const [invitationState, setInvitationState] = useState(() => initialInvitationToken ? { status: 'checking' } : { status: 'none' });

  useEffect(() => {
    if (!initialInvitationToken) return undefined;
    let active = true;
    verifyInvitationToken(initialInvitationToken).then((result) => {
      if (!active) return;
      setInvitationState(result.ok ? { status: 'valid', invitation: result.invitation } : { status: 'invalid' });
    });
    return () => { active = false; };
  }, [initialInvitationToken]);

  return (
    <div className={`site-shell${isHome ? ' site-shell--kinetic' : ''}`}>
      <header className="site-header">
        <NavLink to="/" className="brand" aria-label="Shivam Garg, home">
          <span className="brand-mark">{isHome ? <svg className="kinetic-brand-symbol" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 2v28M2 16h28M6.1 6.1l19.8 19.8M6.1 25.9 25.9 6.1" stroke="currentColor" strokeWidth="3.5" /></svg> : 'S'}</span><span>Shivam Garg</span>
        </NavLink>
        <nav className="site-nav" aria-label="Primary navigation">
          {(isHome ? homeNavItems : navItems).map(([path, label]) => <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{label}{isHome && path === '/contact' && <span className="kinetic-nav-arrow" aria-hidden="true">↗</span>}</NavLink>)}
        </nav>
      </header>
      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/story" element={<IITDelhiStory />} />
          <Route path="/articles/india-electronics-manufacturing" element={<IndiaElectronicsArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="site-footer"><span>Shivam Garg</span><span>Engineer · Researcher · Builder</span><span>© {new Date().getFullYear()}</span></footer>
      {invitationState.status === 'valid' && <PersonalizedMeetingExperience invitation={invitationState.invitation} />}
      {invitationState.status === 'invalid' && <InvalidInvitation onContinue={() => setInvitationState({ status: 'none' })} />}
    </div>
  );
}
