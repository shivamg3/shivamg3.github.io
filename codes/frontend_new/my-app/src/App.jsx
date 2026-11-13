import { useEffect, useLayoutEffect, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Projects, { ProjectDetail } from './components/Projects';
import Contact from './components/Contact';
import Education from './components/Education';
import Writing from './components/Writing';
import IITDelhiStory from './components/IITDelhiStory';
import IndiaElectronicsArticle from './components/IndiaElectronicsArticle';
import InvalidInvitation from './components/scheduling/InvalidInvitation';
import PersonalizedMeetingExperience from './components/scheduling/PersonalizedMeetingExperience';
import RouteMetadata from './components/RouteMetadata';
import { verifyInvitationToken } from './invitations/verifyInvitation';

const navItems = [['/projects', 'Work'], ['/about', 'About'], ['/education', 'Education'], ['/writing', 'Writing'], ['/contact', 'Contact']];

function NotFound() {
  return <div className="editorial-page not-found"><h1>404</h1><p>Page not found</p><NavLink className="text-link" to="/">Home →</NavLink></div>;
}

export default function App({ initialInvitationToken = null }) {
  const { pathname } = useLocation();
  const routePath = pathname.replace(/\/+$/, '') || '/';
  const isHome = routePath === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [invitationState, setInvitationState] = useState(() => initialInvitationToken ? { status: 'checking' } : { status: 'none' });

  useLayoutEffect(() => {
    setMenuOpen(false);
    if (typeof document.documentElement.scrollTo === 'function') document.documentElement.scrollTo({ top:0, left:0, behavior:'instant' });
    else document.documentElement.scrollTop = 0;
  }, [pathname]);
  useEffect(() => {
    if (!initialInvitationToken) return undefined;
    let active = true;
    verifyInvitationToken(initialInvitationToken).then(result => {
      if (active) setInvitationState(result.ok ? { status: 'valid', invitation: result.invitation } : { status: 'invalid' });
    });
    return () => { active = false; };
  }, [initialInvitationToken]);

  return <div className={'site-shell' + (isHome ? ' site-shell--kinetic' : '')}>
    <RouteMetadata />
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <NavLink to="/" className="brand" aria-label="Shivam Garg, home">Shivam Garg</NavLink>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? 'Close' : 'Menu'}</button>
      <nav id="site-navigation" className={'site-nav' + (menuOpen ? ' is-open' : '')} aria-label="Primary navigation" onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); document.querySelector('.menu-toggle')?.focus(); } }}>
        {navItems.map(([path, label]) => <NavLink key={path} to={path} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>{label}</NavLink>)}
      </nav>
    </header>
    <main className="site-main" id="main-content" tabIndex="-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/education" element={<Education />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/story" element={<IITDelhiStory />} />
        <Route path="/articles/india-electronics-manufacturing" element={<IndiaElectronicsArticle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Shivam Garg</span><span className="footer-location">Urbana, Illinois</span><a href="mailto:shivam939a8@gmail.com">Email ↗</a></footer>
    {invitationState.status === 'valid' && <PersonalizedMeetingExperience invitation={invitationState.invitation} />}
    {invitationState.status === 'invalid' && <InvalidInvitation onContinue={() => setInvitationState({ status: 'none' })} />}
  </div>;
}
