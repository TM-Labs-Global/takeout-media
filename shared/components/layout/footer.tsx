"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowCircleRight, InstagramLogo, TiktokLogo, XLogo, LinkedinLogo } from "@phosphor-icons/react";

export function Footer() {
    return (
        <section
            className="relative w-full min-h-screen bg-gradient-to-r from-[var(--color-tertiary-500)] to-[var(--color-primary-500)] overflow-hidden flex flex-col"
            data-name="Footer"
        >

            <div className="w-full flex-1 flex flex-col justify-start pt-[var(--spacing-10)] lg:pt-[var(--spacing-25)] pb-[var(--spacing-10)] lg:pb-[var(--spacing-25)] px-[var(--spacing-5)] md:px-[var(--spacing-25)] lg:px-[var(--spacing-30)] gap-[var(--spacing-12)] lg:gap-[var(--spacing-50)]">

                {/* Group Top and Bottom Shelf in a vertical flex container to lock gap to 40px (spacing-10) */}
                <div className="flex flex-col gap-[var(--spacing-10)] w-full">
                    {/* A. Top Shelf: Logos Only */}
                    <div className="flex flex-row items-center gap-[var(--spacing-6)] lg:gap-[var(--spacing-8)] w-full">
                        <Image
                            src="/pictures/logos/takeout-media-logo-white.svg"
                            alt="Takeout Media Logo"
                            width={200}
                            height={80}
                            className="w-[140px] lg:w-[200px] h-auto object-contain"
                            priority
                        />
                        <a
                            href="https://www.trustpilot.com/review/takeoutmedia.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block transition-transform duration-300 hover:scale-[1.06] active:scale-[0.98] cursor-pointer"
                        >
                            <Image
                                src="/pictures/logos/primary-logo-tricolor-black-in-white-box.png"
                                alt="Trustpilot Brand Logo"
                                width={80}
                                height={28}
                                className="w-[60px] lg:w-[85px] h-auto object-contain"
                            />
                        </a>
                    </div>

                    {/* B. Bottom Shelf: Tagline and Address Columns in One Horizontal Line */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-[var(--spacing-15)] lg:gap-[var(--spacing-6)] xl:gap-[var(--spacing-10)] mb-[var(--spacing-25)] lg:mb-[var(--spacing-32)] w-full">
                        
                        {/* 1. Tagline Column */}
                        <div className="flex flex-col shrink-0 max-w-[200px]">
                            <p className="text-inverse text-base lg:text-lg leading-[1.4] font-regular m-0">
                                Go from one in a million, to the only one.
                            </p>
                        </div>

                        {/* 2. Nav Links Column */}
                        <div className="flex flex-col gap-[var(--spacing-5)] lg:gap-[var(--spacing-4)] shrink-0">
                            {[
                                { name: "HOME", href: "/" },
                                { name: "ABOUT US", href: "/about" },
                                { name: "OUR WORK", href: "/our-work" },
                                { name: "CONTACT US", href: "/contact" }
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="!font-display font-semibold text-xl lg:text-2xl text-inverse hover:opacity-80 transition-opacity whitespace-nowrap"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* 3. Abuja Address Column */}
                        <div className="flex flex-col gap-[var(--spacing-3)] lg:gap-[var(--spacing-4)] shrink-0">
                            <h3 className="!font-display font-semibold text-xl lg:text-2xl text-inverse uppercase">
                                ABUJA
                            </h3>
                            <a
                                href="https://maps.app.goo.gl/rLWZDrxUeFzkK5z16"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-inverse text-base lg:text-lg leading-[1.6] hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                            >
                                36, Sokode Crescent,<br />
                                Hatlab Place, Wuse<br />
                                Zone 5, Abuja
                            </a>
                        </div>

                        {/* 4. London Address Column */}
                        <div className="flex flex-col gap-[var(--spacing-3)] lg:gap-[var(--spacing-4)] shrink-0">
                            <h3 className="!font-display font-semibold text-xl lg:text-2xl text-inverse uppercase">
                                LONDON
                            </h3>
                            <a
                                href="https://maps.app.goo.gl/UkuNVHV2NuJG4K8w6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-inverse text-base lg:text-lg leading-[1.6] max-w-[246px] hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                            >
                                1-75 Shelton Street,<br />
                                Covent Garden,<br />
                                London WC2H 9JQ
                            </a>
                        </div>

                        {/* 5. Direct Contact & Socials Column (Moved to end) */}
                        <div className="flex flex-col gap-[var(--spacing-5)] lg:gap-[var(--spacing-4)] shrink-0">
                            <p className="text-inverse text-xl lg:text-2xl font-regular whitespace-nowrap">
                                +234 818 432 4791
                            </p>
                            <p className="text-inverse text-xl lg:text-2xl font-regular whitespace-nowrap">
                                info@takeoutmedia.xyz
                            </p>

                            {/* Social Icons */}
                            <div className="flex items-center gap-[var(--spacing-5)] lg:gap-[var(--spacing-6)] mt-[var(--spacing-2)]">
                                {[
                                    InstagramLogo,
                                    TiktokLogo,
                                    XLogo,
                                    LinkedinLogo
                                ].map((Icon, idx) => (
                                    <a key={idx} href="#" className="text-inverse hover:opacity-80 transition-opacity">
                                        <Icon size={28} className="lg:w-[28px] lg:h-[28px]" />
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>


                {/* Bottom Giant "Let's Talk" */}
                <a 
                    href="mailto:info@takeoutmedia.xyz"
                    className="flex items-center gap-[var(--spacing-5)] lg:gap-[var(--spacing-11)] w-fit group cursor-pointer"
                >
                    <h1 className="!font-display font-bold text-inverse group-hover:!text-[var(--color-secondary-500)] transition-colors duration-300 !text-[14.5vw] lg:!text-[18.4vw] leading-none whitespace-nowrap">
                        Let's Talk
                    </h1>
                    <div className="group-hover:translate-x-3 transition-transform duration-300 shrink-0 lg:mt-[var(--spacing-2)] flex items-center justify-center">
                        <ArrowCircleRight
                            weight="fill"
                            className="text-inverse group-hover:!text-[var(--color-secondary-500)] transition-colors duration-300 w-[48px] h-[48px] lg:w-[68.9px] lg:h-[68.9px] shrink-0"
                        />
                    </div>
                </a>

            </div>

        </section>
    );
}

export default Footer;
