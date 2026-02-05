import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowRight, Check } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  result: string;
  color: string;
  details: {
    outcomes: string[];
    services: string[];
    testimonial: string;
  };
}

const cases: CaseStudy[] = [
  {
    id: "01",
    title: "Luxury Apartments",
    category: "Reels + Editing + Posting",
    result: "+47 inquiries in 30 days",
    color: "from-primary/20 to-primary-deep/40",
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
    title: "Premium Service Brand",
    category: "UGC + Reels",
    result: "+89 leads in 45 days",
    color: "from-champagne/20 to-champagne/5",
    details: {
      outcomes: [
        "89 new leads generated",
        "2.5x content engagement rate",
        "Consistent brand voice established"
      ],
      services: ["Content strategy", "UGC coordination", "Editing", "Performance tracking"],
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

  return (
    <section id="work" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-glow-mint opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-glow-champagne opacity-20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="section-title mb-4">Selected work</h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Vertical reels, designed to sell the feeling — and the result.
          </p>
        </motion.div>

        {/* Portfolio Grid - Asymmetric Layout */}
        <div className="space-y-8">
          {/* Row 1: Large left, 2 stacked right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2 md:row-span-2"
            >
              <VideoCard 
                caseStudy={cases[0]} 
                size="large"
                onClick={() => setSelectedCase(cases[0])}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <VideoCard 
                caseStudy={cases[1]} 
                size="small"
                onClick={() => setSelectedCase(cases[1])}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <VideoCard 
                caseStudy={cases[3]} 
                size="small"
                onClick={() => setSelectedCase(cases[3])}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <VideoCard 
                caseStudy={cases[4]} 
                size="small"
                onClick={() => setSelectedCase(cases[4])}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
          <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group">
            <span>View all work</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>

      {/* Case Spotlight Modal */}
      <AnimatePresence>
        {selectedCase && (
          <CaseSpotlight 
            caseStudy={selectedCase} 
            onClose={() => setSelectedCase(null)} 
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
      className={`video-card cursor-pointer relative group ${heightClass}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      {/* Placeholder gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${caseStudy.color}`} />
      
      {/* Animated play state indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isInView ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 2, repeat: isInView ? Infinity : 0 }}
          className="w-16 h-16 rounded-full bg-surface/80 backdrop-blur-sm border border-white/10 flex items-center justify-center"
        >
          <Play className="w-6 h-6 text-champagne fill-champagne/30" />
        </motion.div>
      </div>

      {/* Overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent p-6 flex flex-col justify-end"
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

      {/* Always visible minimal label */}
      <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-300">
        <p className="text-xs text-white/60">
          Case #{caseStudy.id} — {caseStudy.title}
        </p>
      </div>
    </motion.div>
  );
};

interface CaseSpotlightProps {
  caseStudy: CaseStudy;
  onClose: () => void;
}

const CaseSpotlight = ({ caseStudy, onClose }: CaseSpotlightProps) => {
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
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl glass-elevated rounded-[18px] p-8 max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center hover:bg-surface-elevated transition-colors duration-300"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">
            Case #{caseStudy.id}
          </p>
          <h2 className="font-display text-3xl font-bold mb-2">
            {caseStudy.title}
          </h2>
          <p className="text-muted-foreground">
            {caseStudy.category}
          </p>
        </div>

        {/* Result badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <span className="text-primary font-medium">{caseStudy.result}</span>
        </div>

        {/* Outcomes */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-foreground mb-4">Key Outcomes</h3>
          <ul className="space-y-3">
            {caseStudy.details.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <span className="text-muted-foreground">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-foreground mb-4">What we did</h3>
          <div className="flex flex-wrap gap-2">
            {caseStudy.details.services.map((service, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-full bg-surface text-sm text-muted-foreground border border-white/[0.06]"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="mb-8 p-6 rounded-xl bg-surface border border-white/[0.06]">
          <p className="text-foreground italic mb-4">
            "{caseStudy.details.testimonial}"
          </p>
          <p className="text-sm text-muted-foreground">— Client</p>
        </div>

        {/* CTA */}
        <MagneticButton 
          variant="primary"
          onClick={() => scrollToSection("contact")}
          className="w-full justify-center"
        >
          Request similar system
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;
