import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Play, Pause, X, ArrowRight, Check, Volume2, VolumeX, Maximize2, ExternalLink } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "@/contexts/LanguageContext";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  result: string;
  color: string;
  videoUrl?: string;
  posterUrl?: string;
  clientUrl?: string;
  clientLabel?: string;
  clientLinks?: { url: string; label: string }[];
  comingSoon?: boolean;
  details: {
    outcomes: string[];
    services: string[];
    testimonial: string;
  };
}

const immobilienCases: CaseStudy[] = [
  {
    id: "01",
    title: "Almeno Immobilien — Meta Ads Reel",
    category: "Reel for Meta Ads · 9:16",
    result: "117 leads via Meta Ads",
    color: "from-primary/20 to-primary-deep/40",
    videoUrl: "https://hceuppafankyvukayjzp.supabase.co/storage/v1/object/public/case-videos/kirchbichl.mp4",
    posterUrl: "https://hceuppafankyvukayjzp.supabase.co/storage/v1/object/public/case-videos/kirchbichl.jpg",
    clientLinks: [
      { url: "https://www.instagram.com/almeno_immobilien/", label: "Instagram" },
      { url: "https://www.almeno.at/immobilien/", label: "Website" },
    ],
    details: {
      outcomes: [
        "117 qualified leads generated via Meta Ads",
        "Premium positioning that matches the property",
        "Creative built for scroll-stopping performance",
      ],
      services: ["Idea & planning", "Filming", "Editing", "Color grading"],
      testimonial: "ELEDEN transformed how we present our properties. The content speaks premium.",
    },
  },
  {
    id: "02",
    title: "Almeno Immobilien — Meta Ads Reel",
    category: "Reel for Meta Ads · 9:16",
    result: "101 leads via Meta Ads",
    color: "from-champagne/20 to-champagne/5",
    videoUrl: "https://hceuppafankyvukayjzp.supabase.co/storage/v1/object/public/case-videos/ebss.mp4",
    posterUrl: "https://hceuppafankyvukayjzp.supabase.co/storage/v1/object/public/case-videos/ebss.jpg",
    clientLinks: [
      { url: "https://www.instagram.com/almeno_immobilien/", label: "Instagram" },
      { url: "https://www.almeno.at/immobilien/", label: "Website" },
    ],
    details: {
      outcomes: [
        "101 qualified leads generated via Meta Ads",
        "Consistent brand voice across the listing",
        "Conversion-focused pacing and edit",
      ],
      services: ["Idea & planning", "Filming", "Editing", "Color grading"],
      testimonial: "Finally, content that converts. ELEDEN understands premium positioning.",
    },
  },
];

const detailingCases: CaseStudy[] = [
  {
    id: "D1",
    title: "MDB Fahrzeugpflege — Before / After",
    category: "Detailing Reel · 9:16 · Instagram + TikTok",
    result: "Premium before/after edit",
    color: "from-champagne/20 to-primary-deep/30",
    videoUrl: "https://hceuppafankyvukayjzp.supabase.co/storage/v1/object/public/case-videos/mdb.mp4",
    posterUrl: "https://hceuppafankyvukayjzp.supabase.co/storage/v1/object/public/case-videos/mdb.jpg",
    clientLinks: [
      { url: "https://www.instagram.com/mdbfahrzeugpflege/", label: "Instagram" },
    ],
    details: {
      outcomes: [
        "Cinematic before/after that stops the scroll",
        "Built for Instagram Reels and TikTok",
        "Product storytelling that elevates the studio",
      ],
      services: ["Idea & planning", "Filming", "Editing", "Color grading"],
      testimonial: "",
    },
  },
];

const Portfolio = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="work" ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-glow-mint opacity-20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-glow-champagne opacity-20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="section-title mb-4">{t("portfolio.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto md:mx-0">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        {/* Immobilien niche */}
        <NicheBlock
          label="Immobilien"
          cases={immobilienCases}
          onSelect={setSelectedCase}
        />

        {/* Detailing niche */}
        <div className="mt-20">
          <NicheBlock
            label="Detailing"
            cases={detailingCases}
            onSelect={setSelectedCase}
          />
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.button 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
            whileHover={{ x: 5 }}
          >
            <span>{t("portfolio.viewAll")}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </motion.div>
      </div>

      {/* Case Spotlight Modal */}
      <AnimatePresence>
        {selectedCase && (
          <CaseSpotlight 
            caseStudy={selectedCase} 
            onClose={() => setSelectedCase(null)}
            t={t}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

interface VideoCardProps {
  caseStudy: CaseStudy;
  size: "small" | "medium" | "large";
  onClick: () => void;
}

const VideoCard = ({ caseStudy, size, onClick }: VideoCardProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const heightClass = {
    small: "h-[300px] md:h-[350px]",
    medium: "h-[400px] md:h-[500px]",
    large: "h-[500px] md:h-[720px]",
  }[size];

  return (
    <motion.div
      ref={videoRef}
      onClick={caseStudy.comingSoon ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`video-card relative group ${heightClass} ${caseStudy.comingSoon ? "cursor-default" : "cursor-pointer"}`}
      whileHover={caseStudy.comingSoon ? undefined : { scale: 1.02, y: -8 }}
      transition={{ duration: 0.4 }}
    >
      {/* Poster image (if real video) or gradient placeholder */}
      {caseStudy.posterUrl ? (
        <motion.img
          src={caseStudy.posterUrl}
          alt={caseStudy.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1, opacity: isHovered ? 0.85 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${caseStudy.color}`}
          animate={{ opacity: isHovered ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {/* Soft top-to-bottom darkening for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent pointer-events-none" />
      
      {/* Animated play state indicator */}
      {!caseStudy.comingSoon && (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ 
            scale: isInView ? [1, 1.1, 1] : 1,
            opacity: isHovered ? 0 : 1
          }}
          transition={{ 
            scale: { duration: 2, repeat: isInView ? Infinity : 0 },
            opacity: { duration: 0.3 }
          }}
          className="w-16 h-16 rounded-full bg-surface/80 backdrop-blur-sm border border-white/10 flex items-center justify-center"
        >
          <Play className="w-6 h-6 text-champagne fill-champagne/30" />
        </motion.div>
      </div>
      )}

      {caseStudy.comingSoon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-4 py-2 rounded-full bg-surface/80 backdrop-blur-sm border border-champagne/30 text-champagne text-xs tracking-[0.2em] uppercase">
            Coming soon
          </div>
        </div>
      )}

      {/* Overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6 flex flex-col justify-end"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <p className="text-xs text-muted-foreground mb-1">
            Case #{caseStudy.id}
          </p>
          <h3 className="font-display text-xl font-semibold mb-2">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {caseStudy.category}
          </p>
          <p className="text-sm text-primary font-medium">
            {caseStudy.result}
          </p>
        </motion.div>
      </motion.div>

      {/* Always visible minimal label */}
      <motion.div 
        className="absolute bottom-4 left-4 right-4"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <p className="text-xs text-white/60">
          Case #{caseStudy.id} — {caseStudy.title}
        </p>
      </motion.div>
    </motion.div>
  );
};

interface CaseSpotlightProps {
  caseStudy: CaseStudy;
  onClose: () => void;
  t: (key: string) => string;
}

const CaseSpotlight = ({ caseStudy, onClose, t }: CaseSpotlightProps) => {
  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div 
        initial={{ backdropFilter: "blur(0px)" }}
        animate={{ backdropFilter: "blur(20px)" }}
        exit={{ backdropFilter: "blur(0px)" }}
        className="absolute inset-0 bg-background/90"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl glass-elevated rounded-[18px] p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
      >
        {/* Close button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center hover:bg-surface-elevated transition-colors duration-300"
        >
          <X className="w-4 h-4" />
        </motion.button>

        {/* Content */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-sm text-muted-foreground mb-2">
            Case #{caseStudy.id}
          </p>
          <h2 className="font-display text-3xl font-bold mb-2">
            {caseStudy.title}
          </h2>
          <p className="text-muted-foreground">
            {caseStudy.category}
          </p>
        </motion.div>

        {/* Video player */}
        {caseStudy.videoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <CaseVideoPlayer src={caseStudy.videoUrl} poster={caseStudy.posterUrl} />
          </motion.div>
        )}

        {/* Client links */}
        {(caseStudy.clientLinks?.length || caseStudy.clientUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {(caseStudy.clientLinks ?? (caseStudy.clientUrl
              ? [{ url: caseStudy.clientUrl, label: caseStudy.clientLabel ?? "Visit client" }]
              : [])).map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-white/[0.08] text-sm text-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </a>
            ))}
          </motion.div>
        )}

        {/* Result badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-primary font-medium">{caseStudy.result}</span>
        </motion.div>

        {/* Outcomes */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="text-sm font-medium text-foreground mb-4">{t("portfolio.outcomes")}</h3>
          <ul className="space-y-3">
            {caseStudy.details.outcomes.map((outcome, index) => (
              <motion.li 
                key={index} 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground">{outcome}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-sm font-medium text-foreground mb-4">{t("portfolio.services")}</h3>
          <div className="flex flex-wrap gap-2">
            {caseStudy.details.services.map((service, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + index * 0.05 }}
                className="px-3 py-1.5 rounded-full bg-surface text-sm text-muted-foreground border border-white/[0.06]"
              >
                {service}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div 
          className="mb-8 p-6 rounded-xl bg-surface border border-white/[0.06]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-foreground italic mb-4">
            "{caseStudy.details.testimonial}"
          </p>
          <p className="text-sm text-muted-foreground">— Client</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <MagneticButton 
            variant="primary"
            onClick={() => scrollToSection("contact")}
            className="w-full justify-center"
          >
            {t("portfolio.cta")}
          </MagneticButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   CaseVideoPlayer — minimal cinematic player with controls
   ============================================================ */
interface CaseVideoPlayerProps {
  src: string;
  poster?: string;
}

const fmt = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const CaseVideoPlayer = ({ src, poster }: CaseVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const t = Number(e.target.value);
    v.currentTime = t;
    setCurrent(t);
  };

  const goFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrent(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    const onEnd = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("ended", onEnd);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("ended", onEnd);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full bg-black rounded-[14px] overflow-hidden mx-auto"
      style={{ aspectRatio: "9 / 16", maxHeight: "70vh", maxWidth: "min(100%, calc(70vh * 9 / 16))" }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
      />

      {/* Center play overlay when paused */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center group/play bg-black/20 hover:bg-black/30 transition-colors"
        >
          <span className="w-16 h-16 rounded-full bg-surface/90 backdrop-blur-md border border-white/15 flex items-center justify-center group-hover/play:scale-110 transition-transform duration-300">
            <Play className="w-6 h-6 text-champagne fill-champagne ml-0.5" />
          </span>
        </button>
      )}

      {/* Controls bar */}
      <div
        className={`absolute left-0 right-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          showControls || !playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-surface text-foreground"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          <span className="text-xs text-white/90 tabular-nums min-w-[42px]">
            {fmt(current)}
          </span>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={current}
            onChange={seek}
            aria-label="Seek"
            className="flex-1 accent-primary h-1 cursor-pointer"
          />

          <span className="text-xs text-white/70 tabular-nums min-w-[42px] text-right">
            {fmt(duration)}
          </span>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-surface text-foreground"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={goFullscreen}
            aria-label="Fullscreen"
            className="w-9 h-9 rounded-full bg-surface/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-surface text-foreground"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
