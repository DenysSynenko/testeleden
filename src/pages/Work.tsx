import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import { useLocation } from "react-router-dom";
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
  /** Height (px) for the logo strip — gives each logo equal visual weight */
  stripH: number;
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
    stripH: 34,   // wide wordmark — reduced so it doesn't hit maxWidth
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
    logo: "/logos/guatemuc_logo.png",
    logoDark: true,
    stripH: 64,   // square symbol — taller for equal visual weight
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
    stripH: 50,   // medium wordmark
    videos: [
      { src: "/videos/almeno_monopoly.mp4",    label: "Brand Film" },
      { src: "/videos/almeno_fpv.mp4",         label: "FPV Drone Reel" },
      { src: "/videos/almeno_3questions.mp4",  label: "3 Questions" },
    ],
    services: ["Filming", "FPV Drone", "Editing", "Color grading"],
  },
  {
    id: "alrighty",
    name: "Alrighty Roastery",
    category: "Specialty Coffee · Munich",
    logo: "/logos/alrighty_logo.png",
    logoDark: true,
    stripH: 48,
    videos: [
      { src: "/videos/alrighty_filter.mp4", label: "Filter Coffee" },
    ],
    services: ["Filming", "Editing", "Color grading"],
  },
  {
    id: "aoni",
    name: "Aoni Studios",
    category: "Tattoo Studio · Munich",
    logo: "/logos/aoni_logo.png",
    logoDark: true,
    stripH: 52,
    videos: [
      { src: "/videos/aoni_v2.mp4", label: "Brand Film" },
    ],
    services: ["Filming", "Editing", "Color grading"],
  },
];

/* logoDark:false → keep original brand color; logoDark:true → always white */
const getLogoFilter = (_theme: string, isDark: boolean) => {
  if (!isDark) return "none";
  return "brightness(0) invert(1)";
};

/* ──────────────────────────────────────────────
   Minimal Reel Player
────────────────────────────────────────────── */
const ReelPlayer = ({
  src,
  label,
  autoPlay,
}: {
  src: string;
  label?: string;
  autoPlay?: boolean;
}) => {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying]   = useState(false);
  const [muted, setMuted]       = useState(true);
  const [volume, setVolume]     = useState(1);
  const [showVolume, setShowVolume] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hover, setHover]       = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [rippleId, setRippleId] = useState(0);
  const volumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Show first frame as thumbnail */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const showFrame = () => { v.currentTime = 0.5; };
    v.addEventListener("loadedmetadata", showFrame);
    return () => v.removeEventListener("loadedmetadata", showFrame);
  }, []);

  /* Autoplay when navigated from home page */
  useEffect(() => {
    if (!autoPlay) return;
    const v = videoRef.current;
    if (!v) return;
    const timer = setTimeout(() => {
      v.muted = false;
      setMuted(false);
      v.play().then(() => setPlaying(true)).catch(() => {
        // fallback: play muted if autoplay blocked
        v.muted = true;
        setMuted(true);
        v.play().then(() => setPlaying(true)).catch(() => {});
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [autoPlay]);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setRippleId(id => id + 1);
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      v.muted = false;
      v.volume = volume;
      setMuted(false);
    } else {
      v.muted = true;
      setMuted(true);
    }
    setShowVolume(true);
    if (volumeTimeout.current) clearTimeout(volumeTimeout.current);
    volumeTimeout.current = setTimeout(() => setShowVolume(false), 2000);
  }, [volume]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    const val = parseFloat(e.target.value);
    setVolume(val);
    v.volume = val;
    v.muted = val === 0;
    setMuted(val === 0);
    if (volumeTimeout.current) clearTimeout(volumeTimeout.current);
    volumeTimeout.current = setTimeout(() => setShowVolume(false), 2000);
  }, []);

  const handleVolumeClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowVolume(s => !s);
    if (volumeTimeout.current) clearTimeout(volumeTimeout.current);
    volumeTimeout.current = setTimeout(() => setShowVolume(false), 3000);
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
    const onEnd  = () => { setPlaying(false); }
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

  return (
    <motion.div
      ref={wrapRef}
      className="relative bg-zinc-950 rounded-2xl overflow-hidden w-full select-none cursor-pointer"
      style={{ aspectRatio: "9/16" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setShowVolume(false); }}
      onClick={toggle}
      whileTap={{ scale: 0.965 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    >
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        playsInline
        preload="metadata"
        loop
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

      {/* Label — top left, visible when not playing or on hover */}
      {label && (
        <AnimatePresence>
          {(!playing || hover) && (
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

      {/* Top-right controls — appear on hover */}
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5"
            onClick={e => e.stopPropagation()}
          >
            {/* Volume slider — appears above mute button */}
            <AnimatePresence>
              {showVolume && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0.7, y: 8 }}
                  animate={{ opacity: 1, scaleY: 1, y: 0 }}
                  exit={{ opacity: 0, scaleY: 0.7, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col items-center h-20 justify-center px-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10"
                  style={{ transformOrigin: "bottom" }}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    onClick={e => e.stopPropagation()}
                    className="h-16 cursor-pointer accent-white"
                    style={{
                      writingMode: "vertical-lr",
                      direction: "rtl",
                      appearance: "slider-vertical",
                      WebkitAppearance: "slider-vertical",
                    } as React.CSSProperties}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-1.5">
              {/* Mute / Volume button */}
              <button
                type="button"
                onClick={handleVolumeClick}
                aria-label={muted ? "Unmute" : "Mute"}
                className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                {muted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              </button>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Fullscreen"
                className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                {fullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center play/pause */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {!playing && (
            <motion.div
              key="play"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: hover ? 0 : 1, scale: hover ? 0.85 : 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.22 }}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center"
            >
              <Play className="w-4 h-4 text-white fill-white ml-0.5" />
            </motion.div>
          )}
          {playing && hover && (
            <motion.div
              key="pause"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.22 }}
              className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center"
            >
              <Pause className="w-3.5 h-3.5 text-white fill-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click ripple */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <AnimatePresence>
          {rippleId > 0 && (
            <motion.div
              key={rippleId}
              className="w-14 h-14 rounded-full border border-white/35"
              initial={{ scale: 0.5, opacity: 0.7 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 right-0 h-5 cursor-pointer z-10 flex items-end"
        onClick={seekFromClick}
      >
        <div className="w-full h-px bg-white/10">
          <div className="h-full bg-white/50 transition-none" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   Logo strip
────────────────────────────────────────────── */
const StripLogo = ({
  client,
  delay,
  isLast,
}: {
  client: ClientData;
  delay?: number;
  isLast?: boolean;
}) => {
  const { theme } = useTheme();
  const filter = getLogoFilter(theme, client.logoDark ?? false);

  const inner = (
    <div
      className={`flex-1 flex items-center justify-center py-2 opacity-100 hover:opacity-100 transition-opacity duration-300 ${
        !isLast ? "border-r border-foreground/[0.08]" : ""
      }`}
    >
      <img
        src={client.logo}
        alt={client.name}
        style={{ maxHeight: client.stripH, width: "auto", maxWidth: 160, filter }}
      />
    </div>
  );

  if (delay !== undefined) {
    return (
      <motion.div
        className="flex-1 contents"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {inner}
      </motion.div>
    );
  }
  return inner;
};

/* ──────────────────────────────────────────────
   Client Block
────────────────────────────────────────────── */
const ClientBlock = ({
  client,
  index,
  autoPlaySrc,
}: {
  client: ClientData;
  index: number;
  autoPlaySrc?: string;
}) => (
  <motion.div
    id={client.id}
    initial={{ opacity: 0, y: 48, filter: "blur(12px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
  >
    {/* Text header */}
    <div className="mb-5">
      <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-1">
        {client.name}
      </h2>
      <p className="text-[11px] tracking-wide text-muted-foreground">
        {client.category}
      </p>
    </div>

    {/* Service tags */}
    <div className="flex flex-wrap gap-1.5 mb-8">
      {client.services.map((s) => (
        <span
          key={s}
          className="text-[9px] font-mono tracking-[0.12em] uppercase px-2.5 py-[3px] rounded-full border border-foreground/25 text-foreground/60"
        >
          {s}
        </span>
      ))}
    </div>

    {/* Videos */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {client.videos.map((v, i) => (
        <motion.div
          key={i}
          className="w-full"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <ReelPlayer
            src={v.src}
            label={v.label}
            autoPlay={autoPlaySrc === v.src}
          />
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* ──────────────────────────────────────────────
   Page
────────────────────────────────────────────── */
const Work = () => {
  const location = useLocation();
  const targetSrc = (location.state as { videoSrc?: string } | null)?.videoSrc;

  /* Scroll to the client block whose video was clicked on the home page */
  useEffect(() => {
    if (!targetSrc) return;
    const targetClient = CLIENTS.find(c => c.videos.some(v => v.src === targetSrc));
    if (!targetClient) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(targetClient.id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
    return () => clearTimeout(timer);
  }, [targetSrc]);

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
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Short-form video content crafted for modern brands in Munich and beyond.
            </p>
          </motion.div>

          {/* Logo strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="flex items-center justify-center gap-0 mb-20 pb-16 border-b border-foreground/[0.1]"
          >
            {CLIENTS.map((c, i) => (
              <StripLogo key={c.id} client={c} delay={0.25 + i * 0.1} isLast={i === CLIENTS.length - 1} />
            ))}
          </motion.div>

          {/* Client blocks */}
          <div className="space-y-24">
            {CLIENTS.map((client, i) => (
              <ClientBlock
                key={client.id}
                client={client}
                index={i}
                autoPlaySrc={targetSrc}
              />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Work;
