'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center text-center px-4 py-16 vintage-paper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          className="font-baby text-5xl md:text-7xl font-bold text-vintage-charcoal mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          The Uncovered History
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-vintage-charcoal/80 font-crimson italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Global events. African perspectives. Explained vividly.
        </motion.p>
        <motion.div
          className="mt-8 h-1 w-32 mx-auto bg-vintage-gold"
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </motion.div>
    </section>
  );
}
