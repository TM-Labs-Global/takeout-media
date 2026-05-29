"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/shared/utils';

type HoverVariant = 'fill' | 'lift' | 'glow';

interface HoverRevealProps {
    children: React.ReactNode;
    className?: string;
    variant?: HoverVariant;
    duration?: number;
    ease?: string;
    gsap?: {
        enter?: gsap.TweenVars;
        leave?: gsap.TweenVars;
    };
}

export const HoverReveal = ({
    children,
    className,
    variant = 'lift',
    duration = 0.3,
    ease = 'power2.out',
    gsap: gsapOverrides
}: HoverRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });

    const onEnter = contextSafe(() => {
        if (!containerRef.current) return;

        if (variant === 'fill') {
            const bg = containerRef.current.querySelector('.hover-bg');
            const text = containerRef.current.querySelectorAll('.hover-text');
            
            if (bg) gsap.to(bg, { autoAlpha: 1, duration, ease, ...gsapOverrides?.enter });
            gsap.to(containerRef.current, { borderColor: 'transparent', duration });
            if (text.length > 0) {
                gsap.to(text, { color: 'var(--color-inverse, #ffffff)', duration, ease });
            }
        } else if (variant === 'lift') {
            gsap.to(containerRef.current, {
                y: -5,
                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
                duration,
                ease,
                ...gsapOverrides?.enter
            });
        } else if (variant === 'glow') {
            gsap.to(containerRef.current, {
                borderColor: 'var(--color-primary-500)',
                boxShadow: '0 0 20px rgba(var(--color-primary-rgb), 0.3)',
                duration,
                ease,
                ...gsapOverrides?.enter
            });
        }
    });

    const onLeave = contextSafe(() => {
        if (!containerRef.current) return;

        if (variant === 'fill') {
            const bg = containerRef.current.querySelector('.hover-bg');
            const text = containerRef.current.querySelectorAll('.hover-text');
            
            if (bg) gsap.to(bg, { autoAlpha: 0, duration, ease: 'power2.in', ...gsapOverrides?.leave });
            gsap.to(containerRef.current, { borderColor: 'var(--color-stroke)', clearProps: "borderColor", duration });
            if (text.length > 0) {
                gsap.to(text, { clearProps: "color", duration });
            }
        } else if (variant === 'lift' || variant === 'glow') {
            gsap.to(containerRef.current, {
                y: 0,
                x: 0,
                boxShadow: 'none',
                borderColor: 'var(--color-stroke)',
                clearProps: "all",
                duration,
                ease: 'power2.in',
                ...gsapOverrides?.leave
            });
        }
    });

    return (
        <div
            ref={containerRef}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className={cn(
                "relative overflow-hidden transition-colors duration-300",
                variant === 'fill' && "border border-stroke rounded-[var(--radius-2xl)]",
                className
            )}
        >
            {children}
        </div>
    );
};

export default HoverReveal;
