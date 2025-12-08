// src/hooks/index.ts
// ✅ CLEANED VERSION - No duplicates, optimized
/**
 * Custom React hooks - Consolidated and optimized
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { lockScroll, unlockScroll, trapFocus, getCurrentTime } from '@/utils';

// ============================================================================
// MODAL HOOK (for DetailModal)
// ============================================================================

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
    lockScroll();
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    unlockScroll();
  }, []);

  useEffect(() => {
    return () => {
      if (isOpen) unlockScroll();
    };
  }, [isOpen]);

  return { isOpen, open, close };
}

// ============================================================================
// MENU HOOK (for HeroSection navigation)
// ============================================================================

export function useMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Handle keyboard (Escape key, focus trap)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (menuRef.current) {
        trapFocus(menuRef.current, e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  return { isOpen, toggle, close, menuRef, buttonRef };
}

// ============================================================================
// TIME HOOK (for contact footer)
// ✅ CONSOLIDATED - Only one version now
// ============================================================================

export function useCurrentTime(timezone: string = 'Africa/Algiers') {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(getCurrentTime(timezone));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return time;
}

// ============================================================================
// CLICK OUTSIDE HOOK (for closing menus)
// ============================================================================

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// ============================================================================
// THROTTLED SCROLL HOOK - NEW! (Performance optimization)
// ============================================================================

export function useThrottledScroll(
  callback: (scrollY: number) => void,
  delay: number = 16 // ~60fps
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      
      if (now - lastCallRef.current >= delay) {
        callback(window.scrollY);
        lastCallRef.current = now;
      } else {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          callback(window.scrollY);
          lastCallRef.current = Date.now();
        }, delay);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [callback, delay]);
}