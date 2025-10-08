import React from 'react';
// Step 1: Import the Link component for navigation
import { Link } from 'react-router-dom';
import ManufacturingSlider from './ManufacturingSlider';
import TravelMap from './TravelMap';

// A reusable card for story or info sections
const InfoCard = ({ children }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 transition-all duration-300 hover:border-yellow-300/50 hover:shadow-lg">
    {children}
  </div>
);

// A reusable badge for skills
const SkillBadge = ({ children }) => (
  <div className="bg-yellow-400/10 text-yellow-300 border border-yellow-400/20 rounded-full px-4 py-2 text-center text-sm font-medium">
    {children}
  </div>
);

const About = () => {
  return (
    <div className="fade-in-content w-full max-w-5xl mx-auto px-4 py-8 relative">
      
      {/* Step 2: Add the "Back Home" button, copied from your Contact page */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-50 group"
      >
        <div className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/30 rounded-full p-3 shadow-lg transition-all duration-300 group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <span className="absolute left-full ml-2 px-2 py-1 bg-white/10 text-xs text-white/80 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Back Home
        </span>
      </Link>
      
      {/* AI Toolkit Section */}
      <section className="text-center mb-20">
        <h2 className="text-4xl font-bold mb-6 text-yellow-400">My AI-Powered Workflow 🤖</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
          Leading a team of Gemini and ChatGPT, exploring the power of tech, has been an incredible experience so far.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <SkillBadge>JavaScript (This Website!)</SkillBadge>
          <SkillBadge>C++ (Mostly Microcontroller Firmwares)</SkillBadge>
          <SkillBadge>Python (FastAPI Backends, Why OOP?, ...)</SkillBadge>
        </div>
      </section>

      {/* Manufacturing Section */}
      <section className="mb-20 text-center">
        <h2 className="text-4xl font-bold mb-2 text-yellow-400">Hands-On Manufacturing ⚙️</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-4">
          Here's a glimpse into my workshop experience.
        </p>
        <ManufacturingSlider />
      </section>

      {/* Travel Section */}
      <section className="flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold mb-2 text-yellow-400">Exploring the World 🌍</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-4">
          Hoping to add more as I move.
        </p>
        <TravelMap />
      </section>

      {/* Animation CSS */}
      <style jsx>{`
        .fade-in-content {
          animation: fadeIn 1.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default About;
