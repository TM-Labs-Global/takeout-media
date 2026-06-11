"use client";

import React from "react";
import { SplitText } from "@/shared/components/ui";
import { ContactDetails } from "../components/contact-details";
import { ContactForm } from "../components/contact-form";

export function ContactPage() {
  return (
    <main
      className="flex flex-col w-full bg-[var(--color-primary-25)] px-[var(--spacing-5)] pt-[var(--spacing-25)] pb-[var(--spacing-15)] lg:px-[var(--spacing-30)] lg:pt-[var(--spacing-45)] lg:pb-[var(--spacing-25)]"
      data-name="ContactPage"
    >
      <div className="flex flex-col gap-[var(--spacing-12)] lg:gap-[var(--spacing-20)] w-full">
        {/* Cinematic Heading styled exactly like the our-process header */}
        <div className="max-w-[var(--container-md)] lg:max-w-[850px] w-full">
          <SplitText
            as="h2"
            variant="slide-up"
            className="h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] text-heading"
          >
            The only thing standing between you and <span className="text-[color:var(--color-primary-500)]">domination</span> is a conversation.
          </SplitText>
        </div>

        {/* Content Columns: Details and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-[var(--spacing-15)] lg:gap-x-[var(--spacing-15)] xl:gap-x-[var(--spacing-24)] items-start w-full">
          <div className="lg:col-span-5 w-full order-2 lg:order-none">
            <ContactDetails />
          </div>
          <div className="lg:col-span-7 lg:col-start-6 w-full order-1 lg:order-none">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ContactPage;
