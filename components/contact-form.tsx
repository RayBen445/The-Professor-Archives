"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, MessageSquare, Check, Loader2 } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    try {
      await fetch("https://formspree.io/f/xzdavyez", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
      form.reset();
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-ink relative overflow-hidden" id="contact">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute top-20 right-[15%] w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-[10%] w-56 h-56 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              Get In Touch
            </span>
            <h2 className="font-baby text-3xl md:text-4xl font-bold text-cream mb-3 text-balance">
              Share a Story or Collaborate
            </h2>
            <p className="text-aged text-sm max-w-lg mx-auto text-pretty">
              Have a hidden history to share? Want to contribute an article? Send us a message and our team will get back to you.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-green-900/30 border border-green-500/30 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-400" />
                </motion.div>
                <h3 className="font-baby text-2xl font-bold text-cream mb-2">Message Sent</h3>
                <p className="text-aged text-sm">Thank you for reaching out. We will respond shortly.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 border border-aged/30 text-aged text-sm font-semibold rounded-full hover:border-gold hover:text-gold transition-all duration-300"
                >
                  Send Another
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aged" />
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full pl-11 pr-4 py-3.5 bg-cream/5 border border-aged/20 rounded-xl text-cream placeholder:text-aged/60 text-sm focus:outline-none focus:border-gold/50 focus:bg-cream/10 transition-all duration-300"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aged" />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Your Email"
                      className="w-full pl-11 pr-4 py-3.5 bg-cream/5 border border-aged/20 rounded-xl text-cream placeholder:text-aged/60 text-sm focus:outline-none focus:border-gold/50 focus:bg-cream/10 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="relative">
                  <input
                    name="subject"
                    type="text"
                    required
                    placeholder="Subject (e.g. Story Tip, Collaboration, Question)"
                    className="w-full px-4 py-3.5 bg-cream/5 border border-aged/20 rounded-xl text-cream placeholder:text-aged/60 text-sm focus:outline-none focus:border-gold/50 focus:bg-cream/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us your story, idea, or question..."
                    className="w-full px-4 py-3.5 bg-cream/5 border border-aged/20 rounded-xl text-cream placeholder:text-aged/60 text-sm focus:outline-none focus:border-gold/50 focus:bg-cream/10 transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gold text-ink font-bold rounded-xl hover:bg-gold/90 transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
