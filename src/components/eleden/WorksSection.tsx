import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PLACEHOLDER_CARDS = [
  { aspect: "9:16", ratio: "aspect-[9/16] sm:aspect-[4/5]" },
  { aspect: "9:16", ratio: "aspect-[9/16] sm:aspect-[4/5]" },
  { aspect: "9:16", ratio: "aspect-[9/16] sm:aspect-[4/5]" },
];

const WorksSection = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={containerRef} id="work" className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-glow-mint opacity-10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <h2 className="section-title mb-4">{t("portfolio.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">{t("portfolio.subtitle")}</p>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {PLACEHOLDER_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`${card.ratio} relative rounded-[18px] overflow-hidden bg-surface border border-white/[0.06]`}
            >
              {/* Placeholder shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent" />

              {/* Corner aspect label */}
              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-mono text-muted-foreground/40 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.05]">
                  {card.aspect}
                </span>
              </div>

              {/* Center coming soon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-muted-foreground/40" />
                </div>
                <p className="text-xs text-muted-foreground/40 text-center leading-relaxed">
                  {t("portfolio.viewAll")}
                </p>
              </div>

              {/* Subtle gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-surface/60 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-muted-foreground/40 mt-10"
        >
          Instagram: <a href="https://www.instagram.com/eleden.media/" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-primary transition-colors duration-200">@eleden.media</a>
        </motion.p>
      </div>
    </section>
  );
};

export default WorksSection;
