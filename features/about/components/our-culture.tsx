"use client";

import { useRef } from 'react';
import { Lightning, Palette, ArrowFatLinesUp, Star } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { AnimatedServiceCard, SplitText, FadeIn } from '@/shared/components/ui';

gsap.registerPlugin(ScrollTrigger);

const CULTURE_CARDS = [
  {
    title: "Ruthless",
    description: "We don't play nice with competition or problems. We go straight for the win, every time, any day.",
    icon: Lightning,
  },
  {
    title: "Creative",
    description: "Our ideas don't just stand out; they set the standard everyone else scrambles to copy.",
    icon: Palette,
  },
  {
    title: "Dominant",
    description: "We don't aim for market share; we aim for market domination.",
    icon: ArrowFatLinesUp,
  },
  {
    title: "Annoyingly Good",
    description: "We're so good it's irritating, because we make the hard stuff look effortless.",
    icon: Star,
  }
];

export function OurCulture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    let headSplit: SplitType | null = null;

    // Heading Animation
    if (headingRef.current) {
      headSplit = new SplitType(headingRef.current, {
        types: 'chars',
        tagName: 'span'
      });
      const headChars = headingRef.current.querySelectorAll('.char');
      gsap.set(headingRef.current, { opacity: 1 });

      gsap.from(headChars, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        duration: 0.3,
        ease: 'power1.out',
        stagger: { amount: 0.8 },
        delay: 0.2,
        onComplete: () => {
          headSplit?.revert();
        }
      });
    }

    return () => {
      if (headSplit) {
        headSplit.revert();
      }
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[var(--color-primary-25)] w-full py-[var(--spacing-15)] lg:py-[var(--spacing-25)] relative">
      <div className="w-full px-[var(--spacing-5)] md:px-[var(--spacing-30)]">
        <div className="mb-[var(--spacing-12)] lg:mb-[var(--spacing-15)] text-center lg:text-left">
          <h2 
            ref={headingRef}
            className="h2-desktop text-heading m-0 !normal-case opacity-0"
          >
            Our <span className="text-[var(--color-primary-500)]">Culture</span>
          </h2>
          <SplitText
            variant="fade"
            type="words"
            delay={0.8}
            threshold={1}
            className="p3-main-body-text text-dark-body mt-[var(--spacing-4)] m-0"
          >
            At Takeout media we are:
          </SplitText>
        </div>

        <FadeIn 
          direction="up" 
          distance={100} 
          stagger={0.5} 
          duration={1.8}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[var(--spacing-6)] w-full items-stretch"
          gsap={{ ease: 'expo.out', delay: 0.4 }}
        >
          {CULTURE_CARDS.map((card, idx) => (
            <div key={idx}>
              <AnimatedServiceCard 
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

export default OurCulture;
