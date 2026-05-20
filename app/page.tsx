// app/page.tsx
export default function Home() {
  return (
    <div className="max-w-md mx-auto pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
        <h1 className="font-bold text-xl tracking-tighter">BEM FT Digital</h1>
        <div className="flex gap-4">
          <span>Advokasi</span>
        </div>
      </header>

      {/* Story Bar (Opsional: untuk update cepat) */}
      <div className="flex gap-4 p-4 overflow-x-auto border-b">
        <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-red-500"></div>
        <div className="w-16 h-16 rounded-full bg-gray-200 border-2 border-gray-300"></div>
      </div>

      {/* Feed Card */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <span className="font-semibold text-sm">Kastrat FT</span>
        </div>
        <div className="w-full h-64 bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
          [Visualisasi Data/Info]
        </div>
        <p className="text-sm">Riset kebijakan mahasiswa terbaru...</p>
      </div>
    </div>
  );
}