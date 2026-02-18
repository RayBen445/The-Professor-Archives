'use client';

import { motion } from 'framer-motion';
import { TimelineEvent } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <section className="py-16 px-4 bg-vintage-beige">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-baby text-3xl md:text-4xl font-bold text-vintage-charcoal text-center mb-4">
            The Timeline
          </h2>
          <p className="text-center text-vintage-charcoal/70 mb-12 max-w-2xl mx-auto">
            From global wars to African independence - a chronological journey through pivotal moments
          </p>
        </motion.div>

        {/* Horizontal Scrollable Timeline */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide pb-6">
            <div className="flex gap-8 min-w-max px-4">
              {events.map((event, index) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex-shrink-0 w-72"
                >
                  <div className="relative">
                    {/* Timeline connector line */}
                    {index < events.length - 1 && (
                      <div className="absolute top-8 left-full w-8 h-0.5 bg-vintage-gold z-0" />
                    )}
                    
                    {/* Year badge */}
                    <motion.div 
                      className="inline-flex items-center justify-center w-16 h-16 bg-vintage-charcoal text-vintage-cream rounded-full font-baby text-xl font-bold mb-4 shadow-lg relative z-10"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {event.year}
                    </motion.div>

                    {/* Event card */}
                    <motion.div 
                      className="bg-white p-6 rounded-lg shadow-md hover-lift border border-vintage-charcoal/10"
                      whileHover={{ y: -5 }}
                    >
                      <h3 className="font-baby text-xl font-bold text-vintage-charcoal mb-2">
                        {event.title}
                      </h3>
                      <p className="text-vintage-charcoal/70 text-sm leading-relaxed mb-3">
                        {event.description}
                      </p>
                      <motion.button 
                        className="text-vintage-charcoal font-semibold text-sm flex items-center gap-2 hover:text-vintage-gold transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        Explore <ArrowRight size={16} />
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="text-center mt-4 text-vintage-charcoal/50 text-sm">
            ← Scroll to explore the timeline →
          </div>
        </div>
      </div>
    </section>
  );
}
