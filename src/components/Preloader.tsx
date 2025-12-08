// src/components/Preloader.tsx
// 🔥 FIXED VERSION - No more flash!
"use client";

import { useEffect, useState } from "react";
import { PRELOADER_GREETINGS } from "@/config/site.config";
import { lockScroll, unlockScroll, scrollToTop } from "@/utils";

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 1440, height: 900 });
  // ✅ FIX: Start with true to show preloader immediately
  const [showPreloader, setShowPreloader] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Set dimensions on client side only
    if (typeof window !== "undefined") {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    }

    lockScroll();
    scrollToTop();

    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < PRELOADER_GREETINGS.length) {
        setIndex(i);
      } else {
        clearInterval(interval);
        setIsExiting(true);

        setTimeout(() => {
          setShowPreloader(false);
          requestAnimationFrame(() => {
            unlockScroll();
            scrollToTop();
          });
        }, 900);
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  // ✅ FIX: Don't render null, render the preloader
  // This ensures it shows immediately on mount
  if (!showPreloader) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center transition-transform duration-900 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      {/* Solid Black Screen */}
      <div className="absolute inset-0 bg-black" />

      {/* Perfect curved bottom */}
      <div className="absolute top-full left-0 w-full h-[22vh] overflow-hidden pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${dimension.width} 300`}
          preserveAspectRatio="none"
        >
          <path
            d={`M0 0 Q ${dimension.width / 2} 300 ${dimension.width} 0`}
            fill="black"
          />
        </svg>
      </div>

      {/* Greeting text */}
      <div
        className={`relative z-10 text-white text-4xl md:text-6xl font-bold flex items-center gap-4 transition-opacity duration-300 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
        {PRELOADER_GREETINGS[index]}
      </div>
    </div>
  );
}