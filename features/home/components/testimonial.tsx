"use client";

import React, { useRef } from "react";
import { Star } from "@phosphor-icons/react";
import { SplitText } from "@/shared/components/ui";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const testimonials = [
  {
    title: "Youthful talents with great communication skills",
    body: "The team is full of young, vibrant, willing to learn individuals. The response time for projects is also relatively good. TM use latest softwares and technologies in implementing their services which is necessary for growth and development.",
    name: "Benjamin Fidelis",
    rating: 4
  },
  {
    title: "Dedicated to understanding our vision",
    body: "TM has been dedicated to understanding our vision and translating it into a compelling brand identity. They have a warm and friendly team ready to take feedbacks and deliver good service.",
    name: "Titi Akinlawon",
    rating: 5
  },
  {
    title: "Working with TM has been a fantastic experience",
    body: "Working with Takeout Media has been a fantastic experience. In terms of collaboration with us on branding, social media management and media relations craft ideas truly sets them apart. Their creative and innovative approach, combined with their skillful execution, ensures that every project not only meets but exceeds expectations.",
    name: "Israel",
    rating: 5
  },
  {
    title: "Highly recommend them",
    body: "We have an excellent experience with Takeout Media. They are a nice, friendly, and professional team that consistently delivers high-quality service.",
    name: "Nafisa Aliyu",
    rating: 5
  },
  {
    title: "Committed to delivering impactful services",
    body: "Takeout Media is committed to delivering impactful services to her clients. The Consultancy Firm recognizes the importance of working with strategic stakeholders to ensure results are achieved. My working relationship with the Firm is seamless with a focus on developing IEC materials that are engaging at all levels.",
    name: "Felicia Irima Ngaji-Usibe",
    rating: 5
  },
  {
    title: "Top Notch Design",
    body: "TM assisted in developing the TRP Express and Milestone Brands. The designs were great and captured what we want to express to our client. The dedication of TM team was awesome. They ask you what you want, listen to you and Exceed your expectations.",
    name: "Milestone Multipurpose Coops",
    rating: 5
  },
  {
    title: "They make the client feel like family",
    body: "It's been a great experience working with the folks at TM. They make the client feel like family.",
    name: "Odeh Chris",
    rating: 5
  },
  {
    title: "TM you are Awesome 👌",
    body: "The TM team is very friendly, open and free but very professional. Everything is done in a transparent manner which gives me utmost faith in doing business with the company. We delivered a couple of projects together between 2020 to date, and I enjoyed all the transactions. Overall, the team is diligent and trustworthy.",
    name: "Yakubu Mohammed",
    rating: 5
  }
];

export function Testimonial() {
  const trackRef = useRef<HTMLDivElement>(null);
  const marqueeTween = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!trackRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Smoothly shift by exactly 1 of 2 identical blocks (xPercent: -50)
    const tl = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 55,
      ease: "none",
      repeat: -1,
    });

    marqueeTween.current = tl;

    const track = trackRef.current;
    const pauseAnim = () => gsap.to(tl, { timeScale: 0, duration: 0.6, ease: "power2.out" });
    const playAnim = () => gsap.to(tl, { timeScale: 1, duration: 0.6, ease: "power2.in" });

    track.addEventListener("mouseenter", pauseAnim);
    track.addEventListener("mouseleave", playAnim);

    return () => {
      track.removeEventListener("mouseenter", pauseAnim);
      track.removeEventListener("mouseleave", playAnim);
    };
  }, []);

  return (
    <section className="w-full bg-[var(--color-primary-25)] py-[var(--spacing-25)] lg:py-[var(--spacing-37)] overflow-hidden" data-name="Testimonial">
      {/* Header Container */}
      <div className="w-full px-[var(--spacing-5)] lg:px-[var(--spacing-30)] mb-[var(--spacing-10)] lg:mb-[var(--spacing-20)]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-[var(--spacing-8)] md:gap-[var(--spacing-10)] lg:gap-[var(--spacing-15)] w-full">
          <div className="max-w-[600px]">
            <SplitText 
              as="h2" 
              variant="slide-up"
              className="h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] text-heading m-0"
            >
              This Is What Our <span className="text-[var(--color-primary-500)]">Brands</span> Are Saying
            </SplitText>
          </div>
          <div className="w-full md:w-[380px] lg:w-[484px] flex-shrink-0 md:mt-4">
            <SplitText 
              as="p" 
              variant="fade"
              type="words"
              stagger={0.01}
              className="p3-main-body-text text-dark-body m-0"
            >
              We measure our success by the success of our brands. Here is what they have to say about our partnership.
            </SplitText>
          </div>
        </div>
      </div>

      {/* Cards Marquee Container */}
      <div className="w-full relative mt-0 pb-[var(--spacing-10)] overflow-hidden pointer-events-auto">
        
        <div ref={trackRef} className="flex flex-nowrap w-max will-change-transform transform-gpu cursor-pointer pt-[var(--spacing-5)]">
          {/* First Group */}
          <div className="flex flex-nowrap gap-[var(--spacing-8)] md:gap-[var(--spacing-15)] pr-[var(--spacing-8)] md:pr-[var(--spacing-15)] shrink-0">
            {testimonials.map((item, index) => {
              const rotation = index % 2 === 0 ? "lg:-rotate-[4deg]" : "lg:rotate-[4deg]";
              return (
                <div 
                  key={`first-${index}`}
                  className={`shrink-0 w-[320px] md:w-[479px] h-auto min-h-[380px] md:min-h-[450px] bg-white border border-stroke rounded-[var(--radius-2xl)] p-[var(--spacing-8)] md:p-[var(--spacing-10)] flex flex-col gap-[var(--spacing-10)] md:gap-[var(--spacing-15)] ${rotation} transition-transform duration-300 hover:rotate-0 origin-center cursor-pointer will-change-transform transform-gpu`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex flex-col gap-[var(--spacing-5)] md:gap-[var(--spacing-6)]">
                    <h3 className="font-display font-medium !text-[28px] !leading-[1.1] text-heading">
                      {item.title}
                    </h3>
                    <p className="font-sans font-normal text-base leading-[1.4] text-dark-body">
                      {item.body}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-[var(--spacing-3)] md:gap-[var(--spacing-4)] mt-auto">
                    <p className="font-display font-normal text-xl text-heading">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-[4px]">
                      {[...Array(5)].map((_, i) => {
                        const isFilled = i < (item.rating || 5);
                        return (
                          <Star 
                            key={i} 
                            size={24} 
                            weight={isFilled ? "fill" : "regular"} 
                            color={isFilled ? "var(--color-primary-500)" : "var(--text-heading)"} 
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Second Group */}
          <div className="flex flex-nowrap gap-[var(--spacing-8)] md:gap-[var(--spacing-15)] pr-[var(--spacing-8)] md:pr-[var(--spacing-15)] shrink-0" aria-hidden="true">
            {testimonials.map((item, index) => {
              const rotation = index % 2 === 0 ? "lg:-rotate-[4deg]" : "lg:rotate-[4deg]";
              return (
                <div 
                  key={`second-${index}`}
                  className={`shrink-0 w-[320px] md:w-[479px] h-auto min-h-[380px] md:min-h-[450px] bg-white border border-stroke rounded-[var(--radius-2xl)] p-[var(--spacing-8)] md:p-[var(--spacing-10)] flex flex-col gap-[var(--spacing-10)] md:gap-[var(--spacing-15)] ${rotation} transition-transform duration-300 hover:rotate-0 origin-center cursor-pointer will-change-transform transform-gpu`}
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex flex-col gap-[var(--spacing-5)] md:gap-[var(--spacing-6)]">
                    <h3 className="font-display font-medium !text-[28px] !leading-[1.1] text-heading">
                      {item.title}
                    </h3>
                    <p className="font-sans font-normal text-base leading-[1.4] text-dark-body">
                      {item.body}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-[var(--spacing-3)] md:gap-[var(--spacing-4)] mt-auto">
                    <p className="font-display font-normal text-xl text-heading">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-[4px]">
                      {[...Array(5)].map((_, i) => {
                        const isFilled = i < (item.rating || 5);
                        return (
                          <Star 
                            key={i} 
                            size={24} 
                            weight={isFilled ? "fill" : "regular"} 
                            color={isFilled ? "var(--color-primary-500)" : "var(--text-heading)"} 
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
