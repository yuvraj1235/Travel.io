"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { User, Map, Sun, Palmtree, Mountain, Coffee } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  
  // State for Preferences
  const [climate, setClimate] = useState("Tropical");
  const [budget, setBudget] = useState("Mid-range");
  const [activities, setActivities] = useState<string[]>([]);

  const toggleActivity = (act: string) => {
    setActivities(prev => 
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  const handleSave = async () => {
    setLoading(true);
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
      alert("Preferences Updated!");
    } catch (err) {
      alert("Failed to save preferences");
    } finally {
      setLoading(false);
    }
  };

  if (!session) return <div className="p-20 text-center font-bold">Please log in to view profile.</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
        
        {/* --- HEADER: GOOGLE DATA --- */}
        <div className="bg-teal-600 p-8 text-white flex items-center gap-6">
          <img 
            src={session.user?.image || ""} 
            className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg"
            alt="Profile"
          />
          <div>
            <h1 className="text-3xl font-black">{session.user?.name}</h1>
            <p className="opacity-80 font-medium">{session.user?.email}</p>
            <div className="mt-2 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <User size={14}/> Verified Traveler
            </div>
          </div>
        </div>

        {/* --- BODY: PREFERENCES FORM --- */}
        <div className="p-10 space-y-10">
          
          {/* Climate Preference */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-black text-slate-800 mb-4">
              <Sun className="text-orange-500" /> Preferred Climate
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {['Tropical', 'Cold', 'Urban'].map((item) => (
                <button 
                  key={item}
                  onClick={() => setClimate(item)}
                  className={`py-3 rounded-xl font-bold border-2 transition-all ${climate === item ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          {/* Budget Level */}
          <section>
            <h3 className="flex items-center gap-2 text-lg font-black text-slate-800 mb-4">
              <Map className="text-blue-500" /> Travel Budget
            </h3>
            <div className="flex gap-4">
              {['Budget', 'Mid-range', 'Luxury'].map((level) => (
                <button 
                  key={level}
                  onClick={() => setBudget(level)}
                  className={`flex-1 py-3 rounded-xl font-bold border-2 transition-all ${budget === level ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-100 text-slate-400'}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </section>

          {/* Activities Interest */}
          <section>
            <h3 className="text-lg font-black text-slate-800 mb-4 text-center">Interests & Activities</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Hiking', 'Museums', 'Nightlife', 'Beaches', 'Shopping', 'Foodie'].map((act) => (
                <button
                  key={act}
                  onClick={() => toggleActivity(act)}
                  className={`px-6 py-2 rounded-full border-2 font-bold text-sm transition-all ${activities.includes(act) ? 'bg-black text-white border-black' : 'border-slate-100 text-slate-500'}`}
                >
                  {act}
                </button>
              ))}
            </div>
          </section>

          <button 
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-teal-200 transition-all active:scale-[0.98]"
          >
            {loading ? "Saving Preferences..." : "Save My Travel Profile"}
          </button>

        </div>
      </div>
    </div>
  );
}