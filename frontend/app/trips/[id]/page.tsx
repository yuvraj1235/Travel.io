"use client";

import { useEffect, useState, useCallback, useRef, JSX } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin, Utensils, Camera, ChevronLeft,
  DollarSign, Plane, Hotel, Briefcase, Plus, X, Trash2,
  Calendar, Users, Share2, Heart,
  Sun, Navigation,
  Sparkles, Check, AlertCircle
} from "lucide-react";
import Link from "next/link";
import { itineraryApi, tripApi } from "@/app/api/api";

// Animation keyframes component
const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(2deg); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.5; filter: blur(40px); }
      50% { opacity: 0.8; filter: blur(60px); }
    }
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-in-right {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scale-in {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
    .animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
    .animate-slide-in-right { animation: slide-in-right 0.5s ease-out forwards; }
    .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
    .glass-effect { backdrop-filter: blur(16px) saturate(180%); }
    .text-gradient { background: linear-gradient(135deg, #0d9488 0%, #2dd4bf 50%, #14b8a6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hover-scale { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .hover-scale:hover { transform: scale(1.05) translateY(-5px); box-shadow: 0 20px 40px -15px rgba(13, 148, 136, 0.3); }
    .card-hover { transition: all 0.3s ease; }
    .card-hover:hover { transform: translateY(-5px); box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.15); }
    .progress-bar { transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1); }
  `}</style>
);

const getIcon = (type: string) => {
  const icons: Record<string, JSX.Element> = {
    flight: <Plane className="text-teal-600" size={20} />,
    hotel: <Hotel className="text-teal-600" size={20} />,
    food: <Utensils className="text-teal-600" size={20} />,
    activity: <Camera className="text-teal-600" size={20} />,
    transportation: <Navigation className="text-teal-600" size={20} />,
    shopping: <Briefcase className="text-teal-600" size={20} />,
    default: <Briefcase className="text-teal-600" size={20} />
  };
  return icons[type?.toLowerCase()] || icons.default;
};

const getIconBackground = (type: string) => {
  const colors: Record<string, string> = {
    flight: "from-blue-400 to-cyan-400",
    hotel: "from-purple-400 to-pink-400",
    food: "from-orange-400 to-red-400",
    activity: "from-green-400 to-emerald-400",
    transportation: "from-yellow-400 to-amber-400",
    shopping: "from-indigo-400 to-purple-400",
    default: "from-slate-400 to-slate-500"
  };
  return colors[type?.toLowerCase()] || colors.default;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export default function TripDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const formRef = useRef<HTMLDivElement>(null);
  
  const [newAct, setNewAct] = useState({ 
    title: "", 
    itemType: "activity", 
    cost: 0,
    time: "12:00",
    notes: ""
  });

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
    
    const activityData = { 
      tripId: Number(id), 
      title: String(newAct.title),
      itemType: String(newAct.itemType),
      cost: Number(newAct.cost),
      time: newAct.time,
      notes: newAct.notes
    };

    setIsSaving(true);
    try {
      await itineraryApi.addActivity(activityData);
      setShowAdd(false);
      setNewAct({ title: "", itemType: "activity", cost: 0, time: "12:00", notes: "" });
      await loadData(); 
    } catch (err) {
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
  const remainingBudget = budgetLimit - totalSpent;
  const isOverBudget = remainingBudget < 0;

  // Group itinerary by date
  const groupedItinerary = itinerary.reduce((groups: any, item) => {
    const date = item.date || 'Upcoming';
    if (!groups[date]) groups[date] = [];
    groups[date].push(item);
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-teal-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
            <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-600 w-8 h-8 animate-float" />
          </div>
          <p className="text-xl font-bold text-gradient">Loading your adventure...</p>
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

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="glass-effect bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/50 px-6 py-3">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-emerald-600 rounded-xl rotate-45 group-hover:rotate-90 transition-all duration-500"></div>
                    <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter">
                    <span className="text-gradient">Tripo</span>
                  </span>
                </Link>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2.5 bg-white rounded-xl border border-slate-200 hover:border-teal-200 transition-all"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                  </button>
                  <button className="p-2.5 bg-white rounded-xl border border-slate-200 hover:border-teal-200 transition-all">
                    <Share2 className="w-5 h-5 text-slate-400" />
                  </button>
                  <button 
                    onClick={() => router.push('/profile')}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white flex items-center justify-center font-bold"
                  >
                    {trip?.destination?.[0] || 'T'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section with Image */}
        <div className="relative pt-24 px-4 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group">
              <img 
                src={trip?.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80"} 
                alt={trip?.destination}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-10000"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Back Button */}
              <Link 
                href="/" 
                className="absolute top-8 left-8 flex items-center gap-2 glass-effect bg-white/90 backdrop-blur px-5 py-2.5 rounded-full text-sm font-bold shadow-xl hover:scale-105 transition-all"
              >
                <ChevronLeft size={18}/> Back to Trips
              </Link>

              {/* Destination Title */}
              <div className="absolute bottom-8 left-8 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={20} className="text-teal-300" />
                  <span className="text-sm font-bold uppercase tracking-wider text-teal-300">Destination</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black mb-3">{trip?.destination}</h1>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{formatDate(trip?.startDate)} - {formatDate(trip?.endDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>Solo Trip</span>
                  </div>
                </div>
              </div>

              {/* Weather Widget */}
              <div className="absolute top-8 right-8 glass-effect bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <Sun className="text-yellow-500 w-8 h-8" />
                  <div>
                    <div className="text-2xl font-black">28°C</div>
                    <div className="text-xs text-slate-500">Sunny</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Card */}
        <div className="relative z-20 -mt-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-effect bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl border border-white/50 animate-slide-up">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Total Budget */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl text-white flex items-center justify-center">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Budget</p>
                    <p className="text-3xl font-black">${budgetLimit.toLocaleString()}</p>
                  </div>
                </div>

                {/* Spent */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl text-white flex items-center justify-center">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Spent So Far</p>
                    <p className="text-3xl font-black">${totalSpent.toLocaleString()}</p>
                  </div>
                </div>

                {/* Remaining */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl text-white flex items-center justify-center ${
                    isOverBudget ? 'bg-gradient-to-br from-red-500 to-pink-500' : 'bg-gradient-to-br from-green-500 to-teal-500'
                  }`}>
                    {isOverBudget ? <AlertCircle size={24} /> : <Check size={24} />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining</p>
                    <p className={`text-3xl font-black ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                      ${Math.abs(remainingBudget).toLocaleString()}
                      {isOverBudget && ' over'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span className="font-bold text-slate-600">Budget Usage</span>
                  <span className={`font-black ${isOverBudget ? 'text-red-500' : 'text-teal-600'}`}>
                    {Math.round(progressWidth)}%
                  </span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full progress-bar ${isOverBudget ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-teal-500 to-emerald-500'}`}
                    style={{ width: `${progressWidth}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="relative z-10 max-w-5xl mx-auto px-4 py-16">
          {/* Header with Add Button */}
          <div className="flex items-center justify-between mb-10 animate-slide-up">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-2">
                Trip <span className="text-gradient">Timeline</span>
              </h2>
              <p className="text-slate-500">{itinerary.length} activities planned</p>
            </div>
            
            <button 
              onClick={() => setShowAdd(!showAdd)}
              className="group relative bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-teal-200/50 hover:shadow-2xl hover:shadow-teal-200 transition-all hover-scale"
            >
              {showAdd ? <X size={20}/> : <Plus size={20}/>}
              <span>{showAdd ? "Cancel" : "Add Activity"}</span>
            </button>
          </div>

          {/* Add Form */}
          {showAdd && (
            <div 
              ref={formRef}
              className="mb-12 p-8 bg-white rounded-[2.5rem] shadow-xl border-2 border-teal-100 animate-scale-in"
            >
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                <Sparkles className="text-teal-500" />
                Plan New Activity
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Activity Title
                  </label>
                  <input 
                    placeholder="e.g., Visit Colosseum, Dinner at Sunset Point..."
                    className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 focus:outline-none transition-all font-medium"
                    value={newAct.title}
                    onChange={(e) => setNewAct({...newAct, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Type
                  </label>
                  <select 
                    className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 focus:outline-none transition-all font-medium"
                    value={newAct.itemType}
                    onChange={(e) => setNewAct({...newAct, itemType: e.target.value})}
                  >
                    <option value="activity">🎯 Activity</option>
                    <option value="flight">✈️ Flight</option>
                    <option value="hotel">🏨 Hotel</option>
                    <option value="food">🍽️ Food</option>
                    <option value="transportation">🚗 Transportation</option>
                    <option value="shopping">🛍️ Shopping</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Time
                  </label>
                  <input 
                    type="time"
                    className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 focus:outline-none transition-all font-medium"
                    value={newAct.time}
                    onChange={(e) => setNewAct({...newAct, time: e.target.value})}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Cost ($)
                  </label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 focus:outline-none transition-all font-medium"
                    value={newAct.cost}
                    onChange={(e) => setNewAct({...newAct, cost: Number(e.target.value)})}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Notes (Optional)
                  </label>
                  <input 
                    placeholder="Add any details..."
                    className="w-full p-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 focus:outline-none transition-all font-medium"
                    value={newAct.notes}
                    onChange={(e) => setNewAct({...newAct, notes: e.target.value})}
                  />
                </div>

                <div className="md:col-span-2">
                  <button 
                    onClick={handleSaveActivity} 
                    disabled={isSaving}
                    className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-5 rounded-xl font-black text-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Saving to Timeline...
                      </>
                    ) : (
                      <>
                        <Plus size={20} />
                        Add to Timeline
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          {Object.keys(groupedItinerary).length === 0 ? (
            <div className="text-center py-20 bg-white/50 backdrop-blur rounded-[3rem] border-2 border-dashed border-slate-200 animate-slide-up">
              <div className="w-24 h-24 bg-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No activities planned yet</h3>
              <p className="text-slate-500 mb-6">Start building your perfect itinerary</p>
              <button 
                onClick={() => setShowAdd(true)}
                className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                <Plus size={20} />
                Add First Activity
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedItinerary).map(([date, items]: [string, any], dateIndex) => (
                <div key={date} className="animate-slide-up" style={{ animationDelay: `${dateIndex * 0.1}s` }}>
                  {/* Date Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl text-white flex items-center justify-center">
                      <Calendar size={18} />
                    </div>
                    <h3 className="text-xl font-black">{date}</h3>
                    <span className="text-sm text-slate-400">{items.length} activities</span>
                  </div>

                  {/* Activities */}
                  <div className="space-y-3">
                    {items.map((item: any, index: number) => (
                      <div 
                        key={item.id} 
                        className="group relative bg-white rounded-2xl p-4 border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all"
                        style={{ animationDelay: `${(dateIndex * 0.1) + (index * 0.05)}s` }}
                      >
                        <div className="flex items-center gap-4">
                          {/* Time */}
                          <div className="w-16 text-center">
                            <div className="text-sm font-bold text-teal-600">{item.time || '12:00'}</div>
                          </div>

                          {/* Icon */}
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getIconBackground(item.type || item.itemType)} bg-opacity-10 flex items-center justify-center`}>
                            {getIcon(item.type || item.itemType)}
                          </div>

                          {/* Details */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {item.type || item.itemType}
                              </span>
                              {item.notes && (
                                <span className="text-xs text-slate-400">• {item.notes}</span>
                              )}
                            </div>
                            <h4 className="text-lg font-black">{item.title}</h4>
                          </div>

                          {/* Cost & Actions */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-lg font-black text-teal-600">${item.cost}</div>
                            </div>
                            
                            <button 
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Progress indicator (if checked off) */}
                        {item.completed && (
                          <div className="absolute top-0 left-0 w-1 h-full bg-green-500 rounded-l-2xl"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Card */}
          <div className="mt-12 p-8 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-[2rem] text-white animate-slide-up">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-xl font-black">Trip Summary</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-white/70 text-sm">Total Days</div>
                <div className="text-2xl font-black">7</div>
              </div>
              <div>
                <div className="text-white/70 text-sm">Activities</div>
                <div className="text-2xl font-black">{itinerary.length}</div>
              </div>
              <div>
                <div className="text-white/70 text-sm">Avg. Daily Cost</div>
                <div className="text-2xl font-black">${Math.round(totalSpent / 7)}</div>
              </div>
              <div>
                <div className="text-white/70 text-sm">Budget Status</div>
                <div className="text-2xl font-black">{isOverBudget ? 'Over' : 'On Track'}</div>
              </div>
            </div>

            {/* AI Insight */}
            <div className="mt-6 p-4 bg-white/20 rounded-xl backdrop-blur">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 mt-0.5" />
                <div>
                  <div className="font-bold mb-1">AI Travel Insight</div>
                  <p className="text-sm text-white/90">
                    Based on your spending, you're on track for an amazing trip! 
                    Consider booking popular attractions in advance for best prices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest border-t border-slate-200 bg-white/30 backdrop-blur">
          © 2026 TRIPO TRAVEL AGENCY — SAFE JOURNEYS
        </footer>
      </div>
    </>
  );
}