"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, User, Bookmark } from "lucide-react";
import type { Article } from "@/lib/types";
import { CATEGORY_IMAGES } from "@/lib/types";
import ScrollReveal from "./scroll-reveal";

interface FeaturedStoryProps {
  article: Article | null;
}

export default function FeaturedStory({ article }: FeaturedStoryProps) {
  if (!article) return null;

  const imageUrl = article.image_url || CATEGORY_IMAGES[article.category] || "/images/hero-bg.jpg";
  const readTime = Math.max(3, Math.ceil(article.content.split(" ").length / 200));

  return (
    <section id="featured" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-aged to-transparent" />
            <h2 className="font-baby text-sm uppercase tracking-[0.25em] text-ink-muted">
              Featured Story
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-aged to-transparent" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Link href={`/articles/${article.slug}`} className="group block">
            <div className="relative grid md:grid-cols-2 gap-0 bg-parchment rounded-2xl overflow-hidden card-hover hover-glow border border-aged/30">
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-auto img-zoom grain-overlay">
                <Image
                  src={imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-accent text-cream text-xs font-bold uppercase tracking-wider rounded-full">
                    {article.category}
                  </span>
                </div>
                <motion.div
                  className="absolute bottom-4 right-4 z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  <button
                    className="p-2.5 bg-cream/90 backdrop-blur-sm rounded-full hover:bg-cream transition-colors"
                    aria-label="Bookmark article"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Bookmark className="w-4 h-4 text-accent" />
                  </button>
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs text-ink-muted mb-4">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {readTime} min read
                  </span>
                </div>

                <h3 className="font-baby text-3xl md:text-4xl font-bold text-ink leading-tight mb-4 group-hover:text-accent transition-colors duration-300 text-balance">
                  {article.title}
                </h3>

                <p className="text-ink-light leading-relaxed mb-8 text-pretty line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all duration-300">
                  Read Full Story
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
