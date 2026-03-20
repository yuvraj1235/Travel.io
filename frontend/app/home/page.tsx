'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  MapPin, Calendar, CircleDollarSign, Sparkles, 
  Compass, Globe2, Waves, Mountain, Landmark,
  ArrowRight, ChevronRight, Star, Heart, Users,
  Camera, Sun, Coffee, Plane, Ship, Train,
  LogOut, Menu, X
} from 'lucide-react';
import { tripApi } from '@/app/api/api'; 
import { signOut } from 'next-auth/react';

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
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-float { animation: float 8s ease-in-out infinite; }
    .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
    .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
    .animate-gradient { background-size: 200% 200%; animation: gradient-shift 8s ease infinite; }
    .glass-effect { backdrop-filter: blur(16px) saturate(180%); }
    .text-gradient { background: linear-gradient(135deg, #0d9488 0%, #2dd4bf 50%, #14b8a6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hover-scale { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .hover-scale:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 20px 40px -15px rgba(13, 148, 136, 0.3); }
  `}</style>
);

const destinations = [
  { name: 'Santorini', country: 'Greece', image: '🏛️', color: 'from-blue-400 to-cyan-500' },
  { name: 'Bali', country: 'Indonesia', image: '🌺', color: 'from-emerald-400 to-teal-500' },
  { name: 'Kyoto', country: 'Japan', image: '🎋', color: 'from-pink-400 to-rose-500' },
  { name: 'Machu Picchu', country: 'Peru', image: '🏔️', color: 'from-amber-400 to-orange-500' },
  { name: 'Venice', country: 'Italy', image: '🎭', color: 'from-indigo-400 to-purple-500' },
  { name: 'Cape Town', country: 'South Africa', image: '🌊', color: 'from-teal-400 to-cyan-500' },
];

const testimonials = [
  { name: 'Sarah Chen', trip: 'Japan Explorer', rating: 5, text: 'The AI recommendations were spot-on! Discovered hidden gems I would never have found.' },
  { name: 'Marcus Rivera', trip: 'Italian Adventure', rating: 5, text: 'Saved 40% on my trip budget while experiencing luxury. Absolutely revolutionary.' },
  { name: 'Emma Watson', trip: 'Greek Islands', rating: 5, text: 'Every detail was perfectly planned. Best travel experience of my life!' },
];

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);
  
  // --- STATE FOR SEARCH BAR ---
  const [destination, setDestination] = useState('Santorini, Greece');
  const [budget, setBudget] = useState(2500);
  const [date, setDate] = useState('2026-07-15');
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestinationIndex((prev) => (prev + 1) % destinations.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const handleExplore = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      const newTrip = await tripApi.createTrip({
        userEmail: session.user?.email, 
        destination: destination,
        budgetLimit: Number(budget),
        startDate: date,
        endDate: date,
      });
      router.push(`/trips/${newTrip.id}`);
    } catch (error) {
      console.error("Explore Error:", error);
      alert("Failed to save trip. Check the console for validation details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GlobalStyles />
      <main className="min-h-screen bg-[#faf9f6] font-sans text-slate-900 overflow-x-hidden relative">
        
        {/* Premium Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_#f0fdf4,_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_#e0f2fe,_transparent_50%)]"></div>
          <div className="absolute top-20 left-10 w-96 h-96 bg-teal-200/30 rounded-full blur-[120px] animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-200/30 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-teal-100/20 via-transparent to-orange-100/20 rounded-full blur-[100px]"></div>
        </div>

        {/* Floating Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.1,
                fontSize: `${Math.random() * 40 + 20}px`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {['✈️', '🗺️', '🌍', '🧭', '🏝️', '🗽'][i]}
            </div>
          ))}
        </div>

        {/* Enhanced Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="glass-effect bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/50 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/')}>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-xl rotate-45 group-hover:rotate-90 transition-all duration-500"></div>
                    <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter">
                    <span className="text-gradient">Tripo</span>
                    <span className="ml-1 text-xs align-super text-slate-400">AI</span>
                  </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                  {['Destinations', 'Experiences', 'About', 'Contact'].map((item) => (
                    <button
                      key={item}
                      className="text-sm font-medium text-slate-600 hover:text-teal-600 relative group px-2 py-1"
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-500 group-hover:w-full transition-all duration-300"></span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {session ? (
                    <div className="flex items-center gap-4">
                      <div className="relative group">
                        <img 
                          src={session.user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop"} 
                          className="w-10 h-10 rounded-full border-2 border-teal-200 group-hover:border-teal-500 transition-all object-cover"
                          alt="Profile"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <button 
                        onClick={() => signOut()} 
                        className="hidden md:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                      >
                        <LogOut size={16}/> Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => router.push('/login')} 
                        className="hidden md:block text-sm font-medium text-slate-600 hover:text-teal-600 px-4 py-2"
                      >
                        Sign In
                      </button>
                      <button 
                        onClick={() => router.push('/signup')} 
                        className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-teal-200/50 transition-all hover-scale"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                  
                  {/* Mobile Menu Button */}
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2.5 bg-slate-100 rounded-xl"
                  >
                    {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="lg:hidden mt-4 pt-4 border-t border-slate-100 animate-slide-up">
                  {['Destinations', 'Experiences', 'About', 'Contact'].map((item) => (
                    <button
                      key={item}
                      className="block w-full text-left py-3 text-slate-600 hover:text-teal-600 hover:bg-slate-50 rounded-lg px-4 transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-40 pb-20 px-4 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm text-teal-700 px-5 py-2.5 rounded-full text-sm font-medium border border-teal-100 shadow-lg">
                  <Sparkles size={18} className="text-teal-500" />
                  <span>AI-Powered Travel Planning</span>
                  <span className="bg-teal-500 text-white px-2 py-0.5 rounded-full text-xs">New</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black leading-[1.1]">
                  <span className="block">Discover the</span>
                  <span className="relative">
                    <span className="text-gradient">world's beauty</span>
                    <span 
                      className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-teal-200 via-orange-200 to-pink-200 rounded-full"
                      style={{
                        transform: `translateX(${mousePosition.x * 20 - 10}px)`,
                      }}
                    ></span>
                  </span>
                  <span className="block mt-2">with AI guidance</span>
                </h1>

                <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
                  Experience personalized itineraries, insider tips, and seamless planning powered by advanced AI. Your perfect journey starts here.
                </p>

                {/* Stats */}
                <div className="flex gap-8 pt-4">
                  {[
                    { value: '50K+', label: 'Happy Travelers' },
                    { value: '100+', label: 'Destinations' },
                    { value: '4.9', label: 'App Rating', icon: <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center md:text-left">
                      <div className="text-2xl font-black flex items-center gap-1">
                        {stat.value}
                        {stat.icon}
                      </div>
                      <div className="text-sm text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Floating Cards - Hidden on mobile */}
                <div className="hidden lg:block relative h-32">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute glass-effect bg-white/80 backdrop-blur-xl rounded-2xl p-3 shadow-xl border border-white/50"
                      style={{
                        left: `${i * 70}px`,
                        top: `${i * 15}px`,
                        transform: `rotate(${i * 3}deg)`,
                        animation: `float ${5 + i}s ease-in-out infinite`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${destinations[i % destinations.length].color}`}></div>
                        <div>
                          <div className="text-sm font-bold">{destinations[i % destinations.length].name}</div>
                          <div className="text-xs text-slate-500">Perfect match</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Enhanced Search Bar */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-[4rem] blur-3xl animate-pulse-glow"></div>
                <div className="relative glass-effect bg-white/90 backdrop-blur-xl rounded-[3rem] p-8 shadow-2xl border border-white/50">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Compass className="text-teal-500" />
                    Plan your journey
                  </h3>

                  <div className="space-y-4">
                    {/* Destination Input */}
                    <div className="group relative">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                        Where to?
                      </label>
                      <div className={`flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border-2 transition-all ${
                        isHovering ? 'border-teal-500 bg-white' : 'border-transparent'
                      }`}>
                        <MapPin className="text-teal-500" size={20} />
                        <input 
                          className="text-lg font-medium w-full bg-transparent outline-none placeholder-slate-300"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          onFocus={() => setIsHovering(true)}
                          onBlur={() => setIsHovering(false)}
                          placeholder="Enter destination"
                        />
                      </div>
                      {/* Suggestions */}
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-10">
                        {destinations.slice(0, 3).map((dest) => (
                          <button
                            key={dest.name}
                            className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 transition-all"
                            onClick={() => setDestination(`${dest.name}, ${dest.country}`)}
                          >
                            <span className="text-2xl">{dest.image}</span>
                            <div>
                              <div className="font-medium">{dest.name}</div>
                              <div className="text-sm text-slate-500">{dest.country}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Budget and Date Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                          Budget ($)
                        </label>
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                          <CircleDollarSign className="text-teal-500" size={20} />
                          <input 
                            type="number"
                            className="text-lg font-medium w-full bg-transparent outline-none"
                            value={budget}
                            onChange={(e) => setBudget(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                          Date
                        </label>
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                          <Calendar className="text-teal-500" size={20} />
                          <input 
                            type="date"
                            className="text-lg font-medium w-full bg-transparent outline-none"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* AI Insights */}
                    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 rounded-2xl border border-teal-100">
                      <div className="flex items-start gap-3">
                        <Sparkles className="text-teal-500 w-5 h-5 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-teal-700 mb-1">AI Travel Insight</div>
                          <p className="text-sm text-slate-600">
                            July is peak season in {destination.split(',')[0]}. Book early for best deals!
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Explore Button */}
                    <button 
                      onClick={handleExplore}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-teal-200/50 transition-all group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Planning your adventure...
                          </>
                        ) : (
                          <>
                            Explore Now
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>

                    {/* Trust Badges */}
                    <div className="flex items-center justify-center gap-6 pt-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <img
                            key={i}
                            src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1500648767791-00dcc994a37e' : i === 3 ? '1494790108377-be9c29b29330' : '1507003211169-0a1dd7228f2d'}?w=32&h=32&fit=crop&crop=faces`}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            alt="User"
                          />
                        ))}
                      </div>
                      <div className="text-sm text-slate-500">
                        <span className="font-bold text-slate-900">10K+</span> trips planned today
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="relative py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-teal-600 font-bold text-sm uppercase tracking-wider bg-teal-50 px-4 py-2 rounded-full">
                Popular Destinations
              </span>
              <h2 className="text-4xl md:text-5xl font-black mt-6 mb-4">
                Trending <span className="text-gradient">Escapes</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Most booked destinations this month, curated by our AI for the perfect experience
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {destinations.map((dest, index) => (
                <button
                  key={dest.name}
                  className="group relative overflow-hidden rounded-3xl aspect-square hover-scale"
                  onClick={() => setDestination(`${dest.name}, ${dest.country}`)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${dest.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="relative h-full p-5 flex flex-col justify-between">
                    <span className="text-4xl transform group-hover:scale-110 transition-transform">
                      {dest.image}
                    </span>
                    <div className="text-left">
                      <div className="text-white font-bold text-lg">{dest.name}</div>
                      <div className="text-white/80 text-sm">{dest.country}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-24 px-4 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: 'AI Personalization',
                  description: 'Smart itineraries tailored to your preferences and budget',
                  color: 'from-teal-500 to-emerald-500',
                },
                {
                  icon: <Globe2 className="w-8 h-8" />,
                  title: 'Global Coverage',
                  description: 'Access to 100+ destinations with local insights',
                  color: 'from-orange-500 to-pink-500',
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: 'Community Reviews',
                  description: 'Real experiences from verified travelers',
                  color: 'from-purple-500 to-indigo-500',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Loved by <span className="text-gradient">Travelers</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.trip}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-[4rem] bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 p-1">
              {/* Fixed SVG background pattern */}
              <div 
                className="absolute inset-0 opacity-20" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat'
                }}
              />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-[4rem] py-20 px-8 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                  Ready to explore the world?
                </h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                  Join thousands of travelers who've discovered their perfect journey with Tripo AI
                </p>
                <button 
                  onClick={() => router.push(session ? '/dashboard' : '/signup')}
                  className="bg-white text-teal-600 px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all group inline-flex items-center gap-2"
                >
                  {session ? 'Go to Dashboard' : 'Start Your Journey'}
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-16 px-4 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Plane className="w-8 h-8 text-teal-600" />
                  <span className="text-2xl font-black text-gradient">Tripo</span>
                </div>
                <p className="text-slate-600 max-w-md">
                  Revolutionizing travel with AI-powered planning. Your personal travel assistant for unforgettable journeys.
                </p>
              </div>
              {[
                { title: 'Company', links: ['About', 'Careers', 'Press'] },
                { title: 'Resources', links: ['Blog', 'Guides', 'Support'] },
                { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies'] },
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="font-bold mb-4">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link}>
                        <button className="text-slate-600 hover:text-teal-600 transition-colors text-sm">
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
              © 2026 Tripo AI. All rights reserved. Crafted with 💚 for travelers.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}