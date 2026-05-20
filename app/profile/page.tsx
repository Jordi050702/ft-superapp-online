// app/profile/page.tsx
export default function Profile() {
  // Array dummy untuk grid (nanti diganti data dari Supabase)
  const portfolio = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="max-w-md mx-auto p-4 pb-20 bg-white min-h-screen">
      {/* Header Profil */}
      <div className="flex items-center gap-6 mb-6">
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
        <div className="flex gap-6">
          <div className="text-center"><p className="font-bold">0</p><p className="text-xs text-gray-500">Post</p></div>
          <div className="text-center"><p className="font-bold">0</p><p className="text-xs text-gray-500">Poin</p></div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="font-bold">Nama Mahasiswa</h2>
        <p className="text-sm text-gray-600">Teknik [Jurusan] | BEM FT</p>
      </div>

      {/* Grid Portfolio Instagram Style */}
      <div className="grid grid-cols-3 gap-1">
        {portfolio.map((item) => (
          <div key={item} className="aspect-square bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer border border-white">
            {/* Nanti di sini tempat foto prestasi */}
          </div>
        ))}
      </div>
    </div>
  );
}