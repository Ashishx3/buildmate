"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [shrink, setShrink] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();

  // 🔐 Check login
  useEffect(() => {
    axios.get("/api/users/checkLogin")
      .then(res => setIsLoggedIn(res.data.isLoggedIn))
      .catch(() => setIsLoggedIn(false));
  }, []);

  // 📜 Modern Scroll effect (shinks sooner for a snappier feel)
  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("See you soon, Mate!");
      setIsLoggedIn(false);
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoggedIn === null) return <div className="h-[80px]" />;

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${shrink
          ? "top-4 w-[90%] max-w-5xl rounded-3xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
          : "top-0 w-full bg-white backdrop-blur-md border-b border-gray-100"
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="group flex items-center gap-1">
            <div className="text-2xl font-black text-[#0a0a0c] tracking-tighter italic transition-all duration-300 group-hover:skew-x-[-2deg]">
              BUILD<span className="text-indigo-600 not-italic group-hover:text-indigo-500 transition-colors">MATE</span>
            </div>
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 mt-2 group-hover:scale-[2] group-hover:shadow-[0_0_10px_rgba(79,70,229,0.6)] transition-all duration-300" />
          </Link>
        </div>

        {/* Center Links - Gen Z Minimalist Style */}
        <div className="hidden md:flex items-center space-x-1 text-sm font-bold uppercase tracking-widest text-gray-500">
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: "Emergency", path: "/services" },
            { name: "Contact", path: "/contact" },
            ...(isLoggedIn ? [{ name: "Dashboard", path: "/dashboard" }] : []),
          ].map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="px-4 py-2 rounded-full hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side - Tactical Buttons */}
        <div className="flex items-center space-x-3">
          {isLoggedIn ? (
            <button
              onClick={logout}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-tighter bg-[#0a0a0c] text-white rounded-full hover:bg-indigo-600 hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-tighter text-gray-700 hover:text-indigo-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2.5 text-xs font-bold uppercase tracking-tighter bg-[#0a0a0c] text-white whitespace-nowrap rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:bg-indigo-600 hover:shadow-indigo-500/40 active:scale-95 transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}