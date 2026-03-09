"use client";

import { signIn } from "next-auth/react";
import { Plane, Globe, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* --- LEFT SIDE: THE INSPIRATION (HIDDEN ON MOBILE) --- */}
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80"
          alt="Tropical Beach"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-12 left-12 text-white">
          <h1 className="text-5xl font-black tracking-tighter">Tripo.</h1>
          <p className="mt-4 max-w-md text-lg font-medium opacity-90">
            "The world is a book, and those who do not travel read only one page."
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: THE LOGIN FORM --- */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 lg:hidden">
             <h1 className="text-3xl font-black text-teal-600 tracking-tighter">Tripo.</h1>
          </div>
          
          <h2 className="text-4xl font-black text-slate-900">Welcome Back</h2>
          <p className="mt-2 font-medium text-slate-500">
            Login to access your personalized itineraries.
          </p>

          <div className="mt-10 space-y-4">
            <button
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-slate-100 bg-white py-4 font-bold text-slate-700 transition-all hover:border-teal-100 hover:bg-teal-50/30 active:scale-95"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                className="h-5 w-5"
                alt="Google"
              />
              Continue with Google
            </button>
          </div>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 font-black text-slate-400">Trusted By Travelers</span></div>
          </div>

          {/* Features / Social Proof */}
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-orange-50 p-2 text-orange-500"><Plane size={20} /></div>
              <p className="text-sm font-bold text-slate-600">AI-Powered Flight Suggestions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-teal-50 p-2 text-teal-500"><Globe size={20} /></div>
              <p className="text-sm font-bold text-slate-600">Real-time Global Destinations</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-50 p-2 text-blue-500"><ShieldCheck size={20} /></div>
              <p className="text-sm font-bold text-slate-600">Secure Cloud Data with Neon</p>
            </div>
          </div>
        </div>
        
        <p className="mt-20 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
          © 2026 TRIPO TRAVEL AGENCY
        </p>
      </div>
    </div>
  );
}