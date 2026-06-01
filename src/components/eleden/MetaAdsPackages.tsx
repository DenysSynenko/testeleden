import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "@/contexts/LanguageContext";
import MobileCarousel from "./MobileCarousel";

type Mode = "content" | "full";

interface MetaPkg {
  id: string;
  name: string;
  contentPrice: number;
  fullPrice: number;
  leadroomAddon: string;
  popular?: boolean;
  glow?: boolean;
}

const packagesMeta: MetaPkg[] = [
  { id: "spark", name: "Spark", contentPrice: 500, fullPrice: 999, leadroomAddon: "+€499 Leadroom Starter" },
  { id: "surge", name: "Surge", contentPrice: 900, fullPrice: 1699, leadroomAddon: "+€799 Leadroom Growth", popular: true },
  { id: "storm", name: "Storm", contentPrice: 1500, fullPrice: 2399, leadroomAddon: "+€899 Leadroom Scaling", glow: true },
];

const AnimatedPrice = ({ value }: { value: number }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block"
      >
        €{value.toLocaleString("en-US")}
      </motion.span>
    </AnimatePresence>
  );
};

const MetaAdsPackages = () => {
  const [mode, setMode] = useState<Mode>("content");
  const { t } = useLanguage();

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-glow-mint opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <h2 className="section-title mb-4">{t("meta.title")}</h2>
          <p className="text-muted-foreground text-lg">{t("meta.subtitle")}</p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-14"
        >
          <div className="relative inline-flex p-1.5 rounded-full bg-surface/60 border border-white/[0.08] backdrop-blur-xl">
            {(["content", "full"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`relative z-10 px-5 sm:px-7 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 ${
                  mode === m ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="metaAdsToggle"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative">
                  {m === "content" ? t("meta.toggle.content") : t("meta.toggle.full")}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <MobileCarousel mdCols={3}>
          {packagesMeta.map((pkg, idx) => {
            const price = mode === "content" ? pkg.contentPrice : pkg.fullPrice;
            const features = t(`meta.${pkg.id}.features`).split("|");
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group rounded-[18px] p-7 sm:p-8 flex flex-col bg-surface-elevated border transition-all duration-500 ${
                  pkg.glow
                    ? "border-primary/40 shadow-[0_0_60px_-15px_hsl(var(--primary)/0.5)]"
                    : "border-white/[0.08] hover:border-white/[0.14]"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-primary flex items-center gap-1 whitespace-nowrap">
                      <Sparkles className="w-3 h-3" />
                      {t("meta.popular")}
                    </span>
                  </div>
                )}

                {/* Name */}
                <h3 className="font-display text-3xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{t(`meta.${pkg.id}.tagline`)}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="font-display text-4xl sm:text-5xl font-bold text-primary leading-none">
                    <AnimatedPrice value={price} />
                    <span className="text-base text-muted-foreground font-normal ml-1.5">{t("meta.month")}</span>
                  </div>
                  <AnimatePresence mode="wait">
                    {mode === "full" && (
                      <motion.p
                        key="addon"
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="text-xs text-primary/80 mt-2 font-medium overflow-hidden"
                      >
                        €{pkg.contentPrice} ELEDEN {pkg.leadroomAddon}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <MagneticButton
                  variant="primary"
                  onClick={scrollToContact}
                  className="w-full justify-center"
                >
                  {t("meta.cta")}
                </MagneticButton>
              </motion.div>
            );
          })}
        </MobileCarousel>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-2xl mx-auto text-center space-y-3"
        >
          <p className="text-xs text-muted-foreground/80 leading-relaxed">
            {t("meta.note.terms")}
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {t("meta.note.together")
              .split(/(\{leadroom\}|\{eleden\})/g)
              .map((part, i) =>
                part === "{leadroom}" ? (
                  <span key={i} className="text-primary font-medium">Leadroom</span>
                ) : part === "{eleden}" ? (
                  <span key={i} className="text-primary font-medium">ELEDEN</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MetaAdsPackages;