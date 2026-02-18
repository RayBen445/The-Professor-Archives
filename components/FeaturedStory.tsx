'use client';

import { motion } from 'framer-motion';
import { Article } from '@/lib/data';
import { Calendar, User } from 'lucide-react';

interface FeaturedStoryProps {
  article: Article;
}

export default function FeaturedStory({ article }: FeaturedStoryProps) {
  return (
    <section className="py-16 px-4 bg-vintage-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="overflow-hidden rounded-lg shadow-2xl hover-lift bg-white"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Placeholder */}
            <motion.div 
              className="bg-gradient-to-br from-vintage-charcoal via-vintage-darkBrown to-vintage-charcoal h-64 md:h-auto flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
              <div className="text-vintage-cream/60 text-6xl z-10">📜</div>
            </motion.div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-block px-3 py-1 text-xs font-semibold text-vintage-cream bg-vintage-charcoal rounded-full mb-4">
                  {article.category}
                </span>
                <h2 className="font-baby text-3xl md:text-4xl font-bold text-vintage-charcoal mb-4">
                  {article.title}
                </h2>
                <p className="text-lg text-vintage-charcoal/80 mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-vintage-charcoal/60 mb-6">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(article.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                </div>
                <motion.button
                  className="px-6 py-3 bg-vintage-charcoal text-vintage-cream font-semibold rounded hover:bg-vintage-darkBrown transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Full Story
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
