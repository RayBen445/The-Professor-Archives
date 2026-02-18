import { getDb } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sql = getDb();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const published = searchParams.get("published");

  try {
    let articles;
    if (category && category !== "All") {
      articles = await sql`
        SELECT * FROM articles 
        WHERE category = ${category} 
        ${published === "true" ? sql`AND published = true` : sql``}
        ORDER BY created_at DESC
      `;
    } else if (published === "true") {
      articles = await sql`
        SELECT * FROM articles 
        WHERE published = true
        ORDER BY created_at DESC
      `;
    } else {
      articles = await sql`SELECT * FROM articles ORDER BY created_at DESC`;
    }
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const sql = getDb();
  const body = await request.json();
  const { title, slug, excerpt, content, category, image_url, is_featured, published, author } = body;

  try {
    const result = await sql`
      INSERT INTO articles (title, slug, excerpt, content, category, image_url, is_featured, published, author)
      VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${category}, ${image_url || null}, ${is_featured || false}, ${published || false}, ${author || "The Professor"})
      RETURNING *
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
