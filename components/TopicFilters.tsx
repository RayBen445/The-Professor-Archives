"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sword,
  Shield,
  Landmark,
  Flag,
  Crown,
  Layers,
  MapPin,
  Music,
  Trophy,
  Snowflake,
  Dumbbell,
  Cpu,
  Heart,
  Castle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Category } from "@/lib/types";

const categoryConfig: Record<
  Category,
  { icon: React.ElementType; color: string }
> = {
  All: { icon: Layers, color: "text-ink" },
  WWI: { icon: Sword, color: "text-red-700" },
  WWII: { icon: Shield, color: "text-amber-700" },
  "League of Nations": { icon: Landmark, color: "text-blue-800" },
  Independence: { icon: Flag, color: "text-green-700" },
  "The Commonwealth": { icon: Crown, color: "text-purple-700" },
  Nigeria: { icon: MapPin, color: "text-emerald-700" },
  Grammy: { icon: Music, color: "text-yellow-700" },
  "Guinness Records": { icon: Trophy, color: "text-sky-700" },
  "Cold War": { icon: Snowflake, color: "text-slate-600" },
  Sports: { icon: Dumbbell, color: "text-orange-700" },
  "Science & Tech": { icon: Cpu, color: "text-cyan-700" },
  "Women in History": { icon: Heart, color: "text-pink-700" },
  "European History": { icon: Castle, color: "text-stone-600" },
};

interface TopicFiltersProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  categories: Category[];
}

export default function TopicFilters({
  activeCategory,
  onCategoryChange,
  categories,
}: TopicFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Scroll shadows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-cream/90 border border-aged/20 rounded-full shadow-md hover:bg-cream transition-colors hidden md:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 text-ink" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 bg-cream/90 border border-aged/20 rounded-full shadow-md hover:bg-cream transition-colors hidden md:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 text-ink" />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-2.5 overflow-x-auto scrollbar-none pb-2 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {categories.map((category, i) => {
          const config = categoryConfig[category];
          const Icon = config?.icon || Layers;
          const isActive = activeCategory === category;

          return (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 border whitespace-nowrap shrink-0 ${
                isActive
                  ? "bg-ink text-cream border-ink shadow-lg shadow-ink/20"
                  : "bg-cream text-ink-light border-aged/40 hover:border-accent hover:text-accent hover:shadow-md"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-gold" : config?.color || "text-ink"}`} />
              {category}
              {isActive && (
                <motion.span
                  layoutId="filter-indicator"
                  className="w-1.5 h-1.5 rounded-full bg-gold"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
