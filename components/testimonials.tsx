"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

const testimonials = [
  {
    name: "Dr. Adaeze Nwosu",
    role: "History Professor, University of Lagos",
    text: "The Professor's Archives fills a critical gap in digital historical resources. The African perspective on global conflicts is finally getting the spotlight it deserves.",
    rating: 5,
  },
  {
    name: "James Okereke",
    role: "Graduate Student, Oxford",
    text: "I stumbled upon this site while researching my thesis on colonial-era military contributions. The depth and accuracy of the articles here is remarkable.",
    rating: 5,
  },
  {
    name: "Sarah Kimathi",
    role: "Journalist, Nairobi",
    text: "As someone who writes about post-colonial Africa, this archive is an invaluable resource. The timeline feature alone is worth bookmarking.",
    rating: 5,
  },
  {
    name: "Prof. Emmanuel Akyeampong",
    role: "Researcher, Accra",
    text: "This platform brings together scattered historical narratives into one beautifully designed, accessible resource. A must-visit for history enthusiasts.",
    rating: 5,
  },
  {
    name: "Fatima Al-Rashid",
    role: "Documentary Filmmaker",
    text: "The stories here have inspired two of my recent documentaries. The way complex history is made accessible without losing depth is truly impressive.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-6 bg-parchment relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold">
              What Readers Say
            </span>
            <h2 className="font-baby text-4xl md:text-5xl font-bold text-ink mt-3 text-balance">
              Voices from the Community
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-cream border border-aged/20 rounded-3xl p-8 md:p-12 text-center relative"
            >
              <Quote className="w-10 h-10 text-gold/30 mx-auto mb-6" />

              <p className="font-serif text-lg md:text-xl text-ink leading-relaxed mb-8 max-w-2xl mx-auto text-pretty italic">
                {`"${testimonials[current].text}"`}
              </p>

              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-gold text-gold"
                    />
                  )
                )}
              </div>

              <div>
                <h4 className="font-baby text-lg font-bold text-ink">
                  {testimonials[current].name}
                </h4>
                <p className="text-sm text-ink-muted">
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              setCurrent(
                (prev) =>
                  (prev - 1 + testimonials.length) % testimonials.length
              )
            }
            className="p-3 rounded-full border border-aged/30 text-ink-muted hover:text-accent hover:border-accent transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-accent scale-125"
                    : "bg-aged/40 hover:bg-aged"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              setCurrent((prev) => (prev + 1) % testimonials.length)
            }
            className="p-3 rounded-full border border-aged/30 text-ink-muted hover:text-accent hover:border-accent transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
