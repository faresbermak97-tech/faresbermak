'use client';

import HeroSection from '@/components/sections/HeroSection';
import dynamic from 'next/dynamic';
import { SectionSkeleton } from '@/components/ui/Skeletons';

// Lazy load components that are not immediately visible
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <SectionSkeleton />
});

const CardsSection = dynamic(() => import('../components/sections/CardsSection'), {
  loading: () => <SectionSkeleton />
});

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => <SectionSkeleton />
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <SectionSkeleton />
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
