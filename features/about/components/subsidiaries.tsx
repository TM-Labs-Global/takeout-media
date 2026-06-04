"use client";

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { AnimatedServiceCard, FadeIn, SplitText } from '@/shared/components/ui';

gsap.registerPlugin(ScrollTrigger);

// Custom Logo Components to replace generic icons
const TMLabsLogo = () => (
  <div className="relative w-20 h-20">
    {/* Colored Logo */}
    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
      <Image
        src="/pictures/sbu-logos/colored/tm-labs-outline.svg"
        alt="TM Labs"
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
    {/* White Logo */}
    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
      <Image
        src="/pictures/sbu-logos/tm-labs-logo-white.svg"
        alt="TM Labs White"
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
  </div>
);

const DesignTeemLogo = () => (
  <div className="relative w-20 h-20">
    {/* Colored Logo */}
    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
      <Image
        src="/pictures/sbu-logos/colored/design-teem.svg"
        alt="Design Teem"
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
    {/* White Logo */}
    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
      <Image
        src="/pictures/sbu-logos/design-teem.svg"
        alt="Design Teem White"
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
  </div>
);

const IngeneStudiosLogo = () => (
  <div className="relative w-20 h-20">
    {/* Colored Logo */}
    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
      <Image
        src="/pictures/sbu-logos/colored/ingene-studios.svg"
        alt="Ingene Studios"
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
    {/* White Logo */}
    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
      <Image
        src="/pictures/sbu-logos/ingene.svg"
        alt="Ingene Studios White"
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
  </div>
);

const TMFoundationLogo = () => (
  <div className="relative w-20 h-20">
    {/* Colored Logo */}
    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
      <Image
        src="/pictures/sbu-logos/tm-foundation-logo.png"
        alt="TM Foundation"
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
    {/* White Logo (Inverted to White on Hover) */}
    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
      <Image
        src="/pictures/sbu-logos/tm-foundation-logo-white.png"
        alt="TM Foundation White"
        width={80}
        height={80}
        className="object-contain"
      />
    </div>
  </div>
);

const SUBSIDIARY_CARDS = [
  {
    title: "Design Teem",
    description: "We turn ideas into visuals, experiences, and stories that refuse to be ignored.",
    icon: DesignTeemLogo,
  },
  {
    title: "Ingene Studios",
    description: "Where creativity meets craft, producing films, photography, and multimedia that cross every border.",
    icon: IngeneStudiosLogo,
  },
  {
    title: "TM Labs",
    description: "We harness AI, blockchain, and emerging tech to build digital solutions the future will thank us for.",
    icon: TMLabsLogo,
  },
  {
    title: "TM Foundation",
    description: "Driving social impact by empowering communities and shaping Africa’s tomorrow.",
    icon: TMFoundationLogo,
  }
];

export function Subsidiaries() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    let headSplit: SplitType | null = null;

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
    <section ref={containerRef} className="bg-[var(--color-primary-25)] w-full py-[100px] relative">
      <div className="w-full px-[var(--spacing-5)] md:px-[var(--spacing-30)]">
        <div className="mb-[var(--spacing-12)] lg:mb-[var(--spacing-15)] text-center lg:text-left">
          <h2 
            ref={headingRef}
            className="h2-desktop text-heading m-0 !normal-case opacity-0"
          >
            One Of <span className="text-[var(--color-primary-500)]">Many</span>
          </h2>
          <SplitText
            variant="fade"
            type="words"
            delay={0.8}
            threshold={1}
            className="p3-main-body-text text-dark-body mt-[var(--spacing-4)] m-0 max-w-[560px] mx-auto lg:mx-0"
          >
            Takeout Media is just one force in the TM Global network, each company a powerhouse built to dominate its space.
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
          {SUBSIDIARY_CARDS.map((card, idx) => (
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

export default Subsidiaries;
