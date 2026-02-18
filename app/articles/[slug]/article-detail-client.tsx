"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import ScrollReveal from "@/components/scroll-reveal";
import type { Article } from "@/lib/types";
import { CATEGORY_IMAGES } from "@/lib/types";

interface Props {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleDetailClient({
  article,
  relatedArticles,
}: Props) {
  const imageUrl =
    article.image_url ||
    CATEGORY_IMAGES[article.category] ||
    "/images/hero-bg.jpg";
  const readTime = Math.max(
    3,
    Math.ceil(article.content.split(" ").length / 200)
  );
  const publishDate = new Date(article.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20">
        <div className="relative h-[50vh] md:h-[60vh]">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-accent text-cream text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  {article.category}
                </span>
                <h1 className="font-baby text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight mb-4 text-balance">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-aged text-sm">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {article.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {publishDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {readTime} min read
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Controls */}
          <div className="flex items-center justify-between mb-12">
            <Link
              href="/"
              className="flex items-center gap-2 text-ink-muted hover:text-accent transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-semibold">Back to Archives</span>
            </Link>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-aged/30 rounded-full text-sm font-semibold text-ink-light hover:text-accent hover:border-accent transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Excerpt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <p className="text-xl text-ink-light leading-relaxed italic border-l-4 border-accent pl-6">
              {article.excerpt}
            </p>
          </motion.div>

          {/* Article body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="prose-archive"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-16 pt-8 border-t border-aged/20">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider mr-2">
                Topics:
              </span>
              <span className="px-3 py-1 bg-parchment border border-aged/20 text-ink-light text-xs font-semibold rounded-full">
                {article.category}
              </span>
              <span className="px-3 py-1 bg-parchment border border-aged/20 text-ink-light text-xs font-semibold rounded-full">
                African History
              </span>
              <span className="px-3 py-1 bg-parchment border border-aged/20 text-ink-light text-xs font-semibold rounded-full">
                Hidden Narratives
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedArticles.length > 0 && (
        <section className="py-20 px-6 bg-parchment">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="font-baby text-3xl font-bold text-ink text-center mb-12">
                Continue Reading
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((related, i) => (
                <ScrollReveal key={related.id} delay={i * 0.1}>
                  <Link
                    href={`/articles/${related.slug}`}
                    className="group block bg-cream border border-aged/20 rounded-2xl overflow-hidden card-hover"
                  >
                    <div className="relative aspect-[16/10] img-zoom">
                      <Image
                        src={
                          related.image_url ||
                          CATEGORY_IMAGES[related.category] ||
                          "/images/hero-bg.jpg"
                        }
                        alt={related.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">
                        {related.category}
                      </span>
                      <h3 className="font-baby text-lg font-bold text-ink mt-2 group-hover:text-accent transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                        Read More
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <BackToTop />
    </main>
  );
}
