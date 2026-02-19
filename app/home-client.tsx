"use client";

import { useState, useCallback, useMemo } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import TopicFilters from "@/components/topic-filters";
import FeaturedCarousel from "@/components/featured-carousel";
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
import TrendingBar from "@/components/trending-bar";
import WorldMapExplorer from "@/components/world-map-explorer";
import ArticleCountBadge from "@/components/article-count-badge";
import RegionFilter from "@/components/region-filter";
import TagCloud from "@/components/tag-cloud";
import ContactForm from "@/components/contact-form";
import DocumentArchive from "@/components/document-archive";
import ColonialMapViewer from "@/components/colonial-map-viewer";
import DiscussionForum from "@/components/discussion-forum";
import LanguageSwitcher from "@/components/language-switcher";
import type { Article, TimelineEvent, Category } from "@/lib/types";
import { CATEGORIES, parseTags } from "@/lib/types";

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
  const [activeRegion, setActiveRegion] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [readingListOpen, setReadingListOpen] = useState(false);
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);
  const [shareArticle, setShareArticle] = useState<Article | null>(null);

  const filteredArticles = useMemo(() => {
    let result = articles;
    if (activeCategory !== "All") {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (activeRegion !== "all") {
      result = result.filter((a) => a.region === activeRegion || a.country === activeRegion);
    }
    return result;
  }, [articles, activeCategory, activeRegion]);

  const allTags = useMemo(() => {
    const tags: string[] = [];
    articles.forEach((a) => {
      parseTags(a.tags).forEach((t) => tags.push(t));
    });
    return tags;
  }, [articles]);

  const handleBookmark = useCallback((article: Article) => {
    setReadingList((prev) => {
      const exists = prev.find((item) => item.slug === article.slug);
      if (exists) return prev.filter((item) => item.slug !== article.slug);
      return [...prev, { slug: article.slug, title: article.title, category: article.category }];
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
        <TrendingBar articles={articles} />
        <Navbar
          onSearchOpen={() => setSearchOpen(true)}
          onReadingListOpen={() => setReadingListOpen(true)}
          readingListCount={readingList.length}
        />
        <Hero />

        {/* Stats */}
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <ArticleCountBadge articles={articles} />
            </ScrollReveal>
          </div>
        </section>

        {/* Filter section */}
        <section className="py-10 px-6 bg-parchment/50 border-y border-aged/10">
          <div className="max-w-7xl mx-auto space-y-6">
            <ScrollReveal>
              <div className="text-center mb-4">
                <span className="text-ink-muted text-xs uppercase tracking-[0.25em] font-semibold">
                  Explore by Topic
                </span>
              </div>
              <TopicFilters
                activeCategory={activeCategory}
                onCategoryChange={(cat) => { setActiveCategory(cat); setActiveRegion("all"); }}
                categories={CATEGORIES}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="text-center mt-4 mb-2">
                <span className="text-ink-muted text-[10px] uppercase tracking-[0.25em] font-semibold">
                  or by Region
                </span>
              </div>
              <RegionFilter activeRegion={activeRegion} onRegionChange={setActiveRegion} />
            </ScrollReveal>
          </div>
        </section>

        <FeaturedCarousel articles={articles} />
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
        <ColonialMapViewer />
        <CategoryShowcase />
        <TagCloud tags={allTags} />
        <WorldMapExplorer />
        <DocumentArchive />
        <QuoteSection />
        <Timeline events={timelineEvents} />
        <RandomArticle articles={articles} />
        <DiscussionForum />
        <Testimonials />
        <ContactForm />
        <Newsletter />
        <LanguageSwitcher />
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
          url={typeof window !== "undefined" ? `${window.location.origin}/articles/${shareArticle?.slug || ""}` : ""}
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
