"use client";

import Image from 'next/image';
import { FadeIn } from '@/shared/components/ui';

const DIRECTORS = [
  {
    id: 1,
    name: "Elijah Affi",
    role: "Co-founder and Creative Director",
    image: "/pictures/directors-images/mr-elijah.webp"
  },
  {
    id: 2,
    name: "Makua Afioma",
    role: "Co-founder and Director of People Operations & Culture",
    image: "/pictures/directors-images/mr-makua.webp"
  },
  {
    id: 3,
    name: "Solomon Dawudu",
    role: "Co-founder and Director of Business Development & Finance",
    image: "/pictures/directors-images/mr-solomon.webp"
  }
];

export function HeadHunters() {
  return (
    <section className="bg-[var(--color-primary-25)] w-full py-[var(--spacing-15)] lg:py-[var(--spacing-25)] relative">
      <div className="w-full px-[var(--spacing-5)] md:px-[var(--spacing-30)]">
        
        {/* Main Header */}
        <div className="mb-[var(--spacing-12)] lg:mb-[var(--spacing-15)] text-center lg:text-left">
          <h2 className="h2-desktop text-heading m-0 capitalize">
            Our <span className="text-[var(--color-primary-500)]">Head-Hunters</span>
          </h2>
          <p className="p3-main-body-text text-dark-body mt-[var(--spacing-4)] m-0">Meet our team of ruthless strikers</p>
        </div>

        {/* Directors Subtitle */}
        <div className="mb-[var(--spacing-8)] text-center lg:text-left">
          <h3 className="h3-italic text-heading m-0">Directors</h3>
        </div>

        {/* Director Cards Grid */}
        <FadeIn
          direction="up"
          distance={100}
          stagger={0.5}
          duration={1.8}
          className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-6)] lg:gap-[var(--spacing-8)] w-full items-stretch"
          gsap={{ ease: 'expo.out', delay: 0.4 }}
        >
          {DIRECTORS.map((director) => (
            <div key={director.id} className="flex flex-col w-full">
              <div className="relative w-full rounded-[var(--radius-2xl)] overflow-hidden bg-[var(--color-neutral-100)]" style={{ aspectRatio: '387 / 400' }}>
                <Image
                  src={director.image}
                  alt={director.name}
                  fill
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div className="pt-[var(--spacing-6)] w-full">
                <h4 className="h4-desktop text-heading leading-[1.2] m-0 capitalize">{director.name}</h4>
                <p className="p3-main-body-text text-dark-body mt-[var(--spacing-2)] m-0">{director.role}</p>
              </div>
            </div>
          ))}
        </FadeIn>

      </div>
    </section>
  );
}

export default HeadHunters;
