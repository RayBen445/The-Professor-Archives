"use client";

import { motion } from "framer-motion";
import { ChevronDown, BookOpen, Globe, Scroll } from "lucide-react";
import AnimatedCounter from "./animated-counter";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/50 to-cream" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/60 via-transparent to-cream/60" />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-32 left-[15%] opacity-20"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Scroll className="w-12 h-12 text-accent" />
      </motion.div>
      <motion.div
        className="absolute top-48 right-[20%] opacity-15"
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <Globe className="w-16 h-16 text-aged-dark" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-[25%] opacity-15"
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <BookOpen className="w-10 h-10 text-gold" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Uncovering Hidden Narratives
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-baby text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-ink leading-[0.95] tracking-tight mb-6 text-balance"
        >
          The Uncovered{" "}
          <span className="relative inline-block">
            <span className="relative z-10">History</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="absolute bottom-2 left-0 right-0 h-3 bg-gold/30 origin-left -z-0"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-ink-light max-w-2xl mx-auto leading-relaxed mb-10 text-pretty"
        >
          Global events. African perspectives.{" "}
          <span className="text-accent font-semibold italic">
            Explained vividly.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#articles"
            className="group flex items-center gap-2 px-8 py-4 bg-ink text-cream font-semibold rounded-full hover:bg-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 hover:scale-105 active:scale-95"
          >
            <BookOpen className="w-4 h-4 transition-transform group-hover:rotate-12" />
            Explore the Archives
          </a>
          <a
            href="#timeline"
            className="flex items-center gap-2 px-8 py-4 border-2 border-ink/20 text-ink font-semibold rounded-full hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Browse Timeline
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {[
            { end: 5, suffix: "+", label: "Topics Covered" },
            { end: 50, suffix: "+", label: "Years of History" },
            { end: 1914, suffix: "", label: "Starting Year", prefix: "" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-baby text-3xl sm:text-4xl font-bold text-accent">
                <AnimatedCounter
                  end={stat.end}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                />
              </p>
              <p className="text-xs uppercase tracking-wider text-ink-muted mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a
          href="#featured"
          className="flex flex-col items-center gap-2 text-ink-muted hover:text-accent transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
}
