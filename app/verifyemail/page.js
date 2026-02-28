"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = useCallback(async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
      setError(false);
    } catch (err) {
      setError(true);
      console.log(err.response?.data);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_left,#3f3475_0%,#2b0138_40%,#1e003d_100%)] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Email Verification</h1>

        {loading && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-purple-200 animate-pulse">Verifying your account...</p>
          </div>
        )}

        {!loading && !verified && !error && (
          <div className="bg-blue-500/20 text-blue-100 p-4 rounded-lg border border-blue-500/30">
            <p className="text-sm">Detecting token from URL...</p>
            <p className="mt-2 font-mono text-xs break-all bg-black/20 p-2 rounded">
              {token ? `Token: ${token}` : "No token found"}
            </p>
          </div>
        )}

        {verified && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-500/20 p-4 rounded-full border border-green-500/50">
                <svg className="w-12 h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white">Email Verified!</h2>
            <p className="text-purple-200">Your account is now active and ready to use.</p>
            <Link
              href="/login"
              className="block w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-lg transition-all shadow-lg hover:scale-[1.02]"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-red-500/20 p-4 rounded-full border border-red-500/50">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white">Verification Failed</h2>
            <p className="text-red-200 text-sm">The token is invalid or has expired.</p>
            <Link
              href="/signup"
              className="block w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all border border-white/20"
            >
              Back to Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;