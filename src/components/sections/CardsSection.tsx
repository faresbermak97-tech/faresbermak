// src/components/sections/CardsSection.tsx
"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { SERVICES } from "@/config/site.config"
import type { Service } from "@/config/site.config"
import "./CardsSection.css"
import { ModalSkeleton } from "../ui/Skeletons"

// Dynamically import DetailModal to reduce initial bundle size
const DetailModal = dynamic(() => import("../ui/DetailModal"), {
  loading: () => <ModalSkeleton />
})

const CardsSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Service | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const cardButtonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const updateCardProgress = useCallback((cardIndex: number, progress: number) => {
    const card = cardRefs.current[cardIndex]
    if (card) {
      card.style.setProperty("--progress", String(progress))
    }
  }, [])

  useEffect(() => {
    cardRefs.current.forEach((_, index) => {
      updateCardProgress(index, 0)
    })

    requestAnimationFrame(() => {
      setIsInitialized(true)
    })
  }, [updateCardProgress])

  useEffect(() => {
    if (!isInitialized) return

    const handleScroll = () => {
      if (!sectionRef.current) return

      const section = sectionRef.current
      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      if (sectionTop <= 0 && sectionTop > -sectionHeight + windowHeight) {
        const progress = Math.abs(sectionTop) / (sectionHeight - windowHeight)
        setScrollProgress(Math.min(Math.max(progress, 0), 1))
      } else if (sectionTop > 0) {
        setScrollProgress(0)
      } else {
        setScrollProgress(1)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [isInitialized])

  useEffect(() => {
    if (!isInitialized) return

    const card1Progress = Math.min(scrollProgress * 3, 1)
    const card2Progress = Math.min(Math.max((scrollProgress - 0.33) * 3, 0), 1)
    const card3Progress = Math.min(Math.max((scrollProgress - 0.66) * 3, 0), 1)

    updateCardProgress(0, card1Progress)
    updateCardProgress(1, card2Progress)
    updateCardProgress(2, card3Progress)
  }, [scrollProgress, updateCardProgress, isInitialized])

  const getCardClasses = (cardIndex: number) => {
    return `card-${cardIndex + 1}`
  }

  const openModal = (card: Service) => {
    setSelectedCard(card)
  }

  const closeModal = () => {
    setSelectedCard(null)
  }

  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [selectedCard])

  return (
    <>
      <div ref={sectionRef} className="cards-section relative bg-[#FFFFFF] full-height">
        <div ref={containerRef} className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="section-title absolute top-8 left-0 right-0 text-center z-10">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="inline-block hover:text-[#4D64FF] transition-colors duration-300">Services I Offer</span>
            </h1>
          </div>
          <div className="cards-container relative h-full w-full flex items-center justify-center p-8 md:p-16 pt-20 md:pt-24">
            {SERVICES.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el
                }}
                className={`card absolute ${card.bgColor} rounded-3xl shadow-2xl transition-all duration-300 ease-out card-dimensions ${getCardClasses(index)}`}
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
                        ref={(el) => { cardButtonRefs.current[index] = el; }}
                        onClick={() => openModal(card)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openModal(card);
                          }
                        }}
                        className="px-6 py-3 bg-[#4D64FF] text-white rounded-full hover:bg-[#3d50cc] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#4D64FF] transition-colors duration-300 font-medium"
                        aria-label={`View details for ${card.title}`}
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