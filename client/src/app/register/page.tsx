"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  const [role, setRole] = useState<"buyer" | "creator">("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");
const [pan, setPan] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch(
      `http://localhost:5000/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role,
          phone: role === "creator" ? phone : undefined,
          pan: role === "creator" ? pan : undefined,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    alert("Account created successfully!");
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create Account
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Join FileMarket today
          </p>
        </div>

        {/* Role Toggle */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setRole("buyer")}
            className={`flex-1 rounded-xl border py-3 text-sm font-medium transition
              ${
                role === "buyer"
                  ? "border-orange-500 text-orange-600 bg-orange-50"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
          >
            Buyer
            <div className="text-xs text-gray-400">
              Browse & purchase
            </div>
          </button>

          <button
            onClick={() => setRole("creator")}
            className={`flex-1 rounded-xl border py-3 text-sm font-medium transition
              ${
                role === "creator"
                  ? "border-orange-500 text-orange-600 bg-orange-50"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
          >
            Creator
            <div className="text-xs text-gray-400">
              Upload & sell
            </div>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
  onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
  onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
  onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Creator Extra Fields */}
          <AnimatePresence>
            {role === "creator" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-5 overflow-hidden"
              >
                <div className="text-xs text-gray-500">
                  Additional creator details (for verification)
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phone}
  onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    value={pan}
  onChange={(e) => setPan(e.target.value)}
                    placeholder="ABCDE1234F"
                    className="mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition shadow-md"
          >
            {role === "creator"
              ? "Submit for Approval"
              : "Create Account"}
          </motion.button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-orange-500 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </section>
  );
}