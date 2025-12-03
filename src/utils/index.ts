// src/utils/index.ts
/**
 * Simple utility functions
 * No error handling bloat - just what you need
 */

import { VALIDATION } from '@/config/site.config';

// ============================================================================
// FORM VALIDATION (for contact form)
// ============================================================================

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}) {
  const errors: { name?: string; email?: string; message?: string } = {};

  // Name
  if (data.name.trim().length < VALIDATION.name.min) {
    errors.name = `Name must be at least ${VALIDATION.name.min} characters`;
  }
  if (data.name.length > VALIDATION.name.max) {
    errors.name = `Name must be less than ${VALIDATION.name.max} characters`;
  }

  // Email
  if (!emailRegex.test(data.email)) {
    errors.email = 'Invalid email address';
  }

  // Message
  if (data.message.trim().length < VALIDATION.message.min) {
    errors.message = `Message must be at least ${VALIDATION.message.min} characters`;
  }
  if (data.message.length > VALIDATION.message.max) {
    errors.message = `Message must be less than ${VALIDATION.message.max} characters`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function sanitizeInput(text: string): string {
  return text.trim().replace(/[<>]/g, '');
}

// ============================================================================
// SCROLL HELPERS
// ============================================================================

export function lockScroll() {
  document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
  document.body.style.overflow = '';
}

export function scrollToTop() {
  window.scrollTo(0, 0);
}

// ============================================================================
// TIME FORMATTING (for contact footer)
// ============================================================================

export function getCurrentTime(timezone: string = 'Africa/Algiers'): string {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

// ============================================================================
// FOCUS TRAP (for modals)
// ============================================================================

export function trapFocus(container: HTMLElement, event: KeyboardEvent) {
  if (event.key !== 'Tab') return;

  const focusable = Array.from(
    container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ) as HTMLElement[];

  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}