"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Sword, Shield, Landmark, Flag, Crown } from "lucide-react";
import ScrollReveal from "./scroll-reveal";
import { CATEGORY_IMAGES } from "@/lib/types";

const categories = [
  {
    name: "World War I",
    key: "WWI",
    icon: Sword,
    description: "Africa's forgotten role in the Great War",
    color: "from-red-900/80 to-red-700/60",
  },
  {
    name: "World War II",
    key: "WWII",
    icon: Shield,
    description: "African soldiers who shaped the outcome",
    color: "from-amber-900/80 to-amber-700/60",
  },
  {
    name: "League of Nations",
    key: "League of Nations",
    icon: Landmark,
    description: "Promises made and broken",
    color: "from-blue-900/80 to-blue-800/60",
  },
  {
    name: "Independence",
    key: "Independence",
    icon: Flag,
    description: "The triumphant march to freedom",
    color: "from-green-900/80 to-green-700/60",
  },
  {
    name: "The Commonwealth",
    key: "The Commonwealth",
    icon: Crown,
    description: "Legacy, power, and modern ties",
    color: "from-purple-900/80 to-purple-700/60",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold">
              Dive Deeper
            </span>
            <h2 className="font-baby text-4xl md:text-5xl font-bold text-ink mt-3 mb-4 text-balance">
              Explore by Era
            </h2>
            <p className="text-ink-light max-w-xl mx-auto text-pretty">
              Each era holds stories that shaped the modern world. Choose your journey.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.key} delay={i * 0.1}>
              <motion.a
                href={`#articles`}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden block"
              >
                <Image
                  src={CATEGORY_IMAGES[cat.key] || "/images/hero-bg.jpg"}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${cat.color} group-hover:opacity-90 transition-opacity duration-300`}
                />

                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <motion.div
                    className="mb-auto mt-4 self-start"
                    whileHover={{ rotate: 12 }}
                  >
                    <div className="p-2.5 bg-cream/20 backdrop-blur-sm rounded-xl">
                      <cat.icon className="w-5 h-5 text-cream" />
                    </div>
                  </motion.div>

                  <div>
                    <h3 className="font-baby text-lg font-bold text-cream mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-cream/70 text-xs leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-gold text-xs font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Explore
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
