"use client";

import React from "react";
import { User, Mail, Map, Award, Settings, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  // Example user data - in production, this comes from useSession()
  const user = {
    name: "Alex Rivera",
    email: "alex.travels@gmail.com",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80",
    tripsCount: 12,
    countriesVisited: 8,
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- HEADER --- */}
      <nav className="flex items-center justify-between px-12 py-6">
        <Link href="/home" className="text-2xl font-black tracking-tighter">Tripo</Link>
        <div className="flex items-center gap-8 text-sm font-bold text-slate-600">
          <Link href="/home" className="hover:text-teal-600">Discover</Link>
          <Link href="/about" className="hover:text-teal-600">About us</Link>
          <button className="flex items-center gap-2 text-red-500 hover:opacity-80">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img 
              src={user.image} 
              alt={user.name} 
              className="h-32 w-32 rounded-[2.5rem] object-cover ring-4 ring-teal-50" 
            />
            <div className="absolute -bottom-2 -right-2 rounded-2xl bg-teal-600 p-2 text-white shadow-lg">
              <Award size={20} />
            </div>
          </div>
          <h2 className="mt-6 text-4xl font-black tracking-tight">{user.name}</h2>
          <p className="flex items-center gap-2 font-medium text-slate-400">
            <Mail size={16} /> {user.email}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="rounded-[2rem] bg-slate-50 p-8 text-center">
            <p className="text-3xl font-black text-teal-600">{user.tripsCount}</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Trips Planned</p>
          </div>
          <div className="rounded-[2rem] bg-slate-50 p-8 text-center">
            <p className="text-3xl font-black text-teal-600">{user.countriesVisited}</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Countries</p>
          </div>
        </div>

        {/* Menu Options */}
        <div className="mt-12 space-y-3">
          {[
            { label: "My Itineraries", icon: <Map className="text-teal-600" />, link: "/home" },
            { label: "Account Settings", icon: <Settings className="text-teal-600" />, link: "#" },
          ].map((item, idx) => (
            <Link 
              key={idx} 
              href={item.link}
              className="flex items-center justify-between rounded-3xl border border-slate-100 p-6 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white p-2 shadow-sm">{item.icon}</div>
                <span className="font-black text-slate-700">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-slate-300" />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}