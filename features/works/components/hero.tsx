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
export function Hero() {
	 const containerRef = useRef<HTMLDivElement>(null);
	 const headingRef = useRef<HTMLHeadingElement>(null);
	 const arrowRef = useRef<HTMLDivElement>(null);

	 const images = [
		'/pictures/nis/stage.jpg',
		'/pictures/surwash/pamphlet.png',
		'/pictures/delight-finance/billboard.png',
		'/pictures/nis/booth-passage.jpg',
		'/pictures/ripple/city-billboard-mockup.png',
		'/pictures/ripple/free-banner-mockup2.png',
		'/pictures/ripple/po2.png',
		'/pictures/tokunbo/artboard1-large.jpeg',
		'/pictures/tokunbo/group-1.png',
		'/pictures/tokunbo/vertical-billboard.png',
		'/pictures/total/te-vals-day-poster-01.png',
	 ];

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
			 <PlanetarySlice images={images} />
			 {/* Gradient Overlay */}
			 <div className="absolute inset-0 gradient-overlay-dark" aria-hidden="true" />

			 {/* Content Container - Shifted to Bottom */}
			 <div className="relative z-10 w-full min-h-screen flex flex-col justify-end items-center px-[var(--spacing-5)] pb-[var(--spacing-15)] md:pb-[var(--spacing-20)] text-center">
				 <div className="flex flex-col items-center gap-[var(--spacing-4)] max-w-[900px]">
					 {/* Heading - Serif/Italic Style */}
					 <h1 
						 ref={headingRef}
						 className="font-serif italic text-[length:var(--text-8xl)] leading-[length:var(--leading-ultra-loose)] md:text-[length:var(--text-7xl)] md:leading-[length:var(--leading-giant)] text-inverse mb-0 opacity-0 !normal-case"
					 >
						 Our <span className="text-brand">Works</span>
					 </h1>

					 {/* Subtext Group */}
					 <div className="flex flex-col items-center gap-[var(--spacing-6)]">
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
						 <div ref={arrowRef} className="text-brand">
							 <ArrowCircleDown size={48} weight="light" />
						 </div>
					 </div>
				 </div>
			 </div>
		 </section>
	 );
}

export default Hero;
