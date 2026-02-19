"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TrendingUp, ChevronRight, Flame } from "lucide-react";
import type { Article } from "@/lib/types";

interface TrendingBarProps {
  articles: Article[];
}

export default function TrendingBar({ articles }: TrendingBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trending = articles.slice(0, 5);

  useEffect(() => {
    if (trending.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trending.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [trending.length]);

  if (trending.length === 0) return null;

  return (
    <div className="bg-ink text-cream py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-gold shrink-0">
          <Flame className="w-3.5 h-3.5" />
          <span className="text-xs font-bold uppercase tracking-wider">Trending</span>
        </div>
        <div className="h-4 w-px bg-aged/30 shrink-0" />
        <div className="overflow-hidden flex-1 h-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/articles/${trending[currentIndex].slug}`}
                className="flex items-center gap-2 text-sm text-cream/80 hover:text-gold transition-colors group"
              >
                <span className="text-gold/60 text-xs font-mono">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="truncate">{trending[currentIndex].title}</span>
                <ChevronRight className="w-3 h-3 text-gold/50 group-hover:text-gold shrink-0 transition-colors" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="hidden sm:flex items-center gap-1 shrink-0">
          {trending.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === currentIndex ? "bg-gold w-4" : "bg-aged/40 hover:bg-aged/60"
              }`}
              aria-label={`Go to trending article ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
