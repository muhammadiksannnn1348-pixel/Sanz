import React from "react";
import { motion } from "framer-motion";
import Lightning from "../components/Lightning";
import StarryBackground from "../components/StarryBackground";

export default function LandingButton({ onMasuk }) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#030014] text-white">
      {/* 1. Background Bintang + Bintang Jatuh */}
      <StarryBackground />

      {/* 2. Lightning */}
      <div className="absolute inset-0 w-full h-full z-[1]">
        <Lightning
          hue={272}
          xOffset={0}
          speed={1}
          intensity={1.4}
          size={1}
        />
      </div>

      {/* 3. Overlay Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20 z-[2] pointer-events-none" />

      {/* 4. Tombol di tengah */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={onMasuk}
          className="group relative overflow-hidden rounded-full px-14 sm:px-16 py-4 sm:py-5 text-lg sm:text-xl font-semibold text-white outline-none"
          style={{
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            boxShadow:
              "0 8px 32px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(168, 85, 247, 0.3) inset",
          }}
        >
          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <span className="relative flex items-center gap-2">
            Masuk
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </motion.button>
      </div>
    </div>
  );
}