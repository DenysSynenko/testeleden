import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/eleden/Header";
import Footer from "@/components/eleden/Footer";
import FloatingParticles from "@/components/eleden/FloatingParticles";
import ScrollToTop from "@/components/eleden/ScrollToTop";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "@/components/eleden/MagneticButton";

/* ─── Types ─── */
type Tab = "shoot" | "monthly";

/* ─── Shoot day packages ─── */
const SHOOT_PACKAGES = [
  { id: "single", label: "Single Day", price: 150, hours: 4, desc: "Half-day shoot, 1–2 deliverables" },
  { id: "mini",   label: "Mini Pack",  price: 700, hours: null, desc: "3 shoot days + editing included" },
  { id: "standard", label: "Standard", price: 1050, hours: null, desc: "5 shoot days + editing + strategy" },
  { id: "power",  label: "Power",      price: 1500, hours: null, desc: "8 shoot days + full production cycle" },
] as const;
type ShootId = typeof SHOOT_PACKAGES[number]["id"];

/* ─── Monthly packages ─── */
const MONTHLY_PACKAGES = [
  { id: "light",  label: "Light",  price: 1200, videos: 4,  smm: false, desc: "4 videos/mo, editing only" },
  { id: "growth", label: "Growth", price: 1800, videos: 8,  smm: true,  desc: "8 videos/mo + basic SMM" },
  { id: "pro",    label: "Pro",    price: 3000, videos: 16, smm: true,  desc: "16 videos/mo + full SMM strategy" },
] as const;
type MonthlyId = typeof MONTHLY_PACKAGES[number]["id"];

const SMM_ADDON = 400;

/* ─── Suggested monthly package based on video count ─── */
function suggestMonthly(videoCount: number): MonthlyId {
  if (videoCount <= 4)  return "light";
  if (videoCount <= 8)  return "growth";
  return "pro";
}

/* ─── Shoot days count helper ─── */
function calcShootDays(pkg: ShootId, extraHours: number): string {
  if (pkg === "single") return `~${Math.ceil((4 + extraHours) / 4)} day(s)`;
  if (pkg === "mini")     return "3 days";
  if (pkg === "standard") return "5 days";
  return "8 days";
}

/* ─── Small reusable UI ─── */
const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`relative px-5 py-2.5 text-sm rounded-xl transition-all duration-300 font-medium ${
      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {active && (
      <motion.span
        layoutId="tabIndicator"
        className="absolute inset-0 bg-surface-elevated border border-white/[0.08] rounded-xl"
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      />
    )}
    <span className="relative z-10">{children}</span>
  </button>
);

const PkgCard = ({
  label, price, desc, selected, onClick, badge
}: {
  label: string; price: number; desc: string; selected: boolean; onClick: () => void; badge?: string;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full text-left rounded-2xl border p-4 transition-all duration-300 ${
      selected
        ? "border-primary/60 bg-primary/5"
        : "border-white/[0.06] bg-surface hover:border-white/[0.14]"
    }`}
  >
    <div className="flex items-start justify-between gap-2">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-display font-semibold text-sm text-foreground">{label}</span>
          {badge && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">{badge}</span>}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <div className={`font-display font-bold text-base ${selected ? "text-primary" : "text-foreground"}`}>
          €{price.toLocaleString()}
        </div>
      </div>
    </div>
    <div className={`mt-2 h-0.5 rounded-full transition-all duration-300 ${selected ? "bg-primary/40" : "bg-transparent"}`} />
  </motion.button>
);

const Stepper = ({
  value, min, max, step = 1, onChange, label, unit
}: {
  value: number; min: number; max: number; step?: number; onChange: (v: number) => void; label: string; unit?: string;
}) => (
  <div className="flex items-center justify-between gap-4 py-3 border-b border-white/[0.06] last:border-0">
    <span className="text-sm text-muted-foreground flex-1">{label}</span>
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(min, value - step))}
        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
      >
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="6" x2="11" y2="6" /></svg>
      </button>
      <span className="w-16 text-center font-display font-semibold text-sm text-foreground">
        {value}{unit ? ` ${unit}` : ""}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + step))}
        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
      >
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="6" y1="1" x2="6" y2="11" /><line x1="1" y1="6" x2="11" y2="6" /></svg>
      </button>
    </div>
  </div>
);

/* ─── Main component ─── */
const Calculator = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("monthly");

  // Shoot tab state
  const [shootPkg, setShootPkg] = useState<ShootId>("mini");
  const [extraHours, setExtraHours] = useState(0);

  // Monthly tab state
  const [videoCount, setVideoCount] = useState(8);
  const [smmAddon, setSmmAddon] = useState(false);

  const suggestedMonthly = useMemo(() => suggestMonthly(videoCount), [videoCount]);
  const [monthlyPkg, setMonthlyPkg] = useState<MonthlyId>(suggestedMonthly);

  // Auto-suggest package when video count changes
  const handleVideoCount = (v: number) => {
    setVideoCount(v);
    setMonthlyPkg(suggestMonthly(v));
  };

  // Totals
  const shootTotal = useMemo(() => {
    const pkg = SHOOT_PACKAGES.find((p) => p.id === shootPkg)!;
    const hourExtra = shootPkg === "single" ? extraHours * 100 : 0;
    return pkg.price + hourExtra;
  }, [shootPkg, extraHours]);

  const monthlyTotal = useMemo(() => {
    const pkg = MONTHLY_PACKAGES.find((p) => p.id === monthlyPkg)!;
    return pkg.price + (smmAddon && !pkg.smm ? SMM_ADDON : 0);
  }, [monthlyPkg, smmAddon]);

  const total = tab === "shoot" ? shootTotal : monthlyTotal;
  const selectedShoot = SHOOT_PACKAGES.find((p) => p.id === shootPkg)!;
  const selectedMonthly = MONTHLY_PACKAGES.find((p) => p.id === monthlyPkg)!;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="noise-overlay" />
      <FloatingParticles />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-glow-mint opacity-6 rounded-full blur-3xl" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <span className="badge-primary inline-flex items-center gap-1.5 text-xs px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t("nav.calculator")}
              </span>
              <h1 className="section-title mb-4">Price Calculator</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Build your package in real time. Mix options and see the total instantly.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Calculator */}
        <section className="pb-28">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

              {/* Left panel */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-3 flex flex-col gap-6"
              >
                {/* Tab switcher */}
                <div className="premium-card rounded-2xl p-1.5 inline-flex gap-1 self-start">
                  <TabButton active={tab === "monthly"} onClick={() => setTab("monthly")}>Monthly</TabButton>
                  <TabButton active={tab === "shoot"} onClick={() => setTab("shoot")}>Shoot Days</TabButton>
                </div>

                <AnimatePresence mode="wait">
                  {tab === "monthly" && (
                    <motion.div
                      key="monthly"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col gap-4"
                    >
                      {/* Video count input */}
                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-4">How many videos per month?</h3>
                        <Stepper
                          label="Videos per month"
                          value={videoCount}
                          min={1}
                          max={30}
                          onChange={handleVideoCount}
                          unit="videos"
                        />
                        <p className="text-xs text-muted-foreground mt-3">
                          Based on your input, we suggest: <span className="text-primary font-semibold">{selectedMonthly.label}</span>
                        </p>
                      </div>

                      {/* Package cards */}
                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-4">Choose your monthly plan</h3>
                        <div className="flex flex-col gap-3">
                          {MONTHLY_PACKAGES.map((pkg) => (
                            <PkgCard
                              key={pkg.id}
                              label={pkg.label}
                              price={pkg.price}
                              desc={pkg.desc}
                              selected={monthlyPkg === pkg.id}
                              onClick={() => setMonthlyPkg(pkg.id)}
                              badge={suggestedMonthly === pkg.id ? "Suggested" : undefined}
                            />
                          ))}
                        </div>
                      </div>

                      {/* SMM addon */}
                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-4">Add-ons</h3>
                        <button
                          onClick={() => setSmmAddon((v) => !v)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
                            smmAddon || selectedMonthly.smm
                              ? "border-primary/50 bg-primary/5"
                              : "border-white/[0.06] hover:border-white/[0.14]"
                          }`}
                          disabled={selectedMonthly.smm}
                        >
                          <div className="text-left">
                            <div className="text-sm font-semibold text-foreground">SMM Management</div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {selectedMonthly.smm ? "Included in your plan" : "Community + posting schedule"}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {!selectedMonthly.smm && (
                              <span className="text-sm font-display text-muted-foreground">+€{SMM_ADDON}</span>
                            )}
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              smmAddon || selectedMonthly.smm ? "bg-primary border-primary" : "border-white/20"
                            }`}>
                              {(smmAddon || selectedMonthly.smm) && (
                                <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="2 6 5 9 10 3" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {tab === "shoot" && (
                    <motion.div
                      key="shoot"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35 }}
                      className="flex flex-col gap-4"
                    >
                      {/* Package cards */}
                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-4">Choose a shoot package</h3>
                        <div className="flex flex-col gap-3">
                          {SHOOT_PACKAGES.map((pkg) => (
                            <PkgCard
                              key={pkg.id}
                              label={pkg.label}
                              price={pkg.price}
                              desc={pkg.desc}
                              selected={shootPkg === pkg.id}
                              onClick={() => { setShootPkg(pkg.id); setExtraHours(0); }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Extra hours (only for Single day) */}
                      <AnimatePresence>
                        {shootPkg === "single" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="premium-card rounded-2xl p-5">
                              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Extra hours</h3>
                              <Stepper
                                label="Additional hours (+€100/h)"
                                value={extraHours}
                                min={0}
                                max={8}
                                onChange={setExtraHours}
                                unit="h"
                              />
                              <p className="text-xs text-muted-foreground mt-3">
                                Shoot duration: <span className="text-foreground">{calcShootDays(shootPkg, extraHours)}</span>
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Right panel — live total */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-2 lg:sticky lg:top-28 flex flex-col gap-4"
              >
                <div className="premium-card rounded-3xl p-6 border border-white/[0.06]">
                  {/* Glow accent */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-glow-mint opacity-10 rounded-full blur-2xl pointer-events-none" />

                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">Your estimate</div>

                  {/* Package summary */}
                  <div className="flex flex-col gap-2 mb-5 text-sm">
                    {tab === "monthly" ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">{selectedMonthly.label} plan</span>
                          <span className="text-foreground font-medium">€{selectedMonthly.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Videos / month</span>
                          <span className="text-foreground font-medium">{selectedMonthly.videos}</span>
                        </div>
                        {(smmAddon && !selectedMonthly.smm) && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">SMM addon</span>
                            <span className="text-foreground font-medium">+€{SMM_ADDON}</span>
                          </div>
                        )}
                        {selectedMonthly.smm && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">SMM</span>
                            <span className="text-primary text-xs font-medium">Included</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">{selectedShoot.label}</span>
                          <span className="text-foreground font-medium">€{selectedShoot.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Shoot days</span>
                          <span className="text-foreground font-medium">{calcShootDays(shootPkg, extraHours)}</span>
                        </div>
                        {shootPkg === "single" && extraHours > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Extra hours ({extraHours}h)</span>
                            <span className="text-foreground font-medium">+€{extraHours * 100}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/[0.06] mb-5" />

                  {/* Total */}
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={total}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="font-display font-bold text-3xl text-primary"
                      >
                        €{total.toLocaleString()}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  {tab === "monthly" && (
                    <p className="text-xs text-muted-foreground mb-6">per month</p>
                  )}
                  {tab === "shoot" && (
                    <p className="text-xs text-muted-foreground mb-6">one-time</p>
                  )}

                  {/* CTA */}
                  <Link to="/#contact" className="block">
                    <MagneticButton variant="ghost" className="w-full justify-center text-sm">
                      Request this package →
                    </MagneticButton>
                  </Link>

                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Final pricing discussed individually
                  </p>
                </div>

                {/* FAQ link */}
                <div className="text-center">
                  <Link to="/faq" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Have questions? Check FAQ →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Calculator;
