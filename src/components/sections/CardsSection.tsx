// src/components/sections/CardsSection.tsx
// ✅ OPTIMIZED VERSION - Better performance, no re-renders
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
  const [selectedCard, setSelectedCard] = useState<Service | null>(null)

  // Refs for direct DOM manipulation
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // ✅ OPTIMIZATION: Single RAF request, no duplicate calls
  const rafId = useRef<number | null>(null)

  // ✅ OPTIMIZATION: Throttled scroll handler (16ms = ~60fps)
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        
        if (rafId.current) {
          cancelAnimationFrame(rafId.current)
        }

        rafId.current = requestAnimationFrame(() => {
          updateCardPositions()
          ticking = false
        })
      }
    }

    const updateCardPositions = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = rect.height

      // Calculate scroll progress (0 to 1)
      let progress = 0

      if (rect.top <= 0) {
        const scrolled = Math.abs(rect.top)
        const scrollableDistance = sectionHeight - windowHeight

        if (scrollableDistance > 0) {
          progress = Math.min(Math.max(scrolled / scrollableDistance, 0), 1)
        }
      }

      // ✅ OPTIMIZATION: Direct DOM manipulation (no React re-renders)
      const card1Progress = Math.min(progress * 3, 1)
      const card2Progress = Math.min(Math.max((progress - 0.33) * 3, 0), 1)
      const card3Progress = Math.min(Math.max((progress - 0.66) * 3, 0), 1)

      updateCardStyle(0, card1Progress)
      updateCardStyle(1, card2Progress)
      updateCardStyle(2, card3Progress)
    }

    const updateCardStyle = (index: number, val: number) => {
      const card = cardRefs.current[index]
      if (card) {
        // Only update if value changed significantly (avoid excessive repaints)
        const currentVal = parseFloat(card.style.getPropertyValue("--progress") || "0")
        if (Math.abs(currentVal - val) > 0.001) {
          card.style.setProperty("--progress", val.toString())
        }
      }
    }

    // Attach listeners with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    // Initial call
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
                  if (el) cardRefs.current[index] = el
                }}
                className={`card absolute ${card.bgColor} rounded-3xl shadow-2xl card-dimensions card-${index + 1}`}
                style={{
                  willChange: "transform",
                  // @ts-expect-error - CSS custom property
                  "--progress": "0"
                }}
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
                            priority={index === 0}
                            quality={85}
                            loading={index === 0 ? "eager" : "lazy"}
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