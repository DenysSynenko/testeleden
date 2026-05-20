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
  details: {
    outcomes: string[];
    services: string[];
    testimonial: string;
  };
}

const cases: CaseStudy[] = [
  {
    id: "01",
    title: "Kirchbichl, Tirol — Luxury Apartments",
    category: "Cinematic Reel · 9:16",
    result: "+47 inquiries in 30 days",
    color: "from-primary/20 to-primary-deep/40",
    videoUrl: "https://hceuppafankyvukayjzp.supabase.co/storage/v1/object/public/case-videos/kirchbichl.mp4",
    posterUrl: "https://hceuppafankyvukayjzp.supabase.co/storage/v1/object/public/case-videos/kirchbichl.jpg",
    clientUrl: "https://www.instagram.com/kirchbichl.tirol/",
    clientLabel: "Kirchbichl Tirol",
    details: {
      outcomes: [
        "47 qualified inquiries in first month",
        "300% increase in social engagement",
        "Premium brand positioning achieved"
      ],
      services: ["Strategy", "Shooting direction", "Premium editing", "Publishing support"],
      testimonial: "ELEDEN transformed how we present our properties. The content speaks premium.",
    },
  },
  {
    id: "02",
    title: "EBSS 170 m² — Residential Apartments",
    category: "Real Estate Reel · 9:16",
    result: "+89 leads in 45 days",
    color: "from-champagne/20 to-champagne/5",
    videoUrl: "https://hceuppafankyvukayjzp.supabase.co/storage/v1/object/public/case-videos/ebss.mp4",
    posterUrl: "https://hceuppafankyvukayjzp.supabase.co/storage/v1/object/public/case-videos/ebss.jpg",
    clientUrl: "https://www.instagram.com/ebss.immo/",
    clientLabel: "EBSS Immobilien",
    details: {
      outcomes: [
        "89 new leads generated",
        "2.5x content engagement rate",
        "Consistent brand voice established"
      ],
      services: ["On-location shoot", "Cinematic editing", "Color grading", "Publishing"],
      testimonial: "Finally, content that converts. ELEDEN understands premium positioning.",
    },
  },
  {
    id: "03",
    title: "Product Launch",
    category: "Ads + Short-form",
    result: "Sold out in 72 hours",
    color: "from-primary-deep/30 to-surface",
    details: {
      outcomes: [
        "Complete sellout in 72 hours",
        "1.2M organic impressions",
        "Featured in industry publications"
      ],
      services: ["Launch strategy", "Ad creative", "Short-form content", "Real-time optimization"],
      testimonial: "The launch content was pure fire. Exceeded every expectation.",
    },
  },
  {
    id: "04",
    title: "Personal Brand",
    category: "Content System",
    result: "+12K followers in 60 days",
    color: "from-champagne/15 to-primary/10",
    details: {
      outcomes: [
        "12,000 new followers",
        "Speaking engagements booked",
        "Consistent thought leadership"
      ],
      services: ["Personal branding", "Content calendar", "Scripting", "Editing"],
      testimonial: "ELEDEN made me look like I have a full production team.",
    },
  },
  {
    id: "05",
    title: "Restaurant / Hospitality",
    category: "Reels + Stories",
    result: "+156% reservation increase",
    color: "from-primary/25 to-champagne/10",
    details: {
      outcomes: [
        "156% more reservations",
        "Viral content moments",
        "Premium dining perception"
      ],
      services: ["Food content strategy", "On-location shoots", "Story content", "Reels production"],
      testimonial: "Our tables are fully booked weeks in advance now.",
    },
  },
  {
    id: "06",
    title: "Event / Lifestyle",
    category: "Cinematic edits",
    result: "3 sold-out events",
    color: "from-primary-deep/20 to-champagne/15",
    details: {
      outcomes: [
        "3 consecutive sold-out events",
        "Premium ticket tier sold first",
        "Waitlist established for future events"
      ],
      services: ["Event capture", "Cinematic editing", "Highlight reels", "Promotional content"],
      testimonial: "The highlight reels sell the next event before we even announce it.",
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
          className="mb-16"
        >
          <h2 className="section-title mb-4">{t("portfolio.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            {t("portfolio.subtitle")}
          </p>
        </motion.div>

        {/* Portfolio Grid - Asymmetric Layout */}
        <div className="space-y-8">
          {/* Row 1: Large left, 2 stacked right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="md:col-span-2 md:row-span-2"
            >
              <VideoCard 
                caseStudy={cases[0]} 
                size="large"
                onClick={() => setSelectedCase(cases[0])}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <VideoCard 
                caseStudy={cases[1]} 
                size="small"
                onClick={() => setSelectedCase(cases[1])}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <VideoCard 
                caseStudy={cases[2]} 
                size="small"
                onClick={() => setSelectedCase(cases[2])}
              />
            </motion.div>
          </div>

          {/* Row 2: 2 stacked left, Large right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <VideoCard 
                caseStudy={cases[3]} 
                size="small"
                onClick={() => setSelectedCase(cases[3])}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <VideoCard 
                caseStudy={cases[4]} 
                size="small"
                onClick={() => setSelectedCase(cases[4])}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:row-span-2"
            >
              <VideoCard 
                caseStudy={cases[5]} 
                size="medium"
                onClick={() => setSelectedCase(cases[5])}
              />
            </motion.div>
          </div>
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
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`video-card cursor-pointer relative group ${heightClass}`}
      whileHover={{ scale: 1.02, y: -8 }}
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

        {/* Client link */}
        {caseStudy.clientUrl && (
          <motion.a
            href={caseStudy.clientUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-surface border border-white/[0.08] text-sm text-foreground hover:border-primary/40 hover:text-primary transition-all duration-300"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Visit client{caseStudy.clientLabel ? ` · ${caseStudy.clientLabel}` : ""}</span>
          </motion.a>
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

export default Portfolio;
