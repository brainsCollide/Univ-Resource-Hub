"use client";
import React from "react";
import { motion } from "framer-motion";

const projects = [
  { title: "Sakarya Book Space", icon: "📚", description: "A fun, shared library where students exchange books." },
  { title: "Live Study Groups", icon: "🤝", description: "Connect with peers for real-time discussions & group studies." },
  { title: "AI Study Buddy", icon: "🤖", description: "Smart AI-powered assistant to guide your learning journey." },
  { title: "Virtual Lab Experience", icon: "🔬", description: "Hands-on science experiments in a virtual space." },
  { title: "Community Forum", icon: "💬", description: "Engage in meaningful discussions and share knowledge." },
  { title: "Peer Tutoring", icon: "👨‍🏫", description: "Learn from experienced students in a friendly environment." },
];

const arcOffsets = [
  "ml-10", // top
  "ml-20",
  "ml-25",
  "ml-30",
  "ml-25",
  "ml-15", // bottom
];

export default function Projects() {
  return (
    <section className="text-white text-left md:text-center py-6">
        <div className="flex flex-col items-center space-y-6">
            {projects.map((project, index) => (
            <motion.div
                key={index}
                className={`w-full max-w-md px-4 transform ${arcOffsets[index]} flex flex-col items-center text-center`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
            >
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#002d62] to-[#1d919c] text-white text-xl font-bold rounded-full shadow mb-1">
                {project.icon}
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-gray-900">{project.title}</h3>

                {/* Description */}
                <p className="text-gray-900 text-xs font-medium mt-0.5">{project.description}</p>
            </motion.div>
            ))}
        </div>
    </section>

  );
}
