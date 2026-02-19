"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Article } from "@/lib/types";
import ArticleCard from "./article-card";
import LoadMore from "./load-more";
import ScrollReveal from "./scroll-reveal";
import { FileText } from "lucide-react";

interface ArticleGridProps {
  articles: Article[];
  activeCategory: string;
  onShare?: (article: Article) => void;
  onBookmark?: (article: Article) => void;
  bookmarkedSlugs?: string[];
}

const PAGE_SIZE = 9;

export default function ArticleGrid({
  articles,
  activeCategory,
  onShare,
  onBookmark,
  bookmarkedSlugs = [],
}: ArticleGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = articles.slice(0, visibleCount);
  const hasMore = visibleCount < articles.length;

  return (
    <section id="articles" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold">
              From the Archives
            </span>
            <h2 className="font-baby text-4xl md:text-5xl font-bold text-ink mt-3 mb-4 text-balance">
              {activeCategory === "All" ? "All Stories" : activeCategory}
            </h2>
            <p className="text-ink-muted text-sm">
              {articles.length} {articles.length === 1 ? "story" : "stories"} found
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {visible.length > 0 ? (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {visible.map((article, i) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={i}
                  onShare={onShare}
                  onBookmark={onBookmark}
                  isBookmarked={bookmarkedSlugs.includes(article.slug)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <FileText className="w-16 h-16 text-aged mx-auto mb-4" />
              <h3 className="font-baby text-2xl text-ink mb-2">No stories yet</h3>
              <p className="text-ink-muted">New stories in this category are being researched and written.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <LoadMore
          onLoadMore={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          hasMore={hasMore}
          totalShown={visible.length}
          total={articles.length}
        />
      </div>
    </section>
  );
}
