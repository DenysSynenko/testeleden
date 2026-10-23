import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import Header from "@/components/eleden/Header";
import Footer from "@/components/eleden/Footer";
import { useTheme } from "@/contexts/ThemeContext";

/* ──────────────────────────────────────────────
   Data
────────────────────────────────────────────── */
interface ClientData {
  id: string;
  name: string;
  category: string;
  logo: string;
  logoDark?: boolean;
  videos: { src: string; label?: string }[];
  services: string[];
}

const CLIENTS: ClientData[] = [
  {
    id: "brandcraft",
    name: "Brandcraft",
    category: "Custom Made Accessories",
    logo: "/logos/brandcraft_logo.png",
    logoDark: true,
    videos: [
      { src: "/videos/brandcraft_bmw.mp4",       label: "BMW" },
      { src: "/videos/brandcraft_interalpen.mp4", label: "Interalpen Hotel" },
      { src: "/videos/brandcraft_signature.mp4",  label: "Signature Travel" },
    ],
    services: ["Concept", "Filming", "Editing", "Color grading"],
  },
  {
    id: "guatemuc",
    name: "GuateMuc",
    category: "Guatemalan Restaurant · Munich",
    logo: "/logos/guatemuc_logo.svg",
    logoDark: true,
    videos: [
      { src: "/videos/guatemuc_day_night.mp4", label: "Day & Night" },
    ],
    services: ["Filming", "Editing", "Color grading"],
  },
  {
    id: "almeno",
    name: "Almeno Immobilien",
    category: "Real Estate",
    logo: "/logos/almeno_horizontal.png",
    logoDark: false,
    videos: [
      { src: "/videos/almeno_monopoly.mp4", label: "Brand Film" },
      { src: "/videos/almeno_fpv.mp4",      label: "FPV Drone Reel" },
    ],
    services: ["Filming", "FPV Drone", "Editing", "Color grading"],
  },
];

/* Drop-shadow filter so white logos stay visible in light mode */
const useMintFilter = (isDark?: boolean) => {
  const { theme } = useTheme();
  if (!isDark || theme !== "light") return "none";
  return "drop-shadow(0 0 10px rgba(61,255,160,0.45)) drop-shadow(0 2px 6px rgba(0,0,0,0.35))";
};

/* ──────────────────────────────────────────────
   Minimal Reel Player
────────────────────────────────────────────── */
const ReelPlayer = ({ src, label }: { src: string; label?: string }) => {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying]   = useState(false);
  const [muted, setMuted]       = useState(true);
  const [progress, setProgress] = useState(0);
  const [hover, setHover]       = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  }, []);

  const seekFromClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = ratio * v.duration;
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setProgress(v.duration ? v.currentTime / v.duration : 0);
    const onEnd  = () => setPlaying(false);
    const onFs   = () => setFullscreen(!!document.fullscreenElement);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnd);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, []);

  const showControls = hover || !playing;

  return (
    <div
      ref={wrapRef}
      className="relative bg-zinc-950 rounded-2xl overflow-hidden w-full select-none"
      style={{ aspectRatio: "9/16" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* Label */}
      {label && (
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 left-3 z-10 pointer-events-none"
            >
              <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-white/55 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm border border-white/[0.06]">
                {label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Top-right controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 z-10 flex gap-1.5"
          >
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              {muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Fullscreen"
              className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              {fullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center play / pause */}
      <AnimatePresence mode="wait">
        {!playing && (
          <motion.div
            key="play"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </motion.div>
        )}
        {playing && hover && (
          <motion.div
            key="pause"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-14 h-14 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center">
              <Pause className="w-4 h-4 text-white fill-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 right-0 h-5 cursor-pointer z-10 flex items-end"
        onClick={seekFromClick}
      >
        <div className="w-full h-px bg-white/10">
          <motion.div
            className="h-full bg-white/50"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Logo image — theme-aware filter, no bg pill
────────────────────────────────────────────── */
const LogoImg = ({
  client,
  delay,
  size,
}: {
  client: ClientData;
  delay?: number;
  size: "strip" | "block";
}) => {
  const filter = useMintFilter(client.logoDark);
  const cls =
    size === "strip"
      ? "h-6 max-w-[140px] object-contain opacity-60 hover:opacity-95 transition-opacity duration-300"
      : "h-7 max-w-[160px] object-contain";

  if (delay !== undefined) {
    return (
      <motion.img
        src={client.logo}
        alt={client.name}
        className={cls}
        style={{ filter }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      />
    );
  }
  return (
    <img src={client.logo} alt={client.name} className={cls} style={{ filter }} />
  );
};

/* ──────────────────────────────────────────────
   Client Block
────────────────────────────────────────────── */
const CARD_W = 260; // px — 9:16 → ~462px tall

const ClientBlock = ({ client, index }: { client: ClientData; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    className="grid grid-cols-[32px_1fr] gap-6"
  >
    {/* Index */}
    <div className="pt-0.5">
      <span className="font-mono text-[10px] text-foreground/20 tracking-widest">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>

    <div>
      {/* Logo + category */}
      <div className="flex flex-wrap items-center gap-4 mb-5">
        <LogoImg client={client} size="block" />
        <p className="text-[11px] tracking-wide text-muted-foreground/45">
          {client.category}
        </p>
      </div>

      {/* Service tags */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {client.services.map((s) => (
          <span
            key={s}
            className="text-[9px] font-mono tracking-[0.12em] uppercase px-2.5 py-[3px] rounded-full border border-foreground/[0.08] text-foreground/35"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Videos — fixed width, flex row */}
      <div className="flex flex-row flex-wrap gap-4">
        {client.videos.map((v, i) => (
          <motion.div
            key={i}
            style={{ width: CARD_W }}
            className="flex-none"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ReelPlayer src={v.src} label={v.label} />
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ──────────────────────────────────────────────
   Page
────────────────────────────────────────────── */
const Work = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="noise-overlay" />
      <Header />

      <main className="pt-32 pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <span className="text-[11px] tracking-[0.3em] uppercase text-primary mb-3 block">
              Portfolio
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Our Work
            </h1>
            <p className="text-muted-foreground/50 text-sm leading-relaxed max-w-xs">
              Short-form video content crafted for modern brands in Munich and beyond.
            </p>
          </motion.div>

          {/* Logo strip — no pill bg, filter makes white logos legible */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="flex flex-wrap items-center gap-8 mb-20 pb-16 border-b border-foreground/[0.06]"
          >
            {CLIENTS.map((c, i) => (
              <LogoImg key={c.id} client={c} delay={0.25 + i * 0.1} size="strip" />
            ))}
          </motion.div>

          {/* Client blocks */}
          <div className="space-y-24">
            {CLIENTS.map((client, i) => (
              <ClientBlock key={client.id} client={client} index={i} />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Work;
