"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Feather,
  Github,
  Linkedin,
  Globe,
  Mail,
  Phone,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const footerLinks = {
  Explore: [
    { label: "All Stories", href: "/#articles" },
    { label: "Timeline", href: "/#timeline" },
    { label: "World War I", href: "/?category=WWI" },
    { label: "World War II", href: "/?category=WWII" },
  ],
  Topics: [
    { label: "League of Nations", href: "/?category=League+of+Nations" },
    { label: "Independence", href: "/?category=Independence" },
    { label: "The Commonwealth", href: "/?category=The+Commonwealth" },
    { label: "About", href: "/about" },
  ],
};

const socialLinks = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/heritage-oladoye",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/RayBen445",
    label: "GitHub",
  },
  {
    icon: Globe,
    href: "https://v0-heritageoladoye-coolshotsystems.vercel.app/",
    label: "Portfolio",
  },
  {
    icon: Mail,
    href: "mailto:oladoyeheritage445@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-aged pt-20 pb-8 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute top-0 right-[20%] w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <motion.div whileHover={{ rotate: 15 }}>
                <Feather className="w-8 h-8 text-gold" />
              </motion.div>
              <div>
                <h3 className="font-baby text-2xl font-bold text-cream">
                  {"The Professor's Archives"}
                </h3>
                <span className="text-xs uppercase tracking-[0.3em] text-aged-dark">
                  Uncovering Hidden History
                </span>
              </div>
            </Link>
            <p className="text-aged max-w-md leading-relaxed mb-6 text-pretty">
              Dedicated to uncovering and preserving the untold stories of global
              conflicts and African independence. Every story matters. Every
              perspective counts.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-xl border border-aged/20 text-aged hover:text-gold hover:border-gold/40 hover:bg-gold/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-baby text-lg font-bold text-cream mb-5">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-aged hover:text-gold transition-colors duration-300 text-sm"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 border-t border-aged/10 mb-6">
          <a
            href="mailto:oladoyeheritage445@gmail.com"
            className="flex items-center gap-2 text-aged hover:text-gold transition-colors text-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            oladoyeheritage445@gmail.com
          </a>
          <a
            href="tel:+2348075614248"
            className="flex items-center gap-2 text-aged hover:text-gold transition-colors text-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            +234 807 561 4248
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-aged/10 pt-6">
          <p className="text-sm text-aged-dark flex items-center justify-center gap-1">
            {currentYear} {"The Professor's Archives. Built with"}
            <Heart className="w-3 h-3 text-accent inline" />
            by Heritage Oladoye
          </p>
        </div>
      </div>
    </footer>
  );
}
