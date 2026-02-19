"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar, Filter, BookMarked } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

const documents = [
  { id: 1, title: "Berlin Conference Act (1885)", type: "Treaty", year: 1885, desc: "The original General Act that divided Africa among European powers.", category: "Colonial Era" },
  { id: 2, title: "Treaty of Versailles - African Clauses", type: "Treaty", year: 1919, desc: "Sections concerning the redistribution of German colonies in Africa.", category: "WWI" },
  { id: 3, title: "Atlantic Charter (1941)", type: "Declaration", year: 1941, desc: "Roosevelt and Churchill's joint declaration that inspired independence movements worldwide.", category: "WWII" },
  { id: 4, title: "UN Declaration on Decolonization", type: "Resolution", year: 1960, desc: "Resolution 1514 granting independence to colonial countries and peoples.", category: "Independence" },
  { id: 5, title: "OAU Charter (1963)", type: "Charter", year: 1963, desc: "The founding charter of the Organisation of African Unity in Addis Ababa.", category: "Independence" },
  { id: 6, title: "Lagos Plan of Action (1980)", type: "Plan", year: 1980, desc: "Africa's blueprint for economic self-sufficiency and development.", category: "Modern Africa" },
  { id: 7, title: "Mandate System Documents", type: "Archive", year: 1920, desc: "League of Nations mandates that placed former German and Ottoman territories under European control.", category: "League of Nations" },
  { id: 8, title: "Nigerian Independence Constitution", type: "Constitution", year: 1960, desc: "The constitution that established the Federal Republic of Nigeria.", category: "Nigeria" },
];

const typeColors: Record<string, string> = {
  Treaty: "bg-red-100 text-red-700",
  Declaration: "bg-blue-100 text-blue-700",
  Resolution: "bg-green-100 text-green-700",
  Charter: "bg-purple-100 text-purple-700",
  Plan: "bg-amber-100 text-amber-700",
  Archive: "bg-cyan-100 text-cyan-700",
  Constitution: "bg-emerald-100 text-emerald-700",
};

export default function DocumentArchive() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(documents.map((d) => d.category))];
  const filtered = filter === "All" ? documents : documents.filter((d) => d.category === filter);

  return (
    <section className="py-20 px-6" id="documents">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-4">
              <BookMarked className="w-3.5 h-3.5" />
              Primary Sources
            </span>
            <h2 className="font-baby text-3xl md:text-4xl font-bold text-ink mb-3 text-balance">
              Document Archive
            </h2>
            <p className="text-ink-light text-sm max-w-lg mx-auto text-pretty">
              Access key historical documents, treaties, and declarations that shaped Africa and the world.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
            <Filter className="w-3.5 h-3.5 text-ink-muted" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-300 ${
                  filter === cat
                    ? "bg-ink text-cream"
                    : "bg-parchment border border-aged/20 text-ink-muted hover:text-accent hover:border-accent/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((doc, i) => (
            <ScrollReveal key={doc.id} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -3 }}
                className="flex gap-4 p-5 bg-parchment border border-aged/20 rounded-xl hover:border-accent/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${typeColors[doc.type] || "bg-stone-100 text-stone-700"}`}>
                      {doc.type}
                    </span>
                    <span className="text-[10px] text-ink-muted flex items-center gap-0.5">
                      <Calendar className="w-2.5 h-2.5" />{doc.year}
                    </span>
                  </div>
                  <h4 className="font-baby text-sm font-bold text-ink group-hover:text-accent transition-colors mb-1 truncate">{doc.title}</h4>
                  <p className="text-[11px] text-ink-muted line-clamp-2">{doc.desc}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button className="flex items-center gap-1 text-[10px] font-semibold text-accent hover:underline">
                      <Eye className="w-3 h-3" />View
                    </button>
                    <button className="flex items-center gap-1 text-[10px] font-semibold text-ink-muted hover:text-accent transition-colors">
                      <Download className="w-3 h-3" />Save
                    </button>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
