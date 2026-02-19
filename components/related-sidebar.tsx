"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, TrendingUp } from "lucide-react";
import type { Article } from "@/lib/types";
import { CATEGORY_IMAGES, getReadTime } from "@/lib/types";

interface RelatedSidebarProps {
  articles: Article[];
  currentSlug: string;
}

export default function RelatedSidebar({ articles, currentSlug }: RelatedSidebarProps) {
  const related = articles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <aside className="space-y-6">
      <div className="flex items-center gap-2 text-accent">
        <TrendingUp className="w-4 h-4" />
        <h3 className="font-baby text-lg font-bold">More Stories</h3>
      </div>
      <div className="space-y-4">
        {related.map((article, i) => {
          const imageUrl = article.image_url || CATEGORY_IMAGES[article.category] || "/images/hero-bg.jpg";
          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/articles/${article.slug}`}
                className="group flex gap-3 p-3 rounded-xl hover:bg-parchment transition-all duration-300"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                    {article.category}
                  </span>
                  <h4 className="text-sm font-baby font-bold text-ink leading-snug group-hover:text-accent transition-colors line-clamp-2 mt-0.5">
                    {article.title}
                  </h4>
                  <span className="flex items-center gap-1 text-[10px] text-ink-muted mt-1">
                    <Clock className="w-2.5 h-2.5" />
                    {getReadTime(article.content, article.read_time)} min
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-aged group-hover:text-accent shrink-0 mt-1 transition-colors" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </aside>
  );
}
