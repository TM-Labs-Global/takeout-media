'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "SURWASH",
    description: "Empowering a WASH Revolution with SURWASH: A Data-driven Social & Behavioral Change Communication Campaign.",
    src: "/pictures/surwash/surwash-softcover.png",
    href: "/our-works"
  },
  {
    title: "NIS",
    description: "Reshaping the Narrative — Nigerian Immigration Service.",
    src: "/pictures/nis/stage2.jpg",
    href: "/our-works"
  },
  {
    title: "DELIGHT FINANCE",
    description: "Building the Future of Real Estate with Delight Finance.",
    src: "/pictures/delight-finance/phone-mockup.png",
    href: "/our-works"
  },
  {
    title: "RIPPLE",
    description: "Brand Launch — Making Waves.",
    src: "/pictures/ripple/city-billboard-mockup.png",
    href: "/our-works"
  },
  {
    title: "TOTAL ENERGIES",
    description: "Energizing a Global Brand: TotalEnergies' Journey to Sustainability.",
    src: "/pictures/total/te-vals-day-poster-01.png",
    href: "/our-works"
  },
  {
    title: "TOKUNBO",
    description: "Everything is on the line. The journey continues.",
    src: "/pictures/tokunbo/artboard1-large.jpeg",
    href: "/our-works"
  }
];

export const OurProjects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check matchMedia on client side
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handler);
    
    // Small delay so images start loading and layout is stable
    const timer = setTimeout(() => setIsReady(true), 100);

    return () => {
      mediaQuery.removeEventListener("change", handler);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isReady || !isDesktop || !sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const section = sectionRef.current;

    // Calculate how far to scroll horizontally
    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      return () => tween.kill();
    });

    return () => ctx.revert();
  }, [isReady, isDesktop]);

  return (
    <div className="w-full block">
      <section
        ref={sectionRef}
        className="relative w-full bg-[var(--color-secondary-500)] overflow-hidden"
      >
        {/* Scroll track (horizontal on desktop, vertical on mobile) */}
        <div
          ref={trackRef}
          className="flex flex-col md:flex-row md:items-stretch h-auto md:h-screen w-full md:w-max will-change-transform px-[var(--spacing-5)] py-[var(--spacing-15)] md:px-0 md:py-0 gap-[var(--spacing-12)] md:gap-0"
        >
          {/* Intro Block */}
          <div className="flex-shrink-0 w-full md:w-[55vw] lg:w-[45vw] h-auto md:h-full flex flex-col justify-start md:justify-end pb-0 md:pb-[10vh] pl-0 md:pl-[var(--spacing-25)] lg:pl-[var(--spacing-30)] pr-0 md:pr-[4vw]">
            <h2 className="h1-desktop !text-[2.65rem] !leading-[1.15] md:!text-[length:var(--text-7xl)] md:!leading-[length:var(--leading-giant)] text-inverse mb-6 max-w-[500px]">
              Of Course, We Aren&apos;t All Talk
            </h2>
            <p className="p3-main-body-text text-inverse max-w-md mb-8 opacity-80">
              See the results behind our reputation.
            </p>
            <a href="/our-works" className="btn btn-outline-white w-fit">
              View More
            </a>
          </div>

          {/* Project Cards */}
          {PROJECTS.map((project, i) => (
            <a
              key={i}
              href={project.href}
              className="project-card group flex-shrink-0 w-full md:w-[40vw] lg:w-[34vw] mr-0 md:mr-[2vw] flex flex-col justify-start md:justify-end pb-0 md:pb-[10vh] cursor-pointer"
            >
              {/* Image container */}
              <div className="relative w-full h-[300px] sm:h-[400px] md:h-[55vh] overflow-hidden rounded-2xl md:rounded-sm mb-6 md:mb-8 bg-zinc-900/20">
                <img
                  src={project.src}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
                {/* Subtle gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text */}
              <div className="project-card-text will-change-transform">
                <p className="text-[var(--color-brand)] text-xs tracking-[0.2em] uppercase font-medium mb-3">
                  Project {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="text-inverse italic text-2xl md:text-4xl font-serif mb-3 md:mb-4 group-hover:text-[var(--color-brand)] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="p3-main-body-text text-inverse max-w-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {project.description}
                </p>
              </div>
            </a>
          ))}

          {/* Trailing spacer so last card isn't flush to edge */}
          <div className="hidden md:block flex-shrink-0 w-[5vw]" aria-hidden="true" />
        </div>
      </section>
    </div>
  );
};

export default OurProjects;
