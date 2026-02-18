"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./scroll-reveal";
import { Quote } from "lucide-react";

export default function QuoteSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-parchment to-cream" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative"
          >
            <Quote className="w-12 h-12 text-gold/40 mx-auto mb-6" />
            <blockquote className="font-baby text-2xl sm:text-3xl md:text-4xl font-bold text-ink leading-snug mb-8 text-balance">
              {'"Until the lion learns to write, every story will glorify the hunter."'}
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-accent" />
              <cite className="text-accent font-semibold not-italic text-sm uppercase tracking-wider">
                African Proverb
              </cite>
              <div className="w-12 h-px bg-accent" />
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
