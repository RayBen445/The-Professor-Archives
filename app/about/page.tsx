"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Globe,
  Target,
  Heart,
  Linkedin,
  Github,
  Mail,
  Phone,
  ExternalLink,
  Feather,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import ScrollReveal from "@/components/scroll-reveal";
import Image from "next/image";

const features = [
  {
    icon: BookOpen,
    title: "Deep Research",
    description:
      "Every article is backed by thorough historical research, drawing from primary sources, academic journals, and oral histories.",
  },
  {
    icon: Globe,
    title: "African Perspectives",
    description:
      "We center African voices and experiences in global events, telling the stories that mainstream history overlooks.",
  },
  {
    icon: Target,
    title: "Connecting the Dots",
    description:
      "Our interactive timeline links world wars to independence movements, revealing how global conflicts shaped Africa.",
  },
  {
    icon: Heart,
    title: "Preserving Memory",
    description:
      "We honor the millions of Africans who shaped world history, ensuring their contributions are never forgotten.",
  },
];

const contactInfo = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "heritage-oladoye",
    href: "https://www.linkedin.com/in/heritage-oladoye",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "RayBen445",
    href: "https://github.com/RayBen445",
  },
  {
    icon: ExternalLink,
    label: "Portfolio",
    value: "View Portfolio",
    href: "https://v0-heritageoladoye-coolshotsystems.vercel.app/",
  },
  {
    icon: Mail,
    label: "Email",
    value: "oladoyeheritage445@gmail.com",
    href: "mailto:oladoyeheritage445@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 807 561 4248",
    href: "tel:+2348075614248",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/80 to-cream" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Feather className="w-10 h-10 text-accent mx-auto mb-6" />
            <h1 className="font-baby text-4xl sm:text-5xl md:text-6xl font-bold text-ink mb-6 text-balance">
              About The Archives
            </h1>
            <p className="text-lg text-ink-light max-w-2xl mx-auto leading-relaxed text-pretty">
              {"The Professor's Archives is a passion project dedicated to uncovering the hidden stories of Africa's role in shaping modern world history."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="p-8 bg-parchment border border-aged/20 rounded-2xl hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-baby text-xl font-bold text-ink mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-ink-light leading-relaxed text-pretty">
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming features */}
      <section className="py-20 px-6 bg-parchment">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold">
                What is Next
              </span>
              <h2 className="font-baby text-3xl md:text-4xl font-bold text-ink mt-3 text-balance">
                Features Coming Soon
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {[
              "Interactive Maps showing colonial borders vs. modern borders",
              "Audio narration for each article with immersive sound design",
              "User accounts with bookmarks and reading lists",
              "Discussion forums for historical debates and perspectives",
              "Document archive with primary source materials",
              "Video documentaries and interviews with historians",
              "Multilingual support (French, Swahili, Arabic, Portuguese)",
              "Teacher resources and classroom-ready lesson plans",
              "Mobile app for offline reading",
              "Podcast companion series with expert interviews",
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-4 p-4 bg-cream border border-aged/20 rounded-xl hover:border-accent/30 transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent font-baby font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-ink-light pt-1">{feature}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-baby text-3xl md:text-4xl font-bold text-ink mb-4 text-balance">
                Get in Touch
              </h2>
              <p className="text-ink-light text-pretty">
                Have a story to share? Want to collaborate? Reach out.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactInfo.map((info, i) => (
              <ScrollReveal key={info.label} delay={i * 0.08}>
                <a
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 bg-parchment border border-aged/20 rounded-xl hover:border-accent/30 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <info.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted uppercase tracking-wider">
                      {info.label}
                    </p>
                    <p className="text-ink font-semibold text-sm group-hover:text-accent transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
