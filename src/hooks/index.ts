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
