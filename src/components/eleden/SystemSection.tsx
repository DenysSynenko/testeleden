import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Target, Lightbulb, Video, Palette, RefreshCw } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SystemSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const steps = [
    {
      number: "01",
      title: t("system.01.title"),
      description: t("system.01.desc"),
      icon: Target,
      badge: null,
    },
    {
      number: "02",
      title: t("system.02.title"),
      description: t("system.02.desc"),
      icon: Lightbulb,
      badge: null,
    },
    {
      number: "03",
      title: t("system.03.title"),
      description: t("system.03.desc"),
      icon: Video,
      badge: null,
    },
    {
      number: "04",
      title: t("system.04.title"),
      description: t("system.04.desc"),
      icon: Palette,
      badge: t("system.badge"),
    },
    {
      number: "05",
      title: t("system.05.title"),
      description: t("system.05.desc"),
      icon: RefreshCw,
      badge: null,
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-glow-mint opacity-20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 30, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-glow-mint opacity-15 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-2xl mx-auto md:mx-0 text-center md:text-left"
        >
          <h2 className="section-title mb-4">{t("system.title")}</h2>
          <p className="text-muted-foreground text-lg">
            {t("system.subtitle")}
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
  step: {
    number: string;
    title: string;
    description: string;
    icon: React.ElementType;
    badge: string | null;
  };
  index: number;
}

const StepCard = ({ step, index }: StepCardProps) => {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
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
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1 + 0.2,
          type: "spring",
          stiffness: 200
        }}
        className="absolute left-0 top-0 w-12 md:w-16 flex items-center justify-center"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-surface-elevated border border-white/10 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-500">
          <Icon className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors duration-300" />
        </div>
      </motion.div>

      {/* Card */}
      <motion.div 
        className="relative p-6 rounded-[18px] bg-surface/50 border border-white/[0.06] hover:border-primary/20 hover:bg-surface transition-all duration-500"
        whileHover={{ x: 8, scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        {/* Badge */}
        {step.badge && (
          <motion.div 
            className="absolute -top-2 right-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <span className="badge-primary">{step.badge}</span>
          </motion.div>
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
      </motion.div>
    </motion.div>
  );
};

export default SystemSection;
