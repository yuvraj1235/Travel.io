'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, Calendar, CircleDollarSign, 
  Instagram, Facebook, Twitter, Star, Send 
} from 'lucide-react';
import { tripApi } from '@/app/api/api'; // Import our connector

export default function Home() {
  const router = useRouter();
  
  // --- STATE FOR SEARCH BAR ---
  const [destination, setDestination] = useState('Monaco, Italy');
  const [budget, setBudget] = useState(1000);
  const [date, setDate] = useState('2026-06-22');
  const [isLoading, setIsLoading] = useState(false);

  // --- HANDLER TO CONNECT TO BACKEND ---
  const handleExplore = async () => {
    setIsLoading(true);
    try {
      const newTrip = await tripApi.createTrip({
        userId: 1, // Placeholder until Auth is ready
        destination: destination,
        budgetLimit: budget,
        startDate: new Date(date).toISOString(),
        endDate: new Date(date).toISOString(), // Simplified for now
      });
      
      // Redirect to the trip overview page
      router.push(`/trips/${newTrip.id}`);
    } catch (error) {
      alert("Backend connection failed. Is your FastAPI server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-orange-100/40 blur-[120px] rounded-full"></div>
        {/* ... (Keep your existing decorative SVG/div elements here) ... */}
      </div>

      <div className="relative z-10">
        <nav className="flex items-center justify-between px-10 py-6 max-w-7xl mx-auto">
          <div className="text-2xl font-black text-slate-900 tracking-tighter">Tripo</div>
          <div className="flex items-center space-x-8">
            <div className="hidden lg:flex space-x-8 text-[13px] font-bold text-slate-500">
              <a href="#" className="hover:text-teal-600">Discover</a>
              <a href="#" className="hover:text-teal-600">About us</a>
            </div>
            <button className="bg-black text-white px-6 py-2 rounded-lg text-[13px] font-bold">Register</button>
          </div>
        </nav>

        <section className="relative pt-10 pb-20 px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase mb-6">
            ✈️ Travel Agency
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
            Discover <span className="text-teal-500 relative">best<span className="absolute bottom-2 left-0 w-full h-1 bg-orange-400"></span></span> places <br />
            to enjoy your next vacation
          </h1>

          {/* --- UPDATED SEARCH BAR --- */}
          <div className="w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-[3.5rem] p-3 flex flex-col md:flex-row items-center border border-slate-100 relative z-20">
            <div className="flex flex-col md:flex-row flex-1 items-center w-full">
              
              {/* Destination Input */}
              <div className="flex-1 flex items-center gap-3 py-6 px-7 hover:bg-slate-50 rounded-3xl transition-colors">
                <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600"><MapPin size={20} /></div>
                <div className="text-left w-full">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Destination</p>
                  <input 
                    className="text-[14px] font-black text-slate-900 w-full bg-transparent outline-none"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              <div className="hidden md:block h-10 w-px bg-slate-100"></div>

              {/* Price/Budget Input */}
              <div className="flex-1 flex items-center gap-3 py-6 px-7 hover:bg-slate-50 rounded-3xl transition-colors">
                <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600"><CircleDollarSign size={20} /></div>
                <div className="text-left w-full">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Average Price</p>
                  <input 
                    type="number"
                    className="text-[14px] font-black text-slate-900 w-full bg-transparent outline-none"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="hidden md:block h-10 w-px bg-slate-100"></div>

              {/* Date Input */}
              <div className="flex-1 flex items-center gap-3 py-6 px-7 hover:bg-slate-50 rounded-3xl transition-colors">
                <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600"><Calendar size={20} /></div>
                <div className="text-left w-full">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                  <input 
                    type="date"
                    className="text-[14px] font-black text-slate-900 w-full bg-transparent outline-none"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="px-7 py-2 w-full md:w-auto">
              <button 
                onClick={handleExplore}
                disabled={isLoading}
                className="w-full md:w-auto bg-teal-700 text-white px-9 py-5 rounded-2xl font-black text-[13px] uppercase hover:bg-teal-800 transition-all disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Explore Now"}
              </button>
            </div>
          </div>
        </section>

        {/* ... (Keep the rest of your UI sections: About, Destinations, etc.) ... */}
      </div>
    </main>
  );
}