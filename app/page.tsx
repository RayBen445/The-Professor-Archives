import { getDb } from "@/lib/db";
import type { Article, TimelineEvent } from "@/lib/types";
import HomeClient from "./home-client";

export default async function HomePage() {
  const sql = getDb();

  let articles: Article[] = [];
  let featured: Article | null = null;
  let timelineEvents: TimelineEvent[] = [];

  try {
    const articlesResult = await sql`
      SELECT * FROM articles WHERE published = true ORDER BY created_at DESC
    `;
    articles = articlesResult as unknown as Article[];
    featured = articles.find((a) => a.is_featured) || articles[0] || null;

    const timelineResult = await sql`
      SELECT * FROM timeline_events ORDER BY sort_order ASC
    `;
    timelineEvents = timelineResult as unknown as TimelineEvent[];
  } catch (error) {
    console.error("Error loading homepage data:", error);
  }

  return (
    <HomeClient
      articles={articles}
      featured={featured}
      timelineEvents={timelineEvents}
    />
  );
}
