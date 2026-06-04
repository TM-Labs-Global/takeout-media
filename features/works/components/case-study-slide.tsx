'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/shared/components/ui/button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type ContentBlock = 
  | string
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

interface ProjectData {
  id: number;
  client: string;
  subtitle: string;
  description: ContentBlock | ContentBlock[];
  image: string;
  challenge: ContentBlock | ContentBlock[];
  santi?: ContentBlock | ContentBlock[];
  solution: ContentBlock | ContentBlock[];
  cookWithMe?: ContentBlock | ContentBlock[];
  results: ContentBlock | ContentBlock[];
  linkUrl?: string;
}

const slides: ProjectData[] = [
  { 
    id: 1, 
    client: 'DANGOTE GROUP', 
    subtitle: 'Dangote Classic Seasoning: Breaking into a new market',
    description: 'Dangote Classic Seasoning was hungry to feast on the Northern palette, but this was uncharted territory. The challenge? To connect with a vibrant, adventurous audience.',
    image: '/pictures/tokunbo/vertical-billboard.png',
    challenge: 'To connect with a vibrant, adventurous audience known for its discerning taste and create a recipe for market domination in the Northern region.',
    santi: 'This campaign tapped into the emotional pleasure of communal dining, evoking nostalgia for traditional meals and family kitchens.',
    solution: 'We developed a comprehensive market entry strategy that leveraged local influencers and cultural nuances to make Dangote Classic a household name.',
    cookWithMe: 'We engaged beloved influencers to cook live, connecting with the audience through shared culinary experiences.',
    results: [
      'Engaged over 280,000 members of the target audience.',
      'Over 1M cumulative impressions.'
    ],
    linkUrl: '/case-studies/dangote'
  },
  { 
    id: 2, 
    client: 'DELIGHT FINANCE', 
    subtitle: 'Digitizing Personal Wealth for a New Generation',
    description: [
      'Delight Finance needed to transcend traditional banking aesthetics to capture the attention of digital nomads and young professionals.',
      {
        type: 'paragraph',
        text: 'By focusing on simplicity, security, and wealth generation, we set out to build a platform that speaks directly to the aspirations of the modern investor.'
      }
    ],
    image: '/pictures/delight-finance/billboard.png',
    challenge: [
      'Translating complex financial security concepts into a clean, approachable digital-first brand identity.',
      {
        type: 'list',
        items: [
          'Addressing trust barriers in digital banking.',
          'Simplifying complex regulatory jargon.',
          'Appealing to a younger, mobile-first demographic.'
        ]
      }
    ],
    solution: 'A vibrant, high-contrast visual language combined with a streamlined user experience that prioritizes clarity and trust.',
    results: [
      '45% increase in app downloads within month one.',
      'Reached top 10 finance apps in regional charts.'
    ],
    linkUrl: '/case-studies/delight-finance'
  },
  { 
    id: 3, 
    client: 'RIPPLE', 
    subtitle: 'Powering Sustainable Futures with Disruptive Design',
    description: 'Ripple Energy wanted to move renewable energy from a technical commodity to a lifestyle choice for conscious consumers.',
    image: '/pictures/ripple/city-billboard-mockup.png',
    challenge: 'Making sustainable energy visible and desirable in a market dominated by traditional utilities.',
    santi: 'The "Ripple Effect"—showing how individual choices in energy consumption create waves of positive global change.',
    solution: 'A bold, high-impact billboard campaign that used architectural scale to announce the arrival of clean energy.',
    cookWithMe: 'Launched a "Green Energy Live" series featuring pioneers in the sustainability space.',
    results: [
      'Brand awareness increased by 300% in key urban centers.',
      'Successfully secured 15,000 new household sign-ups.'
    ],
    linkUrl: '/case-studies/ripple-energy'
  },
  { 
    id: 4, 
    client: 'SURWASH', 
    subtitle: 'Transforming Public Health through Strategic Communication',
    description: 'SURWASH partnered with us to develop a massive communication strategy for the Federal Ministry of Water Resources.',
    image: '/pictures/surwash/pamphlet.png',
    challenge: 'Communicating critical public health and water sanitation standards to diverse regional populations.',
    santi: 'The "Clear Choice"—using visual metaphors for clean water to inspire behavioral change and communal health.',
    solution: 'A multi-channel brand application strategy spanning print, trifold, and digital educational tools.',
    cookWithMe: 'Community leaders led live workshops, bridging the gap between policy and local implementation.',
    results: [
      'Educational materials distributed to over 500 communities.',
      'Strategic framework adopted at the federal level.'
    ],
    linkUrl: '/case-studies/surwash'
  },
  { 
    id: 5, 
    client: 'NIS', 
    subtitle: 'Reshaping the Narrative - Police Reform',
    description: 'The Nigerian Police Force needed to reshape the public narrative and rebuild trust. The challenge lay in demonstrating transparent steps toward reform.',
    image: '/pictures/nis/stage2.jpg',
    challenge: 'Rebuilding trust and highlighting progressive actions taken towards reform and community dialogue.',
    solution: 'A transparent, multi-channel media campaign showing accountability, personnel development, and civil engagements.',
    results: [
      'Reached over 5M cumulative views.',
      'Enhanced positive community dialogue.'
    ],
    linkUrl: '/case-studies/nis'
  },
  { 
    id: 6, 
    client: 'TOTAL ENERGIES', 
    subtitle: 'Energizing a Global Brand: TotalEnergies’ Journey to Sustainability',
    description: 'Highlighting TotalEnergies’ commitment to sustainability and clean energy transition. The goal was to make global green initiatives relatable locally.',
    image: '/pictures/total/te-vals-day-poster-01.png',
    challenge: 'Translating large-scale corporate environment and sustainability goals into localized, visually appealing narratives.',
    solution: 'An impactful digital campaign centered on Valentine’s Day and everyday sustainable choices, aligning the brand with modern ecological values.',
    results: [
      '40% increase in campaign engagement.',
      'Widespread digital adoption of green messaging.'
    ],
    linkUrl: '/case-studies/total-energies'
  },
  { 
    id: 7, 
    client: 'TOKUNBO', 
    subtitle: 'Everything is on the line. The journey continues.',
    description: 'A cinematic story of grit, choices, and resilience. Bringing the emotional and visual weight of the journey to the forefront.',
    image: '/pictures/tokunbo/artboard1-large.jpeg',
    challenge: 'Creating a compelling narrative strategy that aligns with themes of resilience and continuous movement.',
    solution: 'High-contrast cinematic photography combined with minimalist copy that emphasizes narrative depth.',
    results: [
      'Strong reception across digital film communities.',
      'Highly shared narrative campaign elements.'
    ],
    linkUrl: '/case-studies/tokunbo'
  }
];

const RenderSubtext: React.FC<{ content?: ContentBlock | ContentBlock[]; treatStringArrayAsList?: boolean }> = ({ content, treatStringArrayAsList = false }) => {
  if (!content) return null;

  if (treatStringArrayAsList && Array.isArray(content) && content.every(item => typeof item === 'string')) {
    return (
      <ul className="flex flex-col gap-[var(--spacing-3)] list-disc pl-[var(--spacing-4)] m-0">
        {content.map((item, idx) => (
          <li key={idx} className="text-base leading-relaxed text-inverse opacity-90">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  const blocks = Array.isArray(content) ? content : [content];

  return (
    <div className="flex flex-col gap-[var(--spacing-3)]">
      {blocks.map((block, idx) => {
        if (typeof block === 'string') {
          return (
            <p key={idx} className="text-base leading-relaxed text-inverse opacity-90 m-0">
              {block}
            </p>
          );
        }
        if (block.type === 'paragraph') {
          return (
            <p key={idx} className="text-base leading-relaxed text-inverse opacity-90 m-0">
              {block.text}
            </p>
          );
        }
        if (block.type === 'list') {
          return (
            <ul key={idx} className="flex flex-col gap-[var(--spacing-3)] list-disc pl-[var(--spacing-4)] m-0">
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="text-base leading-relaxed text-inverse opacity-90">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
};

export const CaseStudySlide: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const innerRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const totalSlides = slides.length;
      
      // Prepare the stack
      slidesRef.current.forEach((slide, i) => {
        if (!slide) return;
        if (i === 0) return;
        gsap.set(slide, { yPercent: 100 });
        gsap.set(innerRef.current[i], { yPercent: -40 });
        gsap.set(contentRef.current[i], { autoAlpha: 0, y: 50 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80px',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      for (let i = 0; i < totalSlides - 1; i++) {
        const currentSlide = slidesRef.current[i];
        const nextSlide = slidesRef.current[i + 1];
        const nextInner = innerRef.current[i + 1];
        const currentContent = contentRef.current[i];
        const nextContent = contentRef.current[i + 1];

        tl.to(currentSlide, {
          autoAlpha: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power2.inOut'
        }, i)
        .to(nextSlide, {
          yPercent: 0,
          duration: 1,
          ease: 'none'
        }, i)
        .to(nextInner, {
          yPercent: 0,
          duration: 1,
          ease: 'none'
        }, i)
        .to(currentContent, {
          autoAlpha: 0,
          y: -50,
          duration: 0.5
        }, i)
        .to(nextContent, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6
        }, i + 0.4);
      }
    });

    return () => {
      mm.revert();
    };
  }, { scope: rootRef });

  return (
    <div 
      ref={rootRef} 
      className="relative w-full" 
      style={{ height: isDesktop ? `${slides.length * 100}vh` : 'auto' }}
    >
      {/* Desktop/Laptop Version: GSAP Vertical Parallax Slide Stack */}
      <div 
        className="hidden lg:block sticky top-[80px] w-full h-[calc(100vh-80px)] overflow-hidden bg-black"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => { slidesRef.current[index] = el; }}
            className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
            style={{ zIndex: slides.length - index }}
          >
            {/* Background Parallax */}
            <div
              ref={(el) => { innerRef.current[index] = el; }}
              className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* FULL DETAILED CONTENT */}
            <div 
               ref={(el) => { contentRef.current[index] = el; }}
               className="relative z-10 w-full h-full px-[var(--spacing-30)] py-[var(--spacing-25)] flex flex-col justify-center"
            >
                {/* Top section: 2 columns */}
                <div className="flex flex-row justify-between gap-[var(--spacing-8)]">
                  {/* Left: client name + subtitle */}
                  <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px]">
                    <h1 className="text-8xl font-display italic text-inverse max-w-[300px]" style={{ lineHeight: 1.1 }}>
                      {slide.client}
                    </h1>
                    <p className="text-xl leading-snug text-inverse font-bold">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Right: description + CTA */}
                  <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px]">
                    <RenderSubtext content={slide.description} />
                    <Button variant="primary" size="lg" as="link" href={slide.linkUrl || "#"} className="self-start">
                      Download Case Study
                    </Button>
                  </div>
                </div>

                {/* Spacer */}
                <div className="h-[var(--spacing-20)]" />

                {/* Bottom section: Multi-row Grid */}
                <div className="grid grid-cols-3 gap-x-[var(--spacing-8)] gap-y-[var(--spacing-16)]">
                  {(slide.santi && slide.cookWithMe) ? (
                    <>
                      {/* Row 1 */}
                      <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-start">
                        <p className="sub-heading font-display uppercase font-bold text-inverse">The Challenge</p>
                        <RenderSubtext content={slide.challenge} />
                      </div>

                      <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-center">
                        <p className="sub-heading font-display uppercase font-bold text-inverse">What's Your Santi</p>
                        <RenderSubtext content={slide.santi} />
                      </div>

                      <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-end">
                        <p className="sub-heading font-display uppercase font-bold text-inverse">Key Results</p>
                        <RenderSubtext content={slide.results} treatStringArrayAsList />
                      </div>

                      {/* Row 2 */}
                      <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-start">
                        <p className="sub-heading font-display uppercase font-bold text-inverse">The Solution</p>
                        <RenderSubtext content={slide.solution} />
                      </div>

                      <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-center">
                        <p className="sub-heading font-display uppercase font-bold text-inverse">Cook With Me</p>
                        <RenderSubtext content={slide.cookWithMe} />
                      </div>

                      <div aria-hidden="true" className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-end" />
                    </>
                  ) : (
                    <>
                      {/* Row 1 - 3 Column Layout */}
                      <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-start">
                        <p className="sub-heading font-display uppercase font-bold text-inverse">The Challenge</p>
                        <RenderSubtext content={slide.challenge} />
                      </div>

                      <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-center">
                        <p className="sub-heading font-display uppercase font-bold text-inverse">The Solution</p>
                        <RenderSubtext content={slide.solution} />
                      </div>

                      <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-end">
                        <p className="sub-heading font-display uppercase font-bold text-inverse">Key Results</p>
                        <RenderSubtext content={slide.results} treatStringArrayAsList />
                      </div>
                    </>
                  )}
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet Version: Natural Scroll List */}
      <div className="lg:hidden w-full bg-black text-white py-[var(--spacing-15)] px-[var(--spacing-5)] flex flex-col gap-[var(--spacing-16)]">
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className="flex flex-col gap-[var(--spacing-6)] border-b border-white/10 pb-[var(--spacing-12)] last:border-none last:pb-0"
          >
            {/* Top: Client Name & Subtitle */}
            <div className="flex flex-col gap-[var(--spacing-3)]">
              <h2 className="text-5xl sm:text-6xl font-display italic text-inverse" style={{ lineHeight: 1.1 }}>
                {slide.client}
              </h2>
              <p className="text-base sm:text-lg leading-snug text-[var(--color-primary-500)] font-bold">
                {slide.subtitle}
              </p>
            </div>

            {/* Middle: Static Image Cover */}
            <div 
              className="w-full h-[240px] sm:h-[360px] md:h-[450px] rounded-[var(--radius-2xl)] bg-cover bg-center shadow-lg relative overflow-hidden"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Bottom: Description & CTA */}
            <div className="flex flex-col gap-[var(--spacing-5)]">
              <div className="text-sm sm:text-base opacity-90 leading-relaxed">
                <RenderSubtext content={slide.description} />
              </div>
              <Button 
                variant="primary" 
                size="md" 
                as="link" 
                href={slide.linkUrl || "#"} 
                className="self-start"
              >
                Download Case Study
              </Button>
            </div>

            {/* Detailed Grid: Challenge, Solution, Key Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-6)] mt-[var(--spacing-4)]">
              {/* Challenge */}
              <div className="flex flex-col gap-[var(--spacing-3)] bg-white/5 border border-white/10 p-[var(--spacing-5)] rounded-[var(--radius-xl)]">
                <p className="font-display uppercase font-bold text-xs tracking-widest text-[var(--color-primary-400)]">
                  The Challenge
                </p>
                <div className="text-sm opacity-90 leading-relaxed">
                  <RenderSubtext content={slide.challenge} />
                </div>
              </div>

              {/* Solution */}
              <div className="flex flex-col gap-[var(--spacing-3)] bg-white/5 border border-white/10 p-[var(--spacing-5)] rounded-[var(--radius-xl)]">
                <p className="font-display uppercase font-bold text-xs tracking-widest text-[var(--color-primary-400)]">
                  The Solution
                </p>
                <div className="text-sm opacity-90 leading-relaxed">
                  <RenderSubtext content={slide.solution} />
                </div>
              </div>

              {/* Santi (If exists) */}
              {slide.santi && (
                <div className="flex flex-col gap-[var(--spacing-3)] bg-white/5 border border-white/10 p-[var(--spacing-5)] rounded-[var(--radius-xl)]">
                  <p className="font-display uppercase font-bold text-xs tracking-widest text-[var(--color-primary-400)]">
                    What's Your Santi
                  </p>
                  <div className="text-sm opacity-90 leading-relaxed">
                    <RenderSubtext content={slide.santi} />
                  </div>
                </div>
              )}

              {/* Cook With Me (If exists) */}
              {slide.cookWithMe && (
                <div className="flex flex-col gap-[var(--spacing-3)] bg-white/5 border border-white/10 p-[var(--spacing-5)] rounded-[var(--radius-xl)]">
                  <p className="font-display uppercase font-bold text-xs tracking-widest text-[var(--color-primary-400)]">
                    Cook With Me
                  </p>
                  <div className="text-sm opacity-90 leading-relaxed">
                    <RenderSubtext content={slide.cookWithMe} />
                  </div>
                </div>
              )}

              {/* Key Results */}
              <div className="flex flex-col gap-[var(--spacing-3)] bg-white/5 border border-white/10 p-[var(--spacing-5)] rounded-[var(--radius-xl)] md:col-span-2">
                <p className="font-display uppercase font-bold text-xs tracking-widest text-[var(--color-primary-400)]">
                  Key Results
                </p>
                <div className="text-sm opacity-90 leading-relaxed">
                  <RenderSubtext content={slide.results} treatStringArrayAsList />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudySlide;
