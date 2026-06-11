'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from '@/shared/components/ui';
import { Button } from '@/shared/components/ui/button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ────────────────────────────────────────────────────────────────────

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
  solution: ContentBlock | ContentBlock[];
  santi?: ContentBlock | ContentBlock[];
  cookWithMe?: ContentBlock | ContentBlock[];
  results: ContentBlock | ContentBlock[];
  linkUrl?: string;
  bgColor?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const slides: ProjectData[] = [
  {
    id: 1,
    client: 'SURWASH',
    subtitle:
      'Empowering a WASH Revolution with SURWASH: A Data-driven Social & Behavioral Change Communication Campaign.',
    description:
      'The Federal Ministry of Water Resources needed a strategic communication campaign to clean up Nigeria\u2019s sanitation act as part of their nationwide SURWASH program, but old habits were proving hard to wash away.',
    image: '/pictures/surwash/pamphlet.png',
    challenge:
      'To scrub away ingrained behaviors and polish up new Water, Sanitation, and Hygiene (WASH) practices across diverse communities, all while navigating the murky waters of cultural sensitivities.',
    solution:
      'We partnered with the Federal Ministry of Water Resources to develop a comprehensive communication strategy for the SURWASH program.',
    results: [
      'Engaged stakeholders across 7 states through 22 key informant interviews and 14 focus groups.',
      'Facilitated state-level workshops for grassroots input and buy-in.',
      'Developed overarching communication blueprints endorsed by all stakeholders.',
    ],
    linkUrl: '/case-studies/surwash.pdf',
  },
  { 
    id: 2, 
    client: 'PORTO', 
    subtitle: 'Reshaping the Narrative — Nigerian Police Reform',
    description: 'Subtle is the loudest way to influence change when you are strategically initiating, launching and communicating the reform of the Nigerian Police.',
    image: '/pictures/porto/porto-materials-3.png',
    challenge: [
      'The Nigerian Police Force (NPF) faced a critical need to regain public trust and implement widespread reforms following years of institutional challenges and the historic EndSARS protests.',
      'The Presidential Roadmap for Police Reform offered a path forward, but effectively communicating these changes to a sceptical public was essential for success.'
    ],
    solution: 'Takeout Media partnered with the Police Reform & Transformation Office (PORTO) to develop a strategic communication plan for the police reform initiative.',
    results: [
      'People reached via print media — <strong>823,361</strong>',
      'People reached via television – <strong>7,560,000</strong>',
      'People reached Via YouTube - <strong>784,970</strong>',
      'People reached via radio (English and localized broadcasts) - <strong>29,592,500</strong>',
      'Impressions across digital promotion channels - <strong>21,000,000</strong>',
    ],
    linkUrl: '/case-studies/porto.pdf',
  },
  { 
    id: 3, 
    client: 'NIS', 
    subtitle: 'Unlocking a new investment frontier.',
    description: 'Nasarawa State, with its ambitious vision of becoming Nigeria’s top investment powerhouse, needed a compelling strategy to host its inaugural investment summit. The goal was to present credible investment opportunities and foster collaboration between the private sector and government.',
    image: '/pictures/nis/stage2.jpg',
    challenge: 'The challenge involved branding, planning, and executing a summit that would stand out in Nigeria’s competitive investment landscape.',
    solution: [
      'Takeout Media provided a comprehensive range of services for the Nasarawa Investment Summit (NIS) 2022 and NIS 2024, focusing on:',
      {
        type: 'list',
        items: [
          'Brand Strategy & Development',
          'Multi-Channel Marketing',
          'Website Development & Design',
          'Media Planning & Buying',
          'Event Coverage'
        ]
      }
    ],
    results: [
      'Over <strong>6,000</strong> attendees from diverse global backgrounds.',
      'Over <strong>$600,000,000</strong> and <strong>$1 billion</strong> in investment commitment in 2022 and 2024 respectively.',
      '<strong>70% boost</strong> in Nasarawa’s online visibility as an investment destination. '
    ],
    linkUrl: '/case-studies/nis.pdf',
  },
  {
    id: 4,
    client: 'PEBEC',
    subtitle: 'Making Nigeria an Easier Place for Businesses to Thrive: The PEBEC Story.',
    description: 'Five years after its inception, The Presidential Enabling Business Environment Council (PEBEC) needed to effectively communicate its numerous business reforms to a wide range of stakeholders, including MSMEs, women in business, policymakers, and government agencies. The challenge? To clear away red tape, build bridges between public and private sectors, and construct a narrative that would attract both local and international investors.',
    image: '/pictures/pebec/pebec-social-media.png',
    challenge: 'To clear away red tape, build bridges between public and private sectors, and construct a narrative that would attract both local and international investors.',
    solution: 'Takeout Media partnered with the Enabling Business Environment Secretariat (EBES) to develop a comprehensive communication strategy for PEBEC.',
    results: [
      'Enhanced brand awareness, recall, and advocacy.',
      'Nigeria moved up <strong>39 places</strong> in the World Bank Ease of Doing Business index',
      'Over <strong>135</strong> operational business reforms pioneered',
      '<strong>4,000 attendees</strong> at “The Future is Here” stage play (doubling the anticipated 2,000)'
    ],
    linkUrl: '/case-studies/pebec.pdf'
  },
  {
    id: 5,
    client: 'DANGOTE',
    subtitle: 'Breaking into a new market and audience.',
    description: 'Dangote Classic Seasoning was hungry to feast on the Northern palette, but this was uncharted territory. The challenge? To connect with a vibrant, adventurous audience known for its discerning taste and create a recipe for market domination.',
    image: '/pictures/dangote/dangote-social-media-mockup.png',
    challenge: 'To connect with a vibrant, adventurous audience known for its discerning taste and create a recipe for market domination.',
    santi: 'This campaign tapped into the emotional pleasure of communal dining, evoking nostalgia for traditional meals and family kitchens.',
    solution: 'We began by immersing ourselves in the target audience’s environment, visiting 13 local markets and remote restaurants. This in-depth research helped us understand the local lingo, diet preferences, and communication patterns, providing crucial insights into what influenced their purchasing decisions.',
    cookWithMe: 'We engaged beloved influencers to cook live, connecting with the audience through shared culinary experiences.',
    results: [
      'Over <strong>1M</strong> cumulative impressions',
      'Engaged over <strong>280,000</strong> members of the target audience'
    ],
    linkUrl: '/case-studies/dangote.pdf'
  },
  {
    id: 6,
    client: 'COSGROVE',
    subtitle: 'Building the Future of Real Estate with Cosgrove.',
    description: 'Cosgrove, a visionary leader in African real estate, sought to solidify their position as a transformational force in the industry. Their unique approach combined technology, automation, and sustainability to deliver future-ready homes and revolutionize the housing landscape. However, they needed a strategic branding campaign to effectively communicate their vision and capture market share.',
    image: '/pictures/cosgrove/board-design.jpg',
    challenge: 'They needed a strategic branding campaign to effectively communicate their vision and capture market share.',
    solution: 'Takeout Media partnered with Cosgrove to develop a comprehensive branding strategy focused on innovation and customer-centricity.',
    results: [
      'Established Cosgrove as a pioneer in smart and sustainable real estate.',
      'Increased client conversations and rapid sales of future-ready homes.',
      'Achieved global brand equity in the Abuja real estate industry.'
    ],
    linkUrl: '/case-studies/cosgrove.pdf'
  },
  {
    id: 7,
    client: 'TAJBANK',
    subtitle: 'Brand Launch',
    description: 'TAJBank needed to differentiate itself in a competitive financial market and effectively communicate its unique value proposition as an ethical bank. Additionally, the launch and promotion of the TAJWay mobile app required a strategy to acquire a significant user base and establish the app as a leading digital banking solution.',
    image: '/pictures/taj/taj-cover.png',
    challenge: 'To differentiate itself in a competitive financial market, communicate its unique value proposition as an ethical bank, and acquire a significant user base for the new TAJWay mobile app.',
    solution: 'Takeout Media partnered with TAJBank to develop a comprehensive branding and marketing strategy focused on customer-centricity.',
    results: [
      'Named Best Islamic Bank for Marketing and Growth Strategy.',
      'Expanded to over <strong>14 states</strong> nationwide.',
      'Achieved a customer growth rate of over <strong>2.5%</strong>.',
      'Acquired over <strong>500,000</strong> TAJWay app users.'
    ],
    linkUrl: '/case-studies/taj.pdf'
  },
  {
    id: 8,
    client: 'TOTALENERGIES',
    subtitle: 'Energizing a Global Brand: TotalEnergies’ Journey to Sustainability',
    description: 'TotalEnergies, a global energy leader with a rich history in traditional energy sources, needed to redefine its brand image. Their focus on sustainability and inclusivity wasn’t resonating with audiences, who still perceived them primarily as a fuel-based company. This limited the potential of new brand extensions and services.',
    image: '/pictures/total/te-vals-day-poster-01.png',
    challenge: 'To redefine their brand image so that their focus on sustainability and inclusivity would resonate with audiences, shifting public perception away from being primarily a fuel-based company.',
    solution: 'Takeout Media developed a comprehensive brand communication strategy for TotalEnergies.',
    results: [
      '<strong>45%</strong> increase in brand awareness for sustainable energy offerings.',
      '<strong>20%</strong> increase in brand engagements.',
      '<strong>30%</strong> shift in customer perception towards TotalEnergies as a diverse energy provider'
    ],
    linkUrl: '/case-studies/total.pdf'
  }
];

const backgroundColors = [
  'var(--color-primary-25)', // Light orange
  '#EAF4FC',                 // Light blue
  '#FCF8E3'                  // Light yellow
];

// ─── RenderSubtext helper ─────────────────────────────────────────────────────

const RenderSubtext: React.FC<{
  content?: ContentBlock | ContentBlock[];
  treatStringArrayAsList?: boolean;
  className?: string;
}> = ({ content, treatStringArrayAsList = false, className = '' }) => {
  if (!content) return null;

  if (
    treatStringArrayAsList &&
    Array.isArray(content) &&
    content.every((item) => typeof item === 'string')
  ) {
    return (
      <ul className={`flex flex-col gap-[var(--spacing-3)] list-disc pl-[var(--spacing-4)] m-0 ${className}`}>
        {content.map((item, idx) => (
          <li
            key={idx}
            className="p3-main-body-text text-dark-body"
            dangerouslySetInnerHTML={{ __html: item as string }}
          />
        ))}
      </ul>
    );
  }

  const blocks = Array.isArray(content) ? content : [content];

  return (
    <div className={`flex flex-col gap-[var(--spacing-3)] ${className}`}>
      {blocks.map((block, idx) => {
        if (typeof block === 'string') {
          return (
            <p
              key={idx}
              className="p3-main-body-text text-dark-body m-0"
              dangerouslySetInnerHTML={{ __html: block }}
            />
          );
        }
        if (block.type === 'paragraph') {
          return (
            <p
              key={idx}
              className="p3-main-body-text text-dark-body m-0"
              dangerouslySetInnerHTML={{ __html: block.text }}
            />
          );
        }
        if (block.type === 'list') {
          return (
            <ul
              key={idx}
              className="flex flex-col gap-[var(--spacing-3)] list-disc pl-[var(--spacing-4)] m-0"
            >
              {block.items.map((item, itemIdx) => (
                <li
                  key={itemIdx}
                  className="p3-main-body-text text-dark-body"
                  dangerouslySetInnerHTML={{ __html: item as string }}
                />
              ))}
            </ul>
          );
        }
        return null;
      })}
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

export const CaseStudyTemplateNew: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const sections = containerRef.current?.querySelectorAll('section.hidden.md\\:block');
        if (!sections) return;

        sections.forEach((section, index) => {
          const container = section.querySelector('.desktop-anim-container');
          if (!container) return;

          // 1. Rotation entrance tween
          gsap.to(container, {
            rotation: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            },
          });

          // 2. Pin each section (except the last)
          if (index === sections.length - 1) return;

          ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
        });

        // Force ScrollTrigger to recalculate coordinates for all sections
        ScrollTrigger.refresh();
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="w-full" ref={containerRef}>
      {slides.map((slide, index) => {
        const desktopBgColor = backgroundColors[index % backgroundColors.length];
        return (
          <div key={slide.id}>

          {/* ═══════════════════════════════════════════════════════════════
              DESKTOP LAYOUT — hidden on mobile, shown on md+
          ═══════════════════════════════════════════════════════════════ */}
          <section className="hidden md:block w-full overflow-hidden relative min-h-[100svh]">
            <div 
              className="desktop-anim-container w-full h-full origin-bottom-left will-change-transform flex flex-col" 
              style={{ transform: 'rotate(30deg)' }}
            >

              {/* 1. Full-width Hero Image */}
              <div className="w-full h-[492px] overflow-hidden relative shrink-0">
              <Image
                src={slide.image}
                alt={slide.client}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="100vw"
                priority
              />
            </div>

            {/* 2. Content Area */}
            <div 
              className="px-[var(--spacing-30)] py-[var(--spacing-25)]"
              style={{ backgroundColor: desktopBgColor }}
            >

              {/* Top section: 2 columns */}
              <div className="flex flex-row justify-between gap-[var(--spacing-8)] pb-[var(--spacing-10)] border-b border-black/10">
                {/* Left: client name + subtitle */}
                <div className="flex flex-col gap-[var(--spacing-8)] max-w-[540px]">
                  <SplitText
                    as="h2"
                    variant="slide-up"
                    className="h2-desktop text-heading m-0 !uppercase"
                  >
                    {slide.client}
                  </SplitText>
                  <p className="p3-main-body-text text-dark-body m-0">
                    {slide.subtitle}
                  </p>
                </div>

                {/* Right: description + CTA */}
                <div className="flex flex-col gap-[var(--spacing-8)] max-w-[540px] items-start">
                  <RenderSubtext content={slide.description} />
                  <Button 
                    variant="primary" 
                    size="lg" 
                    as="link" 
                    href={slide.linkUrl || "#"} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-start"
                  >
                    Download Case Study
                  </Button>
                </div>
              </div>

              {/* Bottom section: Multi-row Grid */}
              <div className="grid grid-cols-3 gap-x-[var(--spacing-8)] gap-y-[var(--spacing-16)] pt-[var(--spacing-10)]">
                {(slide.santi && slide.cookWithMe) ? (
                  <>
                    {/* Row 1 */}
                    <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-start">
                      <p className="sub-heading font-display uppercase font-bold text-heading m-0">The Challenge</p>
                      <RenderSubtext content={slide.challenge} />
                    </div>

                    <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-center">
                      <p className="sub-heading font-display uppercase font-bold text-heading m-0">What's Your Santi</p>
                      <RenderSubtext content={slide.santi} />
                    </div>

                    <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-end">
                      <p className="sub-heading font-display uppercase font-bold text-heading m-0">Key Results</p>
                      <RenderSubtext content={slide.results} treatStringArrayAsList />
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-start">
                      <p className="sub-heading font-display uppercase font-bold text-heading m-0">The Solution</p>
                      <RenderSubtext content={slide.solution} />
                    </div>

                    <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-center">
                      <p className="sub-heading font-display uppercase font-bold text-heading m-0">Cook With Me</p>
                      <RenderSubtext content={slide.cookWithMe} />
                    </div>

                    <div aria-hidden="true" className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-end" />
                  </>
                ) : (
                  <>
                    {/* Row 1 - 3 Column Layout */}
                    <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-start">
                      <p className="sub-heading font-display uppercase font-bold text-heading m-0">The Challenge</p>
                      <RenderSubtext content={slide.challenge} />
                    </div>

                    <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-center">
                      <p className="sub-heading font-display uppercase font-bold text-heading m-0">The Solution</p>
                      <RenderSubtext content={slide.solution} />
                    </div>

                    <div className="flex flex-col gap-[var(--spacing-8)] max-w-[400px] justify-self-end">
                      <p className="sub-heading font-display uppercase font-bold text-heading m-0">Key Results</p>
                      <RenderSubtext content={slide.results} treatStringArrayAsList />
                    </div>
                  </>
                )}
              </div>
            </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════════
              MOBILE LAYOUT — shown on mobile, hidden on md+
          ═══════════════════════════════════════════════════════════════ */}
          <section
            className="md:hidden w-full bg-[var(--color-primary-25)] px-[var(--spacing-5)] py-[var(--spacing-15)] flex flex-col gap-[var(--spacing-8)] relative overflow-hidden"
            data-name="case-study-template-mobile"
          >
            {/* Decorative bottom border */}
            <div
              aria-hidden
              className="absolute bottom-0 left-[var(--spacing-5)] right-[var(--spacing-5)] border-b border-black/10 pointer-events-none"
            />

            {/* 1. Title & Image Group */}
            <div className="flex flex-col gap-[var(--spacing-8)] w-full">

              {/* Title + Subtitle */}
              <div className="flex flex-col gap-[var(--spacing-6)] w-full">
                <SplitText
                  as="h2"
                  variant="slide-up"
                  className="h2-desktop !text-[length:var(--text-9xl)] !leading-[length:var(--leading-super-loose)] text-heading m-0 !uppercase"
                >
                  {slide.client}
                </SplitText>
                <p className="p3-main-body-text text-dark-body font-medium m-0 !text-base">
                  {slide.subtitle}
                </p>
              </div>

              {/* Hero Image — sandwiched between subtitle and description */}
              <div className="w-full h-[280px] rounded-[var(--radius-2xl)] overflow-hidden relative bg-[var(--color-secondary-500)]">
                <Image
                  src={slide.image}
                  alt={slide.client}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            {/* 2. Description & CTA Group */}
            <div className="flex flex-col gap-[var(--spacing-8)] w-full">
              <RenderSubtext 
                content={slide.description} 
                className="[&_p]:!text-base [&_li]:!text-base [&_p]:!leading-[24px] [&_li]:!leading-[24px]" 
              />
              <a
                href={slide.linkUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full"
              >
                <span className="btn-label-wrapper">
                  <span className="btn-label-text">Download Case Study</span>
                </span>
              </a>
            </div>
          </section>

        </div>
      )})}
    </div>
  );
};

export default CaseStudyTemplateNew;
