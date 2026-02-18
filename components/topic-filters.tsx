"use client";

import { motion } from "framer-motion";
import {
  Sword,
  Shield,
  Landmark,
  Flag,
  Crown,
  Layers,
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
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category, i) => {
        const config = categoryConfig[category];
        const Icon = config.icon;
        const isActive = activeCategory === category;

        return (
          <motion.button
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(category)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
              isActive
                ? "bg-ink text-cream border-ink shadow-lg shadow-ink/20"
                : "bg-cream text-ink-light border-aged/40 hover:border-accent hover:text-accent hover:shadow-md"
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? "text-gold" : config.color}`} />
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
  );
}
