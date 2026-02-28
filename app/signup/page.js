"use client";

import React, { useActionState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage = () => {
  const router = useRouter();

  const [state, submitAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        const data = Object.fromEntries(formData);
        const response = await axios.post("/api/users/signup", data);
        toast.success("Signup successful!");
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
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,#3f3475_0%,#2b0138_40%,#1e003d_100%)] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {isPending ? "Processing..." : "Create Account"}
          </h1>
        </div>

        <form action={submitAction} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-purple-100 mb-1" htmlFor="username">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              required
              placeholder="Username"
              className="w-full p-3 rounded-lg bg-white/5 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-100 mb-1" htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              required
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/5 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-100 mb-1" htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              required
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/5 border border-purple-400/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-200 shadow-lg
              ${isPending 
                ? "bg-purple-900/50 cursor-not-allowed opacity-50" 
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98]"
              }`}
          >
            {isPending ? "Setting up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link 
            href="/login" 
            className="text-purple-200 text-sm hover:text-white transition-colors duration-200"
          >
            Already have an account? <span className="font-bold underline decoration-purple-500">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;