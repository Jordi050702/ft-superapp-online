'use client';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: feeds } = await supabase.from('pengumuman').select('*');
      if (feeds) setData(feeds);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 font-sans">
      {/* Navbar Instagram-style */}
      <nav className="bg-white border-b border-slate-200 py-3 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tighter italic">FT-SUPERAPP</h1>
          <div className="text-sm font-semibold text-blue-600">Jordi, Selamat Datang!</div>
        </div>
      </nav>

      {/* Grid Layout */}
      <div className="max-w-4xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Navigasi */}
        <div className="hidden md:block space-y-2">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            {['Home', 'Surat', 'Fasilitas', 'Aspirasi'].map((m) => (
              <div key={m} className="p-2 hover:bg-slate-50 cursor-pointer font-medium text-slate-700">{m}</div>
            ))}
          </div>
        </div>

        {/* Kolom Tengah: Feed (Data dari Supabase) */}
        <div className="md:col-span-2 space-y-4">
          {data.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 font-bold text-sm">BEM Teknik Official</div>
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2">{item.judul}</h2>
                <p className="text-slate-600 text-sm">{item.isi}</p>
              </div>
              <div className="p-3 flex gap-4 text-xs font-bold text-slate-400 border-t border-slate-100">
                <span>Like</span> <span>Comment</span> <span>Share</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}