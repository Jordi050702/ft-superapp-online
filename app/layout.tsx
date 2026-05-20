// app/layout.tsx
import './globals.css';
import BottomNav from '../components/BottomNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 min-h-screen pb-16 md:pb-0">
        {/* Main Content dengan container agar rapi di desktop */}
        <main className="max-w-md mx-auto min-h-screen bg-white shadow-sm">
          {children}
        </main>
        {/* Navigasi tetap di bawah untuk mobile */}
        <BottomNav />
      </body>
    </html>
  );
}