/*
  File: src\components\ProtectedRoute.jsx
  Deskripsi: File ini menangani bagian tertentu dari aplikasi portfolio digital.
  Catatan: Kode ini digunakan untuk rendering, data, dan logika interaksi pada halaman website.
*/
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from "../supabase"; 

// ProtectedRoute membungkus rute yang membutuhkan role admin.
// Jika user tidak login atau bukan admin, diarahkan ke halaman /login.
export default function ProtectedRoute({ children }) {
  // allowed: null = loading, false = tidak diizinkan, true = diizinkan
  const [allowed, setAllowed] = useState(null)

  useEffect(() => {
    const check = async () => {
      // Ambil user saat ini dari supabase auth
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return setAllowed(false)

      // Ambil profil untuk memeriksa role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      // Set allowed jika role adalah admin
      setAllowed(profile?.role === 'admin')
    }
    check()
  }, [])

  // Saat masih memeriksa, jangan render apa-apa
  if (allowed === null) return null
  // Jika tidak diizinkan, redirect ke login
  if (!allowed) return <Navigate to="/login" />

  // Jika diizinkan, render anak-anak (komponen yang dilindungi)
  return children
}
