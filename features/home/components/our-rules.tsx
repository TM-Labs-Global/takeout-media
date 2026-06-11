"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Books, Cross, Mountains, Target, RocketLaunch } from "@phosphor-icons/react";
import { AnimatedServiceCard } from "@/shared/components/ui";

const initialRules = [
  { 
    text: "Hunger", 
    description: "We stay hungry, learning faster than the competition can blink.",
    Icon: Books
  },
  { 
    text: "Big Hairy Goals", 
    description: "Our eyes are set on outrageous, history-making goals that scare the competition and excite us.",
    Icon: RocketLaunch
  },
  { 
    text: "Love", 
    description: "We lead with love, because even the greatest teams run on loyalty and trust.",
    Icon: Heart
  },
  { 
    text: "Spirituality", 
    description: "Our edge goes deeper than logic, we're fuelled by purpose.",
    Icon: Cross
  },
  { 
    text: "Impact", 
    description: "If it doesn't move the needle, we don't waste the bite.",
    Icon: Target
  },
  { 
    text: "Impossibility Mentality", 
    description: "Impossible is just a word we use for our warm-up laps.",
    Icon: Mountains
  }
];

const slotColors = [
  "#e6e6e6", // Slot 1 (Top)
  "#bbbaba", // Slot 2
  "#e0663d", // Slot 3 (Active Focus)
  "#bbbaba", // Slot 4
  "#e6e6e6", // Slot 5
  "#e6e6e6"  // Slot 6 (Hidden base color, stays invisible via opacity)
];

interface RulesCardProps {
  description: string;
  Icon: React.ComponentType<any>;
  className?: string;
}

// Highly stylized tooltip component using Phosphor Icons
function RulesCard({ description, Icon, className = "" }: RulesCardProps) {
  return (
    <div className={`bg-[#b4d0ff] flex flex-col gap-[40px] items-start p-[32px] rounded-[12px] w-[323px] h-auto shadow-sm ${className}`}>
      {/* Styled Phosphor Icon Container */}
      <div className="shrink-0 text-[#00040c]">
        <Icon size={40} />
      </div>
      
      {/* Text Description */}
      <p className="text-dark-body text-[16px] leading-[24px] font-sans font-medium m-0">
        {description}
      </p>
    </div>
  );
}

export function OurRules() {
  const [items, setItems] = useState(
    initialRules.map((item, i) => ({ id: i + 1, ...item }))
  );
  
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const [hoveredWordId, setHoveredWordId] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const nextId = useRef(initialRules.length + 1);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isMounted || isMobile) return;
    if (isContainerHovered) return;

    const timer = setInterval(() => {
      setItems((prev) => {
        const newItems = [...prev];
        const first = newItems.shift();
        if (first) {
          newItems.push({ ...first, id: nextId.current++ });
        }
        return newItems;
      });
    }, 2500); 

    return () => clearInterval(timer);
  }, [isContainerHovered, isMobile, isMounted]);

  if (isMounted && isMobile) {
    return (
      <section className="w-full bg-white px-[var(--spacing-5)] py-[var(--spacing-15)] overflow-hidden" data-name="Our Values Mobile">
        <div className="w-full flex flex-col gap-[var(--spacing-15)]">
          {/* Header */}
          <div className="flex flex-col gap-[var(--spacing-8)]">
            <h2 className="font-display font-bold h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] text-heading m-0">
              <span className="text-[color:var(--color-primary-500)]">Rules</span> We Play By
            </h2>
            <p className="font-sans font-medium text-[length:var(--text-base)] text-dark-body m-0">
              Sad but true, we're not without a conscience. Even the best have a code. These values keep us sharp as we plot industry domination.
            </p>
          </div>

          {/* Vertical Stack of Cards */}
          <div className="flex flex-col gap-[var(--spacing-5)] w-full">
            {initialRules.map((item, index) => (
              <AnimatedServiceCard 
                key={index} 
                icon={item.Icon}
                title={item.text}
                description={item.description} 
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-[100px] md:py-[180px] overflow-hidden" data-name="Our Values">
      <div className="w-full max-w-[1100px] mx-auto px-[var(--spacing-5)] lg:px-[var(--spacing-8)]">
        <div className="flex flex-col md:flex-row justify-center items-start gap-[60px] md:gap-[60px] w-full">
          
          {/* Left Column */}
          <div className="flex flex-col gap-[24px] md:gap-[35px] mt-[120px] md:mt-[374px] shrink-0">
            <h2 className="font-display font-bold h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] text-heading m-0 whitespace-nowrap">
              Rules We Play By
            </h2>
            <p className="font-sans font-medium p3-main-body-text text-dark-body m-0 max-w-[447px]">
              Sad but true, we’re not without a conscience. Even the best have a code. These values keep us sharp as we plot industry domination.
            </p>
          </div>

          {/* Right Column - Animated Vertical Carousel */}
          <div 
            className="flex flex-col gap-[20px] md:gap-[32px] relative py-[40px] shrink-0"
            onMouseEnter={() => setIsContainerHovered(true)}
            onMouseLeave={() => {
              setIsContainerHovered(false);
              setHoveredWordId(null);
            }}
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: index === 5 ? 0 : 1,
                    color: slotColors[index],
                    y: 0
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -40,
                    color: "#e6e6e6"
                  }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="w-fit origin-left relative cursor-default flex items-center h-[80px] md:h-[120px]"
                  onMouseEnter={() => setHoveredWordId(item.id)}
                >
                  <p 
                    className="font-display font-bold h2-desktop max-md:!text-[length:var(--text-9xl)] max-md:!leading-[length:var(--leading-super-loose)] capitalize m-0 w-fit cursor-pointer"
                    style={{ color: "inherit" }}
                  >
                    {item.text === "Impossibility Mentality" ? (
                      <>
                        Impossibility<br />Mentality
                      </>
                    ) : (
                      item.text
                    )}
                  </p>
                  
                  <AnimatePresence>
                    {hoveredWordId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: -20, zIndex: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0, zIndex: 50 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20, zIndex: 50 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute left-0 md:left-[100%] top-[100%] md:top-[60%] mt-[10px] md:mt-0 pointer-events-none z-50 ${
                          ["Impossibility Mentality", "Spirituality", "Big Hairy Goals"].includes(item.text)
                            ? "md:-ml-[120px]"
                            : "md:-ml-[15px]"
                        }`}
                      >
                        <RulesCard description={item.description} Icon={item.Icon} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

export default OurRules;
