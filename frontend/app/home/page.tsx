'use client'
import React from 'react';
import { 
  MapPin, Calendar, CircleDollarSign, 
  Instagram, Facebook, Twitter, Star, Send 
} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* --- LAYER 1: BACKGROUND (Z-0) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Soft colorful gradients */}
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-orange-100/40 blur-[120px] rounded-full"></div>
          <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[50%] bg-blue-50/50 blur-[100px] rounded-full"></div>
          <div className="absolute top-[20%] left-[40%] w-[30%] h-[40%] bg-purple-50/30 blur-[100px] rounded-full"></div>

          {/* Floating Accents */}
          <div className="absolute top-20 left-10 opacity-20 rotate-12">
            <div className="flex gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1 h-4 bg-orange-400 rounded-full"></div>
              ))}
            </div>
            <div className="flex gap-1 mt-1 ml-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1 h-4 bg-orange-400 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Top Right Loop Arrow */}
          <div className="absolute top-40 right-[15%] opacity-40">
             <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-500">
                <path d="M100 20C90 40 40 20 50 60C60 100 110 80 80 110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
                <path d="M75 110L82 112L80 104" fill="currentColor"/>
             </svg>
          </div>

          {/* Bottom Left Sparkle */}
          <div className="absolute bottom-[20%] left-[5%] opacity-30">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 m-auto w-1 h-10 bg-orange-300 rounded-full"></div>
              <div className="absolute inset-0 m-auto h-1 w-10 bg-orange-300 rounded-full"></div>
              <div className="absolute inset-0 m-auto w-1 h-6 bg-orange-300 rounded-full rotate-45"></div>
              <div className="absolute inset-0 m-auto h-1 w-6 bg-orange-300 rounded-full rotate-45"></div>
            </div>
          </div>
        </div>
      </div>

      {/* --- LAYER 2: CONTENT (Z-10) --- */}
      <div className="relative z-10">
        {/* --- 1. NAVIGATION --- */}
        <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
          <div className="text-2xl font-black text-slate-900 tracking-tighter">Tripo</div>
          <div className="flex items-center space-x-8">
            <div className="hidden lg:flex space-x-8 text-[13px] font-bold text-slate-500">
              <a href="#" className="hover:text-teal-600 transition-colors">Discover</a>
              <a href="#" className="hover:text-teal-600 transition-colors">Community</a>
              <a href="#" className="hover:text-teal-600 transition-colors">Special Deals</a>
              <a href="#" className="hover:text-teal-600 transition-colors">About us</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-[13px] font-bold text-slate-900 px-2">Sign in</button>
              <button className="bg-black text-white px-6 py-2 rounded-lg text-[13px] font-bold hover:bg-teal-700 transition-all">Register</button>
            </div>
          </div>
        </nav>

        {/* --- 2. HERO SECTION --- */}
        <section className="relative pt-10 pb-20 px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            ✈️ Travel Agency
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Discover <span className="text-teal-500 relative inline-block">best<span className="absolute bottom-2 left-0 w-full h-1 bg-orange-400 rounded-full"></span></span> places <br />
            to enjoy your next vacation
          </h1>
          <p className="text-slate-500 text-sm mb-12 max-w-lg mx-auto font-medium leading-relaxed">
            TravelOnly is a family owned and operated Canadian company celebrating 45 years.
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <div className="w-28 h-40 bg-slate-200 rounded-[2rem] -rotate-6"></div>
            <div className="w-40 h-52 bg-slate-200 rounded-[2.5rem] mt-4"></div>
            <div className="w-44 h-56 bg-slate-200 rounded-[2.5rem] -mt-4 shadow-xl"></div>
            <div className="w-40 h-52 bg-slate-200 rounded-[2.5rem] mt-4"></div>
            <div className="w-28 h-40 bg-slate-200 rounded-[2rem] rotate-6"></div>
          </div>

          {/* SEARCH BAR */}
          <div className="w-full max-w-5xl mx-auto bg-white shadow-2xl shadow-slate-200/60 rounded-[3.5rem] p-3 flex flex-col md:flex-row items-center border border-slate-100 relative z-20">
            <div className="flex flex-col md:flex-row flex-1 items-center w-full">
              <div className="flex-1 flex items-center justify-start gap-3 py-6 px-7 hover:bg-slate-50 rounded-3xl transition-colors cursor-pointer group whitespace-nowrap">
                <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600">
                  <MapPin size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Destination</p>
                  <p className="text-[14px] font-black text-slate-900 leading-none">Monaco, Italy</p>
                </div>
              </div>
              <div className="hidden md:block h-10 w-px bg-slate-100"></div>
              <div className="flex-1 flex items-center justify-start gap-3 py-6 px-7 hover:bg-slate-50 rounded-3xl transition-colors cursor-pointer group whitespace-nowrap">
                <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600">
                  <CircleDollarSign size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Average Price</p>
                  <p className="text-[14px] font-black text-slate-900 leading-none">$800 - $1000</p>
                </div>
              </div>
              <div className="hidden md:block h-10 w-px bg-slate-100"></div>
              <div className="flex-1 flex items-center justify-start gap-3 py-6 px-7 hover:bg-slate-50 rounded-3xl transition-colors cursor-pointer group whitespace-nowrap">
                <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600">
                  <Calendar size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                  <p className="text-[14px] font-black text-slate-900 leading-none">22 Jun, 2022</p>
                </div>
              </div>
            </div>
            <div className="px-7 py-2 w-full md:w-auto">
              <button className="w-full md:w-auto bg-teal-700 text-white px-9 py-5 rounded-2xl font-black text-[13px] uppercase tracking-widest hover:bg-teal-800 transition-all shadow-xl shadow-teal-700/20 active:scale-95 whitespace-nowrap">
                Explore Now
              </button>
            </div>
          </div>
        </section>

        {/* --- 3. ABOUT & EXPERIENCE SECTIONS --- */}
        <section className="py-20 max-w-6xl mx-auto px-6 space-y-48">
          <div className="flex flex-col md:flex-row items-center gap-24">
            <div className="relative w-full md:w-1/2">
              <div className="w-full aspect-[16/10] rounded-4xl overflow-hidden shadow-sm">
                  <img src="/front_page.webp" alt="Landscape" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-16 -right-10 w-48 h-64 bg-slate-200 rounded-3xl border-[12px] border-white shadow-2xl overflow-hidden z-10">
                  <img src="/front_page.webp" alt="Poster" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">About us</div>
              <h2 className="text-4xl font-black mb-6 leading-tight text-slate-900">Travel around the <br/> world in just 120 days</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <button className="bg-teal-700 text-white px-7 py-3 rounded-xl text-xs font-bold shadow-lg shadow-teal-700/20">Book Now</button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-24">
            <div className="w-full md:w-[35%] h-[550px] rounded-4xl overflow-hidden shadow-2xl">
                <img src="/front_page.webp" alt="Experience" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-[65%]">
              <div className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Our Mission</div>
              <h2 className="text-4xl font-black mb-6 leading-tight text-slate-900">With our experience <br/> we will serve you</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
                  We believe in making travel accessible and unforgettable for everyone around the globe.
              </p>
              <div className="grid grid-cols-3 gap-8">
                  <div><p className="text-3xl font-black text-slate-900">20</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Years Experience</p></div>
                  <div><p className="text-3xl font-black text-slate-900">70+</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Destinations</p></div>
                  <div><p className="text-3xl font-black text-slate-900">40k+</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Happy Customers</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. TOP DESTINATIONS --- */}
        <section className="py-32 bg-slate-50/50">
          <div className="max-w-6xl mx-auto px-10 text-center">
            <h2 className="text-4xl font-black mb-16 text-slate-900 tracking-tight">Explore Top <span className="text-teal-500">Destinations</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="bg-white p-5 rounded-4xl shadow-sm border border-slate-100 transition-all hover:-translate-y-4 hover:shadow-2xl cursor-pointer">
                  <div className="h-64 bg-slate-100 rounded-3xl mb-6 overflow-hidden">
                    <img src="/front_page.webp" className="w-full h-full object-cover" alt="Destination" />
                  </div>
                  <h4 className="font-black text-xl mb-4 text-slate-900">Switzerland Island</h4>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-teal-600 font-black text-2xl">$430.15</span>
                    <div className="flex items-center gap-1 text-orange-400"><Star size={14} fill="currentColor"/> <span className="text-slate-400 text-xs font-bold">4.8</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5. CUSTOMER REVIEWS --- */}
         <section className="py-32 max-w-5xl mx-auto px-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-black leading-tight italic text-slate-900">What The Client Says <br /><span className="text-teal-600">About Us</span></h2>
        </div>
        <div className="space-y-32">
          {/* Review 1: Image Left */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-48 h-48 rounded-4xl overflow-hidden flex-shrink-0 shadow-xl border-8 border-white">
              <img src="/front_page.webp" className="w-full h-full object-cover" alt="Client 1" />
            </div>
            <div className="flex-1 text-left relative">
              <span className="text-teal-100 text-8xl absolute -top-10 -left-6 font-serif opacity-50 z-0">“</span>
              <div className="relative z-10">
                <div className="flex gap-1 text-orange-400 mb-6"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /></div>
                <p className="text-slate-500 italic text-xl leading-relaxed mb-6 font-medium">&quot;The best travel experience I have ever had. The planning was seamless and the destinations were breathtaking!&quot;</p>
                <h5 className="font-black italic text-slate-900 text-lg">Kamrul Hasan</h5>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">UX Designer</p>
              </div>
            </div>
          </div>
          {/* Review 2: Image Right */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16">
            <div className="w-48 h-48 rounded-4xl overflow-hidden flex-shrink-0 shadow-xl border-8 border-white">
              <img src="/front_page.webp" className="w-full h-full object-cover" alt="Client 2" />
            </div>
            <div className="flex-1 text-right relative">
              <span className="text-teal-100 text-8xl absolute -top-10 -right-6 font-serif opacity-50 z-0">”</span>
              <div className="relative z-10">
                <div className="flex gap-1 text-orange-400 mb-6 justify-end"><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /></div>
                <p className="text-slate-500 italic text-xl leading-relaxed mb-6 font-medium">&quot;Absolutely loved every moment of the trip. The coordination was perfect and the guide was very helpful.&quot;</p>
                <h5 className="font-black italic text-slate-900 text-lg">Jane Smith</h5>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Travel Enthusiast</p>
              </div>
            </div>
          </div>
        </div>
      </section>


        {/* --- 6. FOOTER --- */}
        <footer className="relative mt-60 pt-60 pb-16 bg-black text-slate-100">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[85%] max-w-4xl bg-teal-600 rounded-4xl p-16 text-center shadow-2xl z-20">
             <h2 className="text-4xl font-black text-white mb-10 leading-tight tracking-tight">Prepare yourself &amp; let&apos;s explore <br/> the beauty of the world</h2>
             <button className="bg-black text-white px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-widest">Explore Now</button>
          </div>
          <div className="max-w-7xl mx-auto px-10">
            <div className="flex flex-col md:flex-row pt-24 mb-24 items-start">
              <div className="w-full md:w-1/4 mb-12 md:mb-0">
                <h3 className="text-3xl font-black mb-8 italic underline decoration-orange-400 underline-offset-8">Tripo</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-8">The world&apos;s first and largest digital marketplace for travel adventures.</p>
                <div className="flex gap-5 text-slate-500">
                  <Instagram size={20} className="hover:text-white cursor-pointer" /> <Facebook size={20} className="hover:text-white cursor-pointer" /> <Twitter size={20} className="hover:text-white cursor-pointer" />
                </div>
              </div>
              <div className="hidden md:block w-24"></div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                <div>
                  <h6 className="font-black text-white text-[11px] uppercase tracking-widest mb-10">Services</h6>
                  <ul className="text-slate-400 text-[13px] space-y-4 font-bold">
                    <li>Career</li><li>Case Studies</li><li>Style Guide</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-black text-white text-[11px] uppercase tracking-widest mb-10">Navigation</h6>
                  <ul className="text-slate-400 text-[13px] space-y-4 font-bold">
                    <li>About Us</li><li>Contact</li><li>Blog</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-black text-white text-[11px] uppercase tracking-widest mb-10">Support</h6>
                  <ul className="text-slate-400 text-[13px] space-y-4 font-bold">
                    <li>FAQ</li><li>Terms</li><li>Privacy</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-black text-white text-[11px] uppercase tracking-widest mb-10">Any Questions?</h6>
                  <div className="flex bg-white/5 rounded-xl p-2 border border-white/10">
                    <input type="text" placeholder="Email" className="bg-transparent border-none focus:ring-0 text-[11px] flex-1 px-3 outline-none text-white font-bold" />
                    <button className="bg-teal-600 text-white p-2 rounded-lg"><Send size={14}/></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center text-slate-800 text-[10px] font-black pt-12 border-t border-white/5 uppercase tracking-[0.6em]">© 2026 Travego. World Travel Guide.</div>
          </div>
        </footer>
      </div>
    </main>
  );
}