import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Layers, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Outcomes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const outcomes = [
    {
      number: "01",
      title: t("outcomes.01.title"),
      body: t("outcomes.01.body"),
      icon: Sparkles,
      badge: null,
    },
    {
      number: "02",
      title: t("outcomes.02.title"),
      body: t("outcomes.02.body"),
      icon: Layers,
      badge: t("outcomes.badge"),
    },
    {
      number: "03",
      title: t("outcomes.03.title"),
      body: t("outcomes.03.body"),
      icon: TrendingUp,
      badge: null,
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Animated Background glow */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-glow-mint opacity-30 rounded-full blur-3xl -translate-y-1/2"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-glow-champagne opacity-15 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="section-title">{t("outcomes.title")}</h2>
        </motion.div>

        {/* Outcomes grid */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-white/[0.06]">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary via-primary to-primary-deep"
            />
          </div>

          {/* Outcome cards */}
          <div className="space-y-16 md:space-y-24">
            {outcomes.map((outcome, index) => (
              <OutcomeCard
                key={outcome.number}
                outcome={outcome}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface OutcomeCardProps {
  outcome: {
    number: string;
    title: string;
    body: string;
    icon: React.ElementType;
    badge: string | null;
  };
  index: number;
}

const OutcomeCard = ({ outcome, index }: OutcomeCardProps) => {
  const Icon = outcome.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(15px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`relative pl-20 md:pl-28 ${
        isEven ? "md:mr-[20%]" : "md:ml-[20%]"
      }`}
    >
      {/* Number indicator */}
      <div className="absolute left-0 top-0 w-16 md:w-24 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.15 + 0.3,
            type: "spring",
            stiffness: 200
          }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-elevated border border-white/10 flex items-center justify-center"
        >
          <span className="font-display text-sm font-bold text-primary">
            {outcome.number}
          </span>
        </motion.div>
      </div>

      {/* Card */}
      <motion.div 
        className="premium-card group relative"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Badge */}
        {outcome.badge && (
          <motion.div 
            className="absolute -top-3 right-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 + 0.5 }}
          >
            <span className="badge-champagne">{outcome.badge}</span>
          </motion.div>
        )}

        <div className="flex items-start gap-4">
          {/* Icon */}
          <motion.div 
            className="w-12 h-12 rounded-xl bg-surface-elevated border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors duration-500"
            whileHover={{ rotate: 5 }}
          >
            <Icon className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors duration-300" />
          </motion.div>

          <div>
            <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 text-foreground">
              {outcome.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {outcome.body}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Outcomes;
