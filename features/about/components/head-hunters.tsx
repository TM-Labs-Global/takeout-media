"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "@/shared/components/ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const teamMembers = [
  {
    name: "Elijah Affi",
    title: "Co-founder and Creative Director",
    image: "/pictures/directors-images/mr-elijah.webp",
  },
  {
    name: "Makua Afiomah",
    title: "Co-founder and Director People Operations & Culture",
    image: "/pictures/directors-images/mr-makua.webp",
  },
  {
    name: "Solomon Dawudu",
    title: "Co-founder and Director of Business Development & Finance",
    image: "/pictures/directors-images/mr-solomon.webp",
  }
];

// Sub-component for Card Cover (orange background with the Takeout Media brand logo)
export function TestCardCover({ className = "" }: { className?: string }) {
  return (
    <div 
      className={`bg-[#e0663d] overflow-clip relative rounded-[var(--radius-2xl)] flex items-center justify-center w-full h-full ${className}`} 
      data-name="test-card-cover"
    >
      <div className="relative h-[80px] md:h-[114px] w-[197px] md:w-[281px]">
        <Image 
          src="/pictures/logos/takeout-media-logo-white.svg" 
          alt="Takeout Media Logo"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
    </div>
  );
}

export function HeadHunters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Find valid card nodes
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null);
      if (cards.length === 0) return;

      // Position coordinates and initial setup
      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "46%"
      });

      // Hide and shift card texts initially
      const textBlocks = cards.map(card => card.querySelector(".card-text"));
      gsap.set(textBlocks, { opacity: 0, y: 15 });

      const positions = [25, 50, 75];
      const rotations = [-12, 0, 12];

      // Scroll-triggered pinning timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cards-pin-container",
          start: "top top",
          end: () => `+=${window.innerHeight * 2.5}`,
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        }
      });

      // Phase 1: Spread / Fan Out horizontally (0 to 1s on timeline)
      cards.forEach((card, index) => {
        tl.to(card, {
          left: `${positions[index]}%`,
          rotate: rotations[index],
          ease: "power2.out",
          duration: 1,
        }, 0);
      });

      // Phase 2: Flip and Straighten cards (1.2 to 2.2s on timeline)
      cards.forEach((card, index) => {
        const cardInner = card.querySelector(".flip-card-inner");
        const startFlipTime = 1.1 + index * 0.15;

        tl.to(cardInner, {
          rotateY: 180,
          ease: "power2.inOut",
          duration: 0.9,
        }, startFlipTime);

        tl.to(card, {
          rotate: 0,
          ease: "power2.inOut",
          duration: 0.9,
        }, startFlipTime);
      });

      // Phase 3: Fade in Text blocks (2.0 to 2.8s on timeline)
      cards.forEach((card, index) => {
        const textBlock = card.querySelector(".card-text");
        const startTextTime = 1.9 + index * 0.15;

        tl.to(textBlock, {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 0.7,
        }, startTextTime);
      });
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[var(--color-secondary-500)]" 
      data-name="Head Hunters"
    >
      {/* Header (Static) - scrolls up normally */}
      <div className="container mx-auto px-[var(--spacing-5)] md:px-[var(--spacing-30)] pt-[var(--spacing-15)] md:pt-[var(--spacing-37)] pb-[var(--spacing-12)]">
        <div className="flex flex-col items-center text-center max-md:!items-start max-md:!text-left">
          <SplitText
            as="h2"
            variant="slide-up"
            className="h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] text-inverse m-0 !normal-case max-w-[320px] lg:max-w-[600px]"
          >
            <span className="whitespace-nowrap">Our <span className="text-brand">Head</span></span> <span className="text-brand">Hunters</span>
          </SplitText>
          <SplitText
            variant="fade"
            type="words"
            delay={0.8}
            threshold={1}
            className="p3-main-body-text text-inverse opacity-80 max-md:!text-[length:var(--text-base)] mt-[var(--spacing-4)] m-0 max-w-[500px]"
          >
            Meet our team of ruthless strikers
          </SplitText>
        </div>
      </div>

      {/* MOBILE ONLY: Static Grid Layout (Fallback) */}
      <div className="block md:hidden container mx-auto px-[var(--spacing-5)] pb-[var(--spacing-15)]">
        <div className="grid grid-cols-1 gap-[var(--spacing-8)]">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col gap-[var(--spacing-6)]">
              {/* Image Container */}
              <div className="relative w-full h-[360px] rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-primary-600)]">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                  sizes="100vw"
                />
              </div>
              <div className="flex flex-col gap-[var(--spacing-3)]">
                <h3 className="text-2xl font-bold text-inverse leading-[1.2] !font-display">
                  {member.name}
                </h3>
                <p className="text-base text-inverse opacity-80 leading-[1.4] max-w-[280px]">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP ONLY: GSAP Pinned Card Animation */}
      <div className="hidden md:block cards-pin-container relative w-full h-screen overflow-hidden">
        <div className="cards-wrapper relative w-full h-full flex items-center justify-center">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="card-container absolute flex flex-col items-center"
              ref={(el) => { cardRefs.current[index] = el; }}
              style={{
                width: "340px",
              }}
            >
              {/* Card wrapper for 3D flip */}
              <div className="card-wrapper relative w-[280px] lg:w-[320px] xl:w-[340px] h-[380px] lg:h-[440px] xl:h-[478px] perspective-1000">
                <div className="flip-card-inner relative w-full h-full preserve-3d">
                  
                  {/* Front: Brand Card Cover */}
                  <div className="flip-card-front absolute inset-0 w-full h-full backface-hidden rounded-[var(--radius-2xl)] overflow-hidden">
                    <TestCardCover />
                  </div>
                  
                  {/* Back: Director Portrait Image */}
                  <div className="flip-card-back absolute inset-0 w-full h-full backface-hidden rounded-[var(--radius-2xl)] overflow-hidden rotate-y-180 bg-[var(--color-primary-600)]">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                </div>
              </div>

              {/* Text Block (Initially hidden via GSAP) */}
              <div className="card-text absolute top-full left-0 w-full text-center mt-[var(--spacing-6)] flex flex-col items-center gap-[var(--spacing-2)]">
                <h3 className="text-2xl lg:text-3xl font-bold text-inverse leading-[1.2] !font-display max-w-[320px]">
                  {member.name}
                </h3>
                <p className="text-base lg:text-lg text-inverse opacity-80 leading-[1.4] max-w-[280px]">
                  {member.title}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Styled utilities for 3D card flipping */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
          -webkit-perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}

export default HeadHunters;
