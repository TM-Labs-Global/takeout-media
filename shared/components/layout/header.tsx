"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

/**
 * Header Component
 * 
 * Global navigation header.
 * Transparent at the top of the page, restores its background once the user scrolls.
 */
export function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Run once on mount in case page loads mid-scroll
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'HOME', href: '/' },
        { name: 'ABOUT US', href: '/about-us' },
        { name: 'OUR WORKS', href: '/our-works' },
        { name: 'CONTACT US', href: '/contact' },
    ];

    return (
        <header
            className="fixed top-0 left-0 w-full z-50 px-[var(--spacing-5)] py-[var(--spacing-4)] md:px-[var(--spacing-8)] lg:px-[var(--spacing-30)] transition-all duration-300 ease-in-out"
        >
            {/* Background Overlay for Smooth Gradient Fade */}
            <div 
                className="absolute inset-0 z-[-1] transition-opacity duration-300 shadow-lg"
                style={{
                    background: 'linear-gradient(to right, var(--color-tertiary-500), var(--color-primary-500))',
                    opacity: isScrolled ? 1 : 0
                }}
            />

            <div className="w-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image 
                        src={isScrolled ? "/pictures/logos/takeout-media-logo-white.svg" : "/pictures/takeout-media-stacked-logo.svg"}
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

                {/* Mobile Menu Toggle (Placeholder) */}
                <button className="md:hidden text-heading p-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
            </div>
        </header>
    );
}

export default Header;
