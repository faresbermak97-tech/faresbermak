// src/components/Preloader.tsx
'use client';

import { useEffect, useState } from 'react';
import { PRELOADER_GREETINGS } from '@/config/site.config';
import { lockScroll, unlockScroll, scrollToTop } from '@/utils';

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Prevent scroll during preload
    lockScroll();
    scrollToTop();
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < PRELOADER_GREETINGS.length) {
        setIndex(currentIndex);
      } else {
        clearInterval(interval);
        
        // Delay hiding to ensure page is ready
        setTimeout(() => {
          setShowPreloader(false);
          // Restore scroll after a frame
          requestAnimationFrame(() => {
            unlockScroll();
            scrollToTop();
          });
        }, 200);
      }
    }, 400);
    
    return () => {
      clearInterval(interval);
      unlockScroll();
    };
  }, []);

  if (!showPreloader) return null;

  if (!isClient) {
    return (
      <div className="fixed inset-0 z-9999 bg-black flex items-center justify-center">
        <div className="text-white text-4xl md:text-6xl font-bold">
          {PRELOADER_GREETINGS[0]}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-9999 bg-black flex items-center justify-center">
      <div className="text-white text-4xl md:text-6xl font-bold">
        {PRELOADER_GREETINGS[index]}
      </div>
    </div>
  );
}