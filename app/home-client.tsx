"use client";

import { useState } from "react";
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
import type { Article, TimelineEvent, Category } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";

interface HomeClientProps {
  articles: Article[];
  featured: Article | null;
  timelineEvents: TimelineEvent[];
}

export default function HomeClient({
  articles,
  featured,
  timelineEvents,
}: HomeClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredArticles =
    activeCategory === "All"
      ? articles.filter((a) => !a.is_featured)
      : articles.filter((a) => a.category === activeCategory);

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
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
      <StatsBanner />
      <ArticleGrid articles={filteredArticles} activeCategory={activeCategory} />
      <QuoteSection />
      <Timeline events={timelineEvents} />
      <Newsletter />
      <Footer />
      <BackToTop />
    </main>
  );
}
