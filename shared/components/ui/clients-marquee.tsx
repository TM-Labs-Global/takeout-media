"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export type ClientsMarqueeItem = {
  src: string;
  alt: string;
  className?: string;
  href?: string;
};

type ClientsMarqueeProps = {
  title: React.ReactNode;
  items: ClientsMarqueeItem[];
  className?: string;
  titleClassName?: string;
};

export function ClientsMarquee({
  title,
  items,
  className,
  titleClassName,
}: ClientsMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<(HTMLImageElement | null)[]>([]);
  const marqueeTween = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!trackRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 35,
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
    <section
      className={[
        "bg-[var(--bg-surface)] w-full overflow-hidden flex flex-col items-center gap-[var(--spacing-10)] md:gap-[var(--spacing-20)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        className={[
          "text-heading text-9xl md:text-8xl text-center m-0",
          titleClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {title}
      </div>

      <div className="flex w-full overflow-hidden whitespace-nowrap pointer-events-auto">
        <div ref={trackRef} className="flex flex-nowrap w-max will-change-transform cursor-pointer py-[var(--spacing-4)]">
          {/* First Block */}
          <div className="flex gap-[var(--spacing-10)] items-center shrink-0 pr-[var(--spacing-10)]">
            {items.map((logo, index) => {
              const img = (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`shrink-0 object-contain transition-transform ${logo.className ?? ""}`}
                  loading="eager"
                  style={{ height: "100%", width: "auto", maxWidth: "100%" }}
                  ref={(el) => { logoRefs.current[index] = el; }}
                  onMouseEnter={() => gsap.to(logoRefs.current[index], { scale: 1.15, duration: 0.3, ease: "power2.out" })}
                  onMouseLeave={() => gsap.to(logoRefs.current[index], { scale: 1, duration: 0.3, ease: "power2.in" })}
                />
              );

              return (
                <div key={`${logo.src}-1-${index}`} className="shrink-0 w-[120px] md:w-[160px] flex justify-center items-center h-[40px]">
                  {logo.href ? (
                    <a href={logo.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-full w-full">
                      {img}
                    </a>
                  ) : img}
                </div>
              );
            })}
          </div>

          {/* Second Block (Duplicate) */}
          <div className="flex gap-[var(--spacing-10)] items-center shrink-0 pr-[var(--spacing-10)]" aria-hidden="true">
            {items.map((logo, index) => {
              const img = (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`shrink-0 object-contain transition-transform ${logo.className ?? ""}`}
                  loading="eager"
                  style={{ height: "100%", width: "auto", maxWidth: "100%" }}
                  ref={(el) => { logoRefs.current[items.length + index] = el; }}
                  onMouseEnter={() => gsap.to(logoRefs.current[items.length + index], { scale: 1.15, duration: 0.3, ease: "power2.out" })}
                  onMouseLeave={() => gsap.to(logoRefs.current[items.length + index], { scale: 1, duration: 0.3, ease: "power2.in" })}
                />
              );

              return (
                <div key={`${logo.src}-2-${index}`} className="shrink-0 w-[120px] md:w-[160px] flex justify-center items-center h-[40px]">
                  {logo.href ? (
                    <a href={logo.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-full w-full">
                      {img}
                    </a>
                  ) : img}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}