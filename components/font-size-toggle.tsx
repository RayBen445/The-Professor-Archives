"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Type } from "lucide-react";

const sizes = [
  { label: "S", value: "text-sm", bodyClass: "prose-sm" },
  { label: "M", value: "text-base", bodyClass: "prose-base" },
  { label: "L", value: "text-lg", bodyClass: "prose-lg" },
];

interface FontSizeToggleProps {
  onSizeChange: (size: string) => void;
}

export default function FontSizeToggle({ onSizeChange }: FontSizeToggleProps) {
  const [active, setActive] = useState(1);

  return (
    <div className="flex items-center gap-1 px-2 py-1 border border-aged/30 rounded-full">
      <Type className="w-3 h-3 text-ink-muted mr-1" />
      {sizes.map((size, i) => (
        <motion.button
          key={size.label}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setActive(i);
            onSizeChange(size.bodyClass);
          }}
          className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all ${
            active === i
              ? "bg-accent text-cream"
              : "text-ink-muted hover:text-accent"
          }`}
        >
          {size.label}
        </motion.button>
      ))}
    </div>
  );
}
