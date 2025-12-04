// src/components/sections/FeaturesSection.tsx
"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { FEATURES } from "@/config/site.config"
import type { Feature } from "@/config/site.config"
import styles from "./FeaturesSection.module.css"
import "./Animations.css"
import { ModalSkeleton } from "../ui/Skeletons"

const DetailModal = dynamic(() => import("../ui/DetailModal"), {
  loading: () => <ModalSkeleton />
})

export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  
  // State for the blue line height percentage
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Ref to track the section container
  const sectionRef = useRef<HTMLElement>(null)

  const openModal = (feature: Feature) => {
    setSelectedFeature(feature)
  }

  const closeModal = () => {
    setSelectedFeature(null)
  }

  // Effect to handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate how much of the section has been scrolled past the middle of the screen
      // We use 'windowHeight / 2' so the line fills up as it passes your eye level
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const startPoint = windowHeight / 2
      
      // Logic: 
      // When section top is at middle of screen -> 0%
      // When section bottom is at middle of screen -> 100%
      const scrolled = startPoint - sectionTop
      
      let percentage = (scrolled / sectionHeight) * 100
      
      // Clamp between 0 and 100
      percentage = Math.max(0, Math.min(100, percentage))
      
      setScrollProgress(percentage)
    }

    window.addEventListener("scroll", handleScroll)
    // Trigger once on mount to set initial state
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <section
        id="features"
        ref={sectionRef} // Attach ref here
        className={`${styles.tripleSection} bg-[#FFFFFF]`}
        role="region"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="sr-only">
          Features
        </h2>

        {/* The Timeline - styles.timelineLine has display:none on mobile via CSS */}
        <div className={styles.timelineLine}>
          <div 
            className={styles.timelineProgress} 
            style={{ height: `${scrollProgress}%` }} /* Dynamic height */
          ></div>
        </div>
        
        {/* Dots - hidden on mobile via CSS */}
        <div className={`${styles.timelineDot} ${styles.timelineDotTop1}`}></div>
        <div className={`${styles.timelineDot} ${styles.timelineDotTop2}`}></div>
        <div className={`${styles.timelineDot} ${styles.timelineDotTop3}`}></div>

        {FEATURES.map((s, i) => (
          <div
            key={i}
            className={`${styles.slide} ${s.reverse ? styles.reverse : ""}`}
          >
            <div className={`${styles.slideImg} animate-on-scroll-${s.reverse ? "left" : "right"}`}>
              <Image
                src={s.image}
                alt={s.highlight}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className={styles.divider} />
            <div className={`${styles.slideText} animate-on-scroll-${s.reverse ? "right" : "left"}`}>
              <h2>
                <span className={styles.accent}>{s.highlight}</span>
              </h2>
              <p>{s.text}</p>
              <div className="mt-8">
                <button
                  onClick={() => openModal(s)}
                  className="px-6 py-3 bg-[#4D64FF] text-white rounded-full hover:bg-[#3d50cc] transition-colors duration-300 font-medium"
                  aria-label={`View details for ${s.highlight}`}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <DetailModal
        isOpen={!!selectedFeature}
        onClose={closeModal}
        title={selectedFeature?.highlight || ""}
        description={selectedFeature?.text || ""}
        detailsTitle="Key Examples"
        details={selectedFeature?.details || []}
      />
    </>
  )
}