import { getDb } from "@/lib/db";
import type { Article } from "@/lib/types";
import ArticleDetailClient from "./article-detail-client";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sql = getDb();
  try {
    const result = await sql`SELECT title, excerpt, author, published_date, category FROM articles WHERE slug = ${slug}`;
    const article = result[0];
    if (!article) return { title: "Article Not Found" };
    return {
      title: `${article.title} | The Professor's Archives`,
      description: article.excerpt as string,
      openGraph: {
        title: article.title as string,
        description: article.excerpt as string,
        type: "article",
        authors: [article.author as string],
      },
    };
  } catch {
    return { title: "The Professor's Archives" };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const sql = getDb();

  try {
    const articleResult = await sql`SELECT * FROM articles WHERE slug = ${slug} AND published = true`;
    const article = articleResult[0] as unknown as Article | undefined;

    if (!article) {
      notFound();
    }

    // Get related: same category + same region for diverse recommendations
    const relatedResult = await sql`
      SELECT * FROM articles
      WHERE slug != ${slug} AND published = true
      AND (category = ${article.category} OR region = ${article.region || ''})
      ORDER BY created_at DESC LIMIT 8
    `;
    const related = relatedResult as unknown as Article[];

    return <ArticleDetailClient article={article} relatedArticles={related} />;
  } catch (error) {
    console.error("Error loading article:", error);
    notFound();
  }
}
