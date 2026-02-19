"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight, Clock, Command } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
}

export default function SearchModal({
  isOpen,
  onClose,
  articles,
}: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filtered = query.length > 0
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase()) ||
          a.author.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed z-[70] left-1/2 top-[15%] -translate-x-1/2 w-[90vw] max-w-2xl bg-cream border border-aged/30 rounded-2xl shadow-2xl shadow-ink/20 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-5 border-b border-aged/20">
              <Search className="w-5 h-5 text-accent flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search articles, topics, authors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-ink text-lg placeholder:text-ink-muted outline-none font-serif"
              />
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-parchment border border-aged/20 rounded-md text-[10px] text-ink-muted font-mono">
                ESC
              </kbd>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-parchment transition-colors sm:hidden"
                aria-label="Close search"
              >
                <X className="w-5 h-5 text-ink-muted" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto">
              {query.length === 0 ? (
                <div className="p-8 text-center">
                  <Search className="w-10 h-10 text-aged mx-auto mb-3" />
                  <p className="text-ink-muted text-sm">
                    Start typing to search through the archives...
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-ink-muted">
                    <Command className="w-3 h-3" />
                    <span>Press</span>
                    <kbd className="px-1.5 py-0.5 bg-parchment border border-aged/20 rounded text-[10px] font-mono">
                      Ctrl + K
                    </kbd>
                    <span>to open search anytime</span>
                  </div>
                </div>
              ) : filtered.length > 0 ? (
                <div className="p-2">
                  {filtered.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/articles/${article.slug}`}
                        onClick={onClose}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-parchment transition-all duration-200 group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider rounded-full">
                              {article.category}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-ink-muted">
                              <Clock className="w-3 h-3" />
                              {Math.max(3, Math.ceil(article.content.split(" ").length / 200))} min
                            </span>
                          </div>
                          <h4 className="font-baby text-base font-bold text-ink group-hover:text-accent transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-xs text-ink-muted mt-1 line-clamp-1">
                            {article.excerpt}
                          </p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-aged opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all flex-shrink-0 mt-1" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-ink-muted text-sm">
                    {"No articles found for \""}{query}{"\""}
                  </p>
                  <p className="text-xs text-aged mt-1">
                    Try searching with different keywords
                  </p>
                </div>
              )}
            </div>

            {filtered.length > 0 && (
              <div className="p-3 border-t border-aged/20 bg-parchment/50">
                <p className="text-xs text-ink-muted text-center">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
