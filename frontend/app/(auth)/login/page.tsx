"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  Plane, Globe, ShieldCheck, ArrowRight, 
  Mail, Lock, Eye, EyeOff, Star
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login - replace with actual logic
    setTimeout(() => {
      setIsLoading(false);
      router.push('/home');
    }, 1500);
  };

  return (
    <>
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
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-gradient { background-size: 200% 200%; animation: gradient-shift 8s ease infinite; }
        .glass-effect { backdrop-filter: blur(16px) saturate(180%); }
        .text-gradient { background: linear-gradient(135deg, #0d9488 0%, #2dd4bf 50%, #14b8a6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hover-scale { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        .hover-scale:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 20px 40px -15px rgba(13, 148, 136, 0.3); }
        .input-focus-ring:focus { outline: none; box-shadow: 0 0 0 4px rgba(13, 148, 136, 0.1); border-color: #0d9488; }
      `}</style>

      <div className="flex min-h-screen bg-[#faf9f6] font-sans relative overflow-hidden">
        
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
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {['✈️', '🗺️', '🌍', '🧭', '🏝️', '🗽', '🏔️', '🌊'][i]}
            </div>
          ))}
        </div>

        {/* --- LEFT SIDE: THE INSPIRATION (HIDDEN ON MOBILE) --- */}
        <div className="relative hidden w-1/2 lg:block z-10">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80"
              alt="Tropical Paradise"
              className="h-full w-full object-cover scale-105 hover:scale-100 transition-transform duration-10000"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
            
            {/* Animated Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
              }}
            />
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-16 text-white">
            <div className="animate-slide-up">
              {/* Logo with animation */}
              <div className="flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl rotate-45"></div>
                  <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-6 h-6 -rotate-45" />
                </div>
                <h1 className="text-4xl font-black tracking-tighter">Tripo</h1>
              </div>

              {/* Inspirational Quote */}
              <blockquote className="max-w-md">
                <p className="text-3xl font-light leading-relaxed">
                  "The world is a book, and those who do not travel read only one page."
                </p>
                <footer className="mt-4 text-sm text-white/70">— Saint Augustine</footer>
              </blockquote>

              {/* Destination Pills */}
              <div className="flex flex-wrap gap-3 mt-12">
                {['Santorini', 'Bali', 'Kyoto', 'Alps'].map((dest) => (
                  <span key={dest} className="px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium border border-white/20">
                    {dest}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12">
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-white/60">Happy Travelers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-sm text-white/60 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: THE LOGIN FORM --- */}
        <div className="relative z-10 flex w-full flex-col justify-center px-6 lg:w-1/2 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 lg:hidden">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl rotate-45"></div>
                <span className="text-3xl font-black text-gradient">Tripo</span>
              </div>
            </div>

            {/* Header */}
            <div className="mb-10 animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Welcome <span className="text-gradient">back</span>
              </h2>
              <p className="mt-3 text-lg text-slate-500">
                Login to continue your journey
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 placeholder-slate-400 input-focus-ring transition-all group-focus-within:bg-white"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wider ml-1">
                    Password
                  </label>
                  <button type="button" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                    Forgot?
                  </button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-teal-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-slate-900 placeholder-slate-400 input-focus-ring transition-all group-focus-within:bg-white"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-teal-200/50 transition-all group relative overflow-hidden mt-8"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      Continue to Dashboard
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#faf9f6] px-4 font-bold text-slate-400">Or continue with</span>
              </div>
            </div>

            {/* Google Button */}
            <button
              onClick={() => signIn("google", { callbackUrl: "/home" })}
              className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-slate-200 rounded-2xl font-bold text-slate-700 hover:border-teal-200 hover:bg-teal-50/30 transition-all group animate-slide-up hover-scale"
              style={{ animationDelay: '0.3s' }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-slate-600 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Don't have an account?{' '}
              <button 
                onClick={() => router.push('/signup')}
                className="font-bold text-teal-600 hover:text-teal-700 underline-offset-2 hover:underline transition-all"
              >
                Sign up free
              </button>
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-4 mt-12 p-6 bg-white/80 backdrop-blur rounded-3xl border border-slate-100 animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <Plane className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">AI-Powered Flights</p>
                  <p className="text-sm text-slate-500">Smart recommendations</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-teal-50 rounded-xl">
                  <Globe className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">100+ Destinations</p>
                  <p className="text-sm text-slate-500">Global coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Secure Storage</p>
                  <p className="text-sm text-slate-500">Powered by Neon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-12 text-center text-xs font-bold text-slate-400 uppercase tracking-widest animate-slide-up" style={{ animationDelay: '0.6s' }}>
            © 2026 TRIPO TRAVEL AGENCY — YOUR JOURNEY BEGINS HERE
          </p>
        </div>
      </div>
    </>
  );
}