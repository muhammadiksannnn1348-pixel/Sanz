/*
  File: src\Pages\404.jsx
  Deskripsi: File ini menangani bagian tertentu dari aplikasi portfolio digital.
  Catatan: Kode ini digunakan untuk rendering, data, dan logika interaksi pada halaman website.
*/
import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg w-full">
        {/* 404 Number */}
        <div className="mb-10">
          <h1 className="text-[9rem] sm:text-[11rem] font-extrabold leading-none tracking-tighter bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent select-none">
            404
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500" />
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-500" />
          </div>
        </div>

        {/* Message */}
        <div className="mb-10 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-sm mx-auto">
            Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-slate-800/80 text-slate-200 rounded-xl border border-slate-700/80 hover:bg-slate-700/80 hover:border-slate-600 hover:text-white transition-all duration-200"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-0.5" />
            Kembali
          </button>

          <button
            onClick={handleGoHome}
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/30 transition-all duration-200"
          >
            <Home size={18} />
            Beranda
          </button>
        </div>
      </div>
    </div>
  );
}