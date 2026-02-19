'use client';

import { useState, useMemo, useCallback } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/Hero';
import TopicFilters from '@/components/TopicFilters';
import FeaturedStory from '@/components/FeaturedStory';
import Timeline from '@/components/Timeline';
import ArticleGrid from '@/components/ArticleGrid';
import Footer from '@/components/Footer';
import BackToTop from '@/components/back-to-top';
import ReadingProgress from '@/components/reading-progress';
import ShareModal from '@/components/share-modal';
import { sampleArticles, timelineEvents } from '@/lib/data';
import { CATEGORIES, type Category } from '@/lib/types';
import type { Article as TypesArticle, TimelineEvent as TypesTimelineEvent } from '@/lib/types';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [shareArticle, setShareArticle] = useState<TypesArticle | null>(null);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);

  // Convert sample articles to match the Article type from types.ts
  const convertedArticles: TypesArticle[] = sampleArticles.map(article => ({
    id: parseInt(article.id) || 0,
    title: article.title,
    slug: article.id, // Use id as slug for now
    excerpt: article.excerpt,
    content: article.excerpt, // Use excerpt as content for now
    category: article.category,
    image_url: article.image || null,
    is_featured: article.featured || false,
    published: true,
    author: article.author || 'The Professor',
    published_date: article.date,
    country: null,
    region: null,
    read_time: null,
    tags: null,
    created_at: article.date,
    updated_at: article.date,
  }));

  // Convert timeline events to match TimelineEvent type from types.ts
  const convertedEvents: TypesTimelineEvent[] = timelineEvents.map((event, index) => {
    // Determine category based on year or title
    let category = 'WWI';
    if (event.year >= 1939 && event.year <= 1945) category = 'WWII';
    else if (event.year > 1945) category = 'Independence';
    else if (event.title.includes('League')) category = 'League of Nations';
    
    return {
      id: index + 1,
      year: event.year,
      title: event.title,
      description: event.description,
      category,
      sort_order: index,
      created_at: new Date().toISOString(),
    };
  });

  // Get featured article
  const featuredArticle = convertedArticles.find(article => article.is_featured) || convertedArticles[0];

  // Filter articles for the grid (exclude featured)
  const filteredArticles = useMemo(() => {
    const nonFeatured = convertedArticles.filter(article => !article.is_featured);
    if (activeFilter === 'All') {
      return nonFeatured;
    }
    return nonFeatured.filter(article => article.category === activeFilter);
  }, [activeFilter]);

  // Bookmark handler
  const handleBookmark = useCallback((article: TypesArticle) => {
    setBookmarkedSlugs(prev => {
      if (prev.includes(article.slug)) {
        return prev.filter(slug => slug !== article.slug);
      }
      return [...prev, article.slug];
    });
  }, []);

  // Share handler
  const handleShare = useCallback((article: TypesArticle) => {
    setShareArticle(article);
  }, []);

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <main className="min-h-screen">
        <Hero />
        <TopicFilters 
          activeCategory={activeFilter}
          onCategoryChange={setActiveFilter}
          categories={CATEGORIES}
        />
        <FeaturedStory article={featuredArticle} />
        <Timeline events={convertedEvents} />
        <ArticleGrid 
          articles={filteredArticles}
          activeCategory={activeFilter}
          onShare={handleShare}
          onBookmark={handleBookmark}
          bookmarkedSlugs={bookmarkedSlugs}
        />
        <Footer />
      </main>
      <BackToTop />
      {shareArticle && (
        <ShareModal
          isOpen={true}
          onClose={() => setShareArticle(null)}
          title={shareArticle.title}
          url={`/articles/${shareArticle.slug}`}
          excerpt={shareArticle.excerpt}
        />
      )}
    </>
  );
}
