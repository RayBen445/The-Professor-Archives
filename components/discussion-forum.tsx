"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ThumbsUp, Reply, Send, Flame, Award, Clock } from "lucide-react";
import ScrollReveal from "./scroll-reveal";

const sampleDiscussions = [
  {
    id: 1,
    author: "Dr. Amina K.",
    avatar: "AK",
    topic: "Was the Berlin Conference the greatest injustice of the 19th century?",
    body: "The arbitrary division of Africa by European powers who had never set foot on the continent changed the course of history forever. I argue this single event caused more suffering than any war in the century.",
    likes: 47,
    replies: 12,
    time: "2 hours ago",
    hot: true,
  },
  {
    id: 2,
    author: "Prof. Okonkwo",
    avatar: "PO",
    topic: "African soldiers in WWI deserve more recognition",
    body: "Over 2 million Africans served in various capacities during WWI, yet their stories are almost completely absent from mainstream Western history textbooks. How do we change this?",
    likes: 38,
    replies: 8,
    time: "5 hours ago",
    hot: true,
  },
  {
    id: 3,
    author: "Sarah Mensah",
    avatar: "SM",
    topic: "The Commonwealth: Neo-colonialism or genuine partnership?",
    body: "Is the modern Commonwealth a tool for continued British influence, or has it evolved into a genuine forum for equal cooperation? I am curious about perspectives from member nations.",
    likes: 29,
    replies: 15,
    time: "1 day ago",
    hot: false,
  },
  {
    id: 4,
    author: "Kwame Asante",
    avatar: "KA",
    topic: "Nigeria at 65: Achievements and missed opportunities",
    body: "As Nigeria marks 65 years of independence, what do we celebrate and what do we mourn? The nation has produced Nobel laureates and global leaders, yet struggles with basic infrastructure.",
    likes: 54,
    replies: 22,
    time: "2 days ago",
    hot: false,
  },
];

export default function DiscussionForum() {
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showReply, setShowReply] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="py-20 px-6 bg-parchment/50" id="discussions">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-accent text-xs uppercase tracking-[0.3em] font-semibold flex items-center justify-center gap-2 mb-4">
              <MessageCircle className="w-3.5 h-3.5" />
              Community Discussions
            </span>
            <h2 className="font-baby text-3xl md:text-4xl font-bold text-ink mb-3 text-balance">
              Debate, Discuss, Discover
            </h2>
            <p className="text-ink-light text-sm max-w-lg mx-auto text-pretty">
              Join our community of history enthusiasts in conversations about the events that shaped the world.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {sampleDiscussions.map((disc, i) => (
            <ScrollReveal key={disc.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-cream border border-aged/20 rounded-2xl p-6 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                    {disc.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-ink text-sm">{disc.author}</span>
                      <span className="text-ink-muted text-[10px] flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />{disc.time}
                      </span>
                      {disc.hot && (
                        <span className="flex items-center gap-0.5 px-2 py-0.5 bg-orange-100 text-orange-700 text-[9px] font-bold rounded-full">
                          <Flame className="w-2.5 h-2.5" />Hot
                        </span>
                      )}
                    </div>
                    <h4 className="font-baby text-base font-bold text-ink mb-2">{disc.topic}</h4>
                    <p className="text-ink-light text-sm leading-relaxed line-clamp-2">{disc.body}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleLike(disc.id)}
                        className={`flex items-center gap-1.5 text-xs font-semibold transition-all duration-300 ${
                          liked.has(disc.id) ? "text-accent" : "text-ink-muted hover:text-accent"
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${liked.has(disc.id) ? "fill-accent" : ""}`} />
                        {disc.likes + (liked.has(disc.id) ? 1 : 0)}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowReply(showReply === disc.id ? null : disc.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-accent transition-colors"
                      >
                        <Reply className="w-3.5 h-3.5" />{disc.replies} replies
                      </motion.button>
                      <span className="flex items-center gap-1 text-[10px] text-ink-muted">
                        <Award className="w-3 h-3" />Top Contributor
                      </span>
                    </div>

                    {/* Reply box */}
                    <AnimatePresence>
                      {showReply === disc.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 overflow-hidden"
                        >
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Share your perspective..."
                              className="flex-1 px-4 py-2.5 bg-parchment border border-aged/20 rounded-xl text-sm text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-accent/40 transition-colors"
                            />
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2.5 bg-accent text-cream rounded-xl hover:bg-accent/80 transition-colors"
                            >
                              <Send className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
