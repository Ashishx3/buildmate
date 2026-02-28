"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import "@/Styles/Navbar.css"

export default function Navbar() {
  const [shrink, setShrink] = useState(false);
 const [user, setUser] = useState(null);
   useEffect(() => {
    axios.get("/api/users/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
      console.log(user)
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShrink(true);
      } else {
        setShrink(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-2 items-center left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out
        ${shrink
          ? "w-[80vw] rounded-2xl bg-white/30 backdrop-blur-md border border-gray-300 shadow-lg"
          : "w-full bg-gray-200 border-b border-gray-200"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="text-3xl  font-bold text-gray-800 tracking-wide">
          <Link href="/">BuildMate</Link>
        </div>

        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
  <Link href="/" className="transition hover:text-gray-900 animated-underline">Home</Link>
  <Link href="/about" className="transition hover:text-gray-900 animated-underline">About</Link>
  <Link href="/services" className="transition hover:text-gray-900 animated-underline">Emergency</Link>
  <Link href="/contact" className="transition hover:text-gray-900 animated-underline">Contact</Link>
</div>

        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            SignUp
          </Link>
        </div>
      </div>
    </nav>
  );
}
