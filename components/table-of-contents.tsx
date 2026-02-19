"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight, X } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  contentRef: React.RefObject<HTMLDivElement | null>;
}

export default function TableOfContents({ contentRef }: TableOfContentsProps) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    const headings = contentRef.current.querySelectorAll("h2, h3");
    const tocItems: TOCItem[] = [];
    headings.forEach((heading, i) => {
      const id = `heading-${i}`;
      heading.id = id;
      tocItems.push({
        id,
        text: heading.textContent || "",
        level: heading.tagName === "H2" ? 2 : 3,
      });
    });
    setItems(tocItems);
  }, [contentRef]);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -60% 0px" }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <>
      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-1/3 z-40 p-3 bg-ink text-cream rounded-full shadow-lg hover:bg-accent transition-colors hidden lg:flex items-center justify-center"
        aria-label="Table of contents"
      >
        <List className="w-4 h-4" />
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-72 bg-cream border-r border-aged/20 z-50 p-6 pt-24 overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-baby text-lg font-bold text-ink">Contents</h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 hover:bg-parchment rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-ink-muted" />
                </button>
              </div>
              <nav className="space-y-1">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      item.level === 3 ? "pl-6" : ""
                    } ${
                      activeId === item.id
                        ? "bg-accent/10 text-accent font-semibold border-l-2 border-accent"
                        : "text-ink-light hover:text-accent hover:bg-parchment"
                    }`}
                  >
                    <ChevronRight
                      className={`w-3 h-3 shrink-0 transition-transform ${
                        activeId === item.id ? "text-accent" : "text-aged"
                      }`}
                    />
                    <span className="line-clamp-1">{item.text}</span>
                  </a>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
