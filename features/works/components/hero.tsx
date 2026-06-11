"use client";

import { useRef } from 'react';
import { ArrowCircleDown } from '@phosphor-icons/react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { PlanetarySlice, SplitText } from '@/shared/components/ui';

/**
 * Works Hero Component
 * 
 * Reused from the homepage to maintain visual consistency,
 * allowing for specific tweaks for the 'Our Works' narrative.
 */
const WORKS_HERO_IMAGES = [
	'/pictures/hero-images/01-tokubo.webp',
	'/pictures/hero-images/02-tokunbo.webp',
	'/pictures/hero-images/03-riple.webp',
	'/pictures/hero-images/04-riple-.webp',
	'/pictures/hero-images/05-surwash.webp',
	'/pictures/hero-images/06-totalenergies.webp',
	'/pictures/hero-images/07-ripple.webp',
	'/pictures/hero-images/08-surwash.webp',
	'/pictures/hero-images/09-nis.webp',
	'/pictures/hero-images/10-nis-entrance.webp',
	'/pictures/hero-images/11-nis-governor-entrance.webp',
];

export function Hero() {
	 const containerRef = useRef<HTMLDivElement>(null);
	 const headingRef = useRef<HTMLHeadingElement>(null);
	 const arrowRef = useRef<HTMLDivElement>(null);

	 useGSAP(() => {
		 // Gentle bobbing animation for the arrow
		 gsap.to(arrowRef.current, {
			 y: 12,
			 duration: 1.5,
			 repeat: -1,
			 yoyo: true,
			 ease: "sine.inOut"
		 });

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
				 opacity: 0,
				 duration: 0.3,
				 ease: 'power1.out',
				 stagger: { amount: 0.8 },
				 delay: 0.3,
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
		 <section ref={containerRef} className="relative w-full min-h-[100vh] bg-secondary-500 overflow-hidden">
			 {/* WebGL Planetary Slice Animation */}
			 <PlanetarySlice images={WORKS_HERO_IMAGES} />
			 {/* Gradient Overlay */}
			 <div className="absolute inset-0 gradient-overlay-dark" aria-hidden="true" />

			 {/* Content Container - Shifted to Bottom */}
			 <div className="relative z-10 w-full min-h-screen flex flex-col justify-end items-start md:items-center px-[var(--spacing-5)] pb-[var(--spacing-15)] md:pb-[var(--spacing-20)] text-left md:text-center">
				 <div className="flex flex-col items-start md:items-center gap-[var(--spacing-4)] max-w-[900px] w-full">
					 {/* Heading - Serif/Italic Style */}
					 <h1 
						 ref={headingRef}
						 className="font-serif italic !text-[length:var(--text-9xl)] !leading-[length:var(--leading-super-loose)] md:!text-[length:var(--text-7xl)] md:!leading-[length:var(--leading-giant)] text-inverse mb-0 opacity-0 !normal-case"
					 >
						 Our <span className="text-brand">Works</span>
					 </h1>

					 {/* Subtext Group */}
					 <div className="flex flex-col items-start md:items-center gap-[var(--spacing-6)]">
						 <SplitText
							 variant="fade"
							 type="words"
							 delay={0.8}
							 threshold={1}
							 className="p3-main-body-text text-inverse opacity-90 tracking-widest text-sm md:text-base m-0"
						 >
							 WE WALK THE TALK!
						 </SplitText>
						 
						 {/* Animated Arrow */}
						 <div ref={arrowRef} className="text-brand hidden md:block">
							 <ArrowCircleDown size={48} weight="light" />
						 </div>
					 </div>
				 </div>
			 </div>
		 </section>
	 );
}

export default Hero;
