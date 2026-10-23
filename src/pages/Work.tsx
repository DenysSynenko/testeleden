import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import Header from "@/components/eleden/Header";
import Footer from "@/components/eleden/Footer";

/* ──────────────────────────────────────────────
   Client data
────────────────────────────────────────────── */

interface ClientData {
  id: string;
  name: string;
  category: string;
  logo: string;          // path in /public/logos/
  logoDark?: boolean;    // true if logo needs dark bg to be visible
  highlight?: boolean;   // shows bigger featured treatment
  videos: {
    src: string;
    label?: string;
  }[];
  services: string[];
}

const CLIENTS: ClientData[] = [
  {
    id: "brandcraft",
    name: "Brandcraft",
    category: "Custom Made Accessories",
    logo: "/logos/brandcraft_logo.png",
    logoDark: true,
    highlight: true,
    videos: [
      { src: "/videos/brandcraft_bmw.mp4",        label: "BMW" },
      { src: "/videos/brandcraft_interalpen.mp4",  label: "Interalpen Hotel" },
      { src: "/videos/brandcraft_signature.mp4",   label: "Signature Travel" },
    ],
    services: ["Concept", "Filming", "Editing", "Color grading"],
  },
  {
    id: "guatemuc",
    name: "GuateMuc",
    category: "Guatemalan Restaurant · Munich",
    logo: "/logos/guatemuc_logo.png",
    logoDark: true,
    highlight: true,
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
    highlight: false,
    videos: [
      { src: "/videos/almeno_monopoly.mp4", label: "Property Reel" },
      { src: "/videos/almeno_fpv.mp4",      label: "FPV Drone Reel" },
    ],
    services: ["Filming", "FPV Drone", "Editing", "Color grading"],
  },
];

/* ──────────────────────────────────────────────
   Video Player
────────────────────────────────────────────── */

const fmt = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const ReelPlayer = ({ src, label }: { src: string; label?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);
  const [playing, setPlaying]       = useState(false);
  const [muted, setMuted]           = useState(true);
  const [current, setCurrent]       = useState(0);
  const [duration, setDuration]     = useState(0);
  const [showCtrl, setShowCtrl]     = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
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
    document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.();
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setCurrent(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    const onEnd  = () => setPlaying(false);
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
      className="relative bg-black rounded-[16px] overflow-hidden w-full"
      style={{ aspectRatio: "9/16" }}
      onMouseEnter={() => setShowCtrl(true)}
      onMouseLeave={() => playing && setShowCtrl(false)}
    >
      <video
        ref={videoRef}
        src={src}
        muted={muted}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
      />

      {/* Label badge */}
      {label && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-mono text-white/70 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
            {label}
          </span>
        </div>
      )}

      {/* Center play when paused */}
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play"
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
        >
          <span className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 transition-transform duration-300">
            <Play className="w-5 h-5 text-white fill-white ml-0.5" />
          </span>
        </button>
      )}

      {/* Controls */}
      <div
        className={`absolute left-0 right-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          showCtrl || !playing ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white"
          >
            {playing
              ? <Pause className="w-3.5 h-3.5" />
              : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
          </button>

          <span className="text-[10px] text-white/70 tabular-nums min-w-[36px]">
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
            className="flex-1 accent-white h-0.5 cursor-pointer"
          />

          <span className="text-[10px] text-white/50 tabular-nums min-w-[36px] text-right">
            {fmt(duration)}
          </span>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={goFullscreen}
            aria-label="Fullscreen"
            className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────
   Client Block
────────────────────────────────────────────── */

const ClientBlock = ({ client, index }: { client: ClientData; index: number }) => {
  const colClass =
    client.videos.length === 1
      ? "max-w-[300px] mx-auto"
      : client.videos.length === 2
      ? "grid-cols-2 max-w-[640px] mx-auto"
      : "grid-cols-1 sm:grid-cols-3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-[24px] border border-white/[0.07] bg-surface/40 backdrop-blur-sm p-6 sm:p-8 ${
        client.highlight ? "ring-1 ring-primary/10" : ""
      }`}
    >
      {client.highlight && (
        <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      )}

      {/* Client header: logo + category + services */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        {/* Logo */}
        <div
          className={`flex-shrink-0 h-10 flex items-center ${
            client.logoDark
              ? "px-3 py-2 rounded-lg bg-black/60 border border-white/10"
              : ""
          }`}
        >
          <img
            src={client.logo}
            alt={client.name}
            className="h-8 max-w-[180px] object-contain"
            style={client.logoDark ? {} : { filter: "brightness(0) invert(0)" }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground tracking-wide">{client.category}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {client.services.map((s) => (
              <span
                key={s}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.07] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Videos grid */}
      <div className={client.videos.length === 1 ? "" : `grid ${colClass} gap-4`}>
        {client.videos.length === 1 ? (
          <div className={colClass}>
            <ReelPlayer src={client.videos[0].src} label={client.videos[0].label} />
          </div>
        ) : (
          client.videos.map((v, i) => (
            <ReelPlayer key={i} src={v.src} label={v.label} />
          ))
        )}
      </div>
    </motion.div>
  );
};

/* ──────────────────────────────────────────────
   Page
────────────────────────────────────────────── */

const Work = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="noise-overlay" />
      <Header />

      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">

          {/* Page header */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">Portfolio</span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Our Work
            </h1>
            <p className="text-muted-foreground text-lg max-w-md">
              Short-form video content we create for real brands.
            </p>
          </motion.div>

          {/* Brand logo strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 mb-16 pb-16 border-b border-white/[0.06]"
          >
            <span className="text-xs tracking-[0.25em] uppercase text-muted-foreground/40">Clients</span>
            {CLIENTS.map((c) => (
              <div
                key={c.id}
                className={`h-7 flex items-center ${
                  c.logoDark ? "px-2.5 py-1 rounded-md bg-black/50 border border-white/[0.08]" : ""
                }`}
              >
                <img
                  src={c.logo}
                  alt={c.name}
                  className="h-5 max-w-[120px] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </motion.div>

          {/* Client blocks */}
          <div className="space-y-8">
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
