import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { SplitText } from "@/shared/components/ui";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Developmental Communications",
        description: "For developmental organisations, we craft messages that do more than inform, they shift mindsets and move societies.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1080&auto=format&fit=crop"
    },
    {
        title: "Brand Strategy",
        description: "We don't guess your next move, we design it, so your brand becomes impossible to ignore.",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1080&auto=format&fit=crop"
    },
    {
        title: "Event Management",
        description: "From concept to curtain call, we build experiences that people talk about long after the lights go out.",
        image: "/pictures/nis/booth-passage2.jpg"
    },
    {
        title: "Media Planning, Buying & Placement",
        description: "We don't just buy space, we own attention, placing your brand where impact is guaranteed.",
        image: "/pictures/ripple/vertical-flag-mockups.png"
    },
    {
        title: "Digital Marketing",
        description: "Clicks and likes don't cut it; we turn digital noise into measurable growth and dominance.",
        image: "/pictures/services/digital-marketing.jpg"
    },
    {
        title: "Marketing Activations",
        description: "We put your brand in the streets, in their hands, and on their minds, where it matters most.",
        image: "/pictures/tokunbo/artboard1-large.jpeg"
    },
    {
        title: "Brand Consultancy",
        description: "When you're too close to see the cracks, we bring the clarity and solutions your brand needs to scale.",
        image: "/pictures/services/brand-consultancy.jpg"
    },
    {
        title: "Public/Media Relations",
        description: "We manage the story before it's told, shaping conversations so your brand always comes out on top.",
        image: "/pictures/services/media-relations.jpg"
    },
    {
        title: "Brand Communication",
        description: "We shape your voice into messages that cut through noise and keep your brand in charge.",
        image: "/pictures/surwash/pamphlet.png"
    }
];

export function WhatWeDo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(
        () => {
            if (window.innerWidth < 768) {
                // Ensure heading is visible on mobile where animations are disabled
                if (headingRef.current) {
                    gsap.set(headingRef.current, { opacity: 1 });
                }
                return;
            }

            // Center-align origin of swipe images
            gsap.set(".swipeimage", { yPercent: -50, xPercent: -50, autoAlpha: 0 });

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
                        start: "top 85%",
                        toggleActions: "play none none none"
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

            let firstEnter = true;

            const rows = gsap.utils.toArray<HTMLElement>(".service-row");

            rows.forEach((row) => {
                const image = row.querySelector(".swipeimage");
                if (!image) return;

                const setX = gsap.quickTo(image, "x", { duration: 0.4, ease: "power3" });
                const setY = gsap.quickTo(image, "y", { duration: 0.4, ease: "power3" });

                const align = (e: MouseEvent) => {
                    if (firstEnter) {
                        setX(e.clientX, e.clientX);
                        setY(e.clientY, e.clientY);
                        firstEnter = false;
                    } else {
                        setX(e.clientX);
                        setY(e.clientY);
                    }
                };

                const startFollow = () => document.addEventListener("mousemove", align);
                const stopFollow = () => document.removeEventListener("mousemove", align);

                const fade = gsap.to(image, {
                    autoAlpha: 1,
                    ease: "none",
                    paused: true,
                    duration: 0.1,
                    onReverseComplete: stopFollow,
                });

                row.addEventListener("mouseenter", (e) => {
                    firstEnter = true;
                    fade.play();
                    startFollow();
                    align(e as unknown as MouseEvent);
                });

                row.addEventListener("mouseleave", () => {
                    fade.reverse();
                });
            });

            return () => {
                if (headSplit) {
                    headSplit.revert();
                }
            };
        },
        { scope: containerRef }
    );

    return (
        <section id="what-we-do" className="w-full bg-[var(--color-primary-25)] py-[var(--spacing-10)] lg:py-[var(--spacing-25)]">
            <div ref={containerRef} className="w-full px-[var(--spacing-5)] md:px-[var(--spacing-25)] lg:px-[var(--spacing-30)]">

                {/* Header Row */}
                <div className="w-full lg:w-7/12 mb-[var(--spacing-20)] lg:mb-[var(--spacing-25)]">
                    <div className="flex flex-col gap-6 max-w-[540px]">
                        <h2 
                            ref={headingRef}
                            className="h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] text-heading opacity-0 !normal-case"
                        >
                            What We <span className="text-[var(--color-primary-500)]">Do</span>
                        </h2>
                        <SplitText
                            variant="fade"
                            type="words"
                            delay={0.8}
                            threshold={1}
                            className="font-sans text-dark-body max-md:!text-[length:var(--text-base)] md:!text-[length:var(--text-xl)] max-md:leading-[1.6] md:!leading-[length:var(--leading-normal)] m-0"
                        >
                            With our exceptionally expansive knowledge of diverse industries, we offer our sharks a host of services that ensure intergalactic domination.
                        </SplitText>
                    </div>
                </div>

                {/* Services List */}
                <div className="flex flex-col">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`service-row grid grid-cols-1 lg:grid-cols-12 gap-[var(--spacing-6)] lg:gap-0 py-[var(--spacing-10)] lg:py-[var(--spacing-12)] border-t border-[var(--border-default)] max-md:border-t-[var(--border-stroke)] ${index === services.length - 1 ? 'border-b max-md:border-b-[var(--border-stroke)]' : ''
                                } cursor-pointer relative`}
                        >
                            {/* Cursor floating image */}
                            <div className="swipeimage fixed top-0 left-0 w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] pointer-events-none z-20 opacity-0 invisible rounded-[20px] overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-w-768px) 300px, 350px"
                                />
                            </div>

                            <div className="lg:col-span-6">
                                <h3 className="font-display font-medium max-md:!text-[length:var(--text-2xl)] md:!text-[28px] max-md:!leading-[1] md:leading-[1.2] text-heading whitespace-pre-wrap">
                                    {service.title}
                                </h3>
                            </div>
                            <div className="lg:col-span-5 lg:col-start-8">
                                <p className="text-dark-body max-md:!text-[length:var(--text-base)] text-lg lg:!text-xl leading-[1.4] max-w-[440px] lg:ml-auto">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default WhatWeDo;
