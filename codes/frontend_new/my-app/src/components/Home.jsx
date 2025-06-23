import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContent } from '../data/searchData';


export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // New: Search as you type
  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchContent.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchQuery]); // Re-run when searchQuery changes

  const handleResultClick = (url) => {
    setShowResults(false);
    navigate(url);
    setSearchQuery('');
  };

  return (
    <div className="move-left bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl text-center w-[1200px] min-h-[700px] p-16 mx-auto relative z-10">

      {/* Profile Image + Hover Icons Above */}
      <div className="flex flex-col items-center mb-6 relative group">

        {/* Icons row (initially hidden) */}
        <div className="absolute -top-14 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a href="mailto:shivam939a8@gmail.com" target="_blank" rel="noreferrer">
            <img src="/gmail.png" alt="Gmail" className="w-8 h-8 hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.linkedin.com/in/shivam-garg-iitd/" target="_blank" rel="noreferrer">
            <img src="/linkedin.png" alt="LinkedIn" className="w-8 h-8 hover:scale-110 transition-transform" />
          </a>
          <a href="https://github.com/shivamg3" target="_blank" rel="noreferrer">
            <img src="/github.png" alt="GitHub" className="w-8 h-8 hover:scale-110 transition-transform" />
          </a>
        </div>

        {/* Profile Image */}
        <img
          src="/me.jpg"
          alt="Shivam"
          className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105 cursor-pointer"
        />
      </div>

      {/* About Section */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold">Hi, I'm Shivam 👋</h2>
        <p className="text-xl sm:text-2xl text-white/90 mt-4">
          A mechanical engineer & maker building smart CNC systems.
        </p>
      </div>

      {/* Search Box */}
      <div className="w-full max-w-2xl mx-auto mt-24 relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search my portfolio..."
            className="w-full bg-white/5 border border-white/20 rounded-full py-4 px-6 text-white/90 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400/90 text-gray-900 rounded-full p-2"
            onClick={() => setSearchQuery('')}
          >
            {searchQuery ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Search Results (now shows as you type) */}
        {showResults && searchQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((item) => (
                  <li 
                    key={item.id}
                    onClick={() => handleResultClick(item.url)}
                    className="p-4 hover:bg-white/20 cursor-pointer transition-colors duration-200 text-left"
                  >
                    <h3 className="font-semibold text-yellow-400">{item.title}</h3>
                    <p className="text-white/80 text-sm">{item.content}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-white/70">
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        )}

        <p className="text-white/60 mt-4 text-sm">
          Try searching for "projects", "CNC", or "experience"
        </p>
      </div>
    </div>
  );
}