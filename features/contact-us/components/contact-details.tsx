"use client";

import React, { useState } from "react";
import { InstagramLogo, FacebookLogo, YoutubeLogo, LinkedinLogo } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export function ContactDetails() {
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const socials = [
    { Icon: InstagramLogo, href: "https://www.instagram.com/takeout.media/" },
    { Icon: FacebookLogo, href: "https://www.facebook.com/takeoutmediaagency" },
    { Icon: YoutubeLogo, href: "https://www.youtube.com/c/TakeoutMediaStudios" },
    { Icon: LinkedinLogo, href: "https://www.linkedin.com/company/takeout-media/" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-[var(--spacing-10)] lg:gap-[var(--spacing-12)]"
      data-name="ContactDetails"
    >
      {/* Phone */}
      <motion.div variants={itemVariants} className="flex flex-col gap-[var(--spacing-2)]">
        <h3 className="!font-display font-semibold text-xl lg:text-2xl text-heading uppercase">
          PHONE
        </h3>
        <a
          href="tel:+2348184324791"
          className="p3-main-body-text !text-[length:var(--text-lg)] lg:!text-[length:var(--text-xl)] text-dark-body hover:text-[var(--color-primary-500)] transition-colors w-fit"
        >
          +234 818 432 4791
        </a>
      </motion.div>

      {/* Email */}
      <motion.div variants={itemVariants} className="flex flex-col gap-[var(--spacing-2)]">
        <h3 className="!font-display font-semibold text-xl lg:text-2xl text-heading uppercase">
          EMAIL
        </h3>
        <a
          href="mailto:info@takeoutmedia.xyz"
          className="p3-main-body-text !text-[length:var(--text-lg)] lg:!text-[length:var(--text-xl)] text-dark-body hover:text-[var(--color-primary-500)] transition-colors w-fit"
        >
          info@takeoutmedia.xyz
        </a>
      </motion.div>

      {/* Addresses */}
      <motion.div variants={itemVariants} className="flex flex-col gap-[var(--spacing-6)]">
        <div className="flex flex-col gap-[var(--spacing-2)]">
          <h3 className="!font-display font-semibold text-xl lg:text-2xl text-heading uppercase">
            ADDRESS
          </h3>
          <div className="flex flex-col gap-[var(--spacing-4)] lg:gap-[var(--spacing-6)]">
            {/* Abuja */}
            <div className="flex flex-col gap-[var(--spacing-1)]">
              <span className="font-sans font-semibold text-xs tracking-wider text-[var(--color-primary-500)] uppercase">
                Abuja Office
              </span>
              <a
                href="https://maps.app.goo.gl/rLWZDrxUeFzkK5z16"
                target="_blank"
                rel="noopener noreferrer"
                className="p3-main-body-text !text-[length:var(--text-base)] lg:!text-[length:var(--text-lg)] text-dark-body hover:text-[var(--color-primary-500)] transition-colors leading-[1.6]"
              >
                36, Sokode Crescent, Hatlab Place,<br />
                Wuse Zone 5, Abuja, Nigeria
              </a>
            </div>

            {/* London */}
            <div className="flex flex-col gap-[var(--spacing-1)]">
              <span className="font-sans font-semibold text-xs tracking-wider text-[var(--color-primary-500)] uppercase">
                London Office
              </span>
              <a
                href="https://maps.app.goo.gl/UkuNVHV2NuJG4K8w6"
                target="_blank"
                rel="noopener noreferrer"
                className="p3-main-body-text !text-[length:var(--text-base)] lg:!text-[length:var(--text-lg)] text-dark-body hover:text-[var(--color-primary-500)] transition-colors leading-[1.6]"
              >
                1-75 Shelton Street, Covent Garden,<br />
                London WC2H 9JQ, United Kingdom
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Icons (No Header, No Labels) */}
      <motion.div variants={itemVariants} className="flex items-center gap-[var(--spacing-5)] lg:gap-[var(--spacing-6)] mt-[var(--spacing-4)]">
        {socials.map(({ Icon, href }, idx) => (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredSocial(idx)}
            onMouseLeave={() => setHoveredSocial(null)}
            className="text-heading hover:text-[var(--color-primary-500)] transition-colors duration-300"
          >
            <Icon 
              size={28} 
              weight={hoveredSocial === idx ? "fill" : "regular"} 
              className="lg:w-[32px] lg:h-[32px] transition-all duration-300" 
            />
          </a>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default ContactDetails;
