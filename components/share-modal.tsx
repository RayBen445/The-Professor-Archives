"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Link2,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  excerpt?: string;
}

const shareChannels = [
  {
    name: "Twitter / X",
    icon: Twitter,
    color: "hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "hover:bg-[#4267B2]/10 hover:text-[#4267B2] hover:border-[#4267B2]/30",
    getUrl: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "hover:bg-[#0077B5]/10 hover:text-[#0077B5] hover:border-[#0077B5]/30",
    getUrl: (url: string, title: string) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "hover:bg-[#25D366]/10 hover:text-[#25D366] hover:border-[#25D366]/30",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "Email",
    icon: Mail,
    color: "hover:bg-accent/10 hover:text-accent hover:border-accent/30",
    getUrl: (url: string, title: string, excerpt?: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent((excerpt || "") + "\n\n" + url)}`,
  },
];

export default function ShareModal({
  isOpen,
  onClose,
  title,
  url,
  excerpt,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed z-[70] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-cream border border-aged/30 rounded-2xl shadow-2xl shadow-ink/20 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-baby text-xl font-bold text-ink">
                  Share This Story
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-parchment transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-ink-muted" />
                </button>
              </div>

              <p className="text-sm text-ink-light mb-6 line-clamp-2">
                {title}
              </p>

              <div className="grid grid-cols-5 gap-3 mb-6">
                {shareChannels.map((channel) => (
                  <motion.a
                    key={channel.name}
                    href={channel.getUrl(url, title, excerpt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border border-aged/20 text-ink-muted transition-all duration-300 ${channel.color}`}
                  >
                    <channel.icon className="w-5 h-5" />
                    <span className="text-[10px] font-semibold">
                      {channel.name.split(" ")[0]}
                    </span>
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center gap-2 p-3 bg-parchment rounded-xl border border-aged/20">
                <div className="flex-1 text-sm text-ink-muted truncate font-mono">
                  {url}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyLink}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    copied
                      ? "bg-green-700 text-cream"
                      : "bg-ink text-cream hover:bg-accent"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Link2 className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
