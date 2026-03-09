"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  Calendar, MapPin, Utensils, Camera, 
  ChevronLeft, Share2, DollarSign, Plane, 
  Hotel, Briefcase, Plus, X, Trash2 
} from "lucide-react";
import Link from "next/link";
import { itineraryApi, tripApi } from "@/app/api/api"; // Ensure this path is correct

/**
 * Maps database item types to specific Lucide icons
 */
const getIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case "flight": return <Plane className="text-teal-600" size={20} />;
    case "hotel": return <Hotel className="text-teal-600" size={20} />;
    case "food": return <Utensils className="text-teal-600" size={20} />;
    case "activity": return <Camera className="text-teal-600" size={20} />;
    default: return <Briefcase className="text-teal-600" size={20} />;
  }
};

export default function TripDetailsPage() {
  const { id } = useParams();
  
  // State Management
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // "Add Activity" Form State
  const [showAdd, setShowAdd] = useState(false);
  const [newAct, setNewAct] = useState({ title: "", type: "activity", cost: 0 });

  /**
   * Fetches both trip metadata and itinerary items from FastAPI
   */
  const loadData = async () => {
    try {
      const [itineraryData, tripData] = await Promise.all([
        itineraryApi.getItinerary(id as string),
        tripApi.getTripDetails(id as string)
      ]);
      setItinerary(itineraryData);
      setTrip(tripData);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  /**
   * Submits a new activity to the backend
   */
  const handleSaveActivity = async () => {
    if (!newAct.title) return alert("Please enter a title");
    
    try {
      await itineraryApi.addActivity({ 
        tripId: Number(id), 
        ...newAct 
      });
      setShowAdd(false);
      setNewAct({ title: "", type: "activity", cost: 0 });
      await loadData(); // Refresh list after saving
    } catch (err) {
      alert("Failed to save activity. Check if backend is running.");
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center font-black text-teal-600 animate-pulse">
      LOADING YOUR ADVENTURE...
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* --- NAVIGATION --- */}
      <nav className="flex items-center justify-between px-12 py-6">
        <Link href="/home" className="text-2xl font-black tracking-tighter">Tripo</Link>
        <div className="flex items-center gap-8 text-sm font-bold text-slate-600">
          <Link href="/home" className="hover:text-teal-600">Discover</Link>
          <Link href="/about" className="hover:text-teal-600">About us</Link>
          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200" />
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="relative h-[500px] w-full overflow-hidden rounded-[3rem] shadow-2xl">
          <img 
            src={trip?.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"} 
            alt={trip?.destination} 
            className="h-full w-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/10" />
          <Link href="/home" className="absolute left-8 top-8 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold backdrop-blur-md transition hover:bg-white shadow-lg">
            <ChevronLeft size={18} /> Back
          </Link>
        </div>

        {/* --- FLOATING STATS CARD --- */}
        <div className="absolute -bottom-16 left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-between rounded-[2.5rem] border border-slate-100 bg-white/90 p-8 shadow-2xl backdrop-blur-xl lg:w-3/4">
          <div className="flex items-center gap-4 px-6">
            <div className="rounded-2xl bg-teal-50 p-3 text-teal-600"><MapPin size={24} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Destination</p>
              <p className="text-lg font-black">{trip?.destination || "Unknown"}</p>
            </div>
          </div>

          <div className="h-12 w-[1px] bg-slate-200 hidden md:block" />

          <div className="flex items-center gap-4 px-6">
            <div className="rounded-2xl bg-teal-50 p-3 text-teal-600"><DollarSign size={24} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Budget</p>
              <p className="text-lg font-black">${trip?.price || "0"}</p>
            </div>
          </div>

          <div className="h-12 w-[1px] bg-slate-200 hidden md:block" />

          <div className="flex items-center gap-4 px-6">
            <div className="rounded-2xl bg-teal-50 p-3 text-teal-600"><Calendar size={24} /></div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Date</p>
              <p className="text-lg font-black">{trip?.date || "TBD"}</p>
            </div>
          </div>

          <button className="flex h-16 w-16 items-center justify-center rounded-3xl bg-teal-600 text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700 active:scale-95">
            <Share2 size={24} />
          </button>
        </div>
      </div>

      {/* --- ITINERARY SECTION --- */}
      <main className="mx-auto mt-40 max-w-4xl px-6 pb-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black tracking-tight">
            Your <span className="relative inline-block">
              itinerary
              <span className="absolute bottom-2 left-0 -z-10 h-3 w-full bg-teal-100" />
            </span>
          </h2>
          
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold transition-all active:scale-95 shadow-lg ${
              showAdd ? 'bg-slate-100 text-slate-600' : 'bg-teal-600 text-white shadow-teal-100'
            }`}
          >
            {showAdd ? <X size={20} /> : <Plus size={20} />}
            {showAdd ? "Cancel" : "Add Activity"}
          </button>
        </div>

        {/* --- DYNAMIC ADD FORM --- */}
        {showAdd && (
          <div className="mb-12 rounded-[2.5rem] border-2 border-dashed border-teal-100 bg-teal-50/20 p-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">What is the plan?</label>
                <input 
                  type="text"
                  placeholder="e.g. Visit the Casino"
                  className="w-full rounded-2xl border-none bg-white p-4 font-bold shadow-sm focus:ring-2 focus:ring-teal-500"
                  value={newAct.title}
                  onChange={(e) => setNewAct({...newAct, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Category</label>
                <select 
                  className="w-full rounded-2xl border-none bg-white p-4 font-bold shadow-sm focus:ring-2 focus:ring-teal-500 appearance-none"
                  value={newAct.type}
                  onChange={(e) => setNewAct({...newAct, type: e.target.value})}
                >
                  <option value="activity">Activity</option>
                  <option value="flight">Flight</option>
                  <option value="hotel">Hotel</option>
                  <option value="food">Food</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleSaveActivity}
                  className="w-full h-[56px] rounded-2xl bg-black font-black text-white hover:bg-slate-800 transition shadow-lg"
                >
                  Save Plan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- ITINERARY LIST --- */}
        <div className="space-y-4">
          {itinerary.length > 0 ? (
            itinerary.map((item) => (
              <div key={item.id} className="group flex items-center justify-between rounded-[2.5rem] border border-slate-50 bg-white p-6 shadow-sm hover:shadow-xl hover:border-teal-50 transition-all duration-300">
                <div className="flex items-center gap-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-slate-50 group-hover:bg-teal-50 transition-colors">
                    {getIcon(item.itemType)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                      {item.itemType} {item.cost > 0 && `• $${item.cost}`}
                    </p>
                    <p className="text-xl font-black text-slate-800">{item.title}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                   <button className="rounded-xl border border-slate-100 px-6 py-2 text-xs font-bold text-slate-400 hover:text-teal-600 hover:border-teal-100 transition">
                    Location
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center py-24 text-center">
              <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-200 mb-6">
                <MapPin size={40} />
              </div>
              <p className="text-xl font-black text-slate-300 uppercase tracking-widest italic">No adventures found</p>
              <p className="mt-2 text-slate-400 font-medium max-w-xs">Your itinerary for {trip?.destination} is looking a bit empty. Click "Add Activity" above to start planning!</p>
            </div>
          )}
        </div>
      </main>
      
      {/* --- FOOTER --- */}
      <footer className="mt-20 py-12 text-center">
        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">
          © 2026 TRIPO TRAVEL AGENCY • MADE FOR THE CURIOUS
        </p>
      </footer>
    </div>
  );
}