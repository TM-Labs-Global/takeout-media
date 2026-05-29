"use client";

import { Hero, CaseStudySlide } from "../components";

/**
 * WorksPage Component
 * 
 * Assembler for the 'Our Works' feature. Following project FSA standards,
 * this page will hold the Hero, Filterable Gallery, and CTA sections.
 */
export function WorksPage() {
    return (
        <main className="flex flex-col w-full min-h-screen bg-[var(--background)] font-sans">
            <Hero />
            <CaseStudySlide />
        </main>
    );
}
