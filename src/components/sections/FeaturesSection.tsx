// src/components/sections/FeaturesSection.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import DetailModal from "../ui/DetailModal"
import { FEATURES } from "@/config/site.config"
import type { Feature } from "@/config/site.config"
import styles from "./FeaturesSection.module.css"
import "./Animations.css"

export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)



  const openModal = (feature: Feature) => {
    setSelectedFeature(feature)
  }

  const closeModal = () => {
    setSelectedFeature(null)
  }





  return (
    <>
      <section
        id="features"
        className={`${styles.tripleSection} bg-[#FFFFFF]`}
        role="region"
        aria-labelledby="features-heading"
      >
        <h2 id="features-heading" className="sr-only">
          Features
        </h2>

        <div className={styles.timelineLine}>
          <div className={styles.timelineProgress}></div>
        </div>
        <div className={`${styles.timelineDot} ${styles.timelineDotTop1}`}></div>
        <div className={`${styles.timelineDot} ${styles.timelineDotTop2}`}></div>
        <div className={`${styles.timelineDot} ${styles.timelineDotTop3}`}></div>

        {FEATURES.map((s, i) => (
          <div
            key={i}
            className={`${styles.slide} ${s.reverse ? styles.reverse : ""} md:flex-row`}
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openModal(s);
                    }
                  }}
                  className="px-6 py-3 bg-[#4D64FF] text-white rounded-full hover:bg-[#3d50cc] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#4D64FF] transition-colors duration-300 font-medium"
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