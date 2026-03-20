"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Globe2, Sparkles, Plane, Compass, ArrowRight, Star, Share2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Animation keyframes component
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
    }
    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-10px) scale(1.02); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.5; filter: blur(40px); }
      50% { opacity: 0.8; filter: blur(60px); }
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-float { animation: float 8s ease-in-out infinite; }
    .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
    .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
    .glass-effect { backdrop-filter: blur(16px) saturate(180%); }
    .text-gradient { background: linear-gradient(135deg, #0d9488 0%, #2dd4bf 50%, #14b8a6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hover-scale { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .hover-scale:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 20px 40px -15px rgba(13, 148, 136, 0.3); }
  `}</style>
);

export default function AboutPage() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const team = [
    { 
      name: "Sarah Chen", 
      role: "Founder & Explorer", 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
      bio: "Visited 47 countries, turned her passion into AI-powered travel planning"
    },
    { 
      name: "Marcus Thorne", 
      role: "AI Engineer", 
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a37e?w=400&auto=format&fit=crop",
      bio: "Built the algorithms that create your perfect personalized itineraries"
    },
    { 
      name: "Elena Rossi", 
      role: "UI Designer", 
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
      bio: "Designs experiences that make travel planning feel like a vacation"
    },
  ];

  const milestones = [
    { year: '2024', event: 'Tripo founded in San Francisco', icon: <Plane className="w-5 h-5" /> },
    { year: '2025', event: 'Launched AI trip planner to 10K beta users', icon: <Sparkles className="w-5 h-5" /> },
    { year: '2026', event: 'Expanded to 100+ destinations worldwide', icon: <Globe2 className="w-5 h-5" /> },
  ];

  const values = [
    { title: 'Adventure First', description: 'We believe the best stories are written on the road', icon: '🗺️' },
    { title: 'AI-Powered', description: 'Smart technology that adapts to your travel style', icon: '🤖' },
    { title: 'Community Driven', description: 'Real reviews from real travelers', icon: '🌍' },
  ];

  const floatingItems = useMemo(() => {
    let seed = 123456;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    return Array.from({ length: 4 }).map((_, i) => ({
      left: `${rand() * 100}%`,
      top: `${rand() * 100}%`,
      animationDelay: `${i * 0.5}s`,
      opacity: 0.05,
      fontSize: `${rand() * 40 + 20}px`,
      rotation: rand() * 360,
      emoji: ['✈️', '🗺️', '🌍', '🧭'][i],
    }));
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-[#faf9f6] font-sans text-slate-900 overflow-x-hidden relative">
        
        {/* Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_#f0fdf4,_transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px] animate-pulse-glow"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-orange-200/30 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {floatingItems.map((item, i) => (
            <div
              key={i}
              className="absolute animate-float-slow"
              style={{
                left: item.left,
                top: item.top,
                animationDelay: item.animationDelay,
                opacity: item.opacity,
                fontSize: item.fontSize,
                transform: `rotate(${item.rotation}deg)`,
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        {/* --- ENHANCED HEADER --- */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="glass-effect bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/50 px-6 py-3">
              <div className="flex items-center justify-between">
                <Link href="/home" className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-xl rotate-45 group-hover:rotate-90 transition-all duration-500"></div>
                    <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter">
                    <span className="text-gradient">Tripo</span>
                  </span>
                </Link>

                <div className="flex items-center gap-8">
                  <div className="hidden md:flex items-center gap-6">
                    <Link href="/home" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
                      Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-teal-600 border-b-2 border-teal-600 pb-1">
                      About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
                      Contact
                    </Link>
                  </div>
                  <button 
                    onClick={() => router.push('/register')}
                    className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-teal-200/50 transition-all hover-scale"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <section ref={heroRef} className="relative pt-40 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-teal-700 px-5 py-2.5 rounded-full text-sm font-medium border border-teal-100 shadow-lg mb-8 animate-slide-up">
              <Sparkles size={18} className="text-teal-500" />
              <span>Our Story</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              We help you find the <br />
              <span className="relative inline-block">
                <span className="text-gradient">perfect</span>
                <span 
                  className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-teal-200 via-orange-200 to-pink-200 rounded-full"
                  style={{
                    transform: `translateX(${mousePosition.x * 20 - 10}px)`,
                  }}
                ></span>
              </span> escape.
            </h1>

            <p className="mx-auto max-w-3xl text-lg md:text-xl text-slate-600 leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Tripo was founded in 2024 with a simple mission: to make world-class travel planning 
              accessible to everyone through AI. We believe travel is the best way to grow, learn, 
              and connect with the world around us.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-12 pt-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              {[
                { value: '50K+', label: 'Happy Travelers' },
                { value: '100+', label: 'Destinations' },
                { value: '4.9', label: 'App Rating', icon: <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-black flex items-center gap-1 justify-center">
                    {stat.value}
                    {stat.icon}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- MILESTONES SECTION --- */}
        <section className="relative py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {milestones.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 hover-scale group"
                >
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl text-white flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-all">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-black text-teal-600 mb-3">{item.year}</div>
                  <p className="text-lg font-medium text-slate-700">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- VALUES SECTION --- */}
        <section className="relative py-20 px-4 bg-slate-50/80">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Our <span className="text-gradient">Values</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                The principles that guide every journey we help create
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 text-center group"
                >
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- TEAM SECTION --- */}
        <section className="relative py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Meet the <span className="text-gradient">Team</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Passionate travelers and tech innovators dedicated to transforming how you explore the world
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div 
                  key={idx} 
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="relative h-80 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Social overlay */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-20 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
                        <Globe2 size={18} />
                      </button>
                      <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
                        <Share2 size={18} />
                      </button>
                      <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
                        <Mail size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-black mb-1">{member.name}</h3>
                    <p className="text-teal-600 font-bold mb-3">{member.role}</p>
                    <p className="text-slate-500 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="relative py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-[4rem] bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 p-1">
              <div 
                className="absolute inset-0 opacity-20" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat'
                }}
              />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-[4rem] py-20 px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                  Ready to start your journey?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Join thousands of travelers who've already discovered their perfect trip with Tripo AI
                </p>
                <button 
                  onClick={() => router.push('/home')}
                  className="bg-white text-teal-600 px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all group inline-flex items-center gap-2"
                >
                  Plan Your Adventure
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="relative py-16 px-4 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <Compass className="w-6 h-6 text-teal-600" />
                <span className="text-xl font-black text-gradient">Tripo</span>
              </div>
              
              <div className="flex gap-8 text-sm text-slate-500">
                <Link href="/about" className="hover:text-teal-600 transition-colors">About</Link>
                <Link href="/privacy" className="hover:text-teal-600 transition-colors">Privacy</Link>
                <Link href="/terms" className="hover:text-teal-600 transition-colors">Terms</Link>
                <Link href="/contact" className="hover:text-teal-600 transition-colors">Contact</Link>
              </div>

              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                © 2026 TRIPO TRAVEL AGENCY
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}