"use client";

import { Database, PenNib, Strategy } from '@phosphor-icons/react';
import { AnimatedServiceCard, SplitText, FadeIn } from '@/shared/components/ui';

export function OurProcess() {
    return (
        <section 
            className="flex flex-col gap-[var(--spacing-15)] lg:gap-[var(--spacing-25)] w-full bg-[var(--color-primary-25)] px-[var(--spacing-5)] py-[var(--spacing-15)] lg:px-[var(--spacing-30)] lg:py-[var(--spacing-25)] overflow-hidden"
        >

            {/* ── Header ── */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[var(--spacing-8)] w-full">
                <div className="flex flex-col gap-[var(--spacing-8)] lg:gap-[var(--spacing-10)] flex-1 max-w-[var(--container-md)]">
                    <div className="flex flex-col gap-[var(--spacing-8)]">
                        {/* THE CINEMATIC HEADING - Now using reusable component */}
                        <SplitText 
                            as="h2"
                            variant="slide-up"
                            className="h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] text-heading max-w-[320px] lg:max-w-[600px]"
                        >
                            Our Only Goal Is To See You <span className="text-[color:var(--color-primary-500)]">Win</span>
                        </SplitText>
                        
                        <p className="p3-main-body-text !text-[length:var(--text-base)] md:!text-[length:var(--text-xl)] text-dark-body">
                            <strong className="font-bold">Data. Design. Strategy:</strong> The master keys for intergalactic domination
                        </p>
                    </div>
                </div>

                {/* Dive Deeper button */}
                <a
                    href="#"
                    className="btn btn-secondary w-fit"
                >
                    <span className="btn-label-wrapper">
                        <span className="btn-label-text">Dive Deeper</span>
                    </span>
                </a>
            </div>

            {/* ── Service Cards ── */}
            {/* Using FadeIn with stagger for the cards */}
            <FadeIn 
                direction="up" 
                distance={100} 
                stagger={0.5} 
                duration={1.8}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-5)] w-full items-stretch"
                gsap={{ ease: 'expo.out', delay: 0.4 }} // Delay to start after heading
            >
                <div>
                    <AnimatedServiceCard 
                        icon={Database}
                        title="data"
                        description="We never guess. We study the past, analyse the present, and use insights to predict what comes next. Data helps us understand exactly where your customers are and how to reach them effectively."
                    />
                </div>
                
                <div>
                    <AnimatedServiceCard 
                        icon={PenNib}
                        title="Design"
                        description="Good design does more than look nice, it drives action. We create visuals that stand out, copies that connects, and experiences that make your brand memorable."
                    />
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                    <AnimatedServiceCard 
                        icon={Strategy}
                        title="Strategy"
                        description="Success is never accidental. We plan every move with precision, build strategies that give you an edge, and position your brand to outperform the competition."
                        className="h-full"
                    />
                </div>
            </FadeIn>
        </section>
    );
}

export default OurProcess;
