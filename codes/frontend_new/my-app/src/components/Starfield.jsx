import React, { useMemo } from 'react';

// --- The Starfield Component ---
const Starfield = ({
  starCount = 150, // How many stars to generate
  starColor = '#FFFFFF', // The color of the stars
}) => {

  // useMemo will only re-calculate the stars array when the component is first rendered
  // or if the props (starCount, starColor) change. This is for performance.
  const stars = useMemo(() => {
    // Create an array to hold all the star data
    const starArray = [];
    for (let i = 0; i < starCount; i++) {
      // Generate a random size for the star (e.g., 1px, 2px, or 3px)
      const size = Math.floor(Math.random() * 3) + 1;
      // Generate random animation properties
      const animationDuration = Math.random() * 2 + 1; // Twinkle duration between 1s and 3s
      const animationDelay = Math.random() * 3;       // Start twinkling at different times

      starArray.push({
        // Randomly position the star across the entire screen
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        // Apply the random size and animation properties
        width: `${size}px`,
        height: `${size}px`,
        animation: `twinkle ${animationDuration}s infinite ease-in-out alternate ${animationDelay}s`
      });
    }
    return starArray;
  }, [starCount, starColor]);

  return (
    // This div is the container for all the stars
    // It's positioned to fill the entire background
    <div className="absolute inset-0 z-0">
      {/* Map over the array of star data to render each star */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            ...star,
            backgroundColor: starColor,
            // A subtle blur to make the stars feel less sharp
            filter: 'blur(0.5px)', 
          }}
        />
      ))}
      {/* We still need the keyframes animation in our global CSS */}
      <style>{`
        @keyframes twinkle {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Starfield;
