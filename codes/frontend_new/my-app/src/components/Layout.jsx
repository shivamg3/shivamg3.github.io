import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-6 py-20 flex items-center justify-center">
      <div className="max-w-4xl w-full space-y-8">

        <h1 className="text-4xl font-bold border-b pb-2 border-white/20">
          About Me
        </h1>

        <div className="space-y-4 text-lg leading-relaxed text-gray-300">
          <p>
            Hi, I’m <span className="text-yellow-300 font-semibold">Shivam Garg</span>, a Mechanical Engineer with a passion for CNC systems, hardware design, and building things that move.
          </p>
          <p>
            I work at the intersection of engineering, code, and design. My focus lies in creating smart manufacturing systems — combining traditional machining with modern software.
          </p>
          <p>
            I’m currently developing a G-code interpreter, real-time machine control systems, and experimenting with microcontrollers, FastAPI, and full-stack architecture.
          </p>
          <p>
            Outside of engineering, I enjoy exploring startup ideas, sky yoga, and meaningful conversations with builders.
          </p>
        </div>

      </div>
    </div>
  );
}
