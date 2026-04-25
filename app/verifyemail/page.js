"use client";

import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiMail, FiLoader } from 'react-icons/fi';

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = useCallback(async (tokenValue) => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyEmail", { token: tokenValue });
      setVerified(true);
      setError(false);
    } catch (err) {
      setError(true);
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    if (urlToken) {
      setToken(urlToken);
      verifyUserEmail(urlToken);
    }
  }, [verifyUserEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] selection:bg-indigo-500/30 overflow-hidden relative p-4">
      {/* 🌌 Ambient Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-purple-600/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[420px] z-10"
      >
        <div className="bg-[#121214]/80 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center">
          
          <AnimatePresence mode="wait">
            {/* 1. LOADING STATE */}
            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-2 border-indigo-500/20 rounded-full" />
                    <div className="absolute inset-0 w-16 h-16 border-t-2 border-indigo-500 rounded-full animate-spin" />
                    <FiMail className="absolute inset-0 m-auto text-indigo-500 text-xl animate-pulse" />
                  </div>
                </div>
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Verifying</h1>
                <p className="text-gray-400 text-sm font-medium tracking-tight">Syncing your account to the BuildMate grid...</p>
              </motion.div>
            )}

            {/* 2. SUCCESS STATE */}
            {!loading && verified && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex justify-center">
                  <div className="bg-emerald-500/10 p-5 rounded-full border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                    <FiCheck className="text-emerald-500 text-4xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Access Granted</h1>
                  <p className="text-gray-400 text-sm font-medium tracking-tight">Email verified. Your workspace is ready.</p>
                </div>
                <Link
                  href="/login"
                  className="block w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest text-[10px] rounded-full transition-all shadow-[0_10px_20px_-5px_rgba(79,70,229,0.4)] active:scale-95"
                >
                  Go to Login
                </Link>
              </motion.div>
            )}

            {/* 3. ERROR STATE */}
            {!loading && error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex justify-center">
                  <div className="bg-red-500/10 p-5 rounded-full border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                    <FiX className="text-red-500 text-4xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">Link Expired</h1>
                  <p className="text-gray-400 text-sm font-medium tracking-tight">This token is no longer valid on our server.</p>
                </div>
                <div className="space-y-4 pt-2">
                  <Link
                    href="/signup"
                    className="block w-full py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full transition-all hover:bg-gray-200 active:scale-95"
                  >
                    Resend Link
                  </Link>
                  <Link href="/" className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
                    Return to Hub
                  </Link>
                </div>
              </motion.div>
            )}

            {/* 4. FALLBACK / NO TOKEN */}
            {!loading && !token && !verified && !error && (
              <motion.div key="fallback" className="space-y-6">
                <FiLoader className="mx-auto text-gray-700 text-3xl animate-spin" />
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Awaiting Verification Signal</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center mt-8 text-[10px] font-bold text-gray-700 uppercase tracking-[0.5em]">
          Secure Node v2.0
        </p>
      </motion.div>
    </div>
  );
}

export default VerifyEmailPage;