import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import MagneticButton from "./MagneticButton";

type Mode = "content" | "full";

interface MetaPackage {
  id: string;
  name: string;
  tagline: string;
  contentPrice: number;
  fullPrice: number;
  leadroomAddon: string;
  features: string[];
  popular?: boolean;
  glow?: boolean;
}

const packages: MetaPackage[] = [
  {
    id: "spark",
    name: "Spark",
    tagline: "Launch your first ad system with intent.",
    contentPrice: 500,
    fullPrice: 999,
    leadroomAddon: "+€499 Leadroom Starter",
    features: [
      "5 Reels / month",
      "Shooting + editing included",
      "Basic ad strategy",
      "1 platform (Meta)",
      "Monthly strategy call",
    ],
  },
  {
    id: "surge",
    name: "Surge",
    tagline: "Scale creative output and reach across channels.",
    contentPrice: 900,
    fullPrice: 1699,
    leadroomAddon: "+€799 Leadroom Growth",
    features: [
      "10 Reels / month",
      "Shooting + editing included",
      "Full ad strategy + scripting",
      "2 platforms (Meta + Google)",
      "Weekly optimization calls",
      "A/B testing concepts",
    ],
    popular: true,
  },
  {
    id: "storm",
    name: "Storm",
    tagline: "A complete content & performance engine.",
    contentPrice: 1500,
    fullPrice: 2399,
    leadroomAddon: "+€899 Leadroom Scaling",
    features: [
      "20 Reels / month",
      "Shooting + editing included",
      "Full strategy + A/B testing",
      "Up to 4 platforms",
      "Daily monitoring",
      "Dedicated Slack channel",
    ],
    glow: true,
  },
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
          <h2 className="section-title mb-4">Meta Ads Packages</h2>
          <p className="text-muted-foreground text-lg">
            Choose how far you want to go — content alone, or a complete system that runs your ads end-to-end.
          </p>
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
                  {m === "content" ? "Content Only" : "Full System"}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {packages.map((pkg, idx) => {
            const price = mode === "content" ? pkg.contentPrice : pkg.fullPrice;
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
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Name */}
                <h3 className="font-display text-3xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{pkg.tagline}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="font-display text-4xl sm:text-5xl font-bold text-primary leading-none">
                    <AnimatedPrice value={price} />
                    <span className="text-base text-muted-foreground font-normal ml-1.5">/month</span>
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
                  {pkg.features.map((f) => (
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
                  Request Package
                </MagneticButton>
              </motion.div>
            );
          })}
        </div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 max-w-2xl mx-auto text-center space-y-3"
        >
          <p className="text-xs text-muted-foreground/80 leading-relaxed">
            All prices exclude VAT. Filming in Munich included. Outside Munich +€100. Videographer paid by client. 3-month minimum term.
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            <span className="text-primary font-medium">Leadroom</span> manages your ad campaigns. <span className="text-primary font-medium">ELEDEN</span> produces your content. Together — one system.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MetaAdsPackages;