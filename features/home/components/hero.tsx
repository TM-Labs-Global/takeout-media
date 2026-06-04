// import Image from 'next/image';

// export function Hero() {
//     return (
//         <main className="w-full bg-page">
//             {/* ── Hero Banner ── */}
//             <section className="relative w-full h-[420px] md:h-[500px] lg:h-[656px] overflow-hidden">
//                 <Image
//                     className="w-full h-full object-cover block"
//                     src="/pictures/nis/stage.jpg"
//                     alt="Man in glasses representing Takeout Media's team"
//                     fill
//                     priority
//                 />
//
//                 {/* Overlay: use Tailwind color utilities, no hex in JSX */}
//                 <div className="absolute inset-0 opacity-60 bg-gradient-to-b from-black/10 to-black z-10" aria-hidden="true" />
//
//                 {/* Headline: positioned above overlay with explicit z-index */}
//                 <h1 className="absolute z-20 left-6 bottom-10 md:left-16 lg:left-30 lg:bottom-20 h1-desktop md:text-5xl lg:text-7xl italic font-semibold text-inverse">
//                     We&apos;ll help you <span className="text-brand">outthink, outpace,</span> and <span className="text-brand">outlast</span> the competition.
//                 </h1>
//             </section>
//
//             {/* ── About Blurb ── */}
//             <section className="flex flex-col gap-6 w-full lg:w-[733px] ml-auto px-6 py-10 md:p-16 lg:pt-24 lg:pb-24 lg:pr-30 lg:pl-0">
//                 <p className="p1 text-default">
//                     At Takeout Media, we are relentlessly effective problem-solvers who help ambitious brands outthink, outpace, and outlast their competition. In the industry, we are known to be ruthlessly effective and ridiculously creative.
//                 </p>
//                 <p className="p1 text-default">
//                     But for the sake of conversation, you can call us a technology driven full-service communications and advertising company.
//                 </p>
//             </section>
//         </main>
//     );
// }
//
// export default Hero;


import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';
import { PlanetarySlice, SplitText } from '@/shared/components/ui';

const HERO_IMAGES = [
	'/pictures/hero-images/01-tokubo.webp',
	'/pictures/hero-images/02-tokunbo.webp',
	'/pictures/hero-images/03-riple.webp',
	'/pictures/hero-images/04-riple-.webp',
	'/pictures/hero-images/05-surwash.webp',
	'/pictures/hero-images/06-totalenergies.webp',
	'/pictures/hero-images/07-ripple.webp',
	'/pictures/hero-images/08-surwash.webp',
	'/pictures/hero-images/09-nis.webp',
	'/pictures/hero-images/10-nis-entrance.webp',
	'/pictures/hero-images/11-nis-governor-entrance.webp',
];

export function Hero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);

	useGSAP((context) => {
		if (!headingRef.current) return;

		// --- 1. Setup Heading Split ---
		const headSplit = new SplitType(headingRef.current, {
			types: 'chars',
			tagName: 'span'
		});

		const headChars = headingRef.current.querySelectorAll('.char');

		// Hide initial containers to prevent FOUC
		gsap.set(headingRef.current, { opacity: 1 });

		// --- 2. Entrance Timeline (Heading Only) ---
		const entranceTl = gsap.timeline({ delay: 0.3 });

		entranceTl.from(headChars, {
			opacity: 0,
			duration: 0.3,
			ease: 'power1.out',
			stagger: { amount: 0.8 }
		});

		// --- 3. Scramble Loop (Starts after heading entrance) ---
		entranceTl.add(() => {
			headSplit.revert();

			const targetSpan = headingRef.current?.querySelector('.scramble-word') as HTMLElement;
			if (!targetSpan) return;

			const words = ["Outthink,", "Outpace,", "Outlast,"];
			let currentIndex = 0;
			const scrambleChars = "ABCDEF0123456789";

			const performScramble = (targetWord: string) => {
				if (!targetSpan) return;
				const currentText = targetSpan.textContent || "";
				const maxLength = Math.max(currentText.length, targetWord.length);
				const obj = { progress: 0 };

				gsap.to(obj, {
					progress: 1,
					duration: 0.6,
					ease: "none",
					onUpdate: () => {
						if (!targetSpan) return;
						let result = "";
						for (let i = 0; i < maxLength; i++) {
							if (Math.random() < obj.progress) {
								result += targetWord[i] || "";
							} else {
								result += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
							}
						}
						targetSpan.textContent = result;
					}
				});
			};

			const startLoop = () => {
				const timer = gsap.delayedCall(2.5, () => {
					currentIndex = (currentIndex + 1) % words.length;
					performScramble(words[currentIndex]);
					startLoop();
				});
				context.add(() => timer);
			};

			startLoop();
		});

		return () => {
			headSplit.revert();
			gsap.killTweensOf("*");
		};
	}, { scope: containerRef });

	return (
		<section ref={containerRef} className="relative w-full min-h-[100vh] bg-secondary-500 overflow-hidden">
			{/* WebGL Planetary Slice Animation */}
			<PlanetarySlice images={HERO_IMAGES} />
			{/* Gradient Overlay */}
			<div className="absolute inset-0 gradient-overlay-dark" aria-hidden="true" />

			{/* Content Container */}
			<div className="relative z-10 w-full min-h-screen flex flex-col justify-end px-[var(--spacing-5)] md:px-[var(--spacing-25)] lg:px-[var(--spacing-30)] pb-[var(--spacing-25)]">
				<div className="flex flex-col md:flex-row justify-between items-start gap-[var(--spacing-6)] md:gap-[var(--spacing-10)] lg:gap-[var(--spacing-15)]">
					{/* Heading - Manual GSAP + Scramble */}
					<h1
						ref={headingRef}
						className="h1-desktop !text-[2.65rem] !leading-[1.15] md:!text-[length:var(--text-7xl)] md:!leading-[length:var(--leading-giant)] text-inverse max-w-[1000px] opacity-0 !normal-case m-0"
					>
						{/* Line 1 */}
						<span className="block">We&apos;ll Help You</span>
						{/* Line 2 – scramble word */}
						<span className="scramble-word text-brand inline-block w-[8rem] md:w-[12rem] lg:w-[22rem] transition-none text-left">Outthink,</span>
						{/* Line 3 */}
						<span className="block">The Competition.</span>
					</h1>

					{/* Description Block - Using new reusable component */}
					<div className="flex flex-col gap-[var(--spacing-4)] md:gap-[var(--spacing-4)] lg:gap-[var(--spacing-6)] w-full md:w-[380px] lg:w-[484px] flex-shrink-0 md:mt-4">
						{/* Paragraph 1 – shown on all screen sizes */}
						<SplitText
							variant="fade"
							type="words"
							delay={0.8}
							threshold={1}
							className="p3-main-body-text text-inverse"
						>
							At Takeout Media, we are relentlessly effective problem-solvers who help ambitious brands outthink, outpace, and outlast their competition. In the industry, we are known to be ruthlessly effective and ridiculously creative.
						</SplitText>
						{/* Paragraph 2 – hidden on mobile, visible md+ */}
						<div className="hidden md:block">
							<SplitText
								variant="fade"
								type="words"
								delay={1.0}
								threshold={1}
								className="p3-main-body-text text-inverse mb-0"
							>
								But for the sake of conversation, you can call us a technology driven full-service communications and advertising company.
							</SplitText>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
