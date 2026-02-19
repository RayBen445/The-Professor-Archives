"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./scroll-reveal";
import Link from "next/link";

const countries = [
  { name: "Nigeria", flag: "NG", stories: 4, region: "West Africa", top: "42%", left: "47%" },
  { name: "Ethiopia", flag: "ET", stories: 2, region: "East Africa", top: "44%", left: "58%" },
  { name: "South Africa", flag: "ZA", stories: 3, region: "Southern Africa", top: "70%", left: "55%" },
  { name: "Kenya", flag: "KE", stories: 2, region: "East Africa", top: "48%", left: "60%" },
  { name: "Ghana", flag: "GH", stories: 2, region: "West Africa", top: "44%", left: "44%" },
  { name: "Germany", flag: "DE", stories: 3, region: "Europe", top: "22%", left: "50%" },
  { name: "France", flag: "FR", stories: 2, region: "Europe", top: "25%", left: "47%" },
  { name: "United States", flag: "US", stories: 3, region: "Americas", top: "28%", left: "20%" },
  { name: "United Kingdom", flag: "GB", stories: 3, region: "Europe", top: "20%", left: "46%" },
  { name: "Tanzania", flag: "TZ", stories: 2, region: "East Africa", top: "52%", left: "60%" },
];

export default function WorldMapExplorer() {
  return (
    <section className="py-24 px-6 bg-ink relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A55A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }} />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-gold text-xs uppercase tracking-[0.3em] font-semibold">
              Global Coverage
            </span>
            <h2 className="font-baby text-4xl md:text-5xl font-bold text-cream mt-3 mb-4 text-balance">
              Stories Around the World
            </h2>
            <p className="text-aged max-w-xl mx-auto">
              History knows no borders. Explore stories from every continent.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {countries.map((country, i) => (
            <ScrollReveal key={country.name} delay={i * 0.05}>
              <Link href={`/explore?country=${encodeURIComponent(country.name)}`}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative bg-cream/5 border border-aged/20 rounded-2xl p-5 group hover:bg-cream/10 hover:border-gold/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-gold/10 rounded-xl group-hover:bg-gold/20 transition-colors">
                      <MapPin className="w-4 h-4 text-gold" />
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="p-1 bg-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowUpRight className="w-3 h-3 text-gold" />
                    </motion.div>
                  </div>
                  <h3 className="font-baby text-base font-bold text-cream group-hover:text-gold transition-colors">
                    {country.name}
                  </h3>
                  <p className="text-aged/60 text-xs mt-1">{country.region}</p>
                  <div className="mt-3 flex items-center gap-1">
                    <span className="text-gold text-sm font-bold">{country.stories}</span>
                    <span className="text-aged/50 text-xs">stories</span>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
