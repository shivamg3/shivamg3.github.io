import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Starfield from './components/Starfield';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import EServices from './components/EServices';
import Contact from './components/Contact';
import Education from './components/Education';

export default function App() {
  const location = useLocation();
  const showSidebar = location.pathname === '/';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-gray-900 p-4 text-white relative z-0 overflow-hidden">
      <Starfield starCount={200} />
      
      {/* Main Content Area - Centered with adjusted margins */}
      <div className={`
        relative z-10 
        flex justify-center items-center
        transition-transform duration-500 ease-in-out /* Added for smooth animation */
        ${showSidebar 
            ? 'md:-translate-x-20 lg:-translate-x-24 xl:-translate-x-28' /* Replaced margin with transform */
            : 'md:translate-x-0'
        }
      `}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/e-services" element={<EServices />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      
      {/* Conditional Sidebar/Navigation */}
      {showSidebar && (
        <>
          {/* Mobile Menu Button (only on small screens) */}
          {isMobile && (
            <button 
              className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-md p-2 rounded-lg"
              onClick={() => setIsMobile(prev => !prev)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          {/* Vertical Divider - Better positioned to match actual sidebar position */}
          <div className={`
            absolute hidden md:block
            top-20 bottom-20 
            md:right-48 lg:right-56 xl:right-64
            w-px bg-white/30 sidebar-line-appear z-0
          `}></div>

          {/* Responsive Sidebar - ADJUSTED POSITION */}
          <div className={`
            ${isMobile ? 
              'fixed inset-0 bg-black/90 z-40 flex items-center justify-center' : 
              'absolute top-1/2 transform -translate-y-1/2 sidebar-appear z-20'}
            ${isMobile ? 'w-full' : 'md:right-4 lg:right-8 xl:right-12'}
            ${isMobile ? '' : 'bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl md:w-40 lg:w-44 xl:w-48'}
          `}>
            <ul className={`
              ${isMobile ? 'space-y-8 text-2xl' : 'space-y-4 text-lg'} 
              font-semibold text-white/90
            `}>
              {/* Navigation items remain the same */}
              {/* Home */}
              <li className="relative group">
                <Link 
                  to="/" 
                  className="block hover:text-yellow-300 hover:translate-x-1 hover:shadow-md transition-all duration-200"
                  onClick={() => isMobile && setIsMobile(true)}
                >
                  Home
                </Link>
                <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-64 h-48 md:w-72 md:h-52 lg:w-96 lg:h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100] hidden md:block">
                  <img src="/preview-home.png" alt="Home Preview" className="w-full h-full object-cover rounded-lg" />
                </div>
              </li>

              {/* About */}
              <li className="relative group">
                <Link 
                  to="/about" 
                  className="block hover:text-yellow-300 hover:translate-x-1 transition-all duration-200"
                  onClick={() => isMobile && setIsMobile(true)}
                >
                  About
                </Link>
                <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-64 h-48 md:w-72 md:h-52 lg:w-96 lg:h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100] hidden md:block">                  
                  <img src="/preview-about.png" alt="About Preview" className="w-full h-full object-cover rounded-lg" />
                </div>
              </li>

              {/* Education */}
              <li className="relative group">
                <Link 
                  to="/education" 
                  className="block hover:text-yellow-300 hover:translate-x-1 transition-all duration-200"
                  onClick={() => isMobile && setIsMobile(true)}
                >
                  Education
                </Link>
                <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-64 h-48 md:w-72 md:h-52 lg:w-96 lg:h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100] hidden md:block">                  
                  <img src="/preview-education.png" alt="Education Preview" className="w-full h-full object-cover rounded-lg" />
                </div>
              </li>

              {/* Projects */}
              <li className="relative group">
                <Link 
                  to="/projects" 
                  className="block hover:text-yellow-300 hover:translate-x-1 hover:shadow-md transition-all duration-200"
                  onClick={() => isMobile && setIsMobile(true)}
                >
                  Projects
                </Link>
                <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-64 h-48 md:w-72 md:h-52 lg:w-96 lg:h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100] hidden md:block">                  
                  <img src="/preview-projects.png" alt="Projects Preview" className="w-full h-full object-cover rounded-lg" />
                </div>
              </li>

              {/* e-Services */}
              <li className="relative group">
                <Link 
                  to="/e-services" 
                  className="block hover:text-yellow-300 hover:translate-x-1 hover:shadow-md transition-all duration-200"
                  onClick={() => isMobile && setIsMobile(true)}
                >
                  e-Services
                </Link>
                <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-64 h-48 md:w-72 md:h-52 lg:w-96 lg:h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100] hidden md:block">
                  <img src="/preview-e-services.png" alt="e-Services Preview" className="w-full h-full object-cover rounded-lg" />
                </div>
              </li>

              {/* Contact */}
              <li className="relative group">
                <Link 
                  to="/contact" 
                  className="block hover:text-yellow-300 hover:translate-x-1 hover:shadow-md transition-all duration-200"
                  onClick={() => isMobile && setIsMobile(true)}
                >
                  Contact
                </Link>
                <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-64 h-48 md:w-72 md:h-52 lg:w-96 lg:h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100] hidden md:block">
                  <img src="/preview-contact.png" alt="Contact Preview" className="w-full h-full object-cover rounded-lg" />
                </div>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Copyright Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-white/50 text-xs sm:text-sm z-40">
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-x-2 mb-1">
            <span>© {new Date().getFullYear()}</span>
            <span className="hidden sm:inline">•</span>
            <span>Designed & Built by Shivam Garg</span>
            <span className="hidden sm:inline">•</span>
            <span>All Rights Reserved</span>
          </div>
          <div className="text-xs text-white/30 hover:text-white/50 transition-colors">
            <a href="https://github.com/shivamg3" target="_blank" rel="noopener noreferrer">
              v1.0.0
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}