import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useCallback, lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";

import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy loaded pages
const Portofolio = lazy(() => import("./Pages/Portofolio"));
const ContactPage = lazy(() => import("./Pages/Contact"));
const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const WelcomeScreen = lazy(() => import("./Pages/WelcomeScreen"));
const NotFoundPage = lazy(() => import("./Pages/404"));
const LandingButton = lazy(() => import("./Pages/LandingButton"));

/* ============================================================
   LANDING PAGE WRAPPER
   3 tahap: "button" → "welcome" → "main"
============================================================ */
const LandingPage = () => {
  const [stage, setStage] = useState("button");

  // Audio global — hidup selama App tidak unmount
  const [audio] = useState(() => {
    const a = new Audio("/public/audio.mp3"); // ← filename: audio.mp3
    a.preload = "auto";
    return a;
  });

  // Dipanggil saat user klik tombol "Masuk"
  const handleMasuk = useCallback(() => {
    audio.currentTime = 0;
    audio.play().catch((err) => console.warn("Audio gagal play:", err));
    setStage("welcome");
  }, [audio]);

  // Dipanggil saat welcome screen selesai
  const handleWelcomeComplete = useCallback(() => {
    setStage("main");
    // Audio dibiarkan terus jalan sampai selesai sendiri
  }, []);

  return (
    <>
      {stage === "button" && (
        <Suspense fallback={null}>
          <LandingButton onMasuk={handleMasuk} />
        </Suspense>
      )}

      <AnimatePresence mode="wait">
        {stage === "welcome" && (
          <Suspense fallback={null}>
            <WelcomeScreen onLoadingComplete={handleWelcomeComplete} />
          </Suspense>
        )}
      </AnimatePresence>

      {stage === "main" && (
        <>
          <Navbar />
          <Home />
          <About />
          <Suspense fallback={<div className="h-20" />}>
            <Portofolio />
            <ContactPage />
          </Suspense>
          <Footer />
        </>
      )}
    </>
  );
};

/* ============================================================
   LAYOUT PROJECT DETAIL
============================================================ */
const ProjectPageLayout = () => (
  <>
    <Suspense fallback={<div className="min-h-screen" />}>
      <ProjectDetails />
    </Suspense>
    <Footer />
  </>
);

/* ============================================================
   APP ROOT
============================================================ */
function App() {
  return (
    <HelmetProvider>
      <div className="pointer-events-none">
        <AnimatedBackground />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/project/:slug" element={<ProjectPageLayout />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
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