'use client';

import { useState, useMemo } from 'react';
import Hero from '@/components/Hero';
import TopicFilters from '@/components/TopicFilters';
import FeaturedStory from '@/components/FeaturedStory';
import Timeline from '@/components/Timeline';
import ArticleGrid from '@/components/ArticleGrid';
import Footer from '@/components/Footer';
import { sampleArticles, timelineEvents } from '@/lib/data';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all');

  // Get featured article
  const featuredArticle = sampleArticles.find(article => article.featured) || sampleArticles[0];

  // Filter articles for the grid (exclude featured)
  const filteredArticles = useMemo(() => {
    const nonFeatured = sampleArticles.filter(article => !article.featured);
    if (activeFilter === 'all') {
      return nonFeatured;
    }
    return nonFeatured.filter(article => article.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen">
      <Hero />
      <TopicFilters onFilterChange={setActiveFilter} />
      <FeaturedStory article={featuredArticle} />
      <Timeline events={timelineEvents} />
      <ArticleGrid articles={filteredArticles} />
      <Footer />
    </main>
  );
}
