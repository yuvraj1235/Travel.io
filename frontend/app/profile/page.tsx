"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  User, Map, Sun, Palmtree, Mountain, Coffee, 
  Compass, Heart, Star, Sparkles, Plane, Globe2,
  Settings, LogOut, Edit3, Award, Trophy, Clock,
  ThermometerSun, Umbrella, Wind, Landmark, Waves,
  Utensils, Music, Camera, BookOpen, Save, Check
} from "lucide-react";
import { signOut } from "next-auth/react";

// Animation keyframes component
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(2deg); }
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
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-float { animation: float 8s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
    .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
    .animate-gradient { background-size: 200% 200%; animation: gradient-shift 8s ease infinite; }
    .animate-spin-slow { animation: spin-slow 20s linear infinite; }
    .glass-effect { backdrop-filter: blur(16px) saturate(180%); }
    .text-gradient { background: linear-gradient(135deg, #0d9488 0%, #2dd4bf 50%, #14b8a6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hover-scale { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .hover-scale:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 20px 40px -15px rgba(13, 148, 136, 0.3); }
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-5px); box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.1); }
  `}</style>
);

const climates = [
  { id: 'Tropical', icon: <Sun className="w-5 h-5" />, description: 'Warm, sunny beaches', color: 'from-yellow-400 to-orange-400' },
  { id: 'Cold', icon: <Mountain className="w-5 h-5" />, description: 'Snowy mountains, winter sports', color: 'from-blue-400 to-cyan-400' },
  { id: 'Urban', icon: <Landmark className="w-5 h-5" />, description: 'City lights, culture', color: 'from-purple-400 to-pink-400' },
  { id: 'Mediterranean', icon: <Umbrella className="w-5 h-5" />, description: 'Mild summers, cozy winters', color: 'from-teal-400 to-emerald-400' },
  { id: 'Desert', icon: <ThermometerSun className="w-5 h-5" />, description: 'Hot days, cool nights', color: 'from-orange-400 to-red-400' },
  { id: 'Temperate', icon: <Wind className="w-5 h-5" />, description: 'Four seasons, moderate', color: 'from-green-400 to-teal-400' },
];

const budgetLevels = [
  { id: 'Budget', icon: '💰', range: '$500 - $1000', description: 'Smart spending, local experiences' },
  { id: 'Mid-range', icon: '💎', range: '$1000 - $3000', description: 'Comfortable stays, great value' },
  { id: 'Luxury', icon: '👑', range: '$3000+', description: 'Premium experiences, exclusive access' },
];

const activityOptions = [
  { id: 'Hiking', icon: <Mountain className="w-4 h-4" />, emoji: '🥾', category: 'Adventure' },
  { id: 'Museums', icon: <Landmark className="w-4 h-4" />, emoji: '🏛️', category: 'Culture' },
  { id: 'Nightlife', icon: <Music className="w-4 h-4" />, emoji: '🌃', category: 'Entertainment' },
  { id: 'Beaches', icon: <Waves className="w-4 h-4" />, emoji: '🏖️', category: 'Relaxation' },
  { id: 'Shopping', icon: <Camera className="w-4 h-4" />, emoji: '🛍️', category: 'Urban' },
  { id: 'Foodie', icon: <Utensils className="w-4 h-4" />, emoji: '🍜', category: 'Culinary' },
  { id: 'Photography', icon: <Camera className="w-4 h-4" />, emoji: '📸', category: 'Creative' },
  { id: 'History', icon: <BookOpen className="w-4 h-4" />, emoji: '📜', category: 'Culture' },
  { id: 'Wildlife', icon: <Heart className="w-4 h-4" />, emoji: '🦁', category: 'Nature' },
  { id: 'Skiing', icon: <Mountain className="w-4 h-4" />, emoji: '⛷️', category: 'Winter' },
  { id: 'Diving', icon: <Waves className="w-4 h-4" />, emoji: '🤿', category: 'Water' },
  { id: 'Yoga', icon: <Heart className="w-4 h-4" />, emoji: '🧘', category: 'Wellness' },
];

const travelStats = [
  { label: 'Countries Visited', value: '12', icon: <Globe2 className="w-4 h-4" /> },
  { label: 'Total Trips', value: '24', icon: <Plane className="w-4 h-4" /> },
  { label: 'Days Traveled', value: '156', icon: <Clock className="w-4 h-4" /> },
  { label: 'Achievements', value: '8', icon: <Trophy className="w-4 h-4" /> },
];

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('preferences');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // State for Preferences
  const [climate, setClimate] = useState("Tropical");
  const [budget, setBudget] = useState("Mid-range");
  const [activities, setActivities] = useState<string[]>(['Beaches', 'Foodie']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleActivity = (act: string) => {
    setActivities(prev => 
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveSuccess(false);
    try {
      await fetch("http://localhost:8000/api/auth/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user?.email,
          climate,
          budget,
          activities
        }),
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save preferences");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl mx-auto mb-6 animate-pulse"></div>
          <h2 className="text-2xl font-bold mb-4">Please log in to view profile</h2>
          <button 
            onClick={() => router.push('/login')}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen bg-[#faf9f6] font-sans text-slate-900 relative overflow-x-hidden">
        
        {/* Animated Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_#f0fdf4,_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_#e0f2fe,_transparent_50%)]"></div>
          <div 
            className="absolute w-96 h-96 bg-teal-200/30 rounded-full blur-[120px] animate-pulse-glow"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          ></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200/30 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0.03,
                fontSize: `${Math.random() * 30 + 20}px`,
              }}
            >
              {['✈️', '🗺️', '🌍', '🧭', '🏝️', '🗽', '🏔️', '🌊'][i]}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="glass-effect bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/50 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 group cursor-pointer" onClick={() => router.push('/home')}>
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-xl rotate-45 group-hover:rotate-90 transition-all duration-500"></div>
                    <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter">
                    <span className="text-gradient">Tripo</span>
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => router.push('/home')}
                    className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => signOut()} 
                    className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                  >
                    <LogOut size={16}/> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="relative z-10 pt-28 pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Profile Header */}
            <div className="relative mb-8 animate-slide-up">
              {/* Cover Image */}
              <div className="h-48 md:h-64 rounded-[2rem] bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 overflow-hidden relative">
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                  }}
                />
              </div>

              {/* Profile Info */}
              <div className="relative -mt-20 px-6 md:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl border-4 border-white overflow-hidden shadow-2xl">
                      <img 
                        src={session.user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop"} 
                        className="w-full h-full object-cover"
                        alt="Profile"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-xl border-4 border-white"></div>
                  </div>

                  {/* User Details */}
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-black mb-2">{session.user?.name}</h1>
                    <p className="text-lg text-slate-500 mb-3">{session.user?.email}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-bold">
                        <Award size={16} /> Explorer Level 3
                      </span>
                      <span className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-bold">
                        <Star size={16} /> 4.9 Rating
                      </span>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <button className="absolute top-4 right-4 md:static bg-white/90 backdrop-blur p-3 rounded-xl hover:bg-white transition-all shadow-lg">
                    <Edit3 size={20} className="text-slate-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {travelStats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur rounded-2xl p-4 border border-slate-100 card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl text-white flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-black">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-slate-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {['preferences', 'history', 'achievements'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all relative ${
                    activeTab === tab 
                      ? 'text-teal-600' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Preferences Panel */}
            {activeTab === 'preferences' && (
              <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                
                {/* Climate Preference */}
                <div className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-slate-100">
                  <h3 className="flex items-center gap-2 text-xl font-black mb-6">
                    <Sun className="text-orange-500" /> Preferred Climate
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {climates.map((item) => (
                      <button 
                        key={item.id}
                        onClick={() => setClimate(item.id)}
                        className={`group relative p-4 rounded-2xl border-2 transition-all ${
                          climate === item.id 
                            ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-emerald-50' 
                            : 'border-slate-100 hover:border-teal-200 hover:bg-teal-50/30'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            {item.icon}
                          </div>
                          <span className="font-bold text-sm">{item.id}</span>
                          <span className="text-[10px] text-slate-500 hidden md:block">{item.description}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Level */}
                <div className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-slate-100">
                  <h3 className="text-xl font-black mb-6">Travel Budget</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {budgetLevels.map((level) => (
                      <button 
                        key={level.id}
                        onClick={() => setBudget(level.id)}
                        className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                          budget === level.id 
                            ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-emerald-50' 
                            : 'border-slate-100 hover:border-teal-200'
                        }`}
                      >
                        <span className="text-3xl mb-3 block">{level.icon}</span>
                        <div className="font-bold text-lg">{level.id}</div>
                        <div className="text-sm text-teal-600 font-medium mb-1">{level.range}</div>
                        <div className="text-xs text-slate-500">{level.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activities Interest */}
                <div className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-slate-100">
                  <h3 className="text-xl font-black mb-6">Interests & Activities</h3>
                  <div className="flex flex-wrap gap-3">
                    {activityOptions.map((act) => (
                      <button
                        key={act.id}
                        onClick={() => toggleActivity(act.id)}
                        className={`group relative px-5 py-3 rounded-xl border-2 font-medium text-sm transition-all flex items-center gap-2 ${
                          activities.includes(act.id) 
                            ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white border-transparent shadow-lg shadow-teal-200/50' 
                            : 'border-slate-200 text-slate-600 hover:border-teal-200 hover:bg-teal-50/30'
                        }`}
                      >
                        <span className="text-lg">{act.emoji}</span>
                        {act.id}
                        {activities.includes(act.id) && (
                          <Check size={16} className="ml-1" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-teal-200/50 transition-all group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Saving Preferences...
                        </>
                      ) : saveSuccess ? (
                        <>
                          <Check size={20} />
                          Preferences Saved!
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Save My Travel Profile
                        </>
                      )}
                    </span>
                  </button>
                  
                  <button className="px-8 py-5 bg-white border-2 border-slate-200 rounded-2xl font-bold text-slate-600 hover:border-teal-200 hover:bg-teal-50/30 transition-all">
                    <Settings size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* History Panel (Placeholder) */}
            {activeTab === 'history' && (
              <div className="bg-white/80 backdrop-blur rounded-3xl p-12 text-center border border-slate-100 animate-slide-up">
                <div className="w-20 h-20 bg-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Plane className="w-10 h-10 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Your Travel History</h3>
                <p className="text-slate-500">Your past trips and adventures will appear here</p>
              </div>
            )}

            {/* Achievements Panel (Placeholder) */}
            {activeTab === 'achievements' && (
              <div className="grid md:grid-cols-3 gap-4 animate-slide-up">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/80 backdrop-blur rounded-3xl p-6 text-center border border-slate-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-1">Early Explorer</h4>
                    <p className="text-xs text-slate-500">Joined in 2024</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 py-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/30 backdrop-blur">
          © 2026 TRIPO TRAVEL AGENCY — YOUR JOURNEY BEGINS HERE
        </footer>
      </div>
    </>
  );
}