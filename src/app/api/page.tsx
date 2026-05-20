'use client';

import { useState } from 'react';

export default function Home() {
  // --- STATE MODUL 1: ADVOKASI & TICKETING ---
  const [tickets, setTickets] = useState([
    { id: 'ADV-2026-001', category: 'UKT', title: 'Permohonan Keringanan Golongan UKT akibat Krisis', status: 'INVESTIGATION', anonymous: 'Anonim (Terenkripsi)' },
    { id: 'ADV-2026-002', category: 'Fasilitas', title: 'Kerusakan AC di Ruang Kuliah Gedung Bersama 3.1', status: 'SUBMITTED', anonymous: 'Terbuka (Identitas Terlihat)' },
  ]);
  const [newTicket, setNewTicket] = useState({ title: '', category: 'UKT', anonymous: false });

  // --- STATE MODUL 4: E-OFFICE (SMART LETTER) ---
  const [letterForm, setLetterForm] = useState({ title: '', destination: '', content: '' });
  const [generatedLetter, setGeneratedLetter] = useState<any>(null);

  // Handler Kirim Aduan (Modul 1)
  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title.trim()) return;

    const randomId = `ADV-2026-00${tickets.length + 1}`;
    const freshTicket = {
      id: randomId,
      category: newTicket.category,
      title: newTicket.title,
      status: 'SUBMITTED',
      anonymous: newTicket.anonymous ? 'Anonim (Terenkripsi)' : 'Terbuka (Identitas Terlihat)'
    };

    setTickets([freshTicket, ...tickets]);
    setNewTicket({ title: '', category: 'UKT', anonymous: false });
  };

  // Handler Generate Surat Dinas (Modul 4)
  const handleGenerateLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(letterForm),
      });
      const result = await response.json();
      if (result.success) {
        setGeneratedLetter(result.data);
      }
    } catch (err) {
      alert('Gagal menyambung ke mesin API Belakang.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* 🏛️ HEADER UTAMA ATAS */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded">v1.0-Core</span>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">FT-SUPERAPP</h1>
            </div>
            <p className="text-sm text-slate-400 mt-0.5">Sistem Integrasi Eksekutif BEM & Portal Layanan Mahasiswa Fakultas Teknik</p>
          </div>
          <div className="text-xs font-mono text-slate-500 bg-slate-950 px-3 py-1.5 border border-slate-800 rounded-lg">
            Sesi Aktual: Mei 2026 / Kabinet Aktif
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
        {/* 📊 MONITORING STATUS RADAR 8 PILAR UTAMA */}
        <section className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Status Sinkronisasi Sistem (8 Pilar Inti BEM FT)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'adv', name: '1. E-Advocacy & Analytics', status: 'Aktif (Uji Coba)', color: 'border-indigo-500/30 text-indigo-400' },
              { id: 'talent', name: '2. Talent Portfolio Hub', status: 'Menunggu Integrasi', color: 'border-slate-800 text-slate-500' },
              { id: 'psdm', name: '3. PSDM LMS Platform', status: 'Menunggu Integrasi', color: 'border-slate-800 text-slate-500' },
              { id: 'office', name: '4. E-Office & Smart Letter', status: 'Aktif (Uji Coba)', color: 'border-emerald-500/30 text-emerald-400' },
              { id: 'internal', name: '5. Internal Engagement', status: 'Menunggu Integrasi', color: 'border-slate-800 text-slate-500' },
              { id: 'kastrat', name: '6. Kastrat Research Portal', status: 'Menunggu Integrasi', color: 'border-slate-800 text-slate-500' },
              { id: 'news', name: '7. Newsroom & CMS', status: 'Menunggu Integrasi', color: 'border-slate-800 text-slate-500' },
              { id: 'career', name: '8. Career & ATS Vault', status: 'Menunggu Integrasi', color: 'border-slate-800 text-slate-500' },
            ].map((pilar) => (
              <div key={pilar.id} className={`p-3 border rounded-xl bg-slate-900/40 flex flex-col justify-between ${pilar.color}`}>
                <span className="text-xs font-semibold block truncate">{pilar.name}</span>
                <span className="text-[10px] opacity-80 mt-1 font-mono">{pilar.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 🕹️ AREA DUA MODUL AKTIF UTAMA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ================= MODUL 1: E-ADVOCACY ================= */}
          <section className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <span>🛡️</span> Modul Advokasi & Whistleblowing
                </h2>
                <span className="text-[11px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">Encrypted Monolith</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Uji coba pengiriman aduan mahasiswa. Identitas akan diputus dari database jika fitur anonim dicentang demi keamanan pelapor.</p>
              
              {/* Form Input Aduan */}
              <form onSubmit={handleAddTicket} className="space-y-4 bg-slate-900/60 p-4 border border-slate-800/80 rounded-xl text-xs mt-4">
                <div>
                  <label className="block font-medium mb-1 text-slate-300">Deskripsi/Judul Masalah Korporat</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Indikasi pungli atau fasilitas lab komputer rusak"
                    className="w-full p-2.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1 text-slate-300">Kategori Kasus</label>
                    <select 
                      className="w-full p-2.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:border-indigo-500 transition"
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                    >
                      <option value="UKT">Kesejahteraan Mahasiswa / UKT</option>
                      <option value="Fasilitas">Fasilitas & Sarana Kampus</option>
                      <option value="Akademik">Layanan Akademik & Kurikulum</option>
                      <option value="Kekerasan Seksual">Kekerasan Seksual & Perundungan</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-2 sm:pt-6 pl-1">
                    <label className="relative flex items-center cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={newTicket.anonymous}
                        onChange={(e) => setNewTicket({...newTicket, anonymous: e.target.checked})}
                      />
                      <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-red-600 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                      <span className="ms-3 text-xs font-bold text-red-400">Aktifkan Proteksi Anonim</span>
                    </label>
                  </div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg transition shadow-lg shadow-indigo-600/20">
                  Kirim Aduan Masuk ke Antrean Tiket
                </button>
              </form>
            </div>

            {/* List Tiket Terkirim */}
            <div className="space-y-2 max-h-52 overflow-y-auto mt-4 pr-1">
              {tickets.map((t) => (
                <div key={t.id} className="p-3 border border-slate-800 bg-slate-900/20 rounded-xl flex justify-between items-center text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px]">{t.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${t.anonymous.includes('Anonim') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'}`}>{t.anonymous}</span>
                    </div>
                    <p className="font-semibold text-slate-200 mt-1">{t.title}</p>
                    <p className="text-[10px] text-slate-500">Kategori: {t.category}</p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ================= MODUL 4: E-OFFICE ================= */}
          <section className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                  <span>📄</span> Modul Sekretariat & Smart Letter
                </h2>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">Automated Document</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">Otomasi pengisian draf birokrasi surat dinas organisasi berformat baku resmi Fakultas Teknik.</p>

              {/* Form Input Pembuat Surat */}
              <form onSubmit={handleGenerateLetter} className="space-y-3 text-xs mt-4">
                <div>
                  <label className="block font-medium mb-1 text-slate-300">Perihal/Tujuan Kegiatan Surat</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Permohonan Izin Peminjaman Aula Dekanat Kampus"
                    className="w-full p-2.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                    value={letterForm.title}
                    onChange={(e) => setLetterForm({...letterForm, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-slate-300">Pihak Penerima Surat (Yth.)</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Wakil Dekan II Bidang Sumber Daya & Organisasi"
                    className="w-full p-2.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                    value={letterForm.destination}
                    onChange={(e) => setLetterForm({...letterForm, destination: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1 text-slate-300">Isi Ringkas Surat Permohonan</label>
                  <textarea 
                    rows={2}
                    placeholder="Tuliskan poin-poin utama maksud dan tujuan diadakannya surat di sini secara formal..."
                    className="w-full p-2.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                    value={letterForm.content}
                    onChange={(e) => setLetterForm({...letterForm, content: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition shadow-lg shadow-emerald-600/20">
                  Generate Draf Surat Resmi Organisasi
                </button>
              </form>
            </div>

            {/* Visualisasi Preview Lembar Kertas Surat */}
            {generatedLetter && (
              <div className="mt-4 p-4 border border-slate-800 bg-slate-900/40 rounded-xl space-y-3 text-[11px]">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-emerald-400">Pratinjau Dokumen Cetak</span>
                  <button 
                    onClick={() => window.print()} 
                    className="bg-slate-950 border border-slate-700 text-slate-300 px-2.5 py-1 rounded-lg hover:bg-slate-800 transition font-medium"
                  >
                    🖨️ Cetak / Simpan PDF
                  </button>
                </div>
                
                {/* Lembaran Fisik Surat */}
                <div className="bg-white p-6 shadow-2xl border text-slate-900 space-y-3 font-serif rounded-sm max-h-64 overflow-y-auto">
                  <div className="text-center border-b-2 border-slate-900 pb-2">
                    <p className="font-bold text-xs tracking-tight">BADAN EKSEKUTIF MAHASISWA FAKULTAS TEKNIK</p>
                    <p className="text-[9px] font-sans font-semibold text-slate-600 uppercase tracking-widest">Universitas Teknologi Nasional - Kabinet 2026</p>
                  </div>
                  <div className="space-y-0.5 text-[10px]">
                    <p><span className="inline-block w-14">Nomor</span>: {generatedLetter.nomorSurat}</p>
                    <p><span className="inline-block w-14">Perihal</span>: {generatedLetter.title}</p>
                  </div>
                  <div className="pt-2 text-[10px]">
                    <p>Kepada Yth,</p>
                    <p className="font-bold">{generatedLetter.destination}</p>
                    <p>di Tempat</p>
                  </div>
                  <p className="text-justify leading-relaxed indent-6 pt-2 text-[10px]">
                    {letterForm.content || '(Konten isi dokumen kosong belum diketik)'}
                  </p>
                  <div className="pt-4 flex justify-between items-end">
                    <div className="text-center bg-slate-100 p-1.5 border border-dashed border-slate-300 rounded text-[8px] font-sans">
                      <p className="text-emerald-700 font-black">✓ TU-QR VERIFIED</p>
                      <p className="text-slate-500 font-mono">HASH: SECURE-2026</p>
                    </div>
                    <div className="text-center text-[10px] font-sans">
                      <p>Mengetahui,</p>
                      <p className="font-bold mt-8 border-t border-slate-900 pt-0.5">Ketua BEM Fakultas Teknik</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}