// src/components/sections/CardsSection.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { SERVICES } from "@/config/site.config"
import type { Service } from "@/config/site.config"
import "./CardsSection.css"
import { ModalSkeleton } from "../ui/Skeletons"

const DetailModal = dynamic(() => import("../ui/DetailModal"), {
  loading: () => <ModalSkeleton />
})

const CardsSection = () => {
  // REMOVED: scrollProgress state (caused re-renders)
  const [selectedCard, setSelectedCard] = useState<Service | null>(null)

  // Refs for direct DOM manipulation
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Animation frame management
  const rafId = useRef<number | null>(null)
  const isTicking = useRef(false)

  // 1. Optimized Scroll Handler
  useEffect(() => {
    const handleScroll = () => {
      if (!isTicking.current) {
        isTicking.current = true
        rafId.current = requestAnimationFrame(updateScroll)
      }
    }

    const updateScroll = () => {
      if (!sectionRef.current) {
        isTicking.current = false
        return
      }

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = rect.height

      // Calculate main progress (0 to 1) based on section position
      // We only care when the section is actively scrolling or just finished
      let progress = 0

      if (rect.top <= 0) {
        // We are scrolling inside the section
        const scrolled = Math.abs(rect.top)
        const scrollableDistance = sectionHeight - windowHeight

        if (scrollableDistance > 0) {
           progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1)
        }
      }

      // 2. Apply transforms directly to DOM nodes (No React Re-render!)
      // This preserves your exact animation logic
      const card1Progress = Math.min(progress * 3, 1)
      const card2Progress = Math.min(Math.max((progress - 0.33) * 3, 0), 1)
      const card3Progress = Math.min(Math.max((progress - 0.66) * 3, 0), 1)

      updateCardStyle(0, card1Progress)
      updateCardStyle(1, card2Progress)
      updateCardStyle(2, card3Progress)

      isTicking.current = false
    }

    // Helper to safely update refs
    const updateCardStyle = (index: number, val: number) => {
      const card = cardRefs.current[index]
      if (card) {
        // Directly updating CSS variable triggers the GPU transform in your CSS file
        card.style.setProperty("--progress", val.toString())
      }
    }

    // Attach listeners
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    // Initial call to set positions correctly on load
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Modal handlers
  const openModal = (card: Service) => setSelectedCard(card)
  const closeModal = () => setSelectedCard(null)

  useEffect(() => {
    document.body.style.overflow = selectedCard ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [selectedCard])

  return (
    <>
      <div ref={sectionRef} className="cards-section relative bg-[#FFFFFF] full-height">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="cards-container relative h-full w-full flex items-center justify-center p-8 md:p-16 pt-20 md:pt-24">
            {SERVICES.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  // Assign ref without returning it
                  if (el) cardRefs.current[index] = el
                }}
                className={`card absolute ${card.bgColor} rounded-3xl shadow-2xl card-dimensions card-${index + 1}`}
                // Removed transition-all here because we are scrubbing manually with scroll
                // Keeping it might fight with our scroll updates
                style={{
                   // We add 'will-change' hint for browser optimization
                   willChange: "transform",
                   // Initialize CSS var to prevent layout jump
                   "--progress": "0"
                } as React.CSSProperties}
              >
                <div className="card-content h-full flex flex-col lg:flex-row overflow-hidden rounded-3xl">
                  <div className="content-left flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center relative z-10">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                      {card.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-xl leading-relaxed pl-1 md:pl-2">
                      {card.description}
                    </p>
                    <div className="pl-1 md:pl-2">
                      <button
                        onClick={() => openModal(card)}
                        className="px-6 py-3 bg-[#4D64FF] text-white rounded-full hover:bg-[#3d50cc] transition-colors duration-300 font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-5/12 flex items-center justify-center lg:justify-end relative">
                    <div className="relative w-full max-w-[450px] aspect-4/5 rotate-3 transition-transform duration-500 hover:rotate-0">
                      <div className="absolute inset-0 bg-white rounded-3xl transform translate-x-4 translate-y-4 opacity-50" />
                      <div className="absolute inset-0 bg-white rounded-3xl p-3 shadow-2xl">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover rounded-2xl"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            // Optimization: Don't lazy load if it's the first card
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 lg:top-8 lg:right-8 text-white text-6xl lg:text-9xl font-bold opacity-20 select-none">
                      0{card.id}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DetailModal
        isOpen={!!selectedCard}
        onClose={closeModal}
        title={selectedCard?.title || ""}
        description={selectedCard?.description || ""}
        detailsTitle="What I Deliver"
        details={selectedCard?.details || []}
      />
    </>
  )
}

export default CardsSection
