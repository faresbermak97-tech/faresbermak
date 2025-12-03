// src/components/sections/HeroSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useMenu } from '@/hooks';
import { PERSONAL_INFO, NAV_ITEMS } from '@/config/site.config';

export default function HeroSection() {
  const { isOpen, toggle, close, menuRef, buttonRef } = useMenu();
  const textRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Handle keyboard navigation for menu items (arrow keys)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = menuItemsRef.current.findIndex(item => item === document.activeElement);
        const nextIndex = currentIndex < menuItemsRef.current.length - 1 ? currentIndex + 1 : 0;
        menuItemsRef.current[nextIndex]?.focus();
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = menuItemsRef.current.findIndex(item => item === document.activeElement);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItemsRef.current.length - 1;
        menuItemsRef.current[prevIndex]?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Fixed: Smooth & safe text animation using requestAnimationFrame
  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    let scrollPosition = 0;
    let lastTime = 0;
    let animationId: number;

    const scroll = (timestamp: DOMHighResTimeStamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      // Time-based smooth movement
      scrollPosition -= 0.15 * deltaTime;

      if (textElement) {
        textElement.style.transform = `translateX(${scrollPosition}px)`;

        // Reset when fully scrolled for infinite smooth loop
        if (Math.abs(scrollPosition) > textElement.scrollWidth / 2) {
          scrollPosition = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="relative h-screen min-h-dvh flex items-center justify-center overflow-hidden">
      {/* Skip Link */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-black text-white px-4 py-2 rounded"
      >
        Skip to main content
      </a>

      {/* Fixed Menu Button */}
      <button
        ref={buttonRef}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="fixed top-6 right-6 md:top-8 md:right-8 z-50 w-14 h-14 rounded-full bg-black flex flex-col items-center justify-center gap-1.5 transition-all duration-300 opacity-0 -translate-y-4 pointer-events-none"
      >
        <span className="w-6 h-0.5 bg-white rounded-full"></span>
        <span className="w-6 h-0.5 bg-white rounded-full"></span>
        <span className="w-6 h-0.5 bg-white rounded-full"></span>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-heading"
        className={`fixed top-20 right-6 md:right-8 z-40 bg-black/90 backdrop-blur-md rounded-3xl p-8 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
      >
        <h2 id="menu-heading" className="sr-only">Navigation Menu</h2>
        <div className="flex flex-col items-start gap-6">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.href}
              ref={(el) => { menuItemsRef.current[index] = el; }}
              href={item.href}
              className="text-2xl md:text-3xl text-white hover:opacity-60 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded"
              onClick={close}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* Backdrop to close menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={close}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              close();
            }
          }}
          tabIndex={-1}
          aria-hidden="true"
        />
      )}

      {/* Navigation */}
      <nav aria-label="Main navigation" className="absolute top-0 left-0 right-0 z-30 px-4 md:px-8 py-6 md:py-8 flex items-center justify-between">
        <div className="group cursor-default shrink-0 -translate-y-2">
          <div className="bg-black/60 backdrop-blur-md rounded-full px-4 py-2 transition-all duration-300 group-hover:px-6">
            <span className="text-base md:text-lg text-white group-hover:hidden">© Code by Fares</span>
            <span className="text-base md:text-lg text-white hidden group-hover:inline">© {PERSONAL_INFO.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 shrink-0">
          <a href={PERSONAL_INFO.cv} download className="group relative flex flex-col items-center md:flex">
            <div className="bg-black/60 backdrop-blur-md rounded-full px-5 py-2 hover:bg-black/80 transition-all">
              <span className="text-base md:text-lg text-white group-hover:animate-shake inline-block">My CV</span>
            </div>
            <span className="mt-2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </a>

          <a href="#about" className="group relative hidden md:flex md:flex-col items-center">
            <div className="bg-black/60 backdrop-blur-md rounded-full px-5 py-2 hover:bg-black/80 transition-all">
              <span className="text-base md:text-lg text-white group-hover:animate-shake inline-block">About</span>
            </div>
            <span className="mt-2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </a>

          <a href="#contact" className="group relative hidden md:flex md:flex-col items-center">
            <div className="bg-black/60 backdrop-blur-md rounded-full px-5 py-2 hover:bg-black/80 transition-all">
              <span className="text-base md:text-lg text-white group-hover:animate-shake inline-block">Contact</span>
            </div>
            <span className="mt-2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </a>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Pictures/hero-image.webp"
          alt={PERSONAL_INFO.name}
          fill
          className="object-cover object-[center_20%]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      {/* Badge Right */}
      <div className="absolute right-6 md:right-16 top-[25%] md:top-[30%] z-20">
        <div className="text-white text-lg md:text-2xl lg:text-3xl font-semibold leading-tight">
          <div>Remote Virtual Assistant</div>
          <div>& Data Entry</div>
        </div>
      </div>

      {/* Scroll Icon */}
      <div className="absolute right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 z-20 hidden sm:block">
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center animate-bounce-slow">
          <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
            <path d="M15 8L15 22M15 22L21 16M15 22L9 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Scrolling Big Text */}
      <div className="absolute bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 left-0 right-0 z-10 w-full pointer-events-none overflow-hidden">
        <div
          ref={textRef}
          className="text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] font-extrabold text-white/90 leading-none whitespace-nowrap inline-block will-change-transform tracking-tighter hover:text-white transition-opacity duration-500"
        >
          {PERSONAL_INFO.name} — {PERSONAL_INFO.name} — {PERSONAL_INFO.name} — {PERSONAL_INFO.name} — {PERSONAL_INFO.name} — {PERSONAL_INFO.name} — {PERSONAL_INFO.name} — {PERSONAL_INFO.name} —
        </div>
      </div>
    </section>
  );
}