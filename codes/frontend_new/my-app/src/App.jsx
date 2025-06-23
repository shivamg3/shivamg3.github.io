import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Starfield from './components/Starfield'; // 1. Import the new component
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import EServices from './components/EServices';
import Contact from './components/Contact';
import Education from './components/Education';

export default function App() {
  const location = useLocation();
  const showSidebar = location.pathname === '/';
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-gray-900 p-4 text-white relative z-0 overflow-hidden">
      <Starfield starCount={200} /> {/* 2. Add the component here */}
      {/* Starfield Background */}
      {/* <div className="absolute inset-0 stars z-0"></div> */}
      {/* Conditional Sidebar */}
      {showSidebar && (
        <>
      {/* Vertical Divider that fades in with sidebar */}
      <div className="absolute top-20 bottom-20 left-[86vw] w-px bg-white/30 sidebar-line-appear z-0"></div>

      {/* Sidebar Appearing from Right */}
      <div className="absolute top-1/2 left-[89vw] transform -translate-y-1/2 sidebar-appear z-20 bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl w-[150px]">
      <ul className="space-y-4 text-lg font-semibold text-white/90">

        {/* Home */}
        <li className="relative group">
          <Link to="/" className="block hover:text-yellow-300 hover:translate-x-1 hover:shadow-md transition-all duration-200">
            Home
          </Link>
          <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-96 h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100]">
            <img src="/preview-home.png" alt="Home Preview" className="w-full h-full object-cover rounded-lg" />
          </div>
        </li>

        {/* About */}
        <li className="relative group">
          <Link to="/about" className="block hover:text-yellow-300 hover:translate-x-1 transition-all duration-200">
            About
          </Link>
          <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-96 h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100]">            
          <img src="/preview-about.png" alt="About Preview" className="w-full h-full object-cover rounded-lg" />
          </div>
        </li>

        {/* Education */}
        <li className="relative group">
          <Link to="/education" className="block hover:text-yellow-300 hover:translate-x-1 transition-all duration-200">
            Education
          </Link>
          <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-96 h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100]">            
          <img src="/preview-education.png" alt="Education Preview" className="w-full h-full object-cover rounded-lg" />
          </div>
        </li>

        {/* Projects */}
        <li className="relative group">
          <Link to="/projects" className="block hover:text-yellow-300 hover:translate-x-1 hover:shadow-md transition-all duration-200">
            Projects
          </Link>
          <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-96 h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100]">            
          <img src="/preview-projects.png" alt="Projects Preview" className="w-full h-full object-cover rounded-lg" />
          </div>
        </li>

        {/* e-Services */}
        <li className="relative group">
          <Link to="/e-services" className="block hover:text-yellow-300 hover:translate-x-1 hover:shadow-md transition-all duration-200">
            e-Services
          </Link>
            <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-96 h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100]">
            <img src="/preview-e-services.png" alt="e-Services Preview" className="w-full h-full object-cover rounded-lg" />
          </div>
        </li>

        {/* Contact */}
        <li className="relative group">
          <Link to="/contact" className="block hover:text-yellow-300 hover:translate-x-1 hover:shadow-md transition-all duration-200">
            Contact
          </Link>
            <div className="absolute top-1/2 right-full mr-4 -translate-y-1/2 w-96 h-64 bg-white/90 text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-[100]">
            <img src="/preview-contact.png" alt="Contact Preview" className="w-full h-full object-cover rounded-lg" />
          </div>
        </li>
      </ul>
      </div>
        </>
      )}

      {/* Main Content Area - This will change based on route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/e-services" element={<EServices />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {/* Copyright Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-white/50 text-sm z-40">
        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-1">
            <span>© {new Date().getFullYear()}</span>
            <span>•</span>
            <span>Designed & Built by Shivam Garg</span>
            <span>•</span>
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
