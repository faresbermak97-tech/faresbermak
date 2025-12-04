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
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  
  // NEW: Track which elements are visible
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set())
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const openModal = (feature: Feature) => {
    setSelectedFeature(feature)
  }

  const closeModal = () => {
    setSelectedFeature(null)
  }

  // Scroll progress effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const startPoint = windowHeight / 2
      const scrolled = startPoint - sectionTop
      
      let percentage = (scrolled / sectionHeight) * 100
      percentage = Math.max(0, Math.min(100, percentage))
      
      setScrollProgress(percentage)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // NEW: Intersection Observer for animations (fixes the white overlay bug)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const slideIndex = slideRefs.current.findIndex(ref => ref === entry.target)
          if (slideIndex !== -1 && entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(slideIndex))
          }
        })
      },
      {
        threshold: 0.2, // Trigger when 20% of element is visible
        rootMargin: '0px 0px -10% 0px' // Slight offset for better timing
      }
    )

    slideRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section
        id="features"
        ref={sectionRef}
        className={`${styles.tripleSection} bg-[#FFFFFF]`}
        role="region"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="sr-only">
          Features
        </h2>

        <div className={styles.timelineLine}>
          <div 
            className={styles.timelineProgress} 
            style={{ height: `${scrollProgress}%` }}
          ></div>
        </div>
        
        <div className={`${styles.timelineDot} ${styles.timelineDotTop1}`}></div>
        <div className={`${styles.timelineDot} ${styles.timelineDotTop2}`}></div>
        <div className={`${styles.timelineDot} ${styles.timelineDotTop3}`}></div>

        {FEATURES.map((s, i) => (
          <div
            key={i}
            ref={el => { slideRefs.current[i] = el }}
            className={`${styles.slide} ${s.reverse ? styles.reverse : ""}`}
          >
            <div 
              className={`${styles.slideImg} animate-on-scroll-${s.reverse ? "left" : "right"} ${
                visibleElements.has(i) ? 'visible' : ''
              }`}
            >
              <Image
                src={s.image}
                alt={s.highlight}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className={styles.divider} />
            <div 
              className={`${styles.slideText} animate-on-scroll-${s.reverse ? "right" : "left"} ${
                visibleElements.has(i) ? 'visible' : ''
              }`}
            >
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