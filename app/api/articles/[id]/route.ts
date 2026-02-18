import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sql = getDb();
  const { id } = await params;

  try {
    const isSlug = isNaN(Number(id));
    let article;
    if (isSlug) {
      article = await sql`SELECT * FROM articles WHERE slug = ${id}`;
    } else {
      article = await sql`SELECT * FROM articles WHERE id = ${Number(id)}`;
    }

    if (article.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(article[0]);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sql = getDb();
  const { id } = await params;
  const body = await request.json();
  const { title, slug, excerpt, content, category, image_url, is_featured, published, author } = body;

  try {
    const result = await sql`
      UPDATE articles 
      SET title = ${title}, slug = ${slug}, excerpt = ${excerpt}, content = ${content}, 
          category = ${category}, image_url = ${image_url || null}, is_featured = ${is_featured || false}, 
          published = ${published || false}, author = ${author || "The Professor"}, updated_at = NOW()
      WHERE id = ${Number(id)}
      RETURNING *
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const sql = getDb();
  const { id } = await params;

  try {
    await sql`DELETE FROM articles WHERE id = ${Number(id)}`;
    return NextResponse.json({ message: "Article deleted" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
