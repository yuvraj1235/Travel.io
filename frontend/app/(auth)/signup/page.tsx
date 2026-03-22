"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Signup failed");
        setLoading(false);
        return;
      }

      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        setError(loginRes.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/home");
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-[#04010e] flex items-center justify-center overflow-hidden px-6">

      {/* ── Background ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d0520] via-[#04010e] to-[#010210]" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-900/35 blur-[150px]" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-fuchsia-900/20 blur-[160px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-900/10 blur-[120px]" />
        {/* Stars */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 8% 12%, rgba(255,255,255,0.7) 0%, transparent 100%),
              radial-gradient(1px 1px at 22% 38%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 38% 8%, rgba(255,255,255,0.6) 0%, transparent 100%),
              radial-gradient(1px 1px at 52% 58%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 67% 22%, rgba(255,255,255,0.6) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 78% 68%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 88% 42%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 12% 72%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 58% 82%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 32% 52%, rgba(255,255,255,0.6) 0%, transparent 100%),
              radial-gradient(1px 1px at 45% 28%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 72% 85%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 3% 48%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 90% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
              radial-gradient(1px 1px at 18% 88%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 62% 5%, rgba(255,255,255,0.5) 0%, transparent 100%),
              radial-gradient(1px 1px at 85% 55%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 50% 95%, rgba(255,255,255,0.5) 0%, transparent 100%)
            `,
          }}
        />
      </div>

      {/* ── Card ── */}
      <div className="relative z-10 w-full max-w-md">

        {/* Glow ring */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-violet-500/50 via-fuchsia-500/35 to-pink-500/50 opacity-40 blur-[2px]" />

        <div className="relative bg-white/[0.05] backdrop-blur-3xl rounded-3xl p-8 border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.7)]">

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full px-3 py-1 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping inline-block" />
            New Explorer
          </span>

          {/* Heading */}
          <h2
            className="text-4xl font-black text-white mb-1 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Start your journey 🌍
          </h2>
          <p className="text-gray-400 mb-8 text-sm">
            Create your account and explore the world.
          </p>

          {/* Destination chips — decorative */}
          <div className="flex flex-wrap gap-2 mb-7">
            {["🗼 Paris", "🗽 New York", "🏯 Tokyo", "🌴 Bali", "🏔️ Swiss"].map(d => (
              <span
                key={d}
                className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-400 bg-white/[0.04]"
              >
                {d}
              </span>
            ))}
          </div>

          <form onSubmit={handleSignup} className="space-y-4">

            {/* Email */}
            <div className="group relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.07] border border-white/10 text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/40 focus:bg-white/[0.10] outline-none transition-all"
                required
              />
            </div>

            {/* Password */}
            <div className="group relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors"
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-4 rounded-2xl bg-white/[0.07] border border-white/10 text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-violet-500/60 focus:border-violet-500/40 focus:bg-white/[0.10] outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-2xl py-4 font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 group"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
                boxShadow: "0 0 32px rgba(168,85,247,0.4)",
              }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                  </svg>
                  Creating account…
                </span>
              ) : (
                <>
                  Create account
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-7 text-center text-sm text-gray-500">
            Already an explorer?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-violet-400 font-semibold cursor-pointer hover:text-fuchsia-400 transition-colors"
            >
              Sign in →
            </span>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap');
      `}</style>
    </div>
  );
}