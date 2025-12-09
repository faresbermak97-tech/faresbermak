// src/components/sections/AboutSection.tsx
import Image from 'next/image';
import { ABOUT } from '@/config/site.config';

export default function AboutSection() {
  return (
    <section id="about" className="animate-section relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-16 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <div className="overflow-hidden">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-fade-in-up">
                <span className="inline-block hover:text-[#4D64FF] transition-colors duration-300">
                  {ABOUT.heading}
                </span>
              </h2>
            </div>

            <div className="overflow-hidden">
              <div className="space-y-6 animate-fade-in-up animation-delay-200">
                {ABOUT.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                <div className="pt-4 border-l-4 border-[#4D64FF] pl-6 bg-white/50 py-4 rounded-r-lg">
                  <p className="text-lg md:text-xl text-gray-900 font-medium italic leading-relaxed">
                    {ABOUT.quote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl animate-fade-in-right">
              <div className="relative w-full h-auto">
                <Image
                  src={ABOUT.image}
                  alt={ABOUT.imageAlt}
                  width={750}
                  height={1000}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#4D64FF] rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#4D64FF] rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}