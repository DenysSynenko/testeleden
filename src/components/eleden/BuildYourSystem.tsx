import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

type PackageId = "spark" | "surge" | "storm";
type Mode = "content" | "full";

interface Pkg {
  id: PackageId;
  name: string;
  reels: string;
  price: number;
  features: string[];
  popular?: boolean;
  leadroom: {
    name: string;
    price: number;
    features: string[];
  };
}

const packages: Pkg[] = [
  {
    id: "spark",
    name: "Spark",
    reels: "5 Reels / month",
    price: 500,
    features: [
      "5 Reels / month",
      "Shooting + editing included",
      "Ad-focused scripting",
      "Basic strategy call",
    ],
    leadroom: {
      name: "Leadroom Starter",
      price: 499,
      features: [
        "1 platform",
        "Campaign setup",
        "Conversion tracking",
        "Weekly optimization",
        "Monthly reporting",
      ],
    },
  },
  {
    id: "surge",
    name: "Surge",
    reels: "10 Reels / month",
    price: 900,
    popular: true,
    features: [
      "10 Reels / month",
      "Shooting + editing included",
      "Full ad strategy + scripting",
      "A/B concept variations",
      "Weekly strategy call",
    ],
    leadroom: {
      name: "Leadroom Growth",
      price: 799,
      features: [
        "2 platforms (Meta + Google)",
        "Full-funnel strategy",
        "Server-side tracking (CAPI)",
        "Weekly optimization & calls",
        "Landing page recommendations",
      ],
    },
  },
  {
    id: "storm",
    name: "Storm",
    reels: "20 Reels / month",
    price: 1500,
    features: [
      "20 Reels / month",
      "Shooting + editing included",
      "Full strategy + A/B testing",
      "Daily content pipeline",
      "Dedicated strategy sessions",
    ],
    leadroom: {
      name: "Leadroom Scaling",
      price: 899,
      features: [
        "Up to 4 platforms",
        "Full-funnel + retention strategy",
        "Server-side tracking & GA4",
        "Daily monitoring & weekly calls",
        "CRO & landing page tests",
        "Live dashboard & Slack channel",
      ],
    },
  },
];

const useCountUp = (target: number, duration = 600) => {
  const [value, setValue] = useState(target);
  useEffect(() => {
    const start = value;
    const diff = target - start;
    if (diff === 0) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(start + diff * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
};

const StepIndicator = ({ step }: { step: number }) => (
  <div className="flex items-center justify-center gap-3 mb-12">
    {[1, 2, 3].map((n, i) => (
      <div key={n} className="flex items-center gap-3">
        <motion.div
          animate={{
            backgroundColor: step >= n ? "hsl(var(--primary))" : "hsla(0,0%,100%,0.06)",
            color: step >= n ? "hsl(var(--background))" : "hsl(var(--muted-foreground))",
            scale: step === n ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-9 h-9 rounded-full flex items-center justify-center font-display font-semibold text-sm border border-white/[0.08]"
        >
          {n}
        </motion.div>
        {i < 2 && (
          <div className="w-10 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              initial={false}
              animate={{ width: step > n ? "100%" : "0%" }}
              transition={{ duration: 0.4 }}
              className="absolute inset-y-0 left-0 bg-primary"
            />
          </div>
        )}
      </div>
    ))}
  </div>
);

const BuildYourSystem = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<PackageId | null>(null);
  const [mode, setMode] = useState<Mode>("full");

  const pkg = packages.find((p) => p.id === selected) || null;
  const total = pkg ? pkg.price + (mode === "full" ? pkg.leadroom.price : 0) : 0;
  const animatedTotal = useCountUp(total);

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-glow-mint opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 max-w-2xl mx-auto"
        >
          <h2 className="section-title mb-4">Build Your System</h2>
          <p className="text-muted-foreground text-lg">
            Three steps to your custom content & ads engine.
          </p>
        </motion.div>

        <StepIndicator step={step} />

        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-2xl text-center mb-8 text-foreground">
                Step 1 — Choose your content package
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map((p) => {
                  const isSelected = selected === p.id;
                  return (
                    <motion.button
                      key={p.id}
                      onClick={() => setSelected(p.id)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`relative text-left rounded-[18px] p-7 flex flex-col bg-surface-elevated border-2 transition-all duration-500 ${
                        isSelected
                          ? "border-primary shadow-[0_0_50px_-10px_hsl(var(--primary)/0.6)] animate-pulse-glow"
                          : "border-white/[0.08] hover:border-white/[0.18]"
                      }`}
                    >
                      {p.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="badge-primary flex items-center gap-1 whitespace-nowrap">
                            <Sparkles className="w-3 h-3" />
                            Most Popular
                          </span>
                        </div>
                      )}
                      <h4 className="font-display text-3xl font-bold mb-1">{p.name}</h4>
                      <p className="text-sm text-muted-foreground mb-5">{p.reels}</p>
                      <ul className="space-y-2.5 mb-6 flex-1">
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="font-display text-3xl font-bold text-primary">
                        €{p.price}
                        <span className="text-sm text-muted-foreground font-normal ml-1">/month</span>
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-background" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              <div className="flex justify-center mt-10">
                <MagneticButton
                  variant="primary"
                  onClick={() => selected && setStep(2)}
                  className={!selected ? "opacity-40 pointer-events-none" : ""}
                >
                  Continue
                </MagneticButton>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && pkg && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="font-display text-2xl text-center mb-8 text-foreground">
                Step 2 — Add Leadroom ad management?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {(["content", "full"] as Mode[]).map((m) => {
                  const isSel = mode === m;
                  const isRec = m === "full";
                  return (
                    <motion.button
                      key={m}
                      onClick={() => setMode(m)}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`relative text-left rounded-[18px] p-7 bg-surface-elevated border-2 transition-all duration-500 ${
                        isSel
                          ? "border-primary shadow-[0_0_50px_-10px_hsl(var(--primary)/0.6)] animate-pulse-glow"
                          : "border-white/[0.08] hover:border-white/[0.18]"
                      }`}
                    >
                      {isRec && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                          <span className="badge-primary whitespace-nowrap">Recommended</span>
                        </div>
                      )}
                      <h4 className="font-display text-2xl font-bold mb-2">
                        {m === "content" ? "Content Only" : "Content + Ads"}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {m === "content"
                          ? `${pkg.name} package only — your content engine.`
                          : `${pkg.name} + ${pkg.leadroom.name} — content & ad system.`}
                      </p>
                      {m === "full" && (
                        <ul className="space-y-2 mb-4">
                          {pkg.leadroom.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="font-display text-2xl font-bold text-primary">
                        €{m === "content" ? pkg.price : pkg.price + pkg.leadroom.price}
                        <span className="text-sm text-muted-foreground font-normal ml-1">/month</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              <div className="flex justify-center gap-4 mt-10">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                >
                  ← Back
                </button>
                <MagneticButton variant="primary" onClick={() => setStep(3)}>
                  See Summary
                </MagneticButton>
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && pkg && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="max-w-3xl mx-auto rounded-[20px] p-8 sm:p-10 bg-surface-elevated border-2 border-primary/40 shadow-[0_0_60px_-15px_hsl(var(--primary)/0.5)]">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-primary mb-2">Your System</p>
                    <h3 className="font-display text-4xl font-bold">
                      {pkg.name}
                      {mode === "full" && (
                        <span className="text-muted-foreground"> + {pkg.leadroom.name}</span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{pkg.reels}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-5xl font-bold text-primary leading-none">
                      €{animatedTotal.toLocaleString("en-US")}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">/month</p>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-6" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                  {[...pkg.features, ...(mode === "full" ? pkg.leadroom.features : [])].map((f) => (
                    <div key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs text-muted-foreground/80 leading-relaxed mb-7">
                  <p>
                    Filming in Munich included at no extra cost. Outside Munich +€100 for shoot
                    organization (videographer paid by client).
                  </p>
                  <p>All prices exclude VAT. 3-month minimum term.</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <MagneticButton variant="primary" onClick={scrollToContact}>
                    Request This Package
                  </MagneticButton>
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Start over
                  </button>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setStep(2)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                >
                  ← Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BuildYourSystem;