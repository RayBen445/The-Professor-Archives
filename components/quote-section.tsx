"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./scroll-reveal";
import { Quote, Copy, Check } from "lucide-react";

const quotes = [
  {
    text: "Until the lion learns to write, every story will glorify the hunter.",
    author: "African Proverb",
  },
  {
    text: "The most potent weapon of the oppressor is the mind of the oppressed.",
    author: "Steve Biko",
  },
  {
    text: "A people without the knowledge of their past history, origin and culture is like a tree without roots.",
    author: "Marcus Garvey",
  },
];

export default function QuoteSection() {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const randomQuote = quotes[Math.floor(Date.now() / 86400000) % quotes.length];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `"${randomQuote.text}" - ${randomQuote.author}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={ref}
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-parchment to-cream" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <motion.div
            style={{ y, opacity }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative group cursor-default"
          >
            <Quote className="w-12 h-12 text-gold/40 mx-auto mb-6" />
            <blockquote className="font-baby text-2xl sm:text-3xl md:text-4xl font-bold text-ink leading-snug mb-8 text-balance">
              {`"${randomQuote.text}"`}
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-accent" />
              <cite className="text-accent font-semibold not-italic text-sm uppercase tracking-wider">
                {randomQuote.author}
              </cite>
              <div className="w-12 h-px bg-accent" />
            </div>

            {/* Copy quote button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-parchment/80 border border-aged/20 rounded-full text-xs font-semibold text-ink-muted hover:text-accent hover:border-accent opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-700" />
                  Copied to clipboard
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Quote
                </>
              )}
            </motion.button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
