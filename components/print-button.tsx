"use client";

import { motion } from "framer-motion";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.print()}
      className="flex items-center gap-1.5 px-3 py-2 border border-aged/30 rounded-full text-xs font-semibold text-ink-light hover:text-accent hover:border-accent transition-all duration-300"
      title="Print article"
    >
      <Printer className="w-3.5 h-3.5" />
      <span className="hidden sm:inline">Print</span>
    </motion.button>
  );
}
