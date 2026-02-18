"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ChevronRight, ChevronLeft } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

const facts = [
  {
    fact: "Over 2 million Africans served in World War I, many forcibly conscripted by colonial powers to fight in a war not their own.",
    source: "Imperial War Museum",
  },
  {
    fact: "Ethiopia was the only African nation to successfully repel European colonization, defeating Italy at the Battle of Adwa in 1896.",
    source: "African History Extra",
  },
  {
    fact: "The League of Nations handed Germany's African colonies to other European powers as 'mandates' rather than granting them independence.",
    source: "UN Archives",
  },
  {
    fact: "1960 is known as the 'Year of Africa' when 17 nations gained independence from colonial rule in a single year.",
    source: "UNESCO",
  },
  {
    fact: "African soldiers in WWII were often paid less than their European counterparts for the same duties and risks.",
    source: "BBC History",
  },
  {
    fact: "The Berlin Conference of 1884-85 divided Africa among European powers. No African leaders were invited.",
    source: "History.com",
  },
  {
    fact: "Haile Selassie's 1936 speech to the League of Nations warning about fascism went largely unheeded by world leaders.",
    source: "UN Records",
  },
  {
    fact: "The Mau Mau uprising in Kenya (1952-1960) was a pivotal anti-colonial movement that accelerated independence.",
    source: "Kenya National Archives",
  },
];

export default function DidYouKnow() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % facts.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % facts.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + facts.length) % facts.length);
  };

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-cream to-gold/5" />
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="bg-parchment border border-aged/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="p-3 rounded-2xl bg-gold/20">
                <Lightbulb className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-baby text-xl font-bold text-ink">
                  Did You Know?
                </h3>
                <p className="text-xs text-ink-muted uppercase tracking-wider">
                  Historical Facts
                </p>
              </div>
            </div>

            <div className="relative min-h-[120px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -50 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <p className="font-serif text-lg md:text-xl text-ink leading-relaxed mb-4 text-pretty">
                    {facts[current].fact}
                  </p>
                  <p className="text-xs text-accent font-semibold uppercase tracking-wider">
                    Source: {facts[current].source}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-8 relative z-10">
              <div className="flex gap-1.5">
                {facts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-accent w-6"
                        : "bg-aged/40 hover:bg-aged"
                    }`}
                    aria-label={`Fact ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prev}
                  className="p-2 rounded-full border border-aged/30 text-ink-muted hover:text-accent hover:border-accent transition-all duration-300"
                  aria-label="Previous fact"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={next}
                  className="p-2 rounded-full border border-aged/30 text-ink-muted hover:text-accent hover:border-accent transition-all duration-300"
                  aria-label="Next fact"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
