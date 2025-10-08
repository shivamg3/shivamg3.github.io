import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps';

// This URL points to a map of the entire world.
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// UPDATED: Added all the new locations to the checkpoints array.
const checkpoints = [
  // USA Locations
  { name: 'Urbana, IL (Current)', coordinates: [-88.2073, 40.1106], imageUrl: '/images/urbana.jpg' },
  { name: 'Chicago, USA', coordinates: [-87.6298, 41.8781], imageUrl: '/images/chicago.jpg' },
  { name: 'New York, USA', coordinates: [-74.0060, 40.7128], imageUrl: '/images/new_york.jpg' },
  { name: 'Boston, USA', coordinates: [-71.0589, 42.3601], imageUrl: '/images/boston.jpg' },
  { name: 'Grand Rapids, MI', coordinates: [-85.6681, 42.9634], imageUrl: '/images/grand_rapids.jpg' },
  { name: 'Springfield, IL', coordinates: [-89.6501, 39.7817], imageUrl: '/images/springfield.jpg' },
  
  // UAE Location
  { name: 'Dubai, UAE', coordinates: [55.2708, 25.2048], imageUrl: '/images/dubai.jpg' },

  // India Locations
  { name: 'Delhi, India', coordinates: [77.2090, 28.6139], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=Delhi' },
  { name: 'Jammu & Kashmir', coordinates: [76.5762, 33.7782], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=J%26K' },
  { name: 'Himachal Pradesh', coordinates: [77.1734, 31.1048], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=Himachal' },
  { name: 'Punjab', coordinates: [75.3412, 31.1471], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=Punjab' },
  { name: 'Haryana', coordinates: [76.0856, 29.0588], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=Haryana' },
  { name: 'Gujarat', coordinates: [71.1924, 22.2587], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=Gujarat' },
  { name: 'Rajasthan', coordinates: [74.2179, 27.0238], imageUrl: '/images/rajasthan.jpg' },
  { name: 'Madhya Pradesh', coordinates: [78.6569, 22.9734], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=MP' },
  { name: 'Maharashtra', coordinates: [75.7139, 19.7515], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=Maharashtra' },
  { name: 'Assam', coordinates: [92.9376, 26.2006], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=Assam' },
  { name: 'Meghalaya', coordinates: [91.3662, 25.4670], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=Meghalaya' },
  { name: 'Uttar Pradesh', coordinates: [80.9462, 26.8467], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=UP' },
  { name: 'Uttarakhand', coordinates: [79.0193, 30.0668], imageUrl: 'https://placehold.co/300x200/1a1a1a/eab308?text=Uttarakhand' },
];

const TravelMap = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto border border-white/20 rounded-xl overflow-hidden bg-white/5 relative">
      <ComposableMap 
        projection="geoMercator"
        projectionConfig={{ center: [20, 20], scale: 140 }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isIndia = geo.properties.name === "India";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isIndia ? "#2d3748" : "#1a202c"}
                    stroke="#4a5568"
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#4a5568", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {checkpoints.map((loc) => (
            <Marker 
              key={loc.name} 
              coordinates={loc.coordinates}
              onMouseEnter={() => setHovered(loc)}
              onMouseLeave={() => setHovered(null)}
            >
              <circle 
                r={5} 
                fill="#eab308" 
                stroke="#fff" 
                strokeWidth={1.5} 
                className="cursor-pointer transition-transform duration-200 hover:scale-150"
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {hovered && (
        <div 
          className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md p-2 rounded-lg shadow-2xl border border-white/20 transition-all duration-300 pointer-events-none"
        >
          <img src={hovered.imageUrl} alt={hovered.name} className="w-48 h-auto rounded" />
          <p className="text-white text-center mt-2 font-semibold">{hovered.name}</p>
        </div>
      )}
    </div>
  );
};

export default TravelMap;
