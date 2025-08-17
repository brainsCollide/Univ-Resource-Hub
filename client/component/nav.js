"use client";

import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Hamburger and Close Icons

export default function Nav() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/me", { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setDropdownOpen(false);
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-[#002d62] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-[#1d919c] transition">
          Univ Resource Hub
        </Link>

        {/* Hamburger - visible on mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/content-page" className="text-lg font-medium hover:text-[#1d919c] transition">Posts</Link>
          <Link href="/resource" className="text-lg font-medium hover:text-[#1d919c] transition">Blog</Link>
          {user?.role === "admin" && (
            <Link href="/admin-route" className="text-lg font-medium hover:text-[#1d919c] transition">Admin</Link>
          )}
        </div>

        {/* Auth - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold shadow-md focus:outline-none"
              >
                Welcome, {user.username}
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-2 w-full bg-white rounded-md shadow-lg py-2 z-20"
                  >
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-lg font-medium hover:text-gray-300 transition">Login</Link>
              <Link href="/signup" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#002d62] px-6 pb-4 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              <Link href="/content-page" onClick={() => setMenuOpen(false)} className="text-lg font-medium hover:text-[#1d919c] transition">Posts</Link>
              <Link href="/resource" onClick={() => setMenuOpen(false)} className="text-lg font-medium hover:text-[#1d919c] transition">Blog</Link>
              {user?.role === "admin" && (
                <Link href="/admin-route" onClick={() => setMenuOpen(false)} className="text-lg font-medium hover:text-[#1d919c] transition">Admin</Link>
              )}

              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-left text-lg font-medium text-white hover:text-red-300 transition"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="text-lg font-medium hover:text-gray-300 transition">Login</Link>
                  <Link href="/signup" onClick={() => setMenuOpen(false)} className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition w-fit">
                    Register
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
