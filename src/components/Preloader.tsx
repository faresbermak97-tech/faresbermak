// src/components/Preloader.tsx
// ✅ OPTIMIZED - Faster greeting cycle for better FCP
"use client";

import { useEffect, useState } from "react";
import { lockScroll, unlockScroll, scrollToTop } from "@/utils";

// ✅ REDUCED from 10 to 5 greetings for faster load
const PRELOADER_GREETINGS = [
  'Hello',
  'Bonjour',
  'مرحبــا',
  'こんにちは',
  'Olá'
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 1440, height: 900 });
  const [showPreloader, setShowPreloader] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
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
        }, 700); // ✅ Reduced from 900ms
      }
    }, 180); // ✅ FASTER: Changed from 250ms to 180ms (saves ~1 second!)

    return () => clearInterval(interval);
  }, []);

  if (!showPreloader) return null;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="absolute inset-0 bg-black" />

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