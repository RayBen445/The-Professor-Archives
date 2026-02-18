"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Menu,
  X,
  Feather,
  Home,
  Library,
  Info,
  Lock,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#articles", label: "Archives", icon: Library },
  { href: "/#timeline", label: "Timeline", icon: BookOpen },
  { href: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-cream/95 backdrop-blur-md shadow-lg shadow-ink/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Feather className="w-7 h-7 text-accent" />
            </motion.div>
            <div>
              <h1 className="font-baby text-xl font-bold tracking-tight text-ink leading-none">
                {"The Professor's"}
              </h1>
              <span className="text-[10px] uppercase tracking-[0.3em] text-ink-muted font-semibold">
                Archives
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-ink-light hover:text-accent transition-colors duration-300 group"
              >
                <span className="ink-underline">{link.label}</span>
              </Link>
            ))}
            <Link
              href="/admin"
              className="ml-4 flex items-center gap-2 px-5 py-2.5 bg-ink text-cream text-sm font-semibold rounded-full hover:bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:scale-105 active:scale-95"
            >
              <Lock className="w-3.5 h-3.5" />
              Admin
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-ink hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream/98 backdrop-blur-lg pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-4 py-4 px-4 text-lg font-baby font-semibold text-ink hover:text-accent hover:bg-parchment rounded-xl transition-all duration-300"
                  >
                    <link.icon className="w-5 h-5 text-accent" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-4"
              >
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-4 bg-ink text-cream font-semibold rounded-xl hover:bg-accent transition-colors"
                >
                  <Lock className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
