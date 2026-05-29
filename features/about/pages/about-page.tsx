"use client";

import React from 'react';
import { AboutUsHero, WhatWeDo, OurProjects, OurCulture, HeadHunters, Subsidiaries } from '../components';

/**
 * AboutPage Component
 * 
 * Assembles the sections for the About Us page.
 * Located in features/about/pages as per FSD architecture.
 */
export function AboutPage() {
    return (
        <main className="flex flex-col w-full">
            <AboutUsHero />
            <WhatWeDo />
            <OurProjects />
            <OurCulture />
            <HeadHunters />
            <Subsidiaries />
        </main>
    );
}

export default AboutPage;
