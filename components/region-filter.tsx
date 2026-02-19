"use client";

import { motion } from "framer-motion";
import { Globe, MapPin } from "lucide-react";

const regions = [
  { name: "All Regions", key: "all", color: "text-ink" },
  { name: "Africa", key: "Africa", color: "text-green-700" },
  { name: "Europe", key: "Europe", color: "text-blue-700" },
  { name: "Global", key: "Global", color: "text-amber-700" },
  { name: "Nigeria", key: "Nigeria", color: "text-emerald-700" },
  { name: "Americas", key: "Americas", color: "text-red-700" },
];

interface RegionFilterProps {
  activeRegion: string;
  onRegionChange: (region: string) => void;
}

export default function RegionFilter({ activeRegion, onRegionChange }: RegionFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {regions.map((region, i) => {
        const isActive = activeRegion === region.key;
        return (
          <motion.button
            key={region.key}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRegionChange(region.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
              isActive
                ? "bg-accent text-cream border-accent shadow-lg shadow-accent/20"
                : "bg-cream/80 text-ink-light border-aged/30 hover:border-accent hover:text-accent"
            }`}
          >
            {region.key === "all" ? (
              <Globe className="w-3 h-3" />
            ) : (
              <MapPin className="w-3 h-3" />
            )}
            {region.name}
          </motion.button>
        );
      })}
    </div>
  );
}
