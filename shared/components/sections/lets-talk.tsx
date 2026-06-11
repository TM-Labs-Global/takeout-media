'use client';

import React, { useRef, useState } from 'react';
import { ArrowCircleRight } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
    '/pictures/ripple/truck-mockup.png',
    '/pictures/ripple/free-wind-energy-mockup.png',
    '/pictures/ripple/city-billboard-mockup.png',
    '/pictures/ripple/ripple-brandbook.png',
    '/pictures/ripple/vertical-flag-mockups.png',
    '/pictures/ripple/ripple-container.png',
    '/pictures/ripple/office.png',
    '/pictures/ripple/po2.png',
    '/pictures/ripple/sign-on-corporate-building-mockup.png',
    '/pictures/ripple/free-banner-mockup2.png',
    '/pictures/ripple/truck-mockup.png',
    '/pictures/ripple/free-wind-energy-mockup.png',
    '/pictures/ripple/city-billboard-mockup.png',
    '/pictures/ripple/ripple-brandbook.png',
    '/pictures/ripple/vertical-flag-mockups.png',
    '/pictures/ripple/ripple-container.png',
    '/pictures/ripple/office.png',
    '/pictures/ripple/po2.png',
    '/pictures/ripple/sign-on-corporate-building-mockup.png',
    '/pictures/ripple/free-banner-mockup2.png',
];

// Grid layout — add/remove items freely. Heights adjust automatically.
const GRID_ITEMS = [
    { r: 1, c: 4, img: IMAGES[0] },
    { r: 1, c: 1, img: IMAGES[1] },
    { r: 2, c: 8, img: IMAGES[2] },
    { r: 2, c: 5, img: IMAGES[3] },
    { r: 3, c: 3, img: IMAGES[4] },
    { r: 4, c: 7, img: IMAGES[5] },
    { r: 5, c: 8, img: IMAGES[6] },
    { r: 6, c: 2, img: IMAGES[7] },
    { r: 7, c: 3, img: IMAGES[8] },
    { r: 8, c: 1, img: IMAGES[17] },
    { r: 9, c: 2, img: IMAGES[18] },
    { r: 10, c: 8, img: IMAGES[19] },
];

export function LetsTalk() {
    const containerRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [sectionHeight, setSectionHeight] = useState('200vh');

    useGSAP(() => {
        if (!containerRef.current || !gridRef.current || !windowRef.current) return;

        // Self-adjusting height: watches the grid and recalculates whenever content changes.
        const ro = new ResizeObserver(() => {
            if (gridRef.current) {
                const gridHeight = gridRef.current.scrollHeight;
                // Derived formula: sectionHeight = gridHeight + (thorHeight) * 1.5
                // This precisely matches the scroll range to Hera's total travel distance.
                setSectionHeight(`${gridHeight + (window.innerHeight - 80) * 1.5}px`);
                ScrollTrigger.refresh();
            }
        });
        ro.observe(document.body);

        const getThorHeight = () => window.innerHeight - 80;

        const getTravel = () => {
            if (!gridRef.current) return 0;
            return gridRef.current.scrollHeight;
        };

        const thorHeight = getThorHeight();
        const travel = getTravel();
        // entryDelay: pushes Hera down so images don't appear immediately on lock.
        // Adjust multiplier (0–1) to control how late images enter.
        const entryDelay = thorHeight * 0.5;

        // Park Hera at the bottom of Thor + entryDelay — hidden from frame 1
        gsap.set(gridRef.current, { y: thorHeight + entryDelay });

        // Main Scroll Tween — fires exactly when Thor locks to Zeus at 80px
        const scrollTween = gsap.fromTo(gridRef.current,
            { y: thorHeight + entryDelay },
            {
                y: thorHeight - travel,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80px',
                    end: 'bottom bottom',
                    scrub: true,
                    onUpdate: () => {
                        const thorTop = 80;
                        if (!gridRef.current || !containerRef.current) return;

                        // Use gridRect + natural offsets to avoid feedback from scale transforms
                        const gridRect = gridRef.current.getBoundingClientRect();
                        const images = containerRef.current.querySelectorAll('.grid-image');

                        images.forEach((img) => {
                            const htmlImg = img as HTMLElement;
                            const wrapper = htmlImg.parentElement as HTMLElement;
                            if (!wrapper) return;

                            // offsetTop/offsetHeight ignore transforms — no feedback loop on upward scroll
                            const trueTop = gridRect.top + wrapper.offsetTop;
                            const distFromTop = trueTop - thorTop;
                            const trueHeight = htmlImg.offsetHeight;

                            if (distFromTop < 0) {
                                const progress = Math.max(0, Math.min(1, Math.abs(distFromTop) / trueHeight));
                                gsap.set(htmlImg, { scale: 1 - progress });
                            } else {
                                gsap.set(htmlImg, { scale: 1 });
                            }
                        });
                    },
                },
            }
        );

        // Set random transform-origins (Codrops Demo 1 style)
        const images = containerRef.current.querySelectorAll('.grid-image');
        images.forEach((img) => {
            gsap.set(img, {
                transformOrigin: `${Math.random() > 0.5 ? 0 : 100}% 100%`,
            });
        });

        return () => {
            ro.disconnect();
            scrollTween.kill();
        };

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: sectionHeight }}>
            {/* Thor — The Sticky Frame */}
            <div
                ref={windowRef}
                className="sticky top-[80px] w-full h-[calc(100vh-80px)] overflow-hidden"
                style={{ background: 'linear-gradient(90deg, var(--color-tertiary-500) 0%, var(--color-primary-500) 100%)' }}
            >
                {/* CTA Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 gap-[var(--spacing-10)]">
                    <p className="text-inverse text-center text-xl leading-tight max-w-[280px] font-regular">
                        Go from one in a million, to the only one.
                    </p>
                    <a
                        href="mailto:info@takeoutmedia.xyz"
                        className="flex items-center gap-[var(--spacing-4)] md:gap-[var(--spacing-6)] pointer-events-auto"
                    >
                        <h2 className="display-desktop text-inverse text-center max-sm:!text-[var(--text-5xl)] max-sm:!leading-none sm:max-md:!text-[var(--text-8xl)] md:max-lg:!text-[var(--text-display2)] italic font-semibold lowercase first-letter:capitalize">
                            Let&apos;s Talk
                        </h2>
                        <ArrowCircleRight
                            size="100%"
                            weight="fill"
                            className="text-inverse w-[var(--spacing-8)] h-[var(--spacing-8)] md:w-[var(--spacing-10)] md:h-[var(--spacing-10)] flex-shrink-0"
                        />
                    </a>
                </div>

                {/* Hera — The Image Grid */}
                <div ref={gridRef} className="absolute top-0 left-0 w-full grid grid-cols-8 will-change-transform">
                    {GRID_ITEMS.map((item, index) => (
                        <div
                            key={index}
                            className="relative"
                            style={{ gridRow: item.r, gridColumn: item.c }}
                        >
                            <div
                                className="grid-image w-full h-auto aspect-square bg-cover bg-center"
                                style={{ backgroundImage: `url(${item.img})` }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LetsTalk;
