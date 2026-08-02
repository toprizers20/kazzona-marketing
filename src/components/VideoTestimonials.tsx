"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, X, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const videoTestimonials = [
  {
    name: "Rajesh Sharma",
    role: "Founder, FreshKart",
    quote: "Kazzona transformed our online presence completely. Our organic traffic went from 2,000 to 18,000 monthly visitors.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    name: "Priya Mehta",
    role: "CMO, CloudMinds",
    quote: "Their LinkedIn ad strategy generated more qualified B2B leads in 3 months than our internal team did in an entire year.",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    name: "Arjun Patel",
    role: "CEO, StyleHive",
    quote: "The ROI we get from Kazzona is unbelievable. They manage our entire digital marketing stack and results speak for themselves.",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background via-card/20 to-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">
            <Play className="w-3 h-3 fill-primary" /> Video Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Hear It From <span className="text-primary">Them</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real clients, real results. Watch how Kazzona helped businesses grow.
          </p>
        </motion.div>

        {/* Featured Video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-4xl mx-auto">
            <div
              className="relative aspect-video bg-card border border-border/60 rounded-3xl overflow-hidden cursor-pointer group shadow-2xl shadow-black/10"
              onClick={() => setActiveVideo(activeThumb)}
            >
              {/* Thumbnail */}
              <Image
                src={`https://img.youtube.com/vi/${videoTestimonials[activeThumb].youtubeId}/maxresdefault.jpg`}
                alt={videoTestimonials[activeThumb].name}
                width={1280}
                height={720}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-primary/30"
                >
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </motion.div>
              </div>

              {/* Info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/90 text-lg font-medium leading-snug max-w-lg">
                    &ldquo;{videoTestimonials[activeThumb].quote}&rdquo;
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                    {videoTestimonials[activeThumb].name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">{videoTestimonials[activeThumb].name}</div>
                    <div className="text-white/60 text-xs">{videoTestimonials[activeThumb].role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); setActiveThumb((prev) => (prev === 0 ? videoTestimonials.length - 1 : prev - 1)); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveThumb((prev) => (prev === videoTestimonials.length - 1 ? 0 : prev + 1)); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary/80 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-4">
          {videoTestimonials.map((v, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              onClick={() => setActiveThumb(i)}
              className={`relative w-24 h-16 md:w-40 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                activeThumb === i
                  ? "border-primary shadow-lg shadow-primary/20 scale-105"
                  : "border-border/40 opacity-60 hover:opacity-100 hover:border-primary/40"
              }`}
            >
              <Image
                src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
                alt={v.name}
                width={320}
                height={180}
                className="w-full h-full object-cover"
              />
              {activeThumb === i && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* YouTube Modal */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${videoTestimonials[activeVideo].youtubeId}?autoplay=1&rel=0`}
                  title={videoTestimonials[activeVideo].name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
