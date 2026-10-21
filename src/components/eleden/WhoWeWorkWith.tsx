import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, ShoppingBag, Utensils, Dumbbell, Briefcase, XCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GROUP_ICONS = [Building2, ShoppingBag, Utensils, Dumbbell, Briefcase];

const WhoWeWorkWith = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const groups = [1, 2, 3, 4, 5];

  return (
    <section ref={containerRef} id="who-we-work-with" className="relative py-32 overflow-hidden">
      {/* Parallax background glow */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-glow-mint rounded-full blur-3xl"
        />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-glow-mint opacity-10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">{t("icp.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t("icp.subtitle")}</p>
        </motion.div>

        {/* ICP cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {groups.map((n, i) => {
            const Icon = GROUP_ICONS[i];
            return (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="premium-card group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-foreground text-base mb-2">
                      {t(`icp.g${n}.name`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`icp.g${n}.niches`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Who we DON'T work with */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div className="premium-card border-red-500/10">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/15 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-4.5 h-4.5 text-red-400" />
              </div>
              <div>
                <h4 className="font-display font-semibold text-foreground text-sm mb-1">
                  {t("icp.not.title")}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("icp.not.desc")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeWorkWith;
