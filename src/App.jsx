// Router dan utilitas React
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Routing SPA
import React, { useState, lazy, Suspense } from "react"; // React core + hooks + lazy loading
import { HelmetProvider } from "react-helmet-async"; // Untuk mengelola <head> (title, meta)

// Styling global
import "./index.css"; // File CSS utama (mengimpor Tailwind + custom)

// Komponen statis yang selalu diperlukan
import Navbar from "./components/Navbar"; // Navbar header
import Home from "./Pages/Home"; // Halaman utama landing
import About from "./Pages/About"; // Bagian tentang saya
import AnimatedBackground from "./components/Background"; // Background animasi
import { AnimatePresence } from "framer-motion"; // Untuk animasi masuk/keluar komponen
import Footer from "./components/Footer"; // Footer halaman

// Halaman dan utilitas untuk otentikasi/admin
import Login from "./Pages/Login"; // Halaman login
import Dashboard from "./Pages/Dashboard"; // Halaman dashboard (admin)
import ProtectedRoute from "./components/ProtectedRoute"; // Membungkus rute yang butuh auth

// Lazy load: mengurangi bundle awal dengan memuat halaman hanya saat diperlukan
const Portofolio = lazy(() => import("./Pages/Portofolio")); // Portofolio (di-load saat perlu)
const ContactPage = lazy(() => import("./Pages/Contact")); // Halaman kontak (lazy)
const ProjectDetails = lazy(() => import("./components/ProjectDetail")); // Detail project (lazy)
const WelcomeScreen = lazy(() => import("./Pages/WelcomeScreen")); // Splash/welcome (lazy)
const NotFoundPage = lazy(() => import("./Pages/404")); // Halaman 404 (lazy)

// Komponen landing yang menampilkan welcome screen terlebih dahulu
const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      {/* AnimatePresence dari framer-motion meng-handle exit/enter animation */}
      <AnimatePresence mode="wait">
        {/* Jika showWelcome true, tampilkan WelcomeScreen yang dimuat lazy */}
        {showWelcome && (
          <Suspense fallback={null}>
            {/* WelcomeScreen menerima callback saat selesai untuk menutup splash */}
            <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      {/* Jika welcome sudah selesai, tampilkan konten utama */}
      {!showWelcome && (
        <>
          <Navbar /> {/* Header navigasi */}
          <Home /> {/* Section beranda */}
          <About /> {/* Section tentang */}
          <Suspense fallback={<div className="h-20" />}> {/* Placeholder saat lazy load */}
            <Portofolio /> {/* Daftar proyek */}
            <ContactPage /> {/* Form atau info kontak */}
          </Suspense>
          <Footer /> {/* Footer global */}
        </>
      )}
    </>
  );
};

// Layout sederhana untuk halaman detail project (memasukkan footer)
const ProjectPageLayout = () => (
  <>
    {/* Memuat detail project secara lazy */}
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectDetails />
    </Suspense>
    <Footer />
  </>
);

function App() {
  // State untuk menampilkan welcome splash saat pertama load
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    // HelmetProvider membungkus aplikasi agar dapat mengatur tag <head>
    <HelmetProvider>
      {/* Background animasi diletakkan di luar router agar selalu ada */}
      <div className="pointer-events-none">
        <AnimatedBackground />
      </div>

      {/* Router utama aplikasi */}
      <BrowserRouter>
        <Routes>
          {/* Rute publik: halaman landing */}
          <Route
            path="/"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            }
          />

          {/* Rute detail project menggunakan slug */}
          <Route path="/project/:slug" element={<ProjectPageLayout />} />

          {/* Halaman login (publik) */}
          <Route path="/login" element={<Login />} />

          {/* Rute dashboard dilindungi oleh ProtectedRoute */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Rute fallback untuk 404 - dimuat lazy */}
          <Route
            path="*"
            element={
              <Suspense fallback={null}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
