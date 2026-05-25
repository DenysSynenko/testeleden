import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "@/contexts/LanguageContext";

interface PackageData {
  id: string;
  translationKey: string;
  includes: string[];
  notIncluded: string[];
  recommended?: boolean;
}

const packageData: PackageData[] = [
  {
    id: "s",
    translationKey: "s",
    includes: [
      "packages.s.inc1",
      "packages.s.inc2",
      "packages.s.inc3",
      "packages.s.inc4",
      "packages.s.inc5",
      "packages.s.inc6",
      "packages.s.inc7",
    ],
    notIncluded: [
      "packages.s.not1",
      "packages.s.not2",
      "packages.s.not3",
    ],
  },
  {
    id: "m",
    translationKey: "m",
    includes: [
      "packages.m.inc1",
      "packages.m.inc2",
      "packages.m.inc3",
      "packages.m.inc4",
      "packages.m.inc5",
      "packages.m.inc6",
      "packages.m.inc7",
      "packages.m.inc8",
      "packages.m.inc9",
    ],
    notIncluded: [
      "packages.m.not1",
    ],
    recommended: true,
  },
  {
    id: "l",
    translationKey: "l",
    includes: [
      "packages.l.inc1",
      "packages.l.inc2",
      "packages.l.inc3",
      "packages.l.inc4",
      "packages.l.inc5",
      "packages.l.inc6",
      "packages.l.inc7",
      "packages.l.inc8",
      "packages.l.inc9",
      "packages.l.inc10",
    ],
    notIncluded: [],
  },
  {
    id: "individual",
    translationKey: "individual",
    includes: [],
    notIncluded: [],
  },
];

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>("m");
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const activePackage = packageData.find((p) => p.id === selectedPackage)!;

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getPackageName = (key: string) => t(`packages.${key}.name`);
  const getPackagePrice = (key: string) => t(`packages.${key}.price`);
  const getPackageTagline = (key: string) => t(`packages.${key}.tagline`);
  const getPackageCTA = (id: string) => {
    if (id === "individual") return t("packages.cta.custom");
    return t(`packages.cta.${id}`);
  };

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-glow-mint opacity-20 rounded-full blur-3xl" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-glow-champagne opacity-15 rounded-full blur-3xl"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl mx-auto md:mx-0 text-center md:text-left"
        >
          <motion.h2 
            className="section-title mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t("packages.title")}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t("packages.subtitle")}
          </motion.p>
        </motion.div>

        {/* Package selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Package tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-3"
          >
            {packageData.map((pkg, index) => (
              <PackageTab
                key={pkg.id}
                pkg={pkg}
                isActive={selectedPackage === pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                index={index}
                t={t}
              />
            ))}

            {/* Custom note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-6 pl-4 border-l-2 border-champagne/30"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("packages.note")}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Package details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPackage}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Premium Card */}
                <div className="premium-card relative">
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(135deg, rgba(91, 205, 182, 0.1) 0%, transparent 50%, rgba(214, 179, 106, 0.1) 100%)",
                    }}
                  />

                  {/* Recommended badge */}
                  {activePackage.recommended && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute -top-3 right-6"
                    >
                      <span className="badge-champagne flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {t("packages.recommended")}
                      </span>
                    </motion.div>
                  )}

                  <div className="space-y-6">
                    {/* Header */}
                    <div>
                      <motion.h3
                        key={`name-${selectedPackage}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="font-display text-2xl md:text-3xl font-bold mb-2"
                      >
                        {getPackageName(activePackage.translationKey)}
                      </motion.h3>
                      <motion.p
                        key={`price-${selectedPackage}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 }}
                        className="text-2xl text-primary font-semibold mb-3"
                      >
                        {getPackagePrice(activePackage.translationKey)}
                      </motion.p>
                      <motion.p
                        key={`tagline-${selectedPackage}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-muted-foreground leading-relaxed"
                      >
                        {getPackageTagline(activePackage.translationKey)}
                      </motion.p>
                    </div>

                    {/* Features - only for S/M/L packages */}
                    {activePackage.id !== "individual" && (
                      <>
                        {/* Includes */}
                        <div className="pt-4 border-t border-white/[0.06]">
                          <p className="text-sm font-medium text-foreground mb-4">
                            {t("packages.includes")}
                          </p>
                          <ul className="space-y-3">
                            {activePackage.includes.map((feature, index) => (
                              <motion.li
                                key={feature}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className="flex items-start gap-3"
                              >
                                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 text-primary" />
                                </div>
                                <span className="text-muted-foreground text-sm">{t(feature)}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Not included */}
                        {activePackage.notIncluded.length > 0 && (
                          <div className="pt-4 border-t border-white/[0.06]">
                            <p className="text-sm font-medium text-muted-foreground/70 mb-4">
                              {t("packages.notIncluded")}
                            </p>
                            <ul className="space-y-2">
                              {activePackage.notIncluded.map((feature, index) => (
                                <motion.li
                                  key={feature}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: activePackage.includes.length * 0.03 + index * 0.03 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <X className="w-3 h-3 text-muted-foreground/50" />
                                  </div>
                                  <span className="text-muted-foreground/60 text-sm">{t(feature)}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}

                    {/* CTA */}
                    <motion.div 
                      className="pt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <MagneticButton
                        variant="primary"
                        onClick={scrollToContact}
                        className="w-full justify-center"
                      >
                        {getPackageCTA(activePackage.id)}
                      </MagneticButton>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface PackageTabProps {
  pkg: PackageData;
  isActive: boolean;
  onClick: () => void;
  index: number;
  t: (key: string) => string;
}

const PackageTab = ({ pkg, isActive, onClick, index, t }: PackageTabProps) => {
  const getPackageName = (key: string) => t(`packages.${key}.name`);
  const getPackagePrice = (key: string) => t(`packages.${key}.price`);

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ x: 8, transition: { duration: 0.2 } }}
      className={`w-full text-left p-5 rounded-[14px] border transition-all duration-500 relative overflow-hidden group ${
        isActive
          ? "bg-surface-elevated border-primary/40"
          : "bg-surface/50 border-white/[0.06] hover:border-white/10"
      }`}
    >
      {/* Animated glow on active */}
      {isActive && (
        <motion.div
          layoutId="activePackageGlow"
          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}

      <div className="relative flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-display font-semibold transition-colors duration-300 ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`}>
              {getPackageName(pkg.translationKey)}
            </span>
            {pkg.recommended && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="badge-champagne text-[8px]"
              >
                ★
              </motion.span>
            )}
          </div>
          <p className={`text-sm mt-1 transition-colors duration-300 ${
            isActive ? "text-primary" : "text-muted-foreground/70"
          }`}>
            {getPackagePrice(pkg.translationKey)}
          </p>
        </div>
        
        <motion.div
          animate={{ 
            x: isActive ? 0 : 10,
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="w-4 h-4 text-primary" />
        </motion.div>
      </div>
    </motion.button>
  );
};

export default Packages;
