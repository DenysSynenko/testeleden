import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Layers, TrendingUp } from "lucide-react";

const outcomes = [
  {
    number: "01",
    title: "Brand Presence",
    body: "A premium visual identity in motion — consistent content that makes your business look established.",
    icon: Sparkles,
    badge: null,
  },
  {
    number: "02",
    title: "Content System",
    body: "A repeatable production pipeline: ideas, scripts, shooting direction, editing — delivered consistently.",
    icon: Layers,
    badge: "Most requested",
  },
  {
    number: "03",
    title: "Leads",
    body: "Short-form content built for conversion — turning attention into qualified inquiries.",
    icon: TrendingUp,
    badge: null,
  },
];

const Outcomes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-glow-mint opacity-30 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <h2 className="section-title">What you get</h2>
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
  outcome: typeof outcomes[0];
  index: number;
}

const OutcomeCard = ({ outcome, index }: OutcomeCardProps) => {
  const Icon = outcome.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`relative pl-20 md:pl-28 ${
        isEven ? "md:mr-[20%]" : "md:ml-[20%]"
      }`}
    >
      {/* Number indicator */}
      <div className="absolute left-0 top-0 w-16 md:w-24 flex items-center justify-center">
        <motion.div
          whileInView={{ scale: [0.8, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-elevated border border-white/10 flex items-center justify-center"
        >
          <span className="font-display text-sm font-bold text-primary">
            {outcome.number}
          </span>
        </motion.div>
      </div>

      {/* Card */}
      <div className="premium-card group relative">
        {/* Badge */}
        {outcome.badge && (
          <div className="absolute -top-3 right-6">
            <span className="badge-champagne">{outcome.badge}</span>
          </div>
        )}

        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors duration-500">
            <Icon className="w-5 h-5 text-primary/80 group-hover:text-primary transition-colors duration-300" />
          </div>

          <div>
            <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 text-foreground">
              {outcome.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {outcome.body}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Outcomes;
