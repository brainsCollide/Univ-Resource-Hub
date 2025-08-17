"use client";
import React from "react";
import { motion } from "framer-motion";
import { Phone, phone } from "lucide-react";

export default function JoinUs() {
    return (
        <section className="relative w-full py-24 bg-gradient-to-br from-[#185a9d] to-[#43cea2] text-white overflow-hidden rounded-t-[10rem]">
            {/* Floating Bubbles */}
            <motion.div
                className="absolute top-12 left-8 w-12 h-12 bg-yellow-400 rounded-full opacity-40 z-0"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-16 h-16 bg-pink-300 rounded-full opacity-30 z-0"
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                {/* Text Content */}
                <div className="text-center md:text-left max-w-xl">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold leading-tight mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Together We Learn, Together We Grow.
                    </motion.h2>
                    <motion.p
                        className="text-lg text-white/90 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        Univ Resource Hub is a free community built for students to share resources, support each other, and grow—together.
                    </motion.p>

                    <motion.button
                        className="px-6 py-3 bg-white text-[rgb(24,90,157)] font-semibold rounded-lg shadow hover:bg-gray-100 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                         <Phone/>Join the Community
                    </motion.button>
                </div>

                {/* Image */}
                <div className="w-full max-w-lg">
                    <motion.img
                        src="/images/study-group.png"
                        alt="Community Illustration"
                        className="w-full drop-shadow-[0_4px_10px_rgba(24,90,157,0.9)] rounded-lg"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    />
                </div>
            </div>

            {/* Decorative Bottom Wave */}
            <div className="absolute bottom-0 left-0 w-screen z-20 pointer-events-none">
                <svg className="w-full h-45 text-[#43cea2]" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="currentColor" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,213.3C672,213,768,171,864,154.7C960,139,1056,149,1152,165.3C1248,181,1344,203,3392,213.3L1940,224V320H0Z"></path>
                </svg>
            </div>
        </section>
    );
}
