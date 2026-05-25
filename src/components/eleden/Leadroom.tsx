import { motion } from "framer-motion";
import { Video, Target, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "./MagneticButton";

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

const Leadroom = () => {
  const { t } = useLanguage();

  return (
    <section id="partnership" className="relative py-32 px-6 lg:px-8 bg-surface/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">{t("leadroom.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("leadroom.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
          {/* ELEDEN */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5 text-primary">
              <Video className="w-5 h-5" />
            </div>
            <p className="text-xs uppercase tracking-widest text-primary mb-2">{t("leadroom.eleden.label")}</p>
            <h3 className="font-display text-2xl font-semibold mb-3">{t("leadroom.eleden.heading")}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{t("leadroom.eleden.desc")}</p>
            <p className="text-xs text-muted-foreground/70 mt-auto">{t("leadroom.eleden.tag")}</p>
          </motion.div>

          {/* Connector */}
          <div className="flex flex-col items-center justify-center py-4 md:py-0">
            <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center text-primary">
              <X className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>

          {/* Leadroom */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-champagne/15 border border-champagne/30 flex items-center justify-center mb-5 text-champagne">
              <Target className="w-5 h-5" />
            </div>
            <p className="text-xs uppercase tracking-widest text-champagne mb-2">{t("leadroom.leadroom.label")}</p>
            <h3 className="font-display text-2xl font-semibold mb-3">{t("leadroom.leadroom.heading")}</h3>
            <p className="text-muted-foreground leading-relaxed mb-6">{t("leadroom.leadroom.desc")}</p>
            <p className="text-xs text-muted-foreground/70 mt-auto">{t("leadroom.leadroom.tag")}</p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          {t("leadroom.connector")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-16"
        >
          <h3 className="font-display text-2xl md:text-3xl font-semibold mb-3">{t("leadroom.cta.title")}</h3>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">{t("leadroom.cta.subtitle")}</p>
          <div className="flex justify-center">
            <MagneticButton variant="primary" onClick={scrollToContact}>
              {t("leadroom.cta.button")}
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Leadroom;