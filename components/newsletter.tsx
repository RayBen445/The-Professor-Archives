"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, Mail } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <section className="py-24 px-6 bg-parchment relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
            <Mail className="w-7 h-7 text-accent" />
          </div>
          <h2 className="font-baby text-3xl md:text-4xl font-bold text-ink mb-4 text-balance">
            Stay Informed
          </h2>
          <p className="text-ink-light mb-8 text-pretty">
            Get new stories and research delivered to your inbox. No spam,
            just history that matters.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-5 py-3.5 bg-cream border border-aged/30 rounded-full text-ink placeholder:text-ink-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
            </div>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-green-700 text-cream rounded-full font-semibold"
                >
                  <Check className="w-4 h-4" />
                  Subscribed
                </motion.div>
              ) : (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-cream rounded-full font-semibold hover:bg-accent transition-colors duration-300 hover:shadow-lg hover:shadow-accent/20"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </motion.button>
              )}
            </AnimatePresence>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
