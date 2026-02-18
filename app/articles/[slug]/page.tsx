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
  const result = await sql`SELECT title, excerpt FROM articles WHERE slug = ${slug}`;
  const article = result[0];
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} | The Professor's Archives`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const sql = getDb();

  const articleResult = await sql`SELECT * FROM articles WHERE slug = ${slug}`;
  const article = articleResult[0] as unknown as Article | undefined;

  if (!article) {
    notFound();
  }

  const relatedResult = await sql`
    SELECT * FROM articles 
    WHERE category = ${article.category} AND slug != ${slug} AND published = true 
    ORDER BY created_at DESC LIMIT 3
  `;
  const related = relatedResult as unknown as Article[];

  return <ArticleDetailClient article={article} relatedArticles={related} />;
}
