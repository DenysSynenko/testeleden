import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Lightbulb, Video, Palette, RefreshCw } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Strategy",
    description: "Goals, audience, positioning, and the content angle that sells.",
    icon: Target,
    badge: null,
  },
  {
    number: "02",
    title: "Concept",
    description: "Weekly ideas engineered for retention and trust.",
    icon: Lightbulb,
    badge: null,
  },
  {
    number: "03",
    title: "Production",
    description: "Shoot days or remote content direction — designed for speed and quality.",
    icon: Video,
    badge: null,
  },
  {
    number: "04",
    title: "Editing",
    description: "Cinematic pacing, premium color, clean sound, platform-ready formats.",
    icon: Palette,
    badge: "Quality control",
  },
  {
    number: "05",
    title: "Iteration",
    description: "Performance review, adjustments, and scaling what works.",
    icon: RefreshCw,
    badge: null,
  },
];

const SystemSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-glow-mint opacity-20 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-glow-champagne opacity-15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-2xl"
        >
          <h2 className="section-title mb-4">Our system</h2>
          <p className="text-muted-foreground text-lg">
            A clear pipeline that turns content into a predictable asset.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/[0.06]">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-primary to-primary-deep"
            />
          </div>

          {/* Step cards */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StepCardProps {
  step: typeof steps[0];
  index: number;
}

const StepCard = ({ step, index }: StepCardProps) => {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="relative pl-16 md:pl-20 group"
    >
      {/* Number indicator */}
      <motion.div
        whileInView={{ scale: [0.8, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="absolute left-0 top-0 w-12 md:w-16 flex items-center justify-center"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-surface-elevated border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-500">
          <Icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors duration-300" />
        </div>
      </motion.div>

      {/* Card */}
      <div className="relative p-6 rounded-[18px] bg-surface/50 border border-white/[0.06] hover:border-primary/20 hover:bg-surface transition-all duration-500 group-hover:translate-x-2">
        {/* Badge */}
        {step.badge && (
          <div className="absolute -top-2 right-6">
            <span className="badge-champagne">{step.badge}</span>
          </div>
        )}

        <div className="flex items-start gap-4">
          <span className="font-display text-sm font-bold text-primary/60">
            {step.number}
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
              {step.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemSection;
