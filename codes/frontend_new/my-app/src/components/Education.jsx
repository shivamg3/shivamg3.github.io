import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Essential for navigation

// Data for your educational timeline (no changes needed here).
const educationTimeline = [
    {
        logo: '/logos/uiuc_logo.png',
        title: "University of Illinois Urbana-Champaign",
        subtitle: "MS in Mechanical Engineering",
        duration: "2024 – Present",
        description: "Realized learning English made no real difference.",
        website: "https://illinois.edu/"
    },
    {
        logo: '/logos/iitd_logo.png',
        title: "IIT Delhi",
        subtitle: "B.Tech in Production & Industrial Engineering",
        duration: "2019 – 2023",
        description: "Gave my best shot at learning English.",
        website: "https://home.iitd.ac.in/"
    },
    {
        logo: '/logos/bhavan_logo.png',
        title: "Bhavan Vidyalaya",
        subtitle: "High School",
        duration: "2017 – 2019",
        description: "Worked super hard to improve my handwriting only to end up typing prompts for ChatGPT.",
        website: "https://www.bhavanchd.com/"
    },
    {
        logo: '/logos/dav_logo.png',
        title: "DAV Public School",
        subtitle: "Middle School",
        duration: "2013 – 2017",
        description: "Mixed water into HCl instead of HCl into water.",
        website: "http://dav8pkl.com/"
    },
    {
        logo: '/logos/new_india_logo.png',
        title: "New India Sr Sec School",
        subtitle: "Early Schooling",
        duration: "Until 2013",
        description: "Learned to 'shit the pants' literally so I wouldn’t do it metaphorically later.",
        website: "https://newindiapanchkula.in/"
    }
];

// Reusable card component for the timeline details.
const TimelineCard = ({ item, alignment }) => (
  // CHANGED: Applied the new glassmorphism style from your homepage.
  <a
    href={item.website}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      group relative 
      bg-white/10 backdrop-blur-lg 
      border border-white/20 
      shadow-2xl 
      p-6 rounded-3xl 
      w-full max-w-md 
      transition-all duration-300 
      hover:scale-[1.02]
      text-${alignment}
    `}
  >
    {/* TWEAKED: Changed glow to white to better match the glass effect */}
    <div className="absolute -inset-4 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl"></div>
    
    <div className="relative">
        <p className="text-sm text-gray-300 mb-1">{item.duration}</p>
        <h3 className="text-xl font-bold text-yellow-300">{item.title}</h3>
        <h4 className="text-md font-semibold text-gray-100 mb-2">{item.subtitle}</h4>
        <p className="text-gray-200/80">{item.description}</p>
    </div>
  </a>
);

// A single timeline item component that animates on scroll.
const TimelineItem = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(itemRef.current);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, []);


  const isRightSide = index % 2 === 0;
  const animationClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-10';

  return (
    <div ref={itemRef} className={`relative flex w-full transition-all ease-in-out duration-700 ${animationClasses}`}>
      <div className={`w-1/2 flex justify-end pr-16 ${!isRightSide ? 'visible' : 'invisible'}`}>
          <TimelineCard item={item} alignment="right" />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
        <div className="bg-gray-700 rounded-full w-32 h-32 flex items-center justify-center ring-8 ring-gray-900 ring-opacity-80">
          <img src={item.logo} alt={`${item.title} logo`} className="h-24 w-24 object-contain" />
        </div>
      </div>

      <div className={`w-1/2 flex justify-start pl-16 ${isRightSide ? 'visible' : 'invisible'}`}>
          <TimelineCard item={item} alignment="left" />
      </div>
    </div>
  );
};

const Education = () => {
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
      {/* Main Container - Matches Home Page Styling */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl w-[1200px] min-h-[700px] p-16 mx-auto relative z-10">
        <h2 className="text-5xl font-bold mb-16 text-center text-yellow-300">
          Mistakes were made. Degrees were earned.
        </h2>

        <div className="relative w-full">
          {/* Center Line - Updated to Match Design */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-yellow-400/50 via-white/30 to-white/10 -translate-x-1/2"></div>
          
          <div className="space-y-24">
            {educationTimeline.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;