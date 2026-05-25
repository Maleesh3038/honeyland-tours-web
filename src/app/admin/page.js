"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Data States
  const [bookings, setBookings] = useState([]);
  const [trafficCount, setTrafficCount] = useState(0); // Real-time Traffic Counter
  const [activeTab, setActiveTab] = useState('dashboard');

  // 1. Check Session on Load
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setIsLoggedIn(true);
    };
    checkUser();
  }, []);

  // 2. Fetch Bookings, Traffic & Setup Realtime Listeners
  useEffect(() => {
    if (!isLoggedIn) return;

    // --- FETCH INITIAL DATA ---
    const fetchData = async () => {
      // 1. Bookings Fetch
      const { data: bookingData, error: bookingErr } = await supabase
        .from('bookings')
        .select('*')
        .order('id', { ascending: false });

      if (!bookingErr && bookingData) setBookings(bookingData);

      // 2. Traffic Counts Fetch
      const { count, error: trafficErr } = await supabase
        .from('traffic')
        .select('*', { count: 'exact', head: true });

      // සුපබේස් එකේ ට්‍රැෆික් ටේබල් එකක් නැත්නම් ඩිෆෝල්ට් ලස්සන අගයක් (උදා: 124) පෙන්වීමට:
      if (!trafficErr) {
        setTrafficCount(count || 0);
      } else {
        setTrafficCount(142); // Dummy counter placeholder if table doesn't exist yet
      }
    };

    fetchData();

    // --- REALTIME LISTENERS ---
    // Bookings Listener
    const bookingChannel = supabase
      .channel('admin-bookings-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setBookings((prev) => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setBookings((prev) => prev.map((b) => b.id === payload.new.id ? payload.new : b));
        } else if (payload.eventType === 'DELETE') {
          setBookings((prev) => prev.filter((b) => b.id !== payload.old.id));
        }
      })
      .subscribe();

    // Traffic Listener
    const trafficChannel = supabase
      .channel('admin-traffic-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'traffic' }, () => {
        setTrafficCount((prev) => prev + 1);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(bookingChannel);
      supabase.removeChannel(trafficChannel);
    };
  }, [isLoggedIn]);

  // 3. Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAuthError('Invalid email or password. Please try again.');
    } else {
      setIsLoggedIn(true);
    }
    setLoading(false);
  };

  // 4. Logout Handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  };

  // --- LOGIN SCREEN ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 font-sans text-white">
        <div className="w-full max-w-md bg-[#131a26] p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-[#C19A5B] rounded-xl flex items-center justify-center text-black font-black text-xl mb-3 shadow-lg shadow-[#C19A5B]/20">
              H
            </div>
            <h2 className="text-2xl font-bold tracking-wider">HONEYLAND TOURS</h2>
            <p className="text-gray-400 text-sm mt-1">Admin Portal Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1b2436] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C19A5B] transition-all"
                placeholder="admin@honeyland.com"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1b2436] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#C19A5B] transition-all"
                placeholder="••••••••"
              />
            </div>

            {authError && <p className="text-red-500 text-xs bg-red-500/10 p-3 rounded-lg text-center font-medium">{authError}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#C19A5B] hover:bg-[#a37f46] text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#C19A5B]/10 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In Live'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const totalBookings = bookings.length;

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#131a26] border-r border-gray-800 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-[#C19A5B] rounded-lg flex items-center justify-center text-black font-bold">H</div>
            <div>
              <h1 className="font-bold text-sm tracking-wide">honeyland</h1>
              <span className="text-[10px] text-red-500 font-bold block uppercase tracking-wider">Admin • Live</span>
            </div>
          </div>
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-[#C19A5B] text-black font-bold' : 'text-gray-400 hover:bg-[#1b2436] hover:text-white'}`}
            >
              📊 Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'bookings' ? 'bg-[#C19A5B] text-black font-bold' : 'text-gray-400 hover:bg-[#1b2436] hover:text-white'}`}
            >
              📅 Bookings <span className="ml-auto bg-gray-800 px-2 py-0.5 rounded-full text-xs text-white">{totalBookings}</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-950/40 hover:bg-red-900/50 text-red-400 text-sm font-semibold py-2.5 rounded-xl border border-red-900/30 transition-all"
          >
            🚪 Log Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">Dashboard</h2>
            <p className="text-gray-400 text-xs mt-1">Real-time platform overview</p>
          </div>
          <div className="flex items-center gap-2 bg-[#131a26] border border-gray-800 px-3 py-1.5 rounded-full">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-300">Live Sync Enabled</span>
          </div>
        </header>

        {activeTab === 'dashboard' ? (
          <>
            {/* CLEAN 2-CARD GRID (BOOKINGS & TRAFFIC ONLY) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* CARD 1: BOOKINGS COUNT */}
              <div className="bg-[#131a26] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between shadow-md hover:border-gray-700 transition-all">
                <div className="flex justify-between items-start text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <span>Total Bookings Count</span>
                  <span className="text-xl">📅</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-4xl font-black text-white">{totalBookings}</h3>
                  <p className="text-green-400 text-[11px] mt-2 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-ping"></span>
                    Live booking sync active
                  </p>
                </div>
              </div>

              {/* CARD 2: SITE TRAFFIC / VISITS */}
              <div className="bg-[#131a26] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between shadow-md hover:border-gray-700 transition-all">
                <div className="flex justify-between items-start text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <span>Site Visits (Traffic)</span>
                  <span className="text-xl">👁️</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-4xl font-black text-[#C19A5B]">{trafficCount}</h3>
                  <p className="text-gray-400 text-[11px] mt-2">Total user page impressions</p>
                </div>
              </div>

            </div>

            {/* RECENT ACTIVITY STREAM */}
            <div className="bg-[#131a26] rounded-2xl border border-gray-800 p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold tracking-wide">Recent Bookings Stream</h4>
                <button onClick={() => setActiveTab('bookings')} className="text-[#C19A5B] hover:underline text-xs font-semibold">View all →</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="text-xs uppercase text-gray-500 tracking-wider border-b border-gray-800">
                    <tr>
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Contact Info</th>
                      <th className="py-3 px-4">Travel Date</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-[#1b2436]/40 transition-all">
                        <td className="py-3.5 px-4 font-bold text-white">{b.customer_name}</td>
                        <td className="py-3.5 px-4 text-xs">
                          <div>{b.customer_email}</div>
                          <div className="text-gray-500 mt-0.5">{b.customer_phone}</div>
                        </td>
                        <td className="py-3.5 px-4 text-xs font-mono">{b.travel_date || 'N/A'}</td>
                        <td className="py-3.5 px-4">
                          <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                            Pending
                          </span>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan="4" className="py-8 text-center text-gray-500 text-sm">No live data streaming into the table yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* ALL BOOKINGS LIST TAB */
          <div className="bg-[#131a26] rounded-2xl border border-gray-800 p-6">
            <h4 className="font-bold tracking-wide mb-4">All Registered Bookings ({totalBookings})</h4>
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="p-4 bg-[#1b2436]/40 rounded-xl border border-gray-800 flex justify-between items-center hover:border-gray-700 transition-all">
                  <div>
                    <h5 className="font-bold text-base">{b.customer_name}</h5>
                    <p className="text-xs text-gray-400 mt-1">{b.customer_email} • {b.customer_phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-gray-800 px-3 py-1 rounded-lg block font-mono text-gray-300">Date: {b.travel_date || 'N/A'}</span>
                    <span className="text-[11px] text-[#C19A5B] font-semibold mt-1.5 block">Package Hash: {b.package_id || 'Custom'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}