"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, ArrowLeftRight, Info } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

const eras = [
  {
    id: "pre-colonial",
    label: "Pre-Colonial (Before 1884)",
    description: "Africa before the Berlin Conference, with over 10,000 autonomous kingdoms, empires, and polities.",
    regions: [
      { name: "Zulu Kingdom", x: 62, y: 80, color: "bg-emerald-500" },
      { name: "Ashanti Empire", x: 30, y: 52, color: "bg-yellow-500" },
      { name: "Ethiopian Empire", x: 60, y: 45, color: "bg-red-500" },
      { name: "Oyo Empire", x: 32, y: 50, color: "bg-orange-500" },
      { name: "Sokoto Caliphate", x: 34, y: 42, color: "bg-cyan-500" },
      { name: "Kongo Kingdom", x: 42, y: 62, color: "bg-purple-500" },
      { name: "Benin Kingdom", x: 30, y: 52, color: "bg-rose-500" },
      { name: "Lozi Kingdom", x: 52, y: 72, color: "bg-teal-500" },
    ],
  },
  {
    id: "colonial",
    label: "Colonial Era (1884-1960)",
    description: "After the Berlin Conference, Africa was carved into colonies by European powers with arbitrary borders.",
    regions: [
      { name: "British Nigeria", x: 32, y: 48, color: "bg-red-600" },
      { name: "French West Africa", x: 25, y: 38, color: "bg-blue-600" },
      { name: "Belgian Congo", x: 46, y: 58, color: "bg-yellow-600" },
      { name: "British East Africa", x: 58, y: 55, color: "bg-red-500" },
      { name: "German East Africa", x: 56, y: 60, color: "bg-stone-600" },
      { name: "Portuguese Mozambique", x: 60, y: 72, color: "bg-green-700" },
      { name: "Italian Libya", x: 42, y: 25, color: "bg-green-500" },
      { name: "French Algeria", x: 30, y: 22, color: "bg-blue-500" },
    ],
  },
  {
    id: "modern",
    label: "Modern Africa (1960-Present)",
    description: "Independent nations emerged, though many colonial borders persisted, creating complex multi-ethnic states.",
    regions: [
      { name: "Nigeria", x: 32, y: 48, color: "bg-emerald-600" },
      { name: "DR Congo", x: 46, y: 58, color: "bg-sky-600" },
      { name: "Kenya", x: 60, y: 52, color: "bg-rose-600" },
      { name: "South Africa", x: 52, y: 82, color: "bg-amber-600" },
      { name: "Ghana", x: 28, y: 50, color: "bg-red-500" },
      { name: "Ethiopia", x: 60, y: 42, color: "bg-green-600" },
      { name: "Tanzania", x: 58, y: 62, color: "bg-cyan-600" },
      { name: "Egypt", x: 52, y: 26, color: "bg-yellow-500" },
    ],
  },
];

export default function ColonialMapViewer() {
  const [activeEra, setActiveEra] = useState(0);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <section className="py-20 px-6 bg-ink relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-4">
              <Map className="w-3.5 h-3.5" />
              Interactive Map
            </span>
            <h2 className="font-baby text-3xl md:text-4xl font-bold text-cream mb-3 text-balance">
              Colonial Borders vs Modern Borders
            </h2>
            <p className="text-aged text-sm max-w-xl mx-auto text-pretty">
              See how Africa was carved by colonial powers and how those borders shaped today's nations.
            </p>
          </div>
        </ScrollReveal>

        {/* Era Toggle */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {eras.map((era, i) => (
            <motion.button
              key={era.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveEra(i)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeEra === i
                  ? "bg-gold text-ink shadow-lg shadow-gold/20"
                  : "border border-aged/30 text-aged hover:text-gold hover:border-gold/40"
              }`}
            >
              {era.label}
            </motion.button>
          ))}
        </div>

        {/* Map Area */}
        <ScrollReveal delay={0.2}>
          <div className="relative bg-cream/5 border border-aged/20 rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/9]">
            {/* Africa Outline (simplified SVG) */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              <path
                d="M30,15 L42,12 L55,15 L65,22 L68,35 L65,45 L62,52 L65,60 L62,70 L58,78 L52,85 L45,80 L40,75 L35,68 L30,60 L25,52 L22,45 L20,35 L22,25 Z"
                fill="none"
                stroke="rgba(197,165,90,0.3)"
                strokeWidth="0.5"
                className="transition-all duration-500"
              />
            </svg>

            {/* Region Dots */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEra}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                {eras[activeEra].regions.map((region) => (
                  <motion.div
                    key={region.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: Math.random() * 0.3 }}
                    className="absolute group"
                    style={{ left: `${region.x}%`, top: `${region.y}%` }}
                    onMouseEnter={() => setHoveredRegion(region.name)}
                    onMouseLeave={() => setHoveredRegion(null)}
                  >
                    <div className={`w-4 h-4 rounded-full ${region.color} border-2 border-cream/30 cursor-pointer transition-transform hover:scale-150`}>
                      <div className={`absolute inset-0 rounded-full ${region.color} animate-ping opacity-30`} />
                    </div>
                    <AnimatePresence>
                      {hoveredRegion === region.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-ink border border-aged/30 rounded-lg text-[10px] text-cream font-semibold whitespace-nowrap z-10"
                        >
                          {region.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 right-4 flex items-start gap-3 p-4 bg-ink/80 backdrop-blur-sm rounded-xl border border-aged/20">
              <Info className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-cream text-xs font-bold">{eras[activeEra].label}</p>
                <p className="text-aged text-[10px] mt-0.5">{eras[activeEra].description}</p>
              </div>
            </div>

            {/* Slide controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveEra((prev) => (prev > 0 ? prev - 1 : eras.length - 1))}
                className="p-2 bg-ink/60 backdrop-blur-sm border border-aged/20 rounded-full text-aged hover:text-gold transition-colors"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
