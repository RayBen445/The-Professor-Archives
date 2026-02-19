"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./animated-counter";
import ScrollReveal from "./scroll-reveal";
import { BookOpen, Globe, Calendar, Users } from "lucide-react";

const stats = [
  { icon: BookOpen, end: 6, suffix: "+", label: "Published Stories", color: "from-accent/20 to-accent/5" },
  { icon: Globe, end: 30, suffix: "+", label: "Nations Covered", color: "from-gold/20 to-gold/5" },
  { icon: Calendar, end: 50, suffix: "", label: "Years Documented", color: "from-blue-800/10 to-blue-800/5" },
  { icon: Users, end: 2, suffix: "M+", label: "Soldiers Honored", color: "from-green-700/10 to-green-700/5" },
];

export default function StatsBanner() {
  return (
    <section className="py-16 px-6 bg-parchment border-y border-aged/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`text-center group cursor-default p-6 rounded-2xl bg-gradient-to-b ${stat.color} border border-aged/10 hover:border-accent/20 transition-all duration-300 hover-glow`}
              >
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.2 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cream mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                >
                  <stat.icon className="w-6 h-6 text-accent" />
                </motion.div>
                <p className="font-baby text-3xl md:text-4xl font-bold text-ink">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="text-xs uppercase tracking-wider text-ink-muted mt-1">
                  {stat.label}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
