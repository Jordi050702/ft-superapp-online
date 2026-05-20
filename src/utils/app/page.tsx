import { supabase } from '@/utils/supabase';

export default async function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Selamat Datang di SuperApp Saya! 🎉</h1>
      <p>Koneksi database Supabase berhasil dibuat.</p>
    </div>
  );
}