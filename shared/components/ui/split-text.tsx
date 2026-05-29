"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { cn } from '../../utils';

gsap.registerPlugin(ScrollTrigger);

type AnimationVariant = 'slide-up' | 'fade' | 'blur';

interface SplitTextProps {
    children: React.ReactNode;
    className?: string;
    variant?: AnimationVariant;
    stagger?: number;
    duration?: number;
    delay?: number;
    threshold?: number;
    gsap?: gsap.TweenVars; // Global GSAP overrides
    type?: 'words' | 'chars' | 'lines';
    as?: React.ElementType;
}

export const SplitText = ({
    children,
    className,
    variant = 'slide-up',
    stagger = 0.02,
    duration = 0.8,
    delay = 0,
    threshold = 0.8,
    gsap: gsapOverrides,
    type = 'chars',
    as: Component = 'div'
}: SplitTextProps) => {
    const textRef = useRef<any>(null);

    useGSAP(() => {
        if (!textRef.current) return;

        // 1. Safe Splitting
        const splitType = type === 'chars' ? 'words, chars' : type;
        const split: any = new SplitType(textRef.current, { types: splitType as any } as any);
        
        const targets = type === 'chars' ? split.chars : (type === 'words' ? split.words : split.lines);

        if (!targets) return;

        // 2. Setup based on variant
        let fromVars: gsap.TweenVars = { opacity: 0 };
        let toVars: gsap.TweenVars = {
            opacity: 1,
            duration,
            stagger,
            ease: 'power3.out',
            delay,
            scrollTrigger: {
                trigger: textRef.current,
                start: `top ${threshold * 100}%`,
                toggleActions: 'restart none none reset'
            }
        };

        // Variant logic
        if (variant === 'slide-up') {
            // Apply overflow hidden to words to make letters slide up inside them
            split.words?.forEach((word: any) => {
                word.style.overflow = 'hidden';
                word.style.verticalAlign = 'top';
                word.style.paddingRight = '0.05em'; // Prevent italic clipping
            });
            fromVars = { ...fromVars, yPercent: 100 };
            toVars = { ...toVars, yPercent: 0 };
        } else if (variant === 'blur') {
            fromVars = { ...fromVars, filter: 'blur(10px)', scale: 0.9 };
            toVars = { ...toVars, filter: 'blur(0px)', scale: 1 };
        }

        // 3. Apply Overrides
        const finalToVars = { ...toVars, ...gsapOverrides };

        // 4. Animate
        gsap.fromTo(targets, fromVars, finalToVars);

        return () => {
            split.revert();
        };
    }, { scope: textRef, dependencies: [variant, children] });

    const Tag = Component as any;

    return (
        <Tag 
            ref={textRef} 
            className={cn("!normal-case", className)}
        >
            {children}
        </Tag>
    );
};

export default SplitText;
