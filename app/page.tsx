'use client';

import { useState, useMemo, useCallback } from 'react';
import PageTransition from '@/components/page-transition';
import ReadingProgress from '@/components/reading-progress';
import TrendingBar from '@/components/trending-bar';
import Navbar from '@/components/navbar';
import Hero from '@/components/Hero';
import ArticleCountBadge from '@/components/article-count-badge';
import ScrollReveal from '@/components/scroll-reveal';
import TopicFilters from '@/components/TopicFilters';
import RegionFilter from '@/components/region-filter';
import FeaturedCarousel from '@/components/featured-carousel';
import ThisDayInHistory from '@/components/this-day-in-history';
import StatsBanner from '@/components/stats-banner';
import ArticleGrid from '@/components/ArticleGrid';
import DidYouKnow from '@/components/did-you-know';
import ColonialMapViewer from '@/components/colonial-map-viewer';
import CategoryShowcase from '@/components/category-showcase';
import TagCloud from '@/components/tag-cloud';
import WorldMapExplorer from '@/components/world-map-explorer';
import DocumentArchive from '@/components/document-archive';
import QuoteSection from '@/components/quote-section';
import Timeline from '@/components/Timeline';
import RandomArticle from '@/components/random-article';
import DiscussionForum from '@/components/discussion-forum';
import Testimonials from '@/components/testimonials';
import ContactForm from '@/components/contact-form';
import Newsletter from '@/components/newsletter';
import LanguageSwitcher from '@/components/language-switcher';
import Footer from '@/components/Footer';
import BackToTop from '@/components/back-to-top';
import SearchModal from '@/components/search-modal';
import ShareModal from '@/components/share-modal';
import ReadingListDrawer from '@/components/reading-list-drawer';
import { sampleArticles, timelineEvents } from '@/lib/data';
import { CATEGORIES, type Category, parseTags } from '@/lib/types';
import type { Article as TypesArticle, TimelineEvent as TypesTimelineEvent } from '@/lib/types';

interface ReadingListItem {
  slug: string;
  title: string;
  category: string;
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [activeRegion, setActiveRegion] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const [readingListOpen, setReadingListOpen] = useState(false);
  const [readingList, setReadingList] = useState<ReadingListItem[]>([]);
  const [shareArticle, setShareArticle] = useState<TypesArticle | null>(null);

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

  // Filter articles for the grid
  const filteredArticles = useMemo(() => {
    let result = convertedArticles;
    if (activeFilter !== 'All') {
      result = result.filter((a) => a.category === activeFilter);
    }
    if (activeRegion !== 'all') {
      result = result.filter((a) => a.region === activeRegion || a.country === activeRegion);
    }
    return result;
  }, [activeFilter, activeRegion]);

  // Get all tags
  const allTags = useMemo(() => {
    const tags: string[] = [];
    convertedArticles.forEach((a) => {
      parseTags(a.tags).forEach((t) => tags.push(t));
    });
    return tags;
  }, []);

  // Bookmark handler
  const handleBookmark = useCallback((article: TypesArticle) => {
    setReadingList((prev) => {
      const exists = prev.find((item) => item.slug === article.slug);
      if (exists) {
        return prev.filter((item) => item.slug !== article.slug);
      }
      return [...prev, { slug: article.slug, title: article.title, category: article.category }];
    });
  }, []);

  // Share handler
  const handleShare = useCallback((article: TypesArticle) => {
    setShareArticle(article);
  }, []);

  // Remove from reading list
  const removeFromReadingList = useCallback((slug: string) => {
    setReadingList((prev) => prev.filter((item) => item.slug !== slug));
  }, []);

  return (
    <PageTransition>
      <main className="min-h-screen bg-cream">
        <ReadingProgress />
        <TrendingBar articles={convertedArticles} />
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
              <ArticleCountBadge articles={convertedArticles} />
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
                activeCategory={activeFilter}
                onCategoryChange={(cat) => { setActiveFilter(cat); setActiveRegion('all'); }}
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

        <FeaturedCarousel articles={convertedArticles} />
        <ThisDayInHistory />
        <StatsBanner />

        <ArticleGrid
          articles={filteredArticles}
          activeCategory={activeFilter}
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
        <Timeline events={convertedEvents} />
        <RandomArticle articles={convertedArticles} />
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
          articles={convertedArticles}
        />
        <ShareModal
          isOpen={!!shareArticle}
          onClose={() => setShareArticle(null)}
          title={shareArticle?.title || ''}
          url={typeof window !== 'undefined' ? `${window.location.origin}/articles/${shareArticle?.slug || ''}` : ''}
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
