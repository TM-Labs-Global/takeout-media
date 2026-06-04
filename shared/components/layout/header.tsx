"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { InstagramLogo, FacebookLogo, YoutubeLogo, LinkedinLogo } from "@phosphor-icons/react";

/**
 * Header Component
 * 
 * Global navigation header.
 * Transparent at the top of the page, restores its background once the user scrolls.
 */
export function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Run once on mount in case page loads mid-scroll
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'ABOUT US', href: '/about-us' },
        { name: 'OUR WORKS', href: '/our-works' },
        { name: 'CONTACT US', href: '/contact' },
    ];

    return (
        <>
            <header
                className="fixed top-0 left-0 w-full z-50 px-[var(--spacing-5)] py-[var(--spacing-4)] md:px-[var(--spacing-8)] lg:px-[var(--spacing-30)] transition-all duration-300 ease-in-out"
            >
                {/* Background Overlay for Smooth Gradient Fade */}
                <div 
                    className="absolute inset-0 z-[-1] transition-opacity duration-300 shadow-lg"
                    style={{
                        background: 'linear-gradient(to right, var(--color-tertiary-500), var(--color-primary-500))',
                        opacity: isScrolled && !isMobileMenuOpen ? 1 : 0
                    }}
                />

                <div className="w-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 z-[60] relative" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image 
                            src={(isScrolled || isMobileMenuOpen) ? "/pictures/logos/takeout-media-white-logo.png" : "/pictures/logos/takeout-media-logo.png"}
                            alt="Takeout Media Logo" 
                            width={120} 
                            height={48} 
                            className="w-[100px] lg:w-[120px] h-auto"
                        />
                    </Link>

                    {/* Navigation */}
                    <nav className={`hidden md:flex items-center transition-all duration-300 ${
                        isScrolled ? 'gap-[var(--spacing-10)]' : 'gap-[var(--spacing-3)]'
                    }`}>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const isContact = link.name === 'CONTACT US';
                            return (
                                <Link 
                                    key={link.href}
                                    href={link.href}
                                    className={
                                        isScrolled 
                                            ? `inline-flex items-center text-sm lg:text-base tracking-wider transition-all duration-300 text-white hover:opacity-80 !font-display ${
                                                isActive ? 'font-bold' : 'font-normal'
                                            }`
                                            : isContact
                                                ? `btn btn-md transition-all duration-300 bg-white !text-heading hover:bg-neutral-50 !font-display`
                                                : `btn btn-md transition-all duration-300 btn-primary !font-display`
                                    }
                                    style={
                                        isScrolled 
                                            ? { 
                                                paddingTop: '6px', 
                                                paddingBottom: '6px', 
                                                paddingLeft: '0px', 
                                                paddingRight: '0px', 
                                                border: 'none', 
                                                boxShadow: 'none',
                                                background: 'transparent'
                                              } 
                                            : { 
                                                paddingTop: '12px', 
                                                paddingBottom: '12px', 
                                                border: 'none', 
                                                boxShadow: 'none' 
                                              }
                                    }
                                >
                                    <span className="btn-label-wrapper">
                                        <span className="btn-label-text">{link.name}</span>
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                        className={`md:hidden p-2 z-[60] relative transition-colors duration-300 focus:outline-none ${
                            isMobileMenuOpen || isScrolled ? 'text-white' : 'text-heading'
                        }`}
                        aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                    >
                        {isMobileMenuOpen ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            <div 
                className={`fixed inset-0 z-40 bg-[#000c1b]/96 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden flex flex-col justify-between p-[var(--spacing-8)] pt-[120px] ${
                    isMobileMenuOpen 
                        ? 'opacity-100 pointer-events-auto translate-y-0' 
                        : 'opacity-0 pointer-events-none -translate-y-5'
                }`}
            >
                {/* Navigation Links */}
                <div className="flex flex-col gap-[var(--spacing-6)] mt-[var(--spacing-10)]">
                    {navLinks.map((link, index) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link 
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`font-display text-4xl tracking-wider font-semibold transition-all duration-500 transform ${
                                    isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                }`}
                                style={{ 
                                    transitionDelay: `${index * 75}ms`,
                                    color: isActive ? 'var(--color-primary-500)' : 'var(--color-white)' 
                                }}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Contact/Social Footer */}
                <div className={`flex flex-col gap-[var(--spacing-4)] border-t border-white/10 pt-[var(--spacing-8)] mb-[var(--spacing-4)] transition-all duration-500 delay-300 ${
                    isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                    <p className="font-sans text-xs tracking-widest text-neutral-400 uppercase">GET IN TOUCH</p>
                    <a href="mailto:info@takeoutmedia.xyz" className="font-display text-lg text-white hover:text-[var(--color-primary-500)] transition-colors">
                        info@takeoutmedia.xyz
                    </a>
                    <a href="tel:+2348184324791" className="font-display text-lg text-white hover:text-[var(--color-primary-500)] transition-colors">
                        +234 818 432 4791
                    </a>
                    
                    {/* Social Icons */}
                    <div className="flex items-center gap-[var(--spacing-5)] mt-[var(--spacing-2)]">
                        {[
                            { Icon: InstagramLogo, href: "https://www.instagram.com/takeout.media/" },
                            { Icon: FacebookLogo, href: "https://www.facebook.com/takeoutmediaagency" },
                            { Icon: YoutubeLogo, href: "https://www.youtube.com/c/TakeoutMediaStudios" },
                            { Icon: LinkedinLogo, href: "https://www.linkedin.com/company/takeout-media/" }
                        ].map(({ Icon, href }, idx) => (
                            <a 
                                key={idx} 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-white hover:text-[var(--color-primary-500)] transition-colors"
                            >
                                <Icon size={24} />
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-[var(--spacing-4)] mt-2">
                        <span className="w-8 h-px bg-white/30"></span>
                        <span className="text-xs text-neutral-400 font-sans tracking-wider">TAKEOUT MEDIA © {new Date().getFullYear()}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
