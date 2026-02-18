'use client';

import { motion } from 'framer-motion';
import { Article } from '@/lib/data';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface ArticleGridProps {
  articles: Article[];
}

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <section className="py-16 px-4 bg-vintage-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-baby text-3xl md:text-4xl font-bold text-vintage-charcoal text-center mb-4">
            More Stories
          </h2>
          <p className="text-center text-vintage-charcoal/70 max-w-2xl mx-auto">
            Deep dives into the untold narratives that shaped our world
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover-lift border border-vintage-charcoal/5"
            >
              {/* Image placeholder */}
              <motion.div 
                className="h-48 bg-gradient-to-br from-vintage-charcoal/80 via-vintage-darkBrown to-vintage-charcoal/80 flex items-center justify-center relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
                <div className="text-vintage-cream/60 text-4xl z-10">📖</div>
              </motion.div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-vintage-cream bg-vintage-charcoal rounded-full mb-3">
                  {article.category}
                </span>
                <h3 className="font-baby text-xl font-bold text-vintage-charcoal mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-vintage-charcoal/70 mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex flex-col gap-2 text-xs text-vintage-charcoal/50 mb-4">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{new Date(article.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                </div>
                <motion.button
                  className="flex items-center gap-2 text-vintage-charcoal font-semibold text-sm hover:text-vintage-gold transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Read More <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
