"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, Clock, User, Calendar, Share2, ArrowUpRight, Bookmark,
  Volume2, VolumeX, Copy, Check, MapPin, Globe2, Tag,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import ScrollReveal from "@/components/scroll-reveal";
import ReadingProgress from "@/components/reading-progress";
import ShareModal from "@/components/share-modal";
import PageTransition from "@/components/page-transition";
import Breadcrumbs from "@/components/breadcrumbs";
import TableOfContents from "@/components/table-of-contents";
import PrintButton from "@/components/print-button";
import FontSizeToggle from "@/components/font-size-toggle";
import RelatedSidebar from "@/components/related-sidebar";
import type { Article } from "@/lib/types";
import { CATEGORY_IMAGES, formatFullDate, getReadTime } from "@/lib/types";

interface Props {
  article: Article;
  relatedArticles: Article[];
}

export default function ArticleDetailClient({ article, relatedArticles }: Props) {
  const [shareOpen, setShareOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [readPercent, setReadPercent] = useState(0);
  const [fontSize, setFontSize] = useState("prose-base");
  const contentRef = useRef<HTMLDivElement>(null);

  const imageUrl = article.image_url || CATEGORY_IMAGES[article.category] || "/images/hero-bg.jpg";
  const readTime = getReadTime(article.content, article.read_time);
  const publishDate = formatFullDate(article.published_date || article.created_at);
  const articleUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const el = contentRef.current;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.scrollHeight;
      const scrolledIntoView = Math.max(0, -rect.top);
      const percent = Math.min(100, Math.round((scrolledIntoView / (totalHeight - window.innerHeight * 0.5)) * 100));
      setReadPercent(percent);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSpeech = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      const text = contentRef.current?.innerText || article.excerpt;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const copyQuote = async () => {
    await navigator.clipboard.writeText(`"${article.excerpt}" - ${article.author}, The Professor's Archives`);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-cream">
        <ReadingProgress />
        <Navbar />
        <TableOfContents contentRef={contentRef} />

        {/* Hero */}
        <section className="relative pt-20">
          <div className="relative h-[50vh] md:h-[60vh]">
            <Image src={imageUrl} alt={article.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />

            <div className="absolute inset-0 flex items-end">
              <div className="max-w-4xl mx-auto px-6 pb-12 w-full">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <Breadcrumbs items={[
                    { label: "Archives", href: "/#articles" },
                    { label: article.category, href: `/?category=${article.category}` },
                    { label: article.title },
                  ]} />

                  <div className="flex flex-wrap items-center gap-2 mt-4 mb-4">
                    <span className="inline-block px-4 py-1.5 bg-accent text-cream text-xs font-bold uppercase tracking-wider rounded-full">
                      {article.category}
                    </span>
                    {article.country && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-cream/10 backdrop-blur-sm text-cream text-xs font-semibold rounded-full">
                        <MapPin className="w-3 h-3" />
                        {article.country}
                      </span>
                    )}
                    {article.region && (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-cream/10 backdrop-blur-sm text-cream text-xs font-semibold rounded-full">
                        <Globe2 className="w-3 h-3" />
                        {article.region}
                      </span>
                    )}
                  </div>

                  <h1 className="font-baby text-3xl sm:text-4xl md:text-5xl font-bold text-cream leading-tight mb-4 text-balance">
                    {article.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-aged text-sm">
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{article.author}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{publishDate}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{readTime} min read</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
              <div>
                {/* Controls */}
                <div className="flex items-center justify-between mb-12 flex-wrap gap-3">
                  <Link href="/" className="flex items-center gap-2 text-ink-muted hover:text-accent transition-colors group">
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-semibold">Back to Archives</span>
                  </Link>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-parchment border border-aged/20 rounded-full text-xs text-ink-muted">
                      <div className="w-16 h-1.5 bg-aged/20 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-accent rounded-full" style={{ width: `${readPercent}%` }} />
                      </div>
                      <span>{readPercent}%</span>
                    </div>
                    <FontSizeToggle onSizeChange={setFontSize} />
                    <PrintButton />
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleSpeech}
                      className={`flex items-center gap-1.5 px-3 py-2 border rounded-full text-xs font-semibold transition-all duration-300 ${speaking ? "border-accent bg-accent/10 text-accent" : "border-aged/30 text-ink-light hover:text-accent hover:border-accent"}`}
                    >
                      {speaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{speaking ? "Stop" : "Listen"}</span>
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setBookmarked(!bookmarked)}
                      className={`p-2 border rounded-full transition-all duration-300 ${bookmarked ? "border-accent bg-accent/10 text-accent" : "border-aged/30 text-ink-light hover:text-accent hover:border-accent"}`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-accent" : ""}`} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShareOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-2 border border-aged/30 rounded-full text-xs font-semibold text-ink-light hover:text-accent hover:border-accent transition-all duration-300"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Share</span>
                    </motion.button>
                  </div>
                </div>

                {/* Excerpt */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12 relative group">
                  <p className="text-xl text-ink-light leading-relaxed italic border-l-4 border-accent pl-6">{article.excerpt}</p>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={copyQuote}
                    className="absolute top-0 right-0 p-2 bg-parchment border border-aged/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    {copiedQuote ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                  </motion.button>
                </motion.div>

                {/* Article body */}
                <motion.div
                  ref={contentRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`prose-archive ${fontSize}`}
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {/* Tags */}
                <div className="mt-16 pt-8 border-t border-aged/20">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider mr-2 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Topics:
                    </span>
                    <span className="px-3 py-1 bg-parchment border border-aged/20 text-ink-light text-xs font-semibold rounded-full">{article.category}</span>
                    {article.country && <span className="px-3 py-1 bg-parchment border border-aged/20 text-ink-light text-xs font-semibold rounded-full">{article.country}</span>}
                    {article.region && <span className="px-3 py-1 bg-parchment border border-aged/20 text-ink-light text-xs font-semibold rounded-full">{article.region}</span>}
                    {article.tags && article.tags.split(",").map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-parchment border border-aged/20 text-ink-light text-xs font-semibold rounded-full">{tag.trim()}</span>
                    ))}
                  </div>
                </div>

                {/* Share CTA */}
                <div className="mt-12 p-8 bg-parchment border border-aged/20 rounded-2xl text-center">
                  <h3 className="font-baby text-xl font-bold text-ink mb-2">Enjoyed this story?</h3>
                  <p className="text-sm text-ink-light mb-6">Share it with someone who loves history.</p>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShareOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-cream font-semibold rounded-full hover:bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
                  >
                    <Share2 className="w-4 h-4" />
                    Share This Article
                  </motion.button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="hidden lg:block">
                <div className="sticky top-28">
                  <RelatedSidebar articles={relatedArticles} currentSlug={article.slug} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {relatedArticles.length > 0 && (
          <section className="py-20 px-6 bg-parchment">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal>
                <h2 className="font-baby text-3xl font-bold text-ink text-center mb-12">Continue Reading</h2>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.slice(0, 6).map((related, i) => (
                  <ScrollReveal key={related.id} delay={i * 0.1}>
                    <Link href={`/articles/${related.slug}`} className="group block bg-cream border border-aged/20 rounded-2xl overflow-hidden card-hover">
                      <div className="relative aspect-[16/10] img-zoom">
                        <Image src={related.image_url || CATEGORY_IMAGES[related.category] || "/images/hero-bg.jpg"} alt={related.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                        {related.country && (
                          <span className="absolute top-3 right-3 px-2 py-1 bg-ink/50 backdrop-blur-sm text-cream text-[10px] font-semibold rounded-full flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />{related.country}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{related.category}</span>
                          {related.published_date && (
                            <span className="text-[10px] text-ink-muted">
                              {new Date(related.published_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                            </span>
                          )}
                        </div>
                        <h3 className="font-baby text-base font-bold text-ink group-hover:text-accent transition-colors line-clamp-2">{related.title}</h3>
                        <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-accent">
                          Read More <ArrowUpRight className="w-3 h-3" />
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
        <ShareModal isOpen={shareOpen} onClose={() => setShareOpen(false)} title={article.title} url={articleUrl} excerpt={article.excerpt} />
      </main>
    </PageTransition>
  );
}
