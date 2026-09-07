/*
  File: src\supabase.js
  Deskripsi: File ini menangani bagian tertentu dari aplikasi portfolio digital.
  Catatan: Kode ini digunakan untuk rendering, data, dan logika interaksi pada halaman website.
*/
// Konfigurasi Supabase client
import { createClient } from '@supabase/supabase-js';

// Ambil URL dan KEY dari environment variables (Vite)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validasi agar developer tahu jika env belum diset
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL:', supabaseUrl);
  console.error('Supabase Anon Key:', supabaseKey);
  throw new Error(
    /* Petunjuk: buat file .env dengan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY */
    'Supabase URL and Anon Key are required. Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart the dev server.'
  );
}

// Buat dan export client Supabase yang digunakan di seluruh aplikasi
export const supabase = createClient(supabaseUrl, supabaseKey);
