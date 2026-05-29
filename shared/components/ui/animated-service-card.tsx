"use client";

import React from 'react';
import { HoverReveal } from './hover-reveal';
import { cn } from '@/shared/utils';

export interface AnimatedServiceCardProps {
    icon: any;
    title: string;
    description: string;
    className?: string;
}

export const AnimatedServiceCard = React.forwardRef<HTMLDivElement, AnimatedServiceCardProps>(
    ({ icon: Icon, title, description, className = "" }, ref) => {
        return (
            <HoverReveal 
                variant="fill"
                className={cn(
                    "flex flex-col items-start p-[var(--spacing-8)] gap-[var(--spacing-15)] w-full h-full group",
                    className
                )}
            >
                {/* GSAP Animated Background - Targeted by .hover-bg */}
                <div 
                    className="hover-bg absolute inset-0 z-0 bg-gradient-to-b from-[color:var(--color-primary-500)] to-[color:var(--color-tertiary-500)] opacity-0 invisible pointer-events-none"
                />
                
                {/* Content Container - Targeted by .hover-text */}
                <div className="relative z-10 flex flex-col gap-[var(--spacing-15)] w-full self-stretch">
                    <div className="flex flex-col items-start gap-[var(--spacing-5)] self-stretch">
                        <Icon className="hover-text w-[var(--spacing-8)] h-[var(--spacing-8)] flex-shrink-0 text-heading transition-colors" />
                        <h3 className="hover-text h4-desktop text-heading transition-colors">{title}</h3>
                    </div>
                    <p className="hover-text p3-main-body-text text-dark-body self-stretch transition-colors">
                        {description}
                    </p>
                </div>
            </HoverReveal>
        );
    }
);

AnimatedServiceCard.displayName = "AnimatedServiceCard";
