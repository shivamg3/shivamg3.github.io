import React, { useState, useEffect } from 'react';

const About = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const phrases = [
    { base: "I am ", dynamic: "an Industrial Engineer." },
    { base: "I am ", dynamic: "building an Industrial Engineer!" }
  ];

  useEffect(() => {
    if (loopNum >= phrases.length) {
      setFadeOut(true);
      setTimeout(() => setShowContent(true), 1000);
      return;
    }

    const currentPhrase = phrases[loopNum];
    const fullText = currentPhrase.base + currentPhrase.dynamic;
    
    const handleTyping = () => {
      if (isDeleting) {
        // Only delete the dynamic part
        if (text.length > currentPhrase.base.length && loopNum <= phrases.length - 2) {
          setText(text.substring(0, text.length - 1));
          setTypingSpeed(30);
        } else {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
          setTypingSpeed(50);
        }
      } else {
        // Type both base and dynamic parts
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(50);
        
        // When typing completes
        if (text === fullText) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Typewriter Container with Fade Out - Modified */}
      <div className={`text-center mb-16 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-4xl font-mono">
          {renderText()}
          <span className={`animate-[pulse_0.5s_ease-in-out_infinite] ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>|</span>
        </h1>
      </div>
      
      {/* Main Content with Fade In */}
      {showContent && (
        <div className="fade-in-content w-full max-w-4xl mx-auto">
          {/* Education Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Education</h2>
            <div className="bg-white/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold">B.Tech in Mechanical Engineering</h3>
              <p className="text-gray-300">IIT Delhi • 2018-2022</p>
            </div>
          </section>

          {/* Skills Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['CNC Programming', 'CAD Design', 'Industrial Automation', 'Lean Manufacturing', 
                'Process Optimization', 'Quality Control', 'Project Management', 'Data Analysis']
                .map(skill => (
                  <div key={skill} className="bg-white/10 p-4 rounded-lg text-center">
                    {skill}
                  </div>
                ))}
            </div>
          </section>

          {/* Experience Section */}
          <section>
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Experience</h2>
            <div className="space-y-6">
              <div className="bg-white/10 p-6 rounded-xl">
                <h3 className="text-xl font-semibold">Manufacturing Engineer</h3>
                <p className="text-gray-300">ABC Industries • 2022-Present</p>
                <ul className="mt-2 list-disc list-inside">
                  <li>Developed automated production systems</li>
                  <li>Reduced waste by 23% through process optimization</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Animation CSS (add to your stylesheet) */}
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

export default About;