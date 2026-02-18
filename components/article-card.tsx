"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, User } from "lucide-react";
import type { Article } from "@/lib/types";
import { CATEGORY_IMAGES } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const imageUrl =
    article.image_url ||
    CATEGORY_IMAGES[article.category] ||
    "/images/hero-bg.jpg";
  const readTime = Math.max(
    3,
    Math.ceil(article.content.split(" ").length / 200)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      layout
    >
      <Link
        href={`/articles/${article.slug}`}
        className="group block bg-cream border border-aged/20 rounded-2xl overflow-hidden card-hover"
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
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 bg-cream/90 backdrop-blur-sm text-ink text-xs font-bold uppercase tracking-wider rounded-full">
              {article.category}
            </span>
          </div>

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
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs text-ink-muted mb-3">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {article.author}
            </span>
            <span className="w-1 h-1 rounded-full bg-aged" />
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min
            </span>
          </div>

          <h3 className="font-baby text-xl font-bold text-ink leading-snug mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>

          <p className="text-sm text-ink-light leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>

          <div className="mt-4 pt-4 border-t border-aged/20">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
              Read Article
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
