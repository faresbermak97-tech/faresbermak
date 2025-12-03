'use client';

import HeroSection from '@/components/sections/HeroSection';
import dynamic from 'next/dynamic';

// Lazy load components that are not immediately visible
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <div className="h-screen flex items-center justify-center">Loading...</div>
});

const CardsSection = dynamic(() => import('../components/sections/CardsSection'), {
  loading: () => <div className="h-screen flex items-center justify-center">Loading...</div>
});

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => <div className="h-screen flex items-center justify-center">Loading...</div>
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <div className="h-screen flex items-center justify-center">Loading...</div>
});

export default function Home() {
  return (
    <main className="bg-[#f5f5f5]">
      <HeroSection />
      <AboutSection />
      <CardsSection />
      <FeaturesSection />
      <ContactSection />
    </main>
  );
}
