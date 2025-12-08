// src/components/sections/ContactSection.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useCurrentTime } from '@/hooks';
import { validateContactForm, sanitizeInput } from '@/utils';
import { PERSONAL_INFO } from '@/config/site.config';

interface FormStatus {
  type: 'success' | 'error' | null;
  message: string;
}

interface Position {
  x: number;
  y: number;
}

export default function ContactSection() {
  const currentTime = useCurrentTime(PERSONAL_INFO.location.timezone);
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: null,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lineAnimated, setLineAnimated] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<Position>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // FIX: formRef is used here to safely reset the form later
  const formRef = useRef<HTMLFormElement>(null); 
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Animate button position
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate(${buttonPosition.x}px, ${buttonPosition.y}px) translateY(-50%)`;
    }
  }, [buttonPosition]);

  // Animate divider line when contact section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLineAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      observer.observe(contactSection);
    }

    return () => observer.disconnect();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' }); // Clear previous status

    const formData = new FormData(e.currentTarget);
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string
    };

    // Validate
    const validation = validateContactForm(contactData);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      setFormStatus({
        type: 'error',
        message: firstError || 'Please check your inputs'
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizeInput(contactData.name),
          email: sanitizeInput(contactData.email),
          message: sanitizeInput(contactData.message)
        }),
      });

      // Check if the response is JSON before parsing
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        // Fallback for non-JSON responses
        data = { message: await response.text() };
      }

      // 2. Handle server errors (if status is 4xx or 5xx)
      if (!response.ok) {
        console.error('Server Error:', data);
        setFormStatus({
          type: 'error',
          message: data.error || data.message || 'Failed to send your message. Please try again.'
        });
        setIsSubmitting(false);
        return;
      }

      // 3. Success!
      setFormStatus({
        type: 'success',
        message: data.message || 'Your message has been sent successfully!'
      });
      
      // *** THE FIX IS HERE ***
      // We use the ref to call .reset() which is safer in an async function.
      formRef.current?.reset(); 
      
      // Close form after 2 seconds
      setTimeout(() => {
        closeContactForm();
        setFormStatus({ type: null, message: '' });
      }, 5000);

    } catch (error) {
      console.error('Submission Error:', error);
      // This catch block handles network errors or JSON parsing errors,
      // which is why the previous "Something went wrong" message appeared.
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.classList.remove('hidden');
      contactForm.classList.add('flex');
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  };

  const closeContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.classList.add('hidden');
      contactForm.classList.remove('flex');
      document.body.style.overflow = 'auto';
      
      buttonRef.current?.focus();
    }
  };

  return (
    <>
      <section id="contact" className="animate-section relative bg-[#141414] text-white px-2 md:px-6 lg:px-8 pt-8 md:pt-16 pb-2">
        <div className="max-w-7xl mx-auto w-full">
          {/* Main Content */}
          <div className="mb-6 md:mb-8">
            <div className="mb-8 md:mb-12 lg:mb-16">
              {/* Profile Picture and Title */}
              <div className="flex items-center gap-6 md:gap-8 mb-2">
                <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full overflow-hidden shrink-0 bg-gray-700">
                  <Image
                    src="/Pictures/Profiel-pic.webp"
                    alt={PERSONAL_INFO.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none text-white">
                  Let&apos;s work
                </h1>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none text-white">
                together
              </h1>
            </div>

            {/* Divider Line with Centered Button */}
            <div className="relative mb-8 md:mb-12">
              {/* Horizontal Dividing Line */}
              <div className="relative w-full h-px overflow-hidden">
                <div
                  className={`h-full bg-white/30 origin-left transition-transform duration-700 ease-out ${
                    lineAnimated ? 'scale-x-100' : 'scale-x-0'
                  }`}
                ></div>
              </div>

              {/* Get in touch button - Desktop */}
              <div className="hidden lg:block absolute right-8 xl:right-12 top-0">
                <button
                  ref={buttonRef}
                  onClick={openContactForm}
                  onMouseMove={(e: React.MouseEvent<HTMLButtonElement>) => {
                    const btn = buttonRef.current;
                    if (!btn) return;
                    const rect = btn.getBoundingClientRect();
                    const x = Math.max(-40, Math.min(40, e.clientX - rect.left - rect.width / 2));
                    const y = Math.max(-10, Math.min(10, e.clientY - rect.top - rect.height / 2));
                    setButtonPosition({ x: x * 0.8, y: y * 0.5 });
                  }}
                  onMouseLeave={() => {
                    setButtonPosition({ x: 0, y: 0 });
                  }}
                  className="w-40 h-40 lg:w-44 lg:h-44 rounded-full bg-[#4D64FF] hover:bg-[#3d50cc] flex items-center justify-center text-base lg:text-lg text-white transition-all duration-300 cursor-pointer hover:scale-105"
                  aria-label="Open contact form"
                >
                  <span className="inline-block hover:animate-pulse">Get in touch</span>
                </button>
              </div>
            </div>

            {/* Contact Info Row */}
            <div className="relative lg:static">
              <div className="flex flex-col lg:flex-row items-start gap-6">
                {/* Email and Phone */}
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full md:w-auto pr-20 md:pr-0">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="contact-link group relative inline-block border border-white/40 rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base overflow-hidden transition-all duration-300 hover:border-[#4D64FF]"
                  >
                    <span className="absolute inset-0 bg-[#4D64FF] rounded-full scale-y-0 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100"></span>
                    <span className="relative z-10 inline-block text-white transition-all duration-500 ease-out group-hover:text-white">
                      {PERSONAL_INFO.email}
                    </span>
                  </a>
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="contact-link group relative inline-block border border-white/40 rounded-full px-6 md:px-8 py-3 md:py-4 text-sm md:text-base overflow-hidden transition-all duration-300 hover:border-[#4D64FF]"
                  >
                    <span className="absolute inset-0 bg-[#4D64FF] rounded-full scale-y-0 origin-bottom transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-y-100"></span>
                    <span className="relative z-10 inline-block text-white transition-all duration-500 ease-out group-hover:text-white">
                      {PERSONAL_INFO.phone}
                    </span>
                  </a>
                </div>

                {/* Mobile button - FIXED SIZE AND POSITION */}
                <button
                  onClick={openContactForm}
                  className="lg:hidden w-20 h-20 rounded-full bg-[#4D64FF] hover:bg-[#3d50cc] flex items-center justify-center text-xs font-medium transition-all duration-300 hover:scale-105 absolute top-0 right-0 -translate-y-18 z-20"
                  aria-label="Open contact form"
                >
                  Get in touch
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 pt-2 mt-4 md:mt-6 pb-1">
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
              <div className="flex flex-col sm:flex-row gap-6 md:gap-12">
                <div>
                  <h4 className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 mb-1">Version</h4>
                  <p className="text-sm md:text-base">2026 © Edition</p>
                </div>
                <div>
                  <h4 className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 mb-1">Local time</h4>
                  <p className="text-sm md:text-base">{currentTime} {PERSONAL_INFO.location.gmt}</p>
                </div>
              </div>
              <div>
                <h4 className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 mb-1">Socials</h4>
                <div className="flex gap-6 md:gap-8">
                  <a
                    href={PERSONAL_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative text-sm md:text-base transition-all duration-300"
                  >
                    <span className="inline-block transition-all duration-300 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_0_rgba(255,255,255,0.3)]">
                      Instagram
                    </span>
                    <span className="absolute left-0 bottom-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </a>
                  <a
                    href={PERSONAL_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative text-sm md:text-base transition-all duration-300"
                  >
                    <span className="inline-block transition-all duration-300 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_2px_0_rgba(255,255,255,0.3)]">
                      LinkedIn
                    </span>
                    <span className="absolute left-0 bottom-0 w-full h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <div
        id="contact-form"
        ref={modalRef}
        className="hidden fixed inset-0 z-100 bg-black items-center justify-center p-6 md:p-12"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-form-title"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            closeContactForm();
          }
        }}
      >
        <button
          ref={closeButtonRef}
          onClick={closeContactForm}
          className="absolute top-6 right-6 md:top-12 md:right-12 text-white hover:opacity-60 transition-opacity text-4xl md:text-5xl focus:outline-none focus:ring-2 focus:ring-white rounded-full p-1"
          aria-label="Close contact form"
        >
          ×
        </button>

        <div className="max-w-4xl w-full">
          <h3 id="contact-form-title" className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-12 md:mb-16">
            Get in touch
          </h3>

          <form ref={formRef} className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-white text-sm mb-3 uppercase tracking-wider">
                Name
              </label>
              <input
                ref={firstInputRef}
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                aria-required="true"
                className="w-full bg-transparent border-b border-white/30 text-white text-xl md:text-2xl py-3 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-sm mb-3 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                aria-required="true"
                className="w-full bg-transparent border-b border-white/30 text-white text-xl md:text-2xl py-3 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white text-sm mb-3 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                autoComplete="off"
                required
                rows={5}
                aria-required="true"
                className="w-full bg-transparent border-b border-white/30 text-white text-xl md:text-2xl py-3 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/50 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <div className="mt-8">
              {formStatus.type === 'success' && (
                <div className="mb-4 p-4 rounded-lg bg-green-100 text-green-800">
                  {formStatus.message}
                </div>
              )}
              
              {formStatus.type === 'error' && (
                <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-800">
                  {formStatus.message}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black px-12 py-4 rounded-full text-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}