"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Search,
  Filter,
  LayoutDashboard,
  FileText,
  Home,
  Feather,
  ChevronRight,
  BarChart3,
  BookOpen,
  Clock,
  AlertCircle,
} from "lucide-react";
import useSWR, { mutate } from "swr";
import type { Article, Category } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminDashboard() {
  const { data: articles, isLoading } = useSWR<Article[]>(
    "/api/articles",
    fetcher
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filteredArticles = articles?.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "All" || a.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: articles?.length || 0,
    published: articles?.filter((a) => a.published).length || 0,
    drafts: articles?.filter((a) => !a.published).length || 0,
    featured: articles?.filter((a) => a.is_featured).length || 0,
  };

  const handleDelete = useCallback(async (id: number) => {
    try {
      await fetch(`/api/articles/${id}`, { method: "DELETE" });
      mutate("/api/articles");
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }, []);

  const handleTogglePublish = useCallback(
    async (article: Article) => {
      try {
        await fetch(`/api/articles/${article.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...article, published: !article.published }),
        });
        mutate("/api/articles");
      } catch (error) {
        console.error("Error toggling publish:", error);
      }
    },
    []
  );

  const handleToggleFeatured = useCallback(
    async (article: Article) => {
      try {
        await fetch(`/api/articles/${article.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...article,
            is_featured: !article.is_featured,
          }),
        });
        mutate("/api/articles");
      } catch (error) {
        console.error("Error toggling featured:", error);
      }
    },
    []
  );

  return (
    <div className="min-h-screen bg-parchment">
      {/* Admin Header */}
      <header className="bg-ink text-cream sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Feather className="w-6 h-6 text-gold" />
              <span className="font-baby text-lg font-bold hidden sm:block">
                {"The Professor's Archives"}
              </span>
            </Link>
            <ChevronRight className="w-4 h-4 text-aged" />
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-gold" />
              <span className="font-semibold text-sm">Admin Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-4 py-2 text-sm border border-aged/30 rounded-full text-aged hover:text-cream hover:border-cream/40 transition-all"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Site</span>
            </Link>
            <Link
              href="/admin/editor"
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-accent text-cream rounded-full hover:bg-accent-hover transition-all hover:shadow-lg hover:shadow-accent/20 hover:scale-105 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              New Story
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: FileText,
              label: "Total Stories",
              value: stats.total,
              color: "text-ink",
              bg: "bg-ink/5",
            },
            {
              icon: Eye,
              label: "Published",
              value: stats.published,
              color: "text-green-700",
              bg: "bg-green-50",
            },
            {
              icon: Clock,
              label: "Drafts",
              value: stats.drafts,
              color: "text-amber-700",
              bg: "bg-amber-50",
            },
            {
              icon: Star,
              label: "Featured",
              value: stats.featured,
              color: "text-accent",
              bg: "bg-accent/5",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-cream border border-aged/20 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex p-2.5 rounded-lg ${stat.bg} mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="font-baby text-2xl font-bold text-ink">
                {stat.value}
              </p>
              <p className="text-xs text-ink-muted uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-cream border border-aged/30 rounded-xl text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-11 pr-8 py-3 bg-cream border border-aged/30 rounded-xl text-ink appearance-none cursor-pointer focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
            >
              <option value="All">All Categories</option>
              <option value="WWI">WWI</option>
              <option value="WWII">WWII</option>
              <option value="League of Nations">League of Nations</option>
              <option value="Independence">Independence</option>
              <option value="The Commonwealth">The Commonwealth</option>
            </select>
          </div>
        </div>

        {/* Articles list */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 bg-cream border border-aged/20 rounded-xl skeleton"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredArticles?.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-cream border border-aged/20 rounded-xl p-5 hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {article.is_featured && (
                          <Star className="w-4 h-4 text-gold fill-gold" />
                        )}
                        <h3 className="font-baby text-lg font-bold text-ink truncate">
                          {article.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-accent/10 text-accent font-semibold rounded-full">
                          {article.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold ${
                            article.published
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {article.published ? "Published" : "Draft"}
                        </span>
                        <span className="text-ink-muted">
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleFeatured(article)}
                        className="p-2 rounded-lg hover:bg-gold/10 text-ink-muted hover:text-gold transition-all tooltip-container"
                        aria-label={
                          article.is_featured
                            ? "Remove featured"
                            : "Set featured"
                        }
                      >
                        {article.is_featured ? (
                          <Star className="w-4 h-4 fill-current" />
                        ) : (
                          <StarOff className="w-4 h-4" />
                        )}
                        <span className="tooltip-text">
                          {article.is_featured ? "Unfeature" : "Feature"}
                        </span>
                      </button>
                      <button
                        onClick={() => handleTogglePublish(article)}
                        className="p-2 rounded-lg hover:bg-accent/10 text-ink-muted hover:text-accent transition-all tooltip-container"
                        aria-label={
                          article.published ? "Unpublish" : "Publish"
                        }
                      >
                        {article.published ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                        <span className="tooltip-text">
                          {article.published ? "Unpublish" : "Publish"}
                        </span>
                      </button>
                      <Link
                        href={`/admin/editor/${article.id}`}
                        className="p-2 rounded-lg hover:bg-accent/10 text-ink-muted hover:text-accent transition-all tooltip-container"
                        aria-label="Edit article"
                      >
                        <Pencil className="w-4 h-4" />
                        <span className="tooltip-text">Edit</span>
                      </Link>
                      <Link
                        href={`/articles/${article.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-accent/10 text-ink-muted hover:text-accent transition-all tooltip-container"
                        aria-label="Preview article"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span className="tooltip-text">Preview</span>
                      </Link>

                      {deleteConfirm === article.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="px-3 py-1.5 bg-red-600 text-cream text-xs rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1.5 bg-cream border border-aged/30 text-ink text-xs rounded-lg hover:bg-parchment transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(article.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-ink-muted hover:text-red-600 transition-all tooltip-container"
                          aria-label="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="tooltip-text">Delete</span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredArticles?.length === 0 && (
              <div className="text-center py-16">
                <AlertCircle className="w-12 h-12 text-aged mx-auto mb-4" />
                <h3 className="font-baby text-xl text-ink mb-2">
                  No stories found
                </h3>
                <p className="text-ink-muted text-sm">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
