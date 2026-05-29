"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type ServiceMarqueeItem = {
	text: string;
	Icon: React.ComponentType<any>;
};

type ServiceMarqueeProps = {
	items: ServiceMarqueeItem[];
	className?: string;
	showBackground?: boolean;
};

export function ServiceMarquee({ items, className, showBackground = true }: ServiceMarqueeProps) {
	const trackRef = useRef<HTMLDivElement>(null);
	const marqueeTween = useRef<gsap.core.Tween | null>(null);

	// To make sure one block is wider than the viewport (even with only 3 items),
	// we repeat the items array inside each block (e.g. 3 times).
	const blockItems = items.length < 6 ? [...items, ...items, ...items] : items;

	useGSAP(() => {
		if (!trackRef.current) return;
		// Respect the user's reduced-motion preference
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		// Exact same GSAP logic as clients-marquee: -50% shift on 2 identical blocks
		const tl = gsap.to(trackRef.current, {
			xPercent: -50,
			duration: 32,
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
	}, [blockItems]);

	// Spacing and gap classes to keep visual alignment identical
	const spacingClasses = [
		"flex items-center shrink-0 whitespace-nowrap",
		// Gap between icon and text
		"gap-[var(--spacing-4)]",               // mobile
		"md:gap-[var(--spacing-4)]",            // tablet
		"lg:gap-[var(--spacing-6)]",            // desktop
		// Right padding between items
		"pr-[var(--spacing-10)]",               // mobile:  40px
		"md:pr-[var(--spacing-15)]",            // tablet:  60px
		"lg:pr-[var(--spacing-25)]",            // desktop: 100px
		"2xl:pr-[var(--spacing-30)]",           // large:   120px
	].join(" ");

	return (
		<section
			className={[
				"overflow-hidden flex items-center w-full",
				// Padding: mobile → tablet → desktop → large screen
				"py-[var(--spacing-6)]",       // 0–768px:   24px
				"md:py-[var(--spacing-8)]",    // 769–1024px: 32px
				"lg:py-[var(--spacing-10)]",   // 1025–1440px: 40px
				"2xl:py-[var(--spacing-12)]",  // 1441px+:   48px
				className,
			].filter(Boolean).join(" ")}
			style={showBackground ? {
				background: "linear-gradient(to right, var(--color-tertiary-500), var(--color-primary-500))",
			} : undefined}
			aria-label="Services marquee"
		>
			<div className="flex w-full overflow-hidden whitespace-nowrap pointer-events-auto">
				<div ref={trackRef} className="flex flex-nowrap w-max items-center will-change-transform cursor-pointer">
					
					{/* Block 1 */}
					<div className="flex flex-nowrap items-center shrink-0">
						{blockItems.map((item, index) => (
							<div key={`block1-${index}`} className={spacingClasses}>
								{/* Icon wrapper — sizes scale across breakpoints */}
								<div className={[
									"shrink-0 flex items-center justify-center",
									"w-[var(--spacing-8)] h-[var(--spacing-8)]",        // mobile:  32px
									"md:w-[var(--spacing-10)] md:h-[var(--spacing-10)]", // tablet:  40px
									"lg:w-[var(--spacing-12)] lg:h-[var(--spacing-12)]", // desktop: 48px
								].join(" ")}>
									<item.Icon
										weight="regular"
										color="white"
										className="w-full h-full"
										aria-hidden="true"
									/>
								</div>

								{/* Text — font-size scales across breakpoints */}
								<h1
									className={[
										"display2-desktop text-inverse m-0 whitespace-nowrap", // Prevent text wrapping
										"![font-size:var(--text-5xl)]",             // mobile:   48px
										"md:![font-size:var(--text-8xl)]",          // tablet:   60px
										"lg:![font-size:var(--text-display2)]",     // desktop:  100px
										"2xl:![font-size:var(--text-6xl)]",         // large:    120px
									].join(" ")}
									style={{ lineHeight: 1 }}
								>
									{item.text}
								</h1>
							</div>
						))}
					</div>

					{/* Block 2 (Duplicate) */}
					<div className="flex flex-nowrap items-center shrink-0" aria-hidden="true">
						{blockItems.map((item, index) => (
							<div key={`block2-${index}`} className={spacingClasses}>
								{/* Icon wrapper — sizes scale across breakpoints */}
								<div className={[
									"shrink-0 flex items-center justify-center",
									"w-[var(--spacing-8)] h-[var(--spacing-8)]",        // mobile:  32px
									"md:w-[var(--spacing-10)] md:h-[var(--spacing-10)]", // tablet:  40px
									"lg:w-[var(--spacing-12)] lg:h-[var(--spacing-12)]", // desktop: 48px
								].join(" ")}>
									<item.Icon
										weight="regular"
										color="white"
										className="w-full h-full"
										aria-hidden="true"
									/>
								</div>

								{/* Text — font-size scales across breakpoints */}
								<h1
									className={[
										"display2-desktop text-inverse m-0 whitespace-nowrap", // Prevent text wrapping
										"![font-size:var(--text-5xl)]",             // mobile:   48px
										"md:![font-size:var(--text-8xl)]",          // tablet:   60px
										"lg:![font-size:var(--text-display2)]",     // desktop:  100px
										"2xl:![font-size:var(--text-6xl)]",         // large:    120px
									].join(" ")}
									style={{ lineHeight: 1 }}
								>
									{item.text}
								</h1>
							</div>
						))}
					</div>

				</div>
			</div>
		</section>
	);
}

export default ServiceMarquee;
