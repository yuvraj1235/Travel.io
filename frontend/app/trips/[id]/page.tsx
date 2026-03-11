"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { 
  MapPin, Utensils, Camera, ChevronLeft, 
  DollarSign, Plane, Hotel, Briefcase, Plus, X, Trash2 
} from "lucide-react";
import Link from "next/link";
import { itineraryApi, tripApi } from "@/app/api/api";

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
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [newAct, setNewAct] = useState({ title: "", itemType: "activity", cost: 0 });

  const loadData = useCallback(async () => {
    if (!id) return;
    try {
      const [itineraryData, tripData] = await Promise.all([
        itineraryApi.getItinerary(id as string),
        tripApi.getTripDetails(id as string)
      ]);
      setItinerary(Array.isArray(itineraryData) ? itineraryData : []);
      setTrip(tripData);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadData(); }, [loadData]);

 const handleSaveActivity = async () => {
    if (!newAct.title) return alert("Title required");
    
    // BUILD THE OBJECT EXPLICITLY
    const activityData = { 
      tripId: Number(id), 
      title: String(newAct.title),
      itemType: String(newAct.itemType), // Force it to be a string
      cost: Number(newAct.cost)
    };

    console.log("ACTUAL DATA SENT TO API:", JSON.stringify(activityData));

    setIsSaving(true);
    try {
      await itineraryApi.addActivity(activityData);
      setShowAdd(false);
      setNewAct({ title: "", itemType: "activity", cost: 0 });
      await loadData(); 
    } catch (err) {
      // Log the full error from the backend
      console.error("FULL ERROR DETAILS:", err);
      alert("Validation Error. Check console for details.");
    } finally {
      setIsSaving(false);
    }
};

  const handleDelete = async (itemId: number) => {
    if (!confirm("Remove this plan?")) return;
    try {
      await itineraryApi.deleteActivity(itemId);
      await loadData();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const totalSpent = itinerary.reduce((sum, item) => sum + (item.cost || 0), 0);
  const budgetLimit = trip?.price || 1;
  const progressWidth = Math.min((totalSpent / budgetLimit) * 100, 100);

  if (loading) return <div className="flex h-screen items-center justify-center font-black text-teal-600">LOADING...</div>;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-20">
      <nav className="flex items-center justify-between px-12 py-6 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-black tracking-tighter">Tripo</Link>
        <div className="h-10 w-10 rounded-full bg-teal-50 border border-teal-100" />
      </nav>

      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="relative h-[450px] overflow-hidden rounded-[3rem] shadow-2xl">
          <img src={trip?.image} alt="Trip" className="h-full w-full object-cover" />
          <Link href="/" className="absolute left-8 top-8 flex items-center gap-2 rounded-full bg-white/90 px-5 py-2.5 text-sm font-bold shadow-lg"><ChevronLeft size={18}/> Back</Link>
        </div>

        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[90%] lg:w-3/4 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl"><MapPin size={24}/></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase">Destination</p><p className="text-lg font-black">{trip?.destination}</p></div>
          </div>
          <div className="flex-1 min-w-[200px] px-6 border-l border-slate-100">
            <div className="flex justify-between mb-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Budget: ${budgetLimit}</p>
              <p className={`text-[10px] font-black uppercase ${totalSpent > budgetLimit ? 'text-red-500' : 'text-teal-600'}`}>${totalSpent} spent</p>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-700 ${totalSpent > budgetLimit ? 'bg-red-500' : 'bg-teal-500'}`}
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto mt-32 max-w-4xl px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-black">Trip <span className="text-teal-500">Timeline</span></h2>
          <button onClick={() => setShowAdd(!showAdd)} className="bg-teal-600 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-teal-100 transition-transform active:scale-95">
            {showAdd ? <X size={20}/> : <Plus size={20}/>} {showAdd ? "Cancel" : "Add Plan"}
          </button>
        </div>

        {showAdd && (
          <div className="mb-10 p-8 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in zoom-in duration-200">
            <div className="md:col-span-2">
              <input 
                placeholder="What are we doing?" 
                className="w-full p-4 rounded-xl font-bold border-none shadow-sm"
                value={newAct.title}
                onChange={(e) => setNewAct({...newAct, title: e.target.value})}
              />
            </div>
            <select className="p-4 rounded-xl font-bold border-none shadow-sm" value={newAct.itemType} onChange={(e) => setNewAct({...newAct, itemType: e.target.value})}>
              <option value="activity">Activity</option>
              <option value="flight">Flight</option>
              <option value="hotel">Hotel</option>
              <option value="food">Food</option>
            </select>
            <input 
              type="number" placeholder="Cost" className="p-4 rounded-xl font-bold border-none shadow-sm"
              value={newAct.cost}
              onChange={(e) => setNewAct({...newAct, cost: Number(e.target.value)})}
            />
            <button 
              onClick={handleSaveActivity} 
              disabled={isSaving}
              className="md:col-span-4 bg-black text-white p-4 rounded-xl font-black uppercase hover:bg-slate-800 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Confirm Plan"}
            </button>
          </div>
        )}

        <div className="space-y-4">
          {itinerary.map((item) => (
            <div key={item.id} className="group flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-teal-50 transition-colors">
                  {/* NOTE: Backend uses 'type', frontend uses 'itemType' for adding. Standardize here: */}
                  {getIcon(item.type || item.itemType)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.type || item.itemType}</p>
                  <p className="text-xl font-black">{item.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-lg font-black text-teal-600">${item.cost}</p>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}