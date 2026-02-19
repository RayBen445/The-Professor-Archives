"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, User, Bookmark, Share2, MapPin, Calendar } from "lucide-react";
import type { Article } from "@/lib/types";
import { CATEGORY_IMAGES, formatFullDate, getReadTime, parseTags } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
  index: number;
  onShare?: (article: Article) => void;
  onBookmark?: (article: Article) => void;
  isBookmarked?: boolean;
}

export default function ArticleCard({
  article,
  index,
  onShare,
  onBookmark,
  isBookmarked = false,
}: ArticleCardProps) {
  const [hovered, setHovered] = useState(false);
  const imageUrl = article.image_url || CATEGORY_IMAGES[article.category] || "/images/hero-bg.jpg";
  const readTime = getReadTime(article.content, article.read_time);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      layout
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={`/articles/${article.slug}`}
        className="group block bg-cream border border-aged/20 rounded-2xl overflow-hidden card-hover hover-glow relative"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] img-zoom grain-overlay">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-3 py-1.5 bg-cream/90 backdrop-blur-sm text-ink text-[10px] font-bold uppercase tracking-wider rounded-full">
              {article.category}
            </span>
            {article.country && (
              <span className="px-2 py-1.5 bg-ink/60 backdrop-blur-sm text-cream text-[10px] font-semibold rounded-full flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" />
                {article.country}
              </span>
            )}
          </div>

          {/* Action buttons on hover */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            className="absolute top-4 right-4 z-10 flex gap-2"
          >
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onShare?.(article); }}
              className="p-2 bg-cream/90 backdrop-blur-sm rounded-full hover:bg-cream transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-3.5 h-3.5 text-ink" />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onBookmark?.(article); }}
              className="p-2 bg-cream/90 backdrop-blur-sm rounded-full hover:bg-cream transition-colors"
              aria-label="Bookmark article"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-accent text-accent" : "text-ink"}`} />
            </button>
          </motion.div>

          {/* Arrow on hover */}
          <div className="absolute bottom-4 right-4 z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              className="p-2.5 bg-accent text-cream rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-[10px] text-ink-muted mb-2.5 flex-wrap">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.author}
            </span>
            <span className="w-1 h-1 rounded-full bg-aged" />
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min
            </span>
            {article.published_date && (
              <>
                <span className="w-1 h-1 rounded-full bg-aged" />
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(article.published_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </>
            )}
          </div>

          <h3 className="font-baby text-lg font-bold text-ink leading-snug mb-2.5 group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-ink-light leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>

          {/* Tags */}
          {article.tags && (
            <div className="mt-3 flex flex-wrap gap-1">
              {parseTags(article.tags).slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-parchment text-ink-muted text-[9px] font-semibold rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-aged/20">
            <span className="text-[10px] font-semibold text-accent uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
              Read Article
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
