"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '../../utils';

gsap.registerPlugin(ScrollTrigger);

type FadeDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    direction?: FadeDirection;
    distance?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
    threshold?: number;
    gsap?: gsap.TweenVars; // Global GSAP overrides
}

export const FadeIn = ({
    children,
    className,
    direction = 'up',
    distance = 20,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    threshold = 0.8,
    gsap: gsapOverrides
}: FadeInProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. Setup initial position
        let x = 0;
        let y = 0;

        if (direction === 'up') y = distance;
        else if (direction === 'down') y = -distance;
        else if (direction === 'left') x = distance;
        else if (direction === 'right') x = -distance;

        // 2. Build Vars
        const fromVars: gsap.TweenVars = {
            opacity: 0,
            x,
            y
        };

        const toVars: gsap.TweenVars = {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            delay,
            stagger: stagger > 0 ? stagger : undefined,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: `top ${threshold * 100}%`,
                toggleActions: 'restart none none reset'
            },
            ...gsapOverrides // Apply overrides
        };

        // 3. Animate children or the container itself
        const targets = containerRef.current.children.length > 0 
            ? Array.from(containerRef.current.children) 
            : containerRef.current;

        gsap.fromTo(targets, fromVars, toVars);

    }, { scope: containerRef, dependencies: [children, direction] });

    return (
        <div 
            ref={containerRef} 
            className={cn("w-full h-full", className)}
        >
            {children}
        </div>
    );
};

export default FadeIn;
