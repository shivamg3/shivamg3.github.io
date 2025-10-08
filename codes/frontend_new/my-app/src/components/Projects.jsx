import React, { useState, useEffect, useRef } from 'react';

// --- Sub-component for the DDA Simulator (No changes) ---
const DDASimulator = () => {
    const [pValue, setPValue] = useState(128);
    const qValue = 256;
    const [inputSignalActive, setInputSignalActive] = useState(false);
    const [outputSignalActive, setOutputSignalActive] = useState(false);
    const accumulator = useRef(0);
  
    useEffect(() => {
        const inputFrequency = 200;
        const inputInterval = setInterval(() => {
            setInputSignalActive(true);
            accumulator.current += pValue;
            if (accumulator.current >= qValue) {
                accumulator.current -= qValue;
                setOutputSignalActive(true);
                setTimeout(() => setOutputSignalActive(false), inputFrequency / 2);
            }
            setTimeout(() => setInputSignalActive(false), inputFrequency / 2);
        }, inputFrequency);
  
        return () => clearInterval(inputInterval);
    }, [pValue, qValue]);
  
    return (
      <div className="bg-black/20 border border-white/20 rounded-xl p-4 mt-4">
        <h4 className="font-bold text-center mb-4 text-yellow-300">Live DDA Rate Multiplier</h4>
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex flex-col items-center gap-1">
            <span className="font-mono">F_in</span>
            <div className={`w-4 h-4 rounded-full border border-cyan-400 transition-all ${inputSignalActive ? 'bg-cyan-400' : 'bg-transparent'}`}></div>
          </div>
          <div className="flex-grow h-px bg-gray-600"></div>
          <div className="flex-shrink-0 border-2 border-gray-500 rounded p-4 text-center">
              <span className="font-bold font-mono text-lg">DDA</span>
              <div className="text-xxs font-mono mt-1">
                  <p>P = {pValue}</p>
                  <p>Q = {qValue}</p>
              </div>
          </div>
          <div className="flex-grow h-px bg-gray-600"></div>
          <div className="flex flex-col items-center gap-1">
              <span className="font-mono">F_out</span>
              <div className={`w-4 h-4 rounded-full border border-yellow-300 transition-all ${outputSignalActive ? 'bg-yellow-300' : 'bg-transparent'}`}></div>
          </div>
        </div>
        <div className="mt-4">
            <label htmlFor="pValue" className="block text-sm font-medium text-gray-300 mb-2">
                Set 'P' Value (Output Rate)
            </label>
            <input
                id="pValue"
                type="range"
                min="0"
                max={qValue}
                value={pValue}
                onChange={(e) => setPValue(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
        </div>
      </div>
    );
};


// --- Main Projects Page Component ---
const Projects = () => {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [showContent, setShowContent] = useState(false);
    // REMOVED: const [fadeOut, setFadeOut] = useState(false);

    const phrases = [
      { base: "I am ", dynamic: "an Industrial Engineer." },
      { base: "I am ", dynamic: "building an Industrial Engineer!" }
    ];

    useEffect(() => {
      // This guard stops the effect entirely once the animation is done.
      if (showContent) return;

      const currentPhrase = phrases[loopNum];
      const fullText = currentPhrase.base + currentPhrase.dynamic;
      
      const handleTyping = () => {
        if (isDeleting) {
          if (text.length > currentPhrase.base.length) {
            setText(text.substring(0, text.length - 1));
            setTypingSpeed(30);
          } else {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setTypingSpeed(50);
          }
        } else {
          setText(fullText.substring(0, text.length + 1));
          setTypingSpeed(50);
          
          if (text === fullText) {
            // UPDATED: Check if this is the final phrase
            if (loopNum === phrases.length - 1) {
              // It's the end. Stop the animation and show the content after a pause.
              setTimeout(() => {
                setShowContent(true);
              }, 1000); // Pause for 1 second on the final text
            } else {
              // Not the end, continue deleting as normal
              setTimeout(() => setIsDeleting(true), 1500);
            }
          }
        }
      };
  
      const timer = setTimeout(handleTyping, typingSpeed);
      return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, showContent]);
  
    const renderText = () => {
      const currentPhrase = phrases[loopNum % phrases.length];
      const base = currentPhrase.base;
      const dynamic = text.substring(base.length);
      const isFinalPhrase = loopNum === phrases.length - 1;
  
      return (
        <>
          {base}
          {isFinalPhrase ? (
            <span className="text-yellow-400">{dynamic}</span>
          ) : (
            dynamic
          )}
        </>
      );
    };

    const projectsData = [
        { title: 'CNC Motion Controller', status: 'Ongoing', description: 'Developing a custom multi-axis motion controller from the ground up, focusing on real-time trajectory generation and hardware integration.', mediaType: 'component' },
        { title: 'Electric Skateboard', status: 'Ongoing', description: 'A personal project involving battery management systems (BMS), motor control (VESC), and 3D-printed enclosures for a custom electric longboard.', mediaType: 'image', mediaSrc: 'https://placehold.co/600x400/1a1a1a/eab308?text=Skateboard+Build' },
        { title: 'This Personal Website', status: 'Ongoing', description: 'Built with React and Tailwind CSS, featuring interactive components and a focus on modern, responsive design.', mediaType: 'image', mediaSrc: 'https://placehold.co/600x400/1a1a1a/eab308?text=Website+Code' },
        { title: 'Fabrication of Microfluidic Mixer', status: 'Completed', description: 'Course project focused on the design and clean-room fabrication of a passive microfluidic mixer and a piezo-resistive pressure sensor.', mediaType: 'image', mediaSrc: 'https://placehold.co/600x400/1a1a1a/eab308?text=Microfluidics' },
        { title: 'Robo-Car Object Detection', status: 'Completed', description: 'Implemented object detection and environment mapping using a robo-car platform, programming the logic in LabVIEW.', mediaType: 'image', mediaSrc: 'https://placehold.co/600x400/1a1a1a/eab308?text=Robo-Car' },
        { title: 'Thesis: Micro Heat Sinks', status: 'Completed', description: 'My bachelor\'s thesis project on the advanced manufacturing techniques for creating high-efficiency micro heat sinks.', mediaType: 'image', mediaSrc: 'https://placehold.co/600x400/1a1a1a/eab308?text=Thesis' },
        { title: 'FSAE CFRP Bodyworks', status: 'Completed', description: 'As part of the Formula SAE team, I led the design and manufacturing of Carbon Fiber Reinforced Polymer (CFRP) bodyworks for the race car.', mediaType: 'image', mediaSrc: 'https://placehold.co/600x400/1a1a1a/eab308?text=FSAE+Car' }
    ];
  
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 sm-p-8">
            {/* UPDATED: This section now uses a conditional render (ternary operator)
                It shows the typewriter OR the main content, but never both.
            */}
            {!showContent ? (
                // Typewriter Container
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-mono">
                        {renderText()}
                        <span className="animate-[pulse_0.5s_ease-in-out_infinite]">|</span>
                    </h1>
                </div>
            ) : (
                // Main Content Container
                <div className="fade-in-content w-full">
                    <h2 className="text-5xl font-bold mb-12 text-center">Projects</h2>
                    
                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
                        {projectsData.map((project, index) => (
                        <div key={index} className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex flex-col group hover:border-yellow-300/50 transition-all duration-300">
                            {/* Media Placeholder */}
                            <div className="w-full h-64 bg-black/20 rounded-2xl mb-4 overflow-hidden">
                            {project.mediaType === 'image' && (
                                <img src={project.mediaSrc} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            )}
                            {project.mediaType === 'component' && <DDASimulator />}
                            </div>

                            {/* Project Info */}
                            <div className="flex-grow">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-bold text-yellow-300">{project.title}</h3>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${project.status === 'Ongoing' ? 'bg-yellow-400/20 text-yellow-300' : 'bg-green-400/20 text-green-300'}`}>
                                    {project.status}
                                </span>
                            </div>
                            <p className="text-gray-300/80">
                                {project.description}
                            </p>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Animation CSS */}
            <style jsx>{`
                .fade-in-content {
                    animation: fadeIn 1s ease-out forwards;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};
  
export default Projects;