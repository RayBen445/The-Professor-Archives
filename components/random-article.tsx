"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shuffle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/types";
import ScrollReveal from "./scroll-reveal";

interface RandomArticleProps {
  articles: Article[];
}

export default function RandomArticle({ articles }: RandomArticleProps) {
  const [rolling, setRolling] = useState(false);
  const [selected, setSelected] = useState<Article | null>(null);

  const pickRandom = () => {
    if (articles.length === 0) return;
    setRolling(true);
    let count = 0;
    const interval = setInterval(() => {
      setSelected(articles[Math.floor(Math.random() * articles.length)]);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setRolling(false);
        setSelected(articles[Math.floor(Math.random() * articles.length)]);
      }
    }, 100);
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center">
            <h3 className="font-baby text-2xl font-bold text-ink mb-3">
              Feeling Curious?
            </h3>
            <p className="text-ink-light text-sm mb-6">
              Let fate choose your next read from the archives
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={pickRandom}
              disabled={rolling}
              className="inline-flex items-center gap-3 px-8 py-4 bg-ink text-cream font-semibold rounded-full hover:bg-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 disabled:opacity-70"
            >
              <motion.div
                animate={rolling ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  rolling
                    ? { duration: 0.5, repeat: Infinity, ease: "linear" }
                    : {}
                }
              >
                <Shuffle className="w-5 h-5" />
              </motion.div>
              {rolling ? "Choosing..." : "Explore Random Article"}
            </motion.button>

            {selected && !rolling && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mt-8 p-6 bg-parchment border border-aged/30 rounded-2xl text-left max-w-lg mx-auto"
              >
                <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full">
                  {selected.category}
                </span>
                <h4 className="font-baby text-xl font-bold text-ink mt-3 mb-2">
                  {selected.title}
                </h4>
                <p className="text-sm text-ink-light line-clamp-2 mb-4">
                  {selected.excerpt}
                </p>
                <Link
                  href={`/articles/${selected.slug}`}
                  className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all duration-300"
                >
                  Read This Story
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
