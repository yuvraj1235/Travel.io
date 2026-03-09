"use client";

import React from "react";
import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const team = [
    { name: "Sarah Chen", role: "Founder & Explorer", image: "https://i.pravatar.cc/150?u=sarah" },
    { name: "Marcus Thorne", role: "AI Engineer", image: "https://i.pravatar.cc/150?u=marcus" },
    { name: "Elena Rossi", role: "UI Designer", image: "https://i.pravatar.cc/150?u=elena" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- HEADER --- */}
      <nav className="flex items-center justify-between px-12 py-6">
        <Link href="/home" className="text-2xl font-black tracking-tighter">Tripo</Link>
        <div className="flex items-center gap-8 text-sm font-bold text-slate-600">
          <Link href="/home" className="hover:text-teal-600">Discover</Link>
          <button className="rounded-full bg-black px-6 py-2 text-white transition hover:bg-slate-800">Register</button>
        </div>
      </nav>

      {/* --- HERO --- */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <span className="rounded-full bg-orange-50 px-4 py-1 text-xs font-black uppercase tracking-widest text-orange-500">
          Our Story
        </span>
        <h1 className="mt-6 text-6xl font-black tracking-tight leading-[1.1]">
          We help you find the <br />
          <span className="relative inline-block">
            perfect
            <span className="absolute bottom-3 left-0 -z-10 h-4 w-full bg-teal-100" />
          </span> escape.
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg font-medium text-slate-500 leading-relaxed">
          Tripo was founded in 2026 with a simple mission: to make world-class travel planning accessible to everyone through AI. We believe travel is the best way to grow.
        </p>
      </section>

      {/* --- TEAM SECTION --- */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-black text-center mb-16 italic">Meet the Team</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {team.map((member, idx) => (
              <div key={idx} className="group flex flex-col items-center">
                <div className="relative h-64 w-full overflow-hidden rounded-[3rem] grayscale transition duration-500 group-hover:grayscale-0">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="h-full w-full object-cover" 
                  />
                </div>
                <h3 className="mt-6 text-2xl font-black">{member.name}</h3>
                <p className="font-bold text-teal-600">{member.role}</p>
                
                <div className="mt-4 flex gap-4 text-slate-300">
                  <Twitter size={18} className="hover:text-teal-600 cursor-pointer transition" />
                  <Linkedin size={18} className="hover:text-teal-600 cursor-pointer transition" />
                  <Github size={18} className="hover:text-teal-600 cursor-pointer transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
        © 2026 TRIPO TRAVEL AGENCY
      </footer>
    </div>
  );
}