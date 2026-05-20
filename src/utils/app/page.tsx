'use client';

import { useState } from 'react';

export default function Home() {
  // State untuk Modul 1: Advokasi
  const [tickets, setTickets] = useState([
    { id: 'ADV-2026-001', category: 'UKT', title: 'Permohonan Keringanan Golongan UKT', status: 'INVESTIGATION', anonymous: 'Anonim' },
    { id: 'ADV-2026-002', category: 'Fasilitas', title: 'AC Ruang Kuliah 3.1 Rusak', status: 'SUBMITTED', anonymous: 'Terbuka' },
  ]);
  const [newTicket, setNewTicket] = useState({ title: '', category: 'UKT', anonymous: false });

  // State untuk Modul 4: E-Office
  const [letterForm, setLetterForm] = useState({ title: '', destination: '', content: '' });
  const [generatedLetter, setGeneratedLetter] = useState<any>(null);

  // Handler Tambah Tiket Advokasi
  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.title) return;

    const randomId = `ADV-2026-0${tickets.length + 1}`;
    const freshTicket = {
      id: randomId,
      category: newTicket.category,
      title: newTicket.title,
      status: 'SUBMITTED',
      anonymous: newTicket.anonymous ? 'Anonim (Terenkripsi)' : 'Terbuka'
    };

    setTickets([freshTicket, ...tickets]);
    setNewTicket({ title: '', category: 'UKT', anonymous: false });
  };

  // Handler Generate Surat Digital
  const handleGenerateLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/letters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(letterForm),
    });
    const result = await response.json();
    if (result.success) {
      setGeneratedLetter(result.data);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Kabinet */}
        <header className="border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-600">FT-SuperApp</h1>
          <p className="text-slate-500">Workspace Pengurus BEM & Layanan Mahasiswa Fakultas Teknik</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* ================= MODUL 1: E-ADVOCACY ================= */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>🛡️</span> Modul Advokasi & Whistleblowing
            </h2>
            <p className="text-sm text-slate-500">Sistem pelaporan masalah akademik & fasilitas kampus terenkripsi.</p>
            
            {/* Form Buat Tiket */}
            <form onSubmit={handleAddTicket} className="space-y-3 bg-slate-50 p-4 rounded-lg text-sm">
              <div>
                <label className="block font-medium mb-1">Judul Aduan / Masalah</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Pungutan liar berkedok modul praktikum"
                  className="w-full p-2 border rounded bg-white text-slate-900"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1">Kategori</label>
                  <select 
                    className="w-full p-2 border rounded bg-white text-slate-900"
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                  >
                    <option value="UKT">Masalah Keuangan / UKT</option>
                    <option value="Fasilitas">Fasilitas Kampus</option>
                    <option value="Akademik">Dosen / Kurikulum</option>
                    <option value="Kekerasan Seksual">Kekerasan Seksual & Perundungan</option>
                  </select>
                </div>
                <div className="flex items-center pt-4 sm:pt-6 pl-2">
                  <input 
                    type="checkbox" 
                    id="anonim"
                    className="mr-2 h-4 w-4 text-indigo-600"
                    checked={newTicket.anonymous}
                    onChange={(e) => setNewTicket({...newTicket, anonymous: e.target.checked})}
                  />
                  <label htmlFor="anonim" className="font-medium text-red-600 cursor-pointer">Aktifkan Fitur Anonim</label>
                </div>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded transition">
                Kirim Aduan Resmi
              </button>
            </form>

            {/* List Tiket */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {tickets.map((t) => (
                <div key={t.id} className="p-3 border rounded-lg hover:border-slate-300 transition flex justify-between items-center text-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">{t.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${t.anonymous.includes('Anonim') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>{t.anonymous}</span>
                    </div>
                    <p className="font-semibold text-slate-800 mt-1">{t.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Kategori: {t.category}</p>
                  </div>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ================= MODUL 4: E-OFFICE ================= */}
          <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>📄</span> Modul Sekretariat & Smart Letter
            </h2>
            <p className="text-sm text-slate-500">Otomasi pembuatan surat dinas organisasi bebas salah format.</p>

            <form onSubmit={handleGenerateLetter} className="space-y-3 text-sm">
              <div>
                <label className="block font-medium mb-1">Perihal Surat</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Permohonan Peminjaman Aula Dekanat"
                  className="w-full p-2 border rounded text-slate-900"
                  value={letterForm.title}
                  onChange={(e) => setLetterForm({...letterForm, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Tujuan Surat (Pihak Penerima)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: Wakil Dekan II Fakultas Teknik"
                  className="w-full p-2 border rounded text-slate-900"
                  value={letterForm.destination}
                  onChange={(e) => setLetterForm({...letterForm, destination: e.target.value})}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Isi Ringkas Surat</label>
                <textarea 
                  rows={3}
                  placeholder="Tuliskan pokok permohonan atau isi undangan secara jelas di sini..."
                  className="w-full p-2 border rounded text-slate-900"
                  value={letterForm.content}
                  onChange={(e) => setLetterForm({...letterForm, content: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded transition">
                Generate Draf Surat Resmi
              </button>
            </form>

            {/* Preview Surat Hasil Generate */}
            {generatedLetter && (
              <div className="mt-4 p-4 border border-emerald-200 bg-emerald-50/50 rounded-lg space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-emerald-200 pb-2">
                  <span className="font-bold text-emerald-800">Preview Dokumen Terbuka</span>
                  <button 
                    onClick={() => window.print()} 
                    className="bg-white border border-emerald-300 text-emerald-700 px-2 py-1 rounded hover:bg-emerald-100 font-medium"
                  >
                    🖨️ Cetak / Simpan PDF
                  </button>
                </div>
                
                {/* Visual Lembar Surat */}
                <div className="bg-white p-4 shadow-inner border font-serif text-slate-800 space-y-3">
                  <div className="text-center border-b-2 border-slate-800 pb-1">
                    <p className="font-bold text-sm">BADAN EKSEKUTIF MAHASISWA FAKULTAS TEKNIK</p>
                    <p className="text-[10px]">UNIVERSITAS TEKNOLOGI NASIONAL</p>
                  </div>
                  <div className="space-y-1">
                    <p><span className="inline-block w-16">Nomor</span>: {generatedLetter.nomorSurat}</p>
                    <p><span className="inline-block w-16">Perihal</span>: {generatedLetter.title}</p>
                  </div>
                  <div className="pt-2">
                    <p>Kepada Yth,</p>
                    <p className="font-bold">{generatedLetter.destination}</p>
                    <p>di Tempat</p>
                  </div>
                  <p className="text-justify leading-relaxed indent-8 pt-2">
                    {letterForm.content || '(Isi surat belum diisi)'}
                  </p>
                  <div className="pt-4 flex justify-between items-end">
                    <div className="text-center bg-slate-50 p-1 border border-dashed rounded text-[9px] font-sans">
                      <p className="text-emerald-600 font-bold">✓ QR VERIFIED</p>
                      <p className="text-slate-400 font-mono">ID: {Math.random().toString(36).substring(3, 9).toUpperCase()}</p>
                    </div>
                    <div className="text-center text-[11px]">
                      <p>Mengetahui,</p>
                      <p className="font-bold mt-8 text-slate-900">Ketua BEM Fakultas Teknik</p>
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