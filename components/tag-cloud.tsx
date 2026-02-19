"use client";

import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

interface TagCloudProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
}

export default function TagCloud({ tags, onTagClick }: TagCloudProps) {
  const uniqueTags = [...new Set(tags)];
  if (uniqueTags.length === 0) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold flex items-center justify-center gap-2">
              <Tag className="w-3 h-3" />
              Browse by Topic
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {uniqueTags.map((tag, i) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTagClick?.(tag)}
                className="px-4 py-2 bg-parchment border border-aged/20 text-ink-light text-xs font-semibold rounded-full hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300 hover:shadow-md"
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
