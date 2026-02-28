"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Page = () => {

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
      try {
        const res = await axios.post("/api/users/login", data);

        toast.success("Login successful");
        router.push("/Home")

      console.log("Response:", res.data);
      // 👉 yahan redirect bhi kar sakta hai
      // router.push("/dashboard");

    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid email or password";

      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#1e003d_0%,#2b0138_40%,#6a0dad_80%,#a855f7_100%)] bg-[length:400%_400%] animate-[gradient_8s_ease_infinite]">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl lg:max-w-4xl">

        {/* Left Image */}
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?auto=format&fit=crop&w=1575&q=80')",
          }}
        />

        {/* Right Form */}
        <div className="w-full px-6 py-8 lg:w-1/2">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign in to your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2
                  ${
                    !errors.email && touchedFields.email
                      ? "border-green-500 focus:ring-green-400"
                      : "border-gray-300 focus:ring-blue-400"
                  }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2
                  ${
                    !errors.password && touchedFields.password
                      ? "border-green-500 focus:ring-green-400"
                      : "border-gray-300 focus:ring-blue-400"
                  }`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
