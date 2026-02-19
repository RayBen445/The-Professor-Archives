"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bookmark, ArrowUpRight, Trash2 } from "lucide-react";
import Link from "next/link";

interface ReadingListItem {
  slug: string;
  title: string;
  category: string;
}

interface ReadingListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: ReadingListItem[];
  onRemove: (slug: string) => void;
}

export default function ReadingListDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
}: ReadingListDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-[90vw] max-w-sm bg-cream border-l border-aged/30 shadow-2xl shadow-ink/20"
          >
            <div className="flex items-center justify-between p-6 border-b border-aged/20">
              <div className="flex items-center gap-3">
                <Bookmark className="w-5 h-5 text-accent" />
                <h3 className="font-baby text-xl font-bold text-ink">
                  Reading List
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-parchment transition-colors"
                aria-label="Close reading list"
              >
                <X className="w-5 h-5 text-ink-muted" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
              {items.length > 0 ? (
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.slug}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group flex items-start gap-3 p-4 bg-parchment rounded-xl border border-aged/10 hover:border-accent/30 transition-all duration-300"
                    >
                      <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                          {item.category}
                        </span>
                        <Link
                          href={`/articles/${item.slug}`}
                          onClick={onClose}
                          className="block font-baby text-sm font-bold text-ink hover:text-accent transition-colors mt-1"
                        >
                          {item.title}
                        </Link>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Link
                          href={`/articles/${item.slug}`}
                          onClick={onClose}
                          className="p-1.5 rounded-lg hover:bg-cream text-ink-muted hover:text-accent transition-all"
                          aria-label="Read article"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => onRemove(item.slug)}
                          className="p-1.5 rounded-lg hover:bg-cream text-ink-muted hover:text-red-600 transition-all"
                          aria-label="Remove from list"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Bookmark className="w-12 h-12 text-aged mx-auto mb-4" />
                  <h4 className="font-baby text-lg font-bold text-ink mb-2">
                    No saved articles
                  </h4>
                  <p className="text-sm text-ink-muted">
                    Bookmark articles to save them for later reading.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
