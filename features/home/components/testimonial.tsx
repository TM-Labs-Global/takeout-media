"use client";

import React from "react";
import { Star } from "@phosphor-icons/react";
import { SplitText } from "@/shared/components/ui";

const testimonials = [
  {
    title: "Youthful Talents With Great Communication Skills",
    body: "The team is full of young, vibrant, willing to learn individuals. The response time for projects is also relatively good. TM Global use latest softwares and technologies in implementing their services which is necessary for growth and development.",
    name: "Benjamin Fidelis",
    rating: 4,
    colSpan: "md:col-span-5", // narrow
  },
  {
    title: "Dedicated To Understanding Our Vision",
    body: "TM has been dedicated to understanding our vision and translating it into a compelling brand identity. They have a warm and friendly team ready to take feedbacks and deliver good service",
    name: "Titi Akinlawon",
    rating: 5,
    colSpan: "md:col-span-7", // wide
  },
  {
    title: "Working With TM Has Been A Fantastic Experience",
    body: "Working with Takeout Media has been a fantastic experience. In terms of collaboration with us on branding, social media management and media relations craft ideas truly sets them apart. Their creative and innovative approach, combined with their skillful execution, ensures that every project not only meets but exceeds expectations.",
    name: "Israel",
    rating: 5,
    colSpan: "md:col-span-7", // wide
  },
  {
    title: "Committed To Delivering Impactful Services",
    body: "Takeout Media is committed to delivering impactful services to her clients. The Consultancy Firm recognizes the importance of working with strategic stakeholders to ensure results are achieved. My working relationship with the Firm is seamless with a focus on developing IEC materials that are engaging at all levels.",
    name: "Felicia Irima Ngaji-Usibe",
    rating: 5,
    colSpan: "md:col-span-5", // narrow
  }
];

export function Testimonial() {
  return (
    <section className="w-full bg-[var(--color-primary-25)] px-[var(--spacing-5)] py-[var(--spacing-15)] lg:px-[var(--spacing-30)] lg:py-[var(--spacing-25)]" data-name="Testimonial">
      {/* Header Container */}
      <div className="w-full mb-[var(--spacing-10)] lg:mb-[var(--spacing-20)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[var(--spacing-6)] md:gap-0 w-full items-start">
          <div className="md:col-span-6">
            <SplitText 
              as="h2" 
              variant="slide-up"
              className="h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] text-heading max-w-[320px] lg:max-w-[600px]"
            >
              This Is What Our <span className="text-[var(--color-primary-500)]">Brands</span> Are Saying
            </SplitText>
          </div>
          <div className="md:col-span-5 md:col-start-8 flex items-start md:justify-end pt-2 lg:pt-4">
            <p className="p3-main-body-text !text-[length:var(--text-base)] md:!text-[length:var(--text-xl)] text-dark-body m-0 max-w-[420px]">
              We measure our success by the success of our brands. Here is what they have to say about our partnership.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Grid Container */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-[var(--spacing-5)]">
          {testimonials.map((item, index) => (
            <div 
              key={index}
              className={`w-full rounded-[var(--radius-2xl)] p-[var(--spacing-8)] md:p-[var(--spacing-10)] flex flex-col justify-between gap-[var(--spacing-10)] md:gap-[var(--spacing-15)] bg-white ${item.colSpan}`}
            >
              <div className="flex flex-col gap-[var(--spacing-5)] md:gap-[var(--spacing-6)]">
                <h3 className="font-display font-medium max-md:!text-[length:var(--text-2xl)] max-md:!leading-[1.2] md:!text-[28px] md:!leading-[1.1] text-heading">
                  {item.title}
                </h3>
                <p className="font-sans font-normal max-md:!text-[length:var(--text-base)] max-md:!leading-[1.4] md:!text-[length:var(--text-base)] md:!leading-[1.4] text-dark-body">
                  {item.body}
                </p>
              </div>
              
              <div className="flex flex-col gap-[var(--spacing-3)] md:gap-[var(--spacing-4)] mt-auto">
                <p className="font-display font-normal max-md:!text-[length:var(--text-xl)] md:!text-[length:var(--text-xl)] text-heading">
                  {item.name}
                </p>
                <div className="flex items-center gap-[4px]">
                  {[...Array(5)].map((_, i) => {
                    const isFilled = i < (item.rating || 5);
                    return (
                      <Star 
                        key={i} 
                        weight={isFilled ? "fill" : "regular"} 
                        color={isFilled ? "var(--color-primary-500)" : "var(--text-heading)"}
                        className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
