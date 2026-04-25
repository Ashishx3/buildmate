"use client";

import React, { useActionState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Suggesting framer-motion for that "sexy" feel

const SignupPage = () => {
  const router = useRouter();

  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        const data = Object.fromEntries(formData);
        const response = await axios.post("/api/users/signup", data);
        toast.success("Welcome to BuildMate!");
        router.push("/login");
        return { error: null };
      } catch (error) {
        const message = error.response?.data?.error || "Something went wrong";
        toast.error(message);
        return { error: message };
      }
    },
    { error: null }
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10 p-1"
      >
        <div className="bg-[#121214]/80 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">
          
          {/* Logo/Brand Section */}
          <div className="text-center mb-10">
            <h2 className="text-indigo-500 font-mono text-sm tracking-[0.2em] uppercase mb-2">Join the Squad</h2>
            <h1 className="text-4xl font-black text-white tracking-tighter italic">
              BUILD<span className="text-indigo-500 not-italic">MATE</span>
            </h1>
            <p className="text-gray-400 text-sm mt-2">Start building your legacy today.</p>
          </div>

          <form action={submitAction} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1" htmlFor="username">Username</label>
              <input
                name="username"
                id="username"
                type="text"
                required
                placeholder="architect_01"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1" htmlFor="email">Email Address</label>
              <input
                name="email"
                id="email"
                type="email"
                required
                placeholder="axh@buildmate.io"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1" htmlFor="password">Password</label>
              <input
                name="password"
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="relative w-full group overflow-hidden rounded-xl bg-white px-8 py-4 font-bold text-black transition-all hover:bg-indigo-500 hover:text-white active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-current" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Initializing...
                  </span>
                ) : "Create Account"}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              href="/login" 
              className="text-gray-500 text-sm hover:text-indigo-400 transition-all duration-300 group"
            >
              Already a mate? <span className="text-white font-medium group-hover:underline underline-offset-4">Sign in</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Subtle bottom text */}
      <p className="absolute bottom-6 text-white/20 text-[10px] tracking-[0.4em] uppercase">
        Built for the next generation
      </p>
    </div>
  );
};

export default SignupPage;