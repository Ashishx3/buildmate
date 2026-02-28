"use client";
import { useState, useEffect } from "react";

import "@/Styles/Navbar.css"

  import axios from "axios";
  import Link from "next/link";
  import { toast } from "react-hot-toast";
  import { useRouter } from "next/navigation";


export default function NavbarForLoggedIn() {


  

    const router = useRouter();
   
    const [shrink, setShrink] = useState(false);

    
  


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

    const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };


  return (
    <nav
      className={`fixed top-2 items-center left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out
        ${shrink
          ? "w-[80vw] rounded-2xl bg-white/30 backdrop-blur-md border border-gray-300 shadow-lg"
          : "w-full bg-white border-b border-gray-200"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="text-3xl  font-bold text-gray-800 tracking-wide">
          <Link href="/">BuildMate</Link>
        </div>

        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
  <Link href={`/dashboard`} className="transition hover:text-gray-900 animated-underline">Dashboard</Link>
  <Link href="/about" className="transition hover:text-gray-900 animated-underline">About</Link>
  <Link href="/services" className="transition hover:text-gray-900 animated-underline">Emergency</Link>
  <Link href="/contact" className="transition hover:text-gray-900 animated-underline">Contact</Link>
   <button
          onClick={logout}
          className="bg-black text-white px-4"
        >
          Logout 
        </button>
</div>

        <div className="flex items-center space-x-4">
          
        </div>
      </div>
    </nav>
  );
}
