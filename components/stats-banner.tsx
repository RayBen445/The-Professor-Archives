"use client";

import AnimatedCounter from "./animated-counter";
import ScrollReveal from "./scroll-reveal";
import { BookOpen, Globe, Calendar, Users } from "lucide-react";

const stats = [
  { icon: BookOpen, end: 6, suffix: "+", label: "Published Stories" },
  { icon: Globe, end: 30, suffix: "+", label: "Nations Covered" },
  { icon: Calendar, end: 50, suffix: "", label: "Years Documented" },
  { icon: Users, end: 2, suffix: "M+", label: "Soldiers Honored" },
];

export default function StatsBanner() {
  return (
    <section className="py-16 px-6 bg-parchment border-y border-aged/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center group cursor-default">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors duration-300 group-hover:scale-110 transform">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <p className="font-baby text-3xl md:text-4xl font-bold text-ink">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </p>
                <p className="text-xs uppercase tracking-wider text-ink-muted mt-1">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
