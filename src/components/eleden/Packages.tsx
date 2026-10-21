import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Check, Sparkles, ArrowRight, Camera } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "@/contexts/LanguageContext";

type Tab = "day" | "monthly" | "smm";
const TABS: Tab[] = ["day", "monthly", "smm"];

// ─── Shared card component ────────────────────────────────────────────────────
interface PkgCardProps {
  name: string;
  price: string;
  badge: string;
  per: string;
  tagline: string;
  includes: string[];
  popular?: boolean;
  index: number;
  onCta: () => void;
  ctaLabel: string;
  popularLabel: string;
  primaryBtn?: boolean;
}

const PkgCard = ({
  name, price, badge, per, tagline, includes,
  popular, index, onCta, ctaLabel, popularLabel, primaryBtn,
}: PkgCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.07 }}
    className={`relative premium-card flex flex-col h-full ${popular ? "border-primary/40" : ""}`}
  >
    {popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <span className="badge-primary flex items-center gap-1 whitespace-nowrap text-xs px-3 py-1">
          <Sparkles className="w-3 h-3" />
          {popularLabel}
        </span>
      </div>
    )}

    <div className="flex-1 space-y-4">
      <div>
        <h3 className="font-display font-semibold text-base mb-2 text-foreground">{name}</h3>
        <p className="text-2xl font-bold text-primary leading-none">{price}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
            {badge}
          </span>
          <span className="text-xs text-muted-foreground">{per}</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{tagline}</p>

      <ul className="space-y-2 pt-1">
        {includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-2.5 h-2.5 text-primary" />
            </div>
            <span className="text-muted-foreground text-xs leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-6">
      <MagneticButton
        variant={primaryBtn ? "primary" : "secondary"}
        onClick={onCta}
        className="w-full justify-center text-sm"
      >
        {ctaLabel}
        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
      </MagneticButton>
    </div>
  </motion.div>
);

// ─── SMM card (slightly different shape) ─────────────────────────────────────
interface SmmCardProps {
  name: string;
  price: string;
  posts: string;
  platforms: string;
  desc: string;
  popular?: boolean;
  index: number;
  onCta: () => void;
  ctaLabel: string;
  popularLabel: string;
}

const SmmCard = ({
  name, price, posts, platforms, desc,
  popular, index, onCta, ctaLabel, popularLabel,
}: SmmCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.07 }}
    className={`relative premium-card flex flex-col h-full ${popular ? "border-primary/40" : ""}`}
  >
    {popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
        <span className="badge-primary flex items-center gap-1 whitespace-nowrap text-xs px-3 py-1">
          <Sparkles className="w-3 h-3" />
          {popularLabel}
        </span>
      </div>
    )}

    <div className="flex-1 space-y-3">
      <div>
        <h3 className="font-display font-semibold text-base mb-2 text-foreground">{name}</h3>
        <p className="text-2xl font-bold text-primary leading-none">{price}</p>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{posts}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">{platforms}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>

    <div className="mt-5">
      <MagneticButton
        variant={popular ? "primary" : "secondary"}
        onClick={onCta}
        className="w-full justify-center text-sm"
      >
        {ctaLabel}
        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
      </MagneticButton>
    </div>
  </motion.div>
);

// ─── Tab panels ───────────────────────────────────────────────────────────────
const DayTab = ({ t, onCta }: { t: (k: string) => string; onCta: () => void }) => {
  const includes = [
    t("packages.day.inc1"),
    t("packages.day.inc2"),
    t("packages.day.inc3"),
    t("packages.day.inc4"),
    t("packages.day.inc5"),
  ];

  const cards = [
    { id: "single", popular: false },
    { id: "mini",   popular: false },
    { id: "standard", popular: true },
    { id: "power",  popular: false },
  ];

  return (
    <div className="space-y-8">
      <p className="text-center text-sm text-muted-foreground">{t("packages.tab.day.sub")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {cards.map((c, i) => (
          <PkgCard
            key={c.id}
            name={t(`packages.day.${c.id}.name`)}
            price={t(`packages.day.${c.id}.price`)}
            badge={t(`packages.day.${c.id}.videos`)}
            per={t(`packages.day.${c.id}.per`)}
            tagline={t(`packages.day.${c.id}.tagline`)}
            includes={includes}
            popular={c.popular}
            index={i}
            onCta={onCta}
            ctaLabel={t("packages.cta.request")}
            popularLabel={t("packages.popular")}
            primaryBtn={c.popular}
          />
        ))}
      </div>

      {/* Hourly add-on note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-md mx-auto text-center p-5 rounded-[14px] bg-surface border border-white/[0.06]"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Camera className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-foreground">
            {t("packages.hourly.label")} —{" "}
            <span className="text-primary">{t("packages.hourly.price")}</span>
          </p>
        </div>
        <p className="text-xs text-muted-foreground">{t("packages.hourly.desc")}</p>
      </motion.div>

      <p className="text-center text-xs text-muted-foreground/60">{t("packages.vat")}</p>
    </div>
  );
};

const MonthlyTab = ({ t, onCta }: { t: (k: string) => string; onCta: () => void }) => {
  const includes = [
    t("packages.monthly.inc1"),
    t("packages.monthly.inc2"),
    t("packages.monthly.inc3"),
    t("packages.monthly.inc4"),
    t("packages.monthly.inc5"),
  ];

  const cards = [
    { id: "light",  popular: false },
    { id: "growth", popular: true },
    { id: "pro",    popular: false },
  ];

  return (
    <div className="space-y-8">
      <p className="text-center text-sm text-muted-foreground">{t("packages.tab.monthly.sub")}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto items-stretch">
        {cards.map((c, i) => (
          <PkgCard
            key={c.id}
            name={t(`packages.monthly.${c.id}.name`)}
            price={t(`packages.monthly.${c.id}.price`)}
            badge={t(`packages.monthly.${c.id}.videos`)}
            per={t("packages.monthly.per")}
            tagline={t(`packages.monthly.${c.id}.tagline`)}
            includes={includes}
            popular={c.popular}
            index={i}
            onCta={onCta}
            ctaLabel={t("packages.cta.request")}
            popularLabel={t("packages.popular")}
            primaryBtn={c.popular}
          />
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground/60">{t("packages.vat")}</p>
    </div>
  );
};

const SmmTab = ({ t, onCta }: { t: (k: string) => string; onCta: () => void }) => {
  const bundles = [
    { id: "start",  popular: false },
    { id: "growth", popular: true },
    { id: "full",   popular: false },
  ];

  const smmOnly = [
    { id: "basic", popular: false },
    { id: "plus",  popular: true },
    { id: "pro",   popular: false },
  ];

  return (
    <div className="space-y-12">
      <p className="text-center text-sm text-muted-foreground">{t("packages.tab.smm.sub")}</p>

      {/* Combined bundles */}
      <div className="space-y-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/60"
        >
          {t("packages.smm.section.bundle")}
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto items-stretch">
          {bundles.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`relative premium-card flex flex-col h-full ${c.popular ? "border-primary/40" : ""}`}
            >
              {c.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="badge-primary flex items-center gap-1 whitespace-nowrap text-xs px-3 py-1">
                    <Sparkles className="w-3 h-3" />
                    {t("packages.popular")}
                  </span>
                </div>
              )}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-display font-semibold text-base mb-2 text-foreground">
                    {t(`packages.smmvideo.${c.id}.name`)}
                  </h3>
                  <p className="text-2xl font-bold text-primary leading-none">
                    {t(`packages.smmvideo.${c.id}.price`)}
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {t(`packages.smmvideo.${c.id}.videos`)}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">
                      {t(`packages.smmvideo.${c.id}.platforms`)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t(`packages.smmvideo.${c.id}.desc`)}
                </p>
              </div>
              <div className="mt-5">
                <MagneticButton
                  variant={c.popular ? "primary" : "secondary"}
                  onClick={onCta}
                  className="w-full justify-center text-sm"
                >
                  {t("packages.cta.request")}
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.06]" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-background text-xs text-muted-foreground/50 uppercase tracking-widest">
            {t("packages.smm.section.standalone")}
          </span>
        </div>
      </div>

      {/* SMM only */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto items-stretch">
        {smmOnly.map((c, i) => (
          <SmmCard
            key={c.id}
            name={t(`packages.smm.${c.id}.name`)}
            price={t(`packages.smm.${c.id}.price`)}
            posts={t(`packages.smm.${c.id}.posts`)}
            platforms={t(`packages.smm.${c.id}.platforms`)}
            desc={t(`packages.smm.${c.id}.desc`)}
            popular={c.popular}
            index={i}
            onCta={onCta}
            ctaLabel={t("packages.cta.request")}
            popularLabel={t("packages.popular")}
          />
        ))}
      </div>

      <p className="text-center text-xs text-muted-foreground/60">{t("packages.vat")}</p>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Packages = () => {
  const [activeTab, setActiveTab] = useState<Tab>("day");
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="section-title mb-4">{t("packages.title")}</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{t("packages.subtitle")}</p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-[14px] bg-surface border border-white/[0.06] p-1 gap-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2.5 rounded-[10px] text-sm font-medium transition-colors duration-300 ${
                  activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activePackageTab"
                    className="absolute inset-0 rounded-[10px] bg-surface-elevated border border-primary/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{t(`packages.tab.${tab}`)}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === "day"     && <DayTab     t={t} onCta={scrollToContact} />}
            {activeTab === "monthly" && <MonthlyTab t={t} onCta={scrollToContact} />}
            {activeTab === "smm"     && <SmmTab     t={t} onCta={scrollToContact} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Packages;
