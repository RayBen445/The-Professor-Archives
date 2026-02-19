'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const topics = [
  { id: 'all', label: 'All Stories' },
  { id: 'WWI', label: 'WWI' },
  { id: 'WWII', label: 'WWII' },
  { id: 'League of Nations', label: 'League of Nations' },
  { id: 'Independence', label: 'Independence' },
  { id: 'The Commonwealth', label: 'The Commonwealth' },
];

interface TopicFiltersProps {
  onFilterChange: (filter: string) => void;
}

export default function TopicFilters({ onFilterChange }: TopicFiltersProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleClick = (id: string) => {
    setActiveFilter(id);
    onFilterChange(id);
  };

  return (
    <section className="py-8 px-4 bg-vintage-beige border-y border-vintage-charcoal/10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {topics.map((topic, index) => (
            <motion.button
              key={topic.id}
              onClick={() => handleClick(topic.id)}
              className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeFilter === topic.id
                  ? 'bg-vintage-charcoal text-vintage-cream shadow-lg'
                  : 'bg-vintage-cream text-vintage-charcoal border border-vintage-charcoal/20 hover:border-vintage-charcoal/40 hover:shadow-md'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {topic.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
