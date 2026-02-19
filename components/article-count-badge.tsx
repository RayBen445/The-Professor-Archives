"use client";

import { motion } from "framer-motion";
import { FileText, TrendingUp, Globe2, Users } from "lucide-react";
import type { Article } from "@/lib/types";

interface ArticleCountBadgeProps {
  articles: Article[];
}

export default function ArticleCountBadge({ articles }: ArticleCountBadgeProps) {
  const totalArticles = articles.length;
  const totalCountries = new Set(articles.map(a => a.country).filter(Boolean)).size;
  const totalCategories = new Set(articles.map(a => a.category)).size;
  const totalRegions = new Set(articles.map(a => a.region).filter(Boolean)).size;

  const stats = [
    { label: "Stories", value: totalArticles, icon: FileText, color: "text-accent" },
    { label: "Categories", value: totalCategories, icon: TrendingUp, color: "text-gold" },
    { label: "Countries", value: totalCountries, icon: Globe2, color: "text-green-700" },
    { label: "Regions", value: totalRegions, icon: Users, color: "text-blue-700" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 px-5 py-3 bg-parchment border border-aged/20 rounded-2xl"
        >
          <stat.icon className={`w-5 h-5 ${stat.color}`} />
          <div>
            <span className="text-2xl font-baby font-bold text-ink">{stat.value}</span>
            <span className="text-xs text-ink-muted ml-1.5">{stat.label}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
