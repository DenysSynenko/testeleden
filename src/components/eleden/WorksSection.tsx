import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

/* ──────────────────────────────────────────────
   Highlight reels shown on the home page (one per client)
────────────────────────────────────────────── */
const HIGHLIGHTS = [
  {
    src:    "/videos/brandcraft_bmw.mp4",
    client: "Brandcraft",
    logo:   "/logos/brandcraft_logo.png",
    dark:   true,
  },
  {
    src:    "/videos/guatemuc_day_night.mp4",
    client: "GuateMuc",
    logo:   "/logos/guatemuc_logo.svg",
    dark:   true,
  },
  {
    src:    "/videos/almeno_monopoly.mp4",
    client: "Almeno Immobilien",
    logo:   "/logos/almeno_horizontal.png",
    dark:   false,
  },
];

/* ──────────────────────────────────────────────
   Inline reel card — hover-to-play preview
────────────────────────────────────────────── */
const ReelCard = ({
  item,
  delay,
}: {
  item: (typeof HIGHLIGHTS)[number];
  delay: number;
}) => {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hover) {
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [hover]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-[9/16] rounded-[18px] overflow-hidden bg-zinc-950 border border-white/[0.06] group cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Video (muted, plays on hover) */}
      <video
        ref={videoRef}
        src={item.src}
        muted
        playsInline
        preload="none"
        loop
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: hover ? 1 : 0 }}
      />

      {/* Static gradient bg when not playing */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-950 transition-opacity duration-500"
        style={{ opacity: hover ? 0 : 1 }}
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ opacity: hover ? 0 : 1, scale: hover ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        >
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </motion.div>
      </div>

      {/* Client logo at bottom */}
      <div className="absolute bottom-4 left-4 right-4">
        <div
          className={`inline-flex items-center h-6 ${
            item.dark ? "px-2 py-1 rounded-md bg-black/60 border border-white/10" : ""
          }`}
        >
          <img
            src={item.logo}
            alt={item.client}
            className="h-4 max-w-[110px] object-contain"
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   Section
────────────────────────────────────────────── */
const WorksSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} id="work" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-glow-mint opacity-10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
            {t("portfolio.label") || "Selected Work"}
          </span>
          <h2 className="section-title mb-4">{t("portfolio.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        {/* Reel cards — hover to preview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {HIGHLIGHTS.map((item, i) => (
            <ReelCard key={item.client} item={item} delay={i * 0.1} />
          ))}
        </div>

        {/* Brand logo strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-7 mt-12 pt-10 border-t border-white/[0.06]"
        >
          {HIGHLIGHTS.map((item) => (
            <div
              key={item.client}
              className={`h-6 flex items-center ${
                item.dark ? "px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]" : ""
              }`}
            >
              <img
                src={item.logo}
                alt={item.client}
                className="h-4 max-w-[100px] object-contain opacity-50 hover:opacity-80 transition-opacity duration-300"
              />
            </div>
          ))}
        </motion.div>

        {/* CTA → /work */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group text-sm"
          >
            <span>{t("portfolio.viewAll") || "View all work"}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorksSection;
