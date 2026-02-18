"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Feather,
  ChevronRight,
  LayoutDashboard,
  Loader2,
  Check,
  ImageIcon,
  Type,
  AlignLeft,
  List,
  Bold,
  Italic,
  Quote,
  Heading1,
  Heading2,
} from "lucide-react";
import type { Article } from "@/lib/types";

interface ArticleEditorProps {
  articleId?: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ArticleEditor({ articleId }: ArticleEditorProps) {
  const router = useRouter();
  const isEditing = !!articleId;

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "WWI" as string,
    image_url: "",
    is_featured: false,
    published: false,
    author: "The Professor",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [autoSlug, setAutoSlug] = useState(true);

  useEffect(() => {
    if (articleId) {
      fetch(`/api/articles/${articleId}`)
        .then((r) => r.json())
        .then((article: Article) => {
          setForm({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            content: article.content,
            category: article.category,
            image_url: article.image_url || "",
            is_featured: article.is_featured,
            published: article.published,
            author: article.author,
          });
          setAutoSlug(false);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [articleId]);

  const updateField = useCallback(
    (field: string, value: string | boolean) => {
      setForm((prev) => {
        const updated = { ...prev, [field]: value };
        if (field === "title" && autoSlug) {
          updated.slug = generateSlug(value as string);
        }
        return updated;
      });
    },
    [autoSlug]
  );

  const insertTag = (tag: string) => {
    const textarea = document.getElementById(
      "content-editor"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = form.content.substring(start, end);

    let newText = "";
    switch (tag) {
      case "h2":
        newText = `<h2>${selectedText || "Heading"}</h2>`;
        break;
      case "h3":
        newText = `<h3>${selectedText || "Subheading"}</h3>`;
        break;
      case "bold":
        newText = `<strong>${selectedText || "bold text"}</strong>`;
        break;
      case "italic":
        newText = `<em>${selectedText || "italic text"}</em>`;
        break;
      case "quote":
        newText = `<blockquote>${selectedText || "Quote text"}</blockquote>`;
        break;
      case "p":
        newText = `<p>${selectedText || "Paragraph text"}</p>`;
        break;
      case "ul":
        newText = `<ul>\n  <li>${selectedText || "List item"}</li>\n</ul>`;
        break;
      default:
        newText = selectedText;
    }

    const updated =
      form.content.substring(0, start) +
      newText +
      form.content.substring(end);
    updateField("content", updated);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug || !form.excerpt || !form.content) return;

    setSaving(true);
    try {
      const url = isEditing
        ? `/api/articles/${articleId}`
        : "/api/articles";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        if (!isEditing) {
          const data = await res.json();
          router.push(`/admin/editor/${data.id}`);
        }
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment">
      {/* Header */}
      <header className="bg-ink text-cream sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 group">
              <ArrowLeft className="w-4 h-4 text-aged group-hover:text-cream transition-colors group-hover:-translate-x-1 transform" />
              <Feather className="w-5 h-5 text-gold" />
            </Link>
            <ChevronRight className="w-4 h-4 text-aged" />
            <span className="font-semibold text-sm">
              {isEditing ? "Edit Story" : "New Story"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => updateField("published", !form.published)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-full border transition-all ${
                form.published
                  ? "border-green-500/50 text-green-400 hover:bg-green-500/10"
                  : "border-aged/30 text-aged hover:text-cream hover:border-cream/30"
              }`}
            >
              {form.published ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              {form.published ? "Published" : "Draft"}
            </button>

            <button
              onClick={() => updateField("is_featured", !form.is_featured)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm rounded-full border transition-all ${
                form.is_featured
                  ? "border-gold/50 text-gold hover:bg-gold/10"
                  : "border-aged/30 text-aged hover:text-cream hover:border-cream/30"
              }`}
            >
              {form.is_featured ? (
                <Star className="w-3.5 h-3.5 fill-current" />
              ) : (
                <StarOff className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">Featured</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-5 py-2 text-sm bg-accent text-cream rounded-full hover:bg-accent-hover transition-all disabled:opacity-50 hover:shadow-lg hover:shadow-accent/20"
            >
              {saving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : saved ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              {saving ? "Saving..." : saved ? "Saved!" : "Save"}
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Story title..."
              className="w-full font-baby text-3xl md:text-4xl font-bold bg-transparent border-none outline-none text-ink placeholder:text-aged focus:ring-0 p-0"
            />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-ink-muted">Slug:</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  updateField("slug", e.target.value);
                }}
                className="text-xs bg-transparent border-b border-dashed border-aged text-ink-light outline-none flex-1 py-1 focus:border-accent transition-colors"
              />
            </div>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-ink-muted uppercase tracking-wider mb-1.5 block">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full px-4 py-2.5 bg-cream border border-aged/30 rounded-xl text-ink text-sm appearance-none cursor-pointer focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              >
                <option value="WWI">WWI</option>
                <option value="WWII">WWII</option>
                <option value="League of Nations">League of Nations</option>
                <option value="Independence">Independence</option>
                <option value="The Commonwealth">The Commonwealth</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-ink-muted uppercase tracking-wider mb-1.5 block">
                Author
              </label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => updateField("author", e.target.value)}
                className="w-full px-4 py-2.5 bg-cream border border-aged/30 rounded-xl text-ink text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>
            <div>
              <label className="text-xs text-ink-muted uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3 h-3" />
                Image URL
              </label>
              <input
                type="text"
                value={form.image_url}
                onChange={(e) => updateField("image_url", e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-2.5 bg-cream border border-aged/30 rounded-xl text-ink text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-ink-muted"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="text-xs text-ink-muted uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <AlignLeft className="w-3 h-3" />
              Excerpt
            </label>
            <textarea
              value={form.excerpt}
              onChange={(e) => updateField("excerpt", e.target.value)}
              placeholder="A brief summary of the story..."
              rows={3}
              className="w-full px-4 py-3 bg-cream border border-aged/30 rounded-xl text-ink text-sm leading-relaxed focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-none placeholder:text-ink-muted"
            />
          </div>

          {/* Content editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-ink-muted uppercase tracking-wider flex items-center gap-1">
                <Type className="w-3 h-3" />
                Content (HTML)
              </label>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 mb-2 p-2 bg-cream border border-aged/30 border-b-0 rounded-t-xl">
              {[
                { tag: "h2", icon: Heading1, label: "H2" },
                { tag: "h3", icon: Heading2, label: "H3" },
                { tag: "p", icon: AlignLeft, label: "P" },
                { tag: "bold", icon: Bold, label: "B" },
                { tag: "italic", icon: Italic, label: "I" },
                { tag: "quote", icon: Quote, label: "Quote" },
                { tag: "ul", icon: List, label: "List" },
              ].map((item) => (
                <button
                  key={item.tag}
                  onClick={() => insertTag(item.tag)}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-ink-light hover:text-accent hover:bg-accent/5 rounded-lg transition-all"
                  title={item.label}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              ))}
            </div>

            <textarea
              id="content-editor"
              value={form.content}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="<p>Write your story here...</p>"
              rows={20}
              className="w-full px-4 py-3 bg-cream border border-aged/30 rounded-b-xl font-mono text-sm text-ink leading-relaxed focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-y placeholder:text-ink-muted"
            />
          </div>

          {/* Preview */}
          {form.content && (
            <div>
              <h3 className="text-xs text-ink-muted uppercase tracking-wider mb-3 flex items-center gap-1">
                <Eye className="w-3 h-3" />
                Preview
              </h3>
              <div className="p-8 bg-cream border border-aged/30 rounded-xl prose-archive">
                <div dangerouslySetInnerHTML={{ __html: form.content }} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
