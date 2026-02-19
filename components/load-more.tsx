"use client";

import { motion } from "framer-motion";
import { ChevronDown, Loader2 } from "lucide-react";

interface LoadMoreProps {
  onLoadMore: () => void;
  loading?: boolean;
  hasMore: boolean;
  totalShown: number;
  total: number;
}

export default function LoadMore({ onLoadMore, loading, hasMore, totalShown, total }: LoadMoreProps) {
  if (!hasMore) return null;

  return (
    <div className="text-center mt-12">
      <p className="text-xs text-ink-muted mb-4">
        Showing {totalShown} of {total} stories
      </p>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLoadMore}
        disabled={loading}
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-ink text-cream font-semibold rounded-full hover:bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
        Load More Stories
      </motion.button>
    </div>
  );
}
