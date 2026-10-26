import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Camera, Scissors, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ──────────────────────────────────────────────
   Simple transparent pricing — two services
────────────────────────────────────────────── */

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  price: string;
  unit: string;
  note: string;
  index: number;
}

const ServiceCard = ({ icon, title, subtitle, price, unit, note, index }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    className="premium-card flex flex-col gap-6 p-8"
  >
    {/* Icon */}
    <div className="w-11 h-11 rounded-[12px] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
      {icon}
    </div>

    {/* Label */}
    <div>
      <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-1">{subtitle}</p>
      <h3 className="font-display font-semibold text-xl text-foreground">{title}</h3>
    </div>

    {/* Price */}
    <div className="flex items-end gap-2 border-t border-foreground/[0.06] pt-6">
      <span className="text-4xl font-bold text-primary leading-none">{price}</span>
      <span className="text-sm text-muted-foreground pb-1">{unit}</span>
    </div>

    {/* Note */}
    <p className="text-sm text-muted-foreground leading-relaxed">{note}</p>
  </motion.div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const Packages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} id="packages" className="relative py-32 overflow-hidden">
      {/* Parallax glow */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-glow-mint opacity-20 rounded-full blur-3xl" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-glow-mint opacity-15 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-primary mb-4 block">
            {t("packages.label") || "Preise"}
          </span>
          <h2 className="section-title mb-4">{t("packages.title") || "Transparente Preise"}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("packages.subtitle") || "Keine versteckten Kosten. Nur klare Leistungen."}
          </p>
        </motion.div>

        {/* Two service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <ServiceCard
            icon={<Camera className="w-5 h-5" />}
            subtitle={t("packages.filming.label") || "Produktion"}
            title={t("packages.filming.title") || "Dreh"}
            price="€100"
            unit={t("packages.filming.unit") || "/ Stunde"}
            note={t("packages.filming.note") || "Professionelle Kamera, Licht & Ton. Mehrere Standorte möglich. Ein Drehtag = ca. 6–8 Stunden."}
            index={0}
          />
          <ServiceCard
            icon={<Scissors className="w-5 h-5" />}
            subtitle={t("packages.editing.label") || "Post-Produktion"}
            title={t("packages.editing.title") || "Schnitt"}
            price="€100"
            unit={t("packages.editing.unit") || "/ Video"}
            note={t("packages.editing.note") || "Schnitt, Farbe, Ton & Untertitel. Für Reels, TikToks und Shorts bis 60 Sekunden."}
            index={1}
          />
        </div>

        {/* Example calculation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 max-w-2xl mx-auto p-6 rounded-[16px] bg-surface border border-white/[0.06]"
        >
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground/60 mb-4">
            {t("packages.example.label") || "Beispiel"}
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>{t("packages.example.shoot") || "Dreh — 6 Stunden"}</span>
              <span className="font-medium text-foreground">€600</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>{t("packages.example.edit") || "Schnitt — 4 Videos"}</span>
              <span className="font-medium text-foreground">€400</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-foreground/[0.06]">
              <span className="font-medium text-foreground">{t("packages.example.total") || "Gesamt"}</span>
              <span className="font-bold text-primary text-base">€1.000</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity duration-300 group"
          >
            <span>{t("packages.cta") || "Angebot anfragen"}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-xs text-muted-foreground/60">
            {t("packages.vat") || "Alle Preise zzgl. MwSt."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Packages;
