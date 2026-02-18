"use client";

import { use } from "react";
import ArticleEditor from "@/components/admin/article-editor";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <ArticleEditor articleId={id} />;
}
