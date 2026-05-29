"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const DIRECTORS = [
  {
    id: 1,
    name: "Elijah Affi",
    role: "Co-founder and Creative Director",
    image: "/pictures/directors-images/Mr Elijah.webp"
  },
  {
    id: 2,
    name: "Makua Afioma",
    role: "Co-founder and Director of People Operations & Culture",
    image: "/pictures/directors-images/Mr Makua.webp"
  },
  {
    id: 3,
    name: "Solomon Dawudu",
    role: "Co-founder and Director of Business Development & Finance",
    image: "/pictures/directors-images/Mr Solomon.webp"
  }
];

const TEAM_MEMBERS = [
  { id: 1, name: "Jessica Smith", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1080&auto=format&fit=crop" },
  { id: 2, name: "David Chen", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1080&auto=format&fit=crop" },
  { id: 3, name: "Sarah Williams", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1080&auto=format&fit=crop" },
  { id: 4, name: "Marcus Johnson", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1080&auto=format&fit=crop" },
  { id: 5, name: "Elena Rodriguez", image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1080&auto=format&fit=crop" },
  { id: 6, name: "Kevin Park", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1080&auto=format&fit=crop" },
];

export function HeadHunters() {
  const containerRef = useRef<HTMLElement>(null);
  const mainHeaderRef = useRef<HTMLDivElement>(null);
  const directorsTitleRef = useRef<HTMLHeadingElement>(null);
  const directorsTitleWrapperRef = useRef<HTMLDivElement>(null);
  const stagingContainerRef = useRef<HTMLDivElement>(null);

  // New Team Refs
  const teamSectionRef = useRef<HTMLDivElement>(null);

  const [containerHeight, setContainerHeight] = useState<number>(800);

  const initialRotations = [5, -3, 3.5];

  useGSAP(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray('.director-card');
    const imageWrappers = gsap.utils.toArray('.image-wrapper');
    const captions = gsap.utils.toArray('.card-caption');

    const getLayoutData = () => {
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const padding = vw >= 768 ? 120 : 20;
      const gap = vw >= 768 ? 24 : 16;

      const cardWidth = (containerWidth - (padding * 2) - (gap * 2)) / 3;
      const targetX = cardWidth + gap;
      const imageHeight = cardWidth / 0.9675;

      const titleHeight = 40;
      const imageGap = 8;         // Tight, snappy gap to match Team Members

      let titleTop;
      let stagingPoint;
      let containerHeight;

      if (vw >= 768) {
        const captionHeight = 60;
        const bottomGap = 200; // (adjust bottomGap to move team members card down)
        const scatterDrop = imageHeight * 0.15;

        titleTop = 320; // 100% consistent top alignment on desktop
        stagingPoint = titleTop + titleHeight + imageGap + (imageHeight / 2);

        const cardBottom = stagingPoint + scatterDrop + (imageHeight / 2) + captionHeight;
        containerHeight = cardBottom + bottomGap;
      } else {
        titleTop = vh * 0.20;
        stagingPoint = titleTop + titleHeight + imageGap + (imageHeight / 2);
        const cardBottom = stagingPoint + (imageHeight * 0.20) + (imageHeight / 2) + 60;
        containerHeight = cardBottom + 20;
      }

      return { targetX, cardWidth, imageHeight, stagingPoint, titleTop, containerHeight };
    };

    // ── INITIAL LAYOUT SETUP (REPLACES VH IN TIMELINE) ──
    const updateLayout = () => {
      const data = getLayoutData();
      setContainerHeight(data.containerHeight);
      gsap.set(directorsTitleWrapperRef.current, { top: data.titleTop });
      gsap.set(stagingContainerRef.current, { paddingTop: data.stagingPoint });
    };

    updateLayout();
    ScrollTrigger.addEventListener('refreshInit', updateLayout);

    // ── DIRECTORS TIMELINE (PERFECTED) ──
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=280px',
        scrub: 0.2,
        pin: '.directors-pin-container',
        pinSpacing: true,
        pinType: 'fixed',
        invalidateOnRefresh: true,
      }
    });

    tl.set(mainHeaderRef.current, { autoAlpha: 0, y: 30 });
    tl.set(directorsTitleRef.current, { autoAlpha: 0, y: 15 });
    tl.set(captions, { autoAlpha: 0, y: 10 });

    cards.forEach((card: any, index) => {
      tl.set(card, {
        width: () => getLayoutData().cardWidth,
        rotationZ: initialRotations[index],
        autoAlpha: 1,
        xPercent: -50,
        yPercent: 0,
        x: 0,
        y: () => -(getLayoutData().imageHeight / 2)
      }, 0);
    });

    imageWrappers.forEach((wrapper: any) => {
      tl.set(wrapper, {
        height: () => getLayoutData().imageHeight
      }, 0);
    });

    cards.forEach((card: any, index) => {
      tl.to(card, {
        x: () => {
          const { targetX } = getLayoutData();
          if (index === 0) return -targetX;
          if (index === 2) return targetX;
          return 0;
        },
        y: () => {
          const vw = window.innerWidth;
          const { imageHeight } = getLayoutData();
          const baseOffset = -(imageHeight / 2);
          const scatterDrop = vw >= 768 ? imageHeight * 0.15 : imageHeight * 0.20;
          return baseOffset + scatterDrop;
        },
        rotationZ: 0,
        ease: "power3.inOut",
        duration: 1.5,
      }, 0);
    });

    tl.to(mainHeaderRef.current, { autoAlpha: 1, y: 0, duration: 1 }, 1.0);
    tl.to(captions, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8 }, 1.0);
    tl.to(directorsTitleRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.6);

    // ── TEAM MEMBERS ANIMATION (NEW) ──
    const teamItems = gsap.utils.toArray('.team-member-item');

    if (teamItems.length > 0) {
      gsap.from('.team-title', {
        scrollTrigger: {
          trigger: '.team-title',
          start: 'top 90%',
        },
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(teamItems, {
        scrollTrigger: {
          trigger: '.team-title',
          start: 'top 85%',
        },
        autoAlpha: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.removeEventListener('refreshInit', updateLayout);
    };

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full bg-[var(--color-primary-25)] overflow-visible z-10">

      {/* Pinned Directors Section */}
      <div
        className="directors-pin-container relative w-full overflow-visible"
        style={{ height: `${containerHeight}px` }}
      >
        <div
          ref={stagingContainerRef}
          className="relative h-full w-full flex flex-col items-center justify-start overflow-visible"
        >
          {/* Main Header */}
          <div ref={mainHeaderRef} className="absolute top-[var(--spacing-25)] lg:top-[var(--spacing-30)] text-center z-50 w-full px-[var(--spacing-5)]">
            <h2 className="h2-desktop text-heading m-0 capitalize">
              Our <span className="text-[var(--color-primary-500)]">Head-Hunters</span>
            </h2>
            <p className="p3-main-body-text text-dark-body mt-[var(--spacing-4)] m-0">Meet our team of ruthless strikers</p>
          </div>

          {/* Directors Title */}
          <div ref={directorsTitleWrapperRef} className="absolute w-full z-40 px-[var(--spacing-5)] md:px-[var(--spacing-30)] text-left">
            <h3 ref={directorsTitleRef} className="h3-italic text-heading">Directors</h3>
          </div>

          {/* Director Cards */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative">
              {DIRECTORS.map((director, index) => (
                <div key={director.id} className="director-card absolute flex flex-col overflow-visible" style={{ left: '0', top: '0', zIndex: DIRECTORS.length - index }}>
                  <div className="image-wrapper relative w-full rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-neutral-100)]" style={{ aspectRatio: '387 / 400' }}>
                    <Image
                      src={director.image}
                      alt={director.name}
                      fill
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>
                  <div className="card-caption pt-[var(--spacing-6)] w-full">
                    <h4 className="h4-desktop text-heading leading-[1.2] m-0 capitalize">{director.name}</h4>
                    <p className="p3-main-body-text text-dark-body mt-[var(--spacing-2)] m-0">{director.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Section  adjust pt 400px to move team members card down */}
      <div
        ref={teamSectionRef}
        className="relative w-full px-[var(--spacing-5)] md:px-[var(--spacing-30)] pb-[100px] pt-[380px]"
      >
        <h3 className="team-title h3-italic text-heading mb-[var(--spacing-24)]">Team members</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[var(--spacing-6)] gap-y-[var(--spacing-12)] lg:gap-y-[var(--spacing-12)]">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="team-member-item flex flex-col">
              <div className="relative w-full rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-neutral-100)] mb-[var(--spacing-6)]" style={{ aspectRatio: '387 / 400' }}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="h4-desktop text-heading capitalize">{member.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeadHunters;
