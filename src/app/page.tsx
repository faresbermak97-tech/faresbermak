'use client';

import HeroSection from '@/components/sections/HeroSection';
import Preloader from '@/components/Preloader';
import dynamic from 'next/dynamic';
import { SectionSkeleton } from '@/components/ui/Skeletons';

// Lazy load components that are not immediately visible
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const CardsSection = dynamic(() => import('../components/sections/CardsSection'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Preloader />
      <main className="bg-[#f5f5f5]">
      <HeroSection />
      <AboutSection />
      <CardsSection />
      <FeaturesSection />
      <ContactSection />
    </main>
    </>
  );
}
