import { NextResponse } from 'next/server';

// Database sementara di memori komputer (Akan ter-reset jika server mati)
export let mockTickets = [
  { id: 'ADV-2026-001', category: 'UKT', title: 'Permohonan Keringanan Golongan UKT', status: 'INVESTIGATION', anonymous: true },
  { id: 'ADV-2026-002', category: 'Fasilitas', title: 'AC Ruang Kuliah 3.1 Gedung Bersama Rusak', status: 'SUBMITTED', anonymous: false },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Simulasi respons sukses pengolahan data surat
    return NextResponse.json({ 
      success: true, 
      message: 'Draft surat berhasil dibuat otomatis oleh sistem.',
      data: {
        nomorSurat: `BEM-FT/E-OFFICE/V/${new Date().getFullYear()}`,
        ...body
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memproses data' }, { status: 500 });
  }
}