"use client";

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { SplitText } from '@/shared/components/ui';

/**
 * AboutUsHero Component
 * 
 * High-fidelity hero section for the About Us page.
 */
export function AboutUsHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    
    const images = [
        "/pictures/delight-finance/apple-watch.png",
        "/pictures/delight-finance/delight-poster2.png",
        "/pictures/delight-finance/phone-mockup.png",
        "/pictures/old-website/mr-elijah.jpg",
        "/pictures/old-website/staff-working.jpg",
        "/pictures/ripple/free-wind-energy-mockup.png",
        "/pictures/ripple/po2.png",
        "/pictures/ripple/sign-on-corporate-building-mockup.png",
        "/pictures/tokunbo/tokunbo-key-art-01.png",
        "/pictures/total/women-day.jpg"
    ];

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

        // Marquee Animation
        if (marqueeRef.current) {
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                duration: 60,
                ease: "none",
                repeat: -1,
            });
        }

        return () => {
            if (headSplit) {
                headSplit.revert();
            }
        };
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full lg:min-h-screen bg-[var(--color-primary-25)] pt-[var(--spacing-15)] pb-[var(--spacing-15)] lg:pt-[var(--spacing-45)] lg:pb-[var(--spacing-25)] overflow-hidden">
            <div className="w-full px-[var(--spacing-5)] md:px-[var(--spacing-8)] lg:px-[var(--spacing-30)] flex flex-col lg:flex-row justify-between items-start gap-[var(--spacing-12)] lg:gap-[var(--spacing-37)]">
                
                {/* Title */}
                <h1 
                    ref={headingRef}
                    className="h1-desktop text-[length:var(--text-8xl)] leading-[length:var(--leading-ultra-loose)] md:text-[length:var(--text-7xl)] md:leading-[length:var(--leading-giant)] m-0 shrink-0 text-heading opacity-0 !normal-case"
                >
                    Our <span className="text-[var(--color-primary-500)]">History</span>
                </h1>
                
                {/* Description */}
                <div className="w-full max-w-[590px] flex flex-col gap-[var(--spacing-6)] text-dark-body text-lg md:text-xl leading-[1.6] lg:pt-[var(--spacing-3)]">
                    <SplitText
                        variant="fade"
                        type="words"
                        delay={0.8}
                        threshold={1}
                        className="m-0 text-dark-body"
                    >
                        It was 2015, three young men, fresh out of university, had the ingenious idea to change how brands connect with people. After much thinking and planning, they decided to build a communications and advertising company designed to make businesses stand out and dominate their markets.
                    </SplitText>
                    <SplitText
                        variant="fade"
                        type="words"
                        delay={1.0}
                        threshold={1}
                        className="m-0 text-dark-body"
                    >
                        Over a decade later, the company has served hundreds of clients, launched thousands of campaigns, and is redefining how consumers interact with and perceive global brands.
                    </SplitText>
                </div>
            </div>
            
            {/* Continuous Marquee Image Gallery */}
            <div className="mt-[var(--spacing-37)] lg:mt-[var(--spacing-50)] w-full overflow-hidden">
                <div className="flex w-full overflow-hidden whitespace-nowrap">
                    <div ref={marqueeRef} className="flex flex-nowrap w-max cursor-pointer">
                        {/* First Block */}
                        <div className="flex gap-[var(--spacing-5)] items-center shrink-0 pr-[var(--spacing-5)]">
                            {images.map((src, idx) => (
                                <div key={`img-1-${idx}`} className="shrink-0 w-[280px] md:w-[387px] h-[320px] md:h-[450px] rounded-[12px] overflow-hidden bg-[var(--color-primary-200)] relative">
                                    <Image 
                                        src={src} 
                                        alt={`About snapshot ${idx + 1}`} 
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 280px, 387px"
                                    />
                                </div>
                            ))}
                        </div>
                        {/* Second Block (Duplicate for seamless loop) */}
                        <div className="flex gap-[var(--spacing-5)] items-center shrink-0 pr-[var(--spacing-5)]" aria-hidden="true">
                            {images.map((src, idx) => (
                                <div key={`img-2-${idx}`} className="shrink-0 w-[280px] md:w-[387px] h-[320px] md:h-[450px] rounded-[12px] overflow-hidden bg-[var(--color-primary-200)] relative">
                                    <Image 
                                        src={src} 
                                        alt={`About snapshot ${idx + 1}`} 
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 280px, 387px"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUsHero;
