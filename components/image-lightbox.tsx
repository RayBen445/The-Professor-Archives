"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { useState } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export default function ImageLightbox({
  src,
  alt,
  className = "",
  fill = false,
  sizes,
  priority,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative cursor-zoom-in group"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          className={className}
          sizes={sizes}
          priority={priority}
        />
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="p-3 bg-cream/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ZoomIn className="w-5 h-5 text-ink" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[80] bg-ink/90 backdrop-blur-md cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed z-[90] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[80vh] max-w-5xl"
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-3 bg-cream/90 rounded-full hover:bg-cream transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-ink/80 text-cream text-sm rounded-full backdrop-blur-sm">
                {alt}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
