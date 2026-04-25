"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/users/login", data);
      toast.success("Welcome back, Mate!");
      router.push("/");
    } catch (error) {
      const message = error.response?.data?.message || "Invalid email or password";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-indigo-600/15 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[440px] z-10 p-4"
      >
        <div className="bg-[#121214]/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Brand Header */}
          <div className="text-center mb-10">
            <div className="inline-block px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 mb-4">
               <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Secure Access</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter italic mb-2">
              BUILD<span className="text-indigo-500 not-italic">MATE</span>
            </h1>
            <p className="text-gray-400 text-sm">Elevate your workflow today.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Identity (Email)</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@work.com"
                  {...register("email", {
                    required: "Identity is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className={`w-full bg-black/40 border ${errors.email ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300`}
                />
                {errors.email && (
                  <p className="text-[10px] text-red-400 font-bold uppercase mt-1.5 ml-1 tracking-wide">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Passcode</label>
                <Link href="#" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-tight">Forgot?</Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Passcode is required",
                    minLength: { value: 3, message: "Too short" },
                  })}
                  className={`w-full bg-black/40 border ${errors.password ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-5 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all duration-300`}
                />
                {errors.password && (
                  <p className="text-[10px] text-red-400 font-bold uppercase mt-1.5 ml-1 tracking-wide">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full group overflow-hidden rounded-2xl bg-indigo-600 px-8 py-4 font-bold text-white transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 tracking-tight">
                {isSubmitting ? (
                   <div className="flex items-center gap-2">
                     <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                     Authenticating...
                   </div>
                ) : "Enter Workspace"}
              </span>
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              New to the platform?{" "}
              <Link 
                href="/signup" 
                className="text-white font-bold hover:text-indigo-400 transition-colors underline-offset-4 decoration-indigo-500/50"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Decorative Branding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-20">
        <div className="h-[1px] w-8 bg-white" />
        <span className="text-[10px] text-white tracking-[0.5em] uppercase font-light text-center">
          BuildMate v2.0
        </span>
        <div className="h-[1px] w-8 bg-white" />
      </div>
    </div>
  );
};

export default LoginPage;