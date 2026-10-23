import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

/* ──────────────────────────────────────────────
   Highlight reels — one per client
────────────────────────────────────────────── */
const HIGHLIGHTS = [
  {
    src:    "/videos/brandcraft_bmw.mp4",
    client: "Brandcraft",
    logo:   "/logos/brandcraft_logo.png",
    dark:   true,   // white logo → needs filter in light mode
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
    dark:   false,  // own colors — fine in both modes
  },
];

/* Mint drop-shadow for all logos */
const useLightFilter = () => {
  const { theme } = useTheme();
  if (theme === "light") {
    return "drop-shadow(0 0 16px rgba(61,255,160,0.6)) drop-shadow(0 0 6px rgba(61,255,160,0.4)) drop-shadow(0 2px 8px rgba(0,0,0,0.3))";
  }
  return "drop-shadow(0 0 8px rgba(255,255,255,0.15)) drop-shadow(0 2px 10px rgba(0,0,0,0.5))";
};

/* ──────────────────────────────────────────────
   Reel card — first-frame preview, hover-to-play
────────────────────────────────────────────── */
const ReelCard = ({
  item,
  delay,
}: {
  item: (typeof HIGHLIGHTS)[number];
  delay: number;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);
  const logoFilter = useLightFilter();

  /* Show a still frame from the video as preview thumbnail */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const showFrame = () => { v.currentTime = 0.5; };
    v.addEventListener("loadedmetadata", showFrame);
    return () => v.removeEventListener("loadedmetadata", showFrame);
  }, []);

  /* Play on hover, pause + reset preview on leave */
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
      {/* Video — always visible; first frame = preview thumbnail */}
      <video
        ref={videoRef}
        src={item.src}
        muted
        playsInline
        preload="metadata"
        loop
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Subtle dark gradient overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* Play button — fades on hover */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ opacity: hover ? 0 : 1, scale: hover ? 0.8 : 1 }}
          transition={{ duration: 0.25 }}
          className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        >
          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
        </motion.div>
      </div>

      {/* Logo — fixed container so all logos take identical visual space */}
      <div className="absolute bottom-4 left-4" style={{ width: 180, height: 58 }}>
        <img
          src={item.logo}
          alt={item.client}
          className="w-full h-full object-contain object-left"
          style={{ filter: logoFilter }}
        />
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

        {/* Reel cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {HIGHLIGHTS.map((item, i) => (
            <ReelCard key={item.client} item={item} delay={i * 0.1} />
          ))}
        </div>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-10 border-t border-foreground/[0.06]"
        >
          {HIGHLIGHTS.map((item) => (
            /* Fixed 160×52 container → equal visual size for every logo */
            <div key={item.client} style={{ width: 160, height: 52 }}
              className="opacity-60 hover:opacity-95 transition-opacity duration-300">
              <img
                src={item.logo}
                alt={item.client}
                className="w-full h-full object-contain"
                style={{ filter: "drop-shadow(0 0 14px rgba(61,255,160,0.5)) drop-shadow(0 0 5px rgba(61,255,160,0.3)) drop-shadow(0 1px 6px rgba(0,0,0,0.25))" }}
              />
            </div>
          ))}
        </motion.div>

        {/* CTA */}
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
