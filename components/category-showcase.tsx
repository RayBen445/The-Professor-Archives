"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Sword, Shield, Landmark, Flag, Crown, MapPin, Music, Trophy, Snowflake, Castle } from "lucide-react";
import ScrollReveal from "./scroll-reveal";
import { CATEGORY_IMAGES } from "@/lib/types";

const categories = [
  { name: "World War I", key: "WWI", icon: Sword, description: "Africa's forgotten role in the Great War", color: "from-red-900/80 to-red-700/60" },
  { name: "World War II", key: "WWII", icon: Shield, description: "African soldiers who shaped the outcome", color: "from-amber-900/80 to-amber-700/60" },
  { name: "League of Nations", key: "League of Nations", icon: Landmark, description: "Promises made and broken", color: "from-blue-900/80 to-blue-800/60" },
  { name: "Independence", key: "Independence", icon: Flag, description: "The triumphant march to freedom", color: "from-green-900/80 to-green-700/60" },
  { name: "The Commonwealth", key: "The Commonwealth", icon: Crown, description: "Legacy, power, and modern ties", color: "from-purple-900/80 to-purple-700/60" },
  { name: "Nigeria", key: "Nigeria", icon: MapPin, description: "Giant of Africa's incredible story", color: "from-emerald-900/80 to-emerald-600/60" },
  { name: "Grammy Awards", key: "Grammy", icon: Music, description: "Music's highest honor through the ages", color: "from-yellow-900/80 to-yellow-600/60" },
  { name: "Guinness Records", key: "Guinness Records", icon: Trophy, description: "The most extraordinary human achievements", color: "from-sky-900/80 to-sky-600/60" },
  { name: "Cold War", key: "Cold War", icon: Snowflake, description: "Espionage, tension, and proxy conflicts", color: "from-slate-900/80 to-slate-600/60" },
  { name: "European History", key: "European History", icon: Castle, description: "The continent that shaped the modern world", color: "from-stone-900/80 to-stone-600/60" },
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
              Explore by Era & Topic
            </h2>
            <p className="text-ink-light max-w-xl mx-auto text-pretty">
              Each era holds stories that shaped the modern world. Choose your journey through history.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.key} delay={i * 0.06}>
              <motion.a
                href="#articles"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden block"
              >
                <Image
                  src={CATEGORY_IMAGES[cat.key] || "/images/hero-bg.jpg"}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} group-hover:opacity-90 transition-opacity duration-300`} />

                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <motion.div className="mb-auto mt-3 self-start" whileHover={{ rotate: 12 }}>
                    <div className="p-2 bg-cream/20 backdrop-blur-sm rounded-xl">
                      <cat.icon className="w-4 h-4 text-cream" />
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="font-baby text-sm lg:text-base font-bold text-cream mb-1">{cat.name}</h3>
                    <p className="text-cream/60 text-[10px] leading-relaxed line-clamp-2">{cat.description}</p>
                    <div className="mt-2 flex items-center gap-1 text-gold text-[10px] font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Explore <ArrowUpRight className="w-2.5 h-2.5" />
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
