"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TimelineEvent } from "@/lib/types";
import ScrollReveal from "./scroll-reveal";

const categoryColors: Record<string, string> = {
  WWI: "bg-red-700",
  WWII: "bg-amber-700",
  "League of Nations": "bg-blue-800",
  Independence: "bg-green-700",
};

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-24 px-6 bg-ink relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(197,165,90,0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(139,69,19,0.2) 0%, transparent 50%)`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold">
              Journey Through Time
            </span>
            <h2 className="font-baby text-4xl md:text-5xl font-bold text-cream mt-3 mb-4 text-balance">
              The Timeline
            </h2>
            <p className="text-aged max-w-xl mx-auto text-pretty">
              From the first shots of the Great War to the birth of free African nations
              — trace the connected threads of history.
            </p>
          </div>
        </ScrollReveal>

        {/* Navigation arrows */}
        <div className="flex justify-end gap-2 mb-8">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-full border border-aged/30 text-aged hover:text-gold hover:border-gold transition-all duration-300 hover:bg-gold/10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-full border border-aged/30 text-aged hover:text-gold hover:border-gold transition-all duration-300 hover:bg-gold/10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline track */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-thin pb-8 -mx-6 px-6"
          style={{ scrollbarWidth: "thin" }}
        >
          <div className="relative flex items-start gap-0 min-w-max">
            {/* Connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-[42px] left-0 right-0 h-0.5 bg-gradient-to-r from-red-700/50 via-gold/50 to-green-700/50 origin-left"
            />

            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center w-[300px] flex-shrink-0 cursor-pointer group"
                onMouseEnter={() => setActiveEvent(event.id)}
                onMouseLeave={() => setActiveEvent(null)}
              >
                {/* Year */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="font-baby text-3xl font-bold text-gold mb-3 transition-colors group-hover:text-cream"
                >
                  {event.year}
                </motion.div>

                {/* Dot */}
                <div className="relative z-10 mb-6">
                  <motion.div
                    animate={
                      activeEvent === event.id
                        ? { scale: 1.5, boxShadow: "0 0 20px rgba(197,165,90,0.5)" }
                        : { scale: 1 }
                    }
                    className={`w-4 h-4 rounded-full border-2 border-gold ${
                      categoryColors[event.category] || "bg-gold"
                    }`}
                  />
                </div>

                {/* Card */}
                <motion.div
                  animate={activeEvent === event.id ? { y: -5 } : { y: 0 }}
                  className="bg-ink border border-aged/20 rounded-xl p-6 mx-4 hover:border-gold/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gold/10"
                >
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-cream mb-3 ${
                      categoryColors[event.category] || "bg-gold"
                    }`}
                  >
                    {event.category}
                  </span>
                  <h3 className="font-baby text-lg font-bold text-cream mb-2 group-hover:text-gold transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-aged text-sm leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
