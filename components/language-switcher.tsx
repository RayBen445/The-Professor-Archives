"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Globe2 } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "EN", native: "English" },
  { code: "fr", label: "French", flag: "FR", native: "Fran\u00e7ais" },
  { code: "sw", label: "Swahili", flag: "SW", native: "Kiswahili" },
  { code: "ar", label: "Arabic", flag: "AR", native: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629" },
  { code: "pt", label: "Portuguese", flag: "PT", native: "Portugu\u00eas" },
  { code: "yo", label: "Yoruba", flag: "YO", native: "\u00c8d\u00e8 Yor\u00f9b\u00e1" },
  { code: "ha", label: "Hausa", flag: "HA", native: "Hausa" },
  { code: "ig", label: "Igbo", flag: "IG", native: "As\u1ee5s\u1ee5 Igbo" },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("en");

  return (
    <div className="fixed bottom-24 left-6 z-40">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-ink text-cream border border-aged/30 rounded-full shadow-lg shadow-ink/30 hover:bg-accent transition-all duration-300 text-xs font-semibold"
      >
        <Languages className="w-4 h-4" />
        {languages.find((l) => l.code === selected)?.flag || "EN"}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full left-0 mb-2 bg-cream border border-aged/20 rounded-2xl shadow-xl shadow-ink/10 overflow-hidden min-w-[200px]"
          >
            <div className="p-3 border-b border-aged/10">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted font-semibold flex items-center gap-1.5">
                <Globe2 className="w-3 h-3" /> Select Language
              </p>
            </div>
            <div className="p-1.5 max-h-[300px] overflow-y-auto">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ x: 3 }}
                  onClick={() => { setSelected(lang.code); setIsOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                    selected === lang.code
                      ? "bg-accent/10 text-accent"
                      : "text-ink hover:bg-parchment"
                  }`}
                >
                  <span className="w-7 h-7 rounded-full bg-parchment border border-aged/20 flex items-center justify-center text-[9px] font-bold">
                    {lang.flag}
                  </span>
                  <div>
                    <p className="text-xs font-semibold">{lang.label}</p>
                    <p className="text-[10px] text-ink-muted">{lang.native}</p>
                  </div>
                  {selected === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 rounded-full bg-accent"
                    />
                  )}
                </motion.button>
              ))}
            </div>
            <div className="p-2 border-t border-aged/10">
              <p className="text-[9px] text-ink-muted text-center">Coming soon: Full multilingual support</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
