"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, User, MapPin, Calendar } from "lucide-react";
import type { Article } from "@/lib/types";
import { CATEGORY_IMAGES, formatFullDate, getReadTime } from "@/lib/types";

interface FeaturedCarouselProps {
  articles: Article[];
}

export default function FeaturedCarousel({ articles }: FeaturedCarouselProps) {
  const [current, setCurrent] = useState(0);
  const featured = articles.filter((a) => a.is_featured).slice(0, 5);
  const displayArticles = featured.length > 0 ? featured : articles.slice(0, 5);

  useEffect(() => {
    if (displayArticles.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayArticles.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayArticles.length]);

  if (displayArticles.length === 0) return null;

  const article = displayArticles[current];
  const imageUrl = article.image_url || CATEGORY_IMAGES[article.category] || "/images/hero-bg.jpg";

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-aged to-transparent" />
          <h2 className="font-baby text-sm uppercase tracking-[0.25em] text-ink-muted">
            {"Editor's Picks"}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-aged to-transparent" />
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-ink min-h-[400px] md:min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={article.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex items-center min-h-[400px] md:min-h-[500px] p-8 md:p-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-accent text-cream text-xs font-bold uppercase tracking-wider rounded-full">
                    {article.category}
                  </span>
                  {article.country && (
                    <span className="flex items-center gap-1 text-aged text-xs">
                      <MapPin className="w-3 h-3" />
                      {article.country}
                    </span>
                  )}
                </div>

                <h3 className="font-baby text-3xl md:text-4xl lg:text-5xl font-bold text-cream leading-tight mb-4 text-balance">
                  {article.title}
                </h3>

                <p className="text-aged leading-relaxed mb-6 line-clamp-2 text-pretty">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-aged/70 text-xs mb-8">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatFullDate(article.published_date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {getReadTime(article.content, article.read_time)} min
                  </span>
                </div>

                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-cream font-semibold rounded-full hover:bg-gold hover:text-ink transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 group"
                >
                  Read Full Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {displayArticles.length > 1 && (
            <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
              <button
                onClick={() => setCurrent((prev) => (prev - 1 + displayArticles.length) % displayArticles.length)}
                className="p-2 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full text-cream hover:bg-cream/20 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {displayArticles.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-6 bg-gold" : "w-1.5 bg-cream/30 hover:bg-cream/50"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrent((prev) => (prev + 1) % displayArticles.length)}
                className="p-2 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full text-cream hover:bg-cream/20 transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
