import React from 'react'; // We don't need useState for now
import { Link } from 'react-router-dom'; // Essential for navigation

const EServicesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Home Button - Fixed in top left corner */}
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl text-center max-w-2xl p-12">
        
        <div className="mb-6 text-yellow-300 animate-pulse">
          <svg className="mx-auto h-16 w-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-yellow-300">e-Services Under Construction</h1>
        
        <p className="text-lg text-gray-200/90 mb-8">
          The digital workbench is out and I'm currently engineering something great here. This space will soon feature a suite of powerful online tools and services.
        </p>
      </div>

      <p className="relative z-10 text-gray-500 mt-12">
        Check back soon to see the finished product.
      </p>

    </div>
  );
};

export default EServicesPage;