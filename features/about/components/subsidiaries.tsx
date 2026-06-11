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
  <div className="relative w-full h-12 md:h-14 lg:h-16">
    {/* Colored Logo */}
    <div className="absolute inset-0 flex items-center justify-start lg:justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
      <Image
        src="/pictures/sbu-logos/colored/tm-foundation.png"
        alt="TM Foundation"
        width={200}
        height={64}
        className="object-contain h-full w-auto"
      />
    </div>
    {/* White Logo */}
    <div className="absolute inset-0 flex items-center justify-start lg:justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
      <Image
        src="/pictures/sbu-logos/white/tm-foundation-white.png"
        alt="TM Foundation White"
        width={200}
        height={64}
        className="object-contain h-full w-auto"
      />
    </div>
  </div>
);


const SUBSIDIARY_CARDS = [
  {
    title: "Design Teem",
    description: "We turn ideas into visuals, experiences, and stories that refuse to be ignored.",
    icon: DesignTeemLogo,
    href: "https://designteem.xyz/"
  },
  {
    title: "Ingene Studios",
    description: "Where creativity meets craft, producing films, photography, and multimedia that cross every border.",
    icon: IngeneStudiosLogo,
    href: "https://www.ingenestudios.xyz/"
  },
  {
    title: "TM Labs",
    description: "We harness AI, blockchain, and emerging tech to build digital solutions the future will thank us for.",
    icon: TMLabsLogo,
    href: "https://www.tmlabs.xyz/"
  },
  {
    title: "TM Foundation",
    description: "Driving social impact by empowering communities and shaping Africa’s tomorrow.",
    icon: TMFoundationLogo,
    href: "https://techmedia.foundation/"
  }
];

export function Subsidiaries() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="bg-[var(--color-primary-25)] w-full py-[var(--spacing-15)] lg:py-[var(--spacing-25)] relative">
      <div className="w-full px-[var(--spacing-5)] md:px-[var(--spacing-30)]">
        <div className="mb-[var(--spacing-12)] lg:mb-[var(--spacing-15)] text-left">
          <SplitText
            as="h2"
            variant="slide-up"
            className="h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] text-heading max-w-[320px] lg:max-w-[600px]"
          >
            One Of <span className="text-[var(--color-primary-500)]">Many</span>
          </SplitText>
          <SplitText
            variant="fade"
            type="words"
            delay={0.8}
            threshold={1}
            className="p3-main-body-text text-dark-body max-md:!text-[length:var(--text-base)] mt-[var(--spacing-4)] m-0 max-w-[560px]"
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
            <a 
              key={idx} 
              href={card.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block h-full"
            >
              <AnimatedServiceCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </a>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

export default Subsidiaries;
