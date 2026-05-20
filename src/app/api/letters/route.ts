import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Simulasi pembuatan nomor surat otomatis berstandar Fakultas Teknik
    return NextResponse.json({ 
      success: true, 
      data: {
        nomorSurat: `BEM-FT/E-OFFICE/V/2026`,
        ...body
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal memproses data surat' }, { status: 500 });
  }
}