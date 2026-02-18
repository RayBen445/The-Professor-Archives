"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import TopicFilters from "@/components/topic-filters";
import FeaturedStory from "@/components/featured-story";
import Timeline from "@/components/timeline";
import ArticleGrid from "@/components/article-grid";
import StatsBanner from "@/components/stats-banner";
import QuoteSection from "@/components/quote-section";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import ScrollReveal from "@/components/scroll-reveal";
import ReadingProgress from "@/components/reading-progress";
import DidYouKnow from "@/components/did-you-know";
import SearchModal from "@/components/search-modal";
import ShareModal from "@/components/share-modal";
import ReadingListDrawer from "@/components/reading-list-drawer";
import ThisDayInHistory from "@/components/this-day-in-history";
import RandomArticle from "@/components/random-article";
import Testimonials from "@/components/testimonials";
import CategoryShowcase from "@/components/category-showcase";
import PageTransition from "@/components/page-transition";
import type { Article, TimelineEvent, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface HomeClientProps {
  articles: Article[];
  featured: Article | null;
  timelineEvents: TimelineEvent[];
}

interface ReadingListItem {
  slug: string;
  title: string;
  category: string;
}

export default function HomeClient({
  articles,
  featured,
  timelineEvents,
}: HomeClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [readingListOpen, setReadingListOpen] = useState(false);
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);
  const [shareArticle, setShareArticle] = useState<Article | null>(null);

  const filteredArticles =
    activeCategory === "All"
      ? articles.filter((a) => !a.is_featured)
      : articles.filter((a) => a.category === activeCategory);

  const handleBookmark = useCallback((article: Article) => {
    setReadingList((prev) => {
      const exists = prev.find((item) => item.slug === article.slug);
      if (exists) {
        return prev.filter((item) => item.slug !== article.slug);
      }
      return [
        ...prev,
        { slug: article.slug, title: article.title, category: article.category },
      ];
    });
  }, []);

  const handleShare = useCallback((article: Article) => {
    setShareArticle(article);
  }, []);

  const removeFromReadingList = useCallback((slug: string) => {
    setReadingList((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-cream">
        <ReadingProgress />
        <Navbar
          onSearchOpen={() => setSearchOpen(true)}
          onReadingListOpen={() => setReadingListOpen(true)}
          readingListCount={readingList.length}
        />
        <Hero />

        {/* Filter section */}
        <section className="py-12 px-6 bg-parchment/50 border-y border-aged/10">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-8">
                <span className="text-ink-muted text-xs uppercase tracking-[0.25em] font-semibold">
                  Explore by Topic
                </span>
              </div>
              <TopicFilters
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                categories={CATEGORIES}
              />
            </ScrollReveal>
          </div>
        </section>

        <FeaturedStory article={featured} />
        <ThisDayInHistory />
        <StatsBanner />
        <ArticleGrid
          articles={filteredArticles}
          activeCategory={activeCategory}
          onShare={handleShare}
          onBookmark={handleBookmark}
          bookmarkedSlugs={readingList.map((item) => item.slug)}
        />
        <DidYouKnow />
        <CategoryShowcase />
        <QuoteSection />
        <Timeline events={timelineEvents} />
        <RandomArticle articles={articles} />
        <Testimonials />
        <Newsletter />
        <Footer />
        <BackToTop />

        {/* Modals & Drawers */}
        <SearchModal
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          articles={articles}
        />
        <ShareModal
          isOpen={!!shareArticle}
          onClose={() => setShareArticle(null)}
          title={shareArticle?.title || ""}
          url={
            typeof window !== "undefined"
              ? `${window.location.origin}/articles/${shareArticle?.slug || ""}`
              : ""
          }
          excerpt={shareArticle?.excerpt}
        />
        <ReadingListDrawer
          isOpen={readingListOpen}
          onClose={() => setReadingListOpen(false)}
          items={readingList}
          onRemove={removeFromReadingList}
        />
      </main>
    </PageTransition>
  );
}
