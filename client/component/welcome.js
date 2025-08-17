'use client';
import Content from './content';
import LatestContent from './LatestContent';
import JoinUs from './side-components/joinUs'
import Projects from './side-components/projects'
import Footer from './side-components/footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from "react";

export default function Welcome() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const newPositions = [...Array(7)].map(() => ({
      top: Math.random() * 90,
      left: Math.random() * 90,
    }));
    setPositions(newPositions);
  }, []);
  
  return (
    <div className="flex flex-col items-center text-gray-900 ">
      {/* Header Section */}
      <header className="relative w-full min-h-screen text-[#1d919c] overflow-hidden flex items-center px-6 py-20 bg-[#f2f2f2]">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute left-0 w-1/2 h-full">
            {positions.length > 0 &&
              positions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-[#d0d337] rounded-xl opacity-30 mix-blend-multiply"
                  style={{
                    width: 30 + i * 10,
                    height: 30 + i * 10,
                    top: `${pos.top}%`,
                    left: `${pos.left}%`,
                    filter: 'blur(2px)',
                  }}
                  animate={{
                    x: [0, 15 * Math.cos(i), 20],
                    y: [0, 15 * Math.sin(i), 20],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6 + i,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 z-10 md:grid-cols-2 max-w-7xl mx-auto gap-12 items-center w-full">
          {/* Left: Hero Text */}
          <div className="text-center md:text-left space-y-6">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Study like never before —
              <br />
              <span className="bg-[#b2d7d0]/40 px-3 py-1 rounded-md inline-block mt-2">
                Discover. Share. Thrive.
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-[#1d919c]/90 max-w-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            >
              Join Sakarya Book Space — a vibrant hub where students exchange books, explore study materials, and grow together 🚀📚
            </motion.p>
            <button className="px-6 py-3 bg-white text-[#002d62] font-bold rounded-xl shadow hover:bg-[#e5e5e5]">
                Start Exploring
            </button>
          </div>

            {/* Right: Content */}
            <div>
              <Projects />
            </div>
        </div>
      </header>

      <LatestContent/>
      <JoinUs />  
      <Footer />

    </div>
  );
}