import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/eleden/Header";
import Footer from "@/components/eleden/Footer";
import FloatingParticles from "@/components/eleden/FloatingParticles";
import ScrollToTop from "@/components/eleden/ScrollToTop";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "@/components/eleden/MagneticButton";

/* ─── Prices ─── */
const PRICE_VIDEO   = 150;   // editing only, per reel
const PRICE_HOUR    = 100;   // shooting per hour
const PRICE_STORIES = 75;    // pack of 5 stories
const PRICE_SMM: Record<string, number> = { none: 0, basic: 350, plus: 600, pro: 950 };

/* ─── Monthly packages ─── */
const MONTHLY = [
  { id: "light",  label: "Light",  price: 1200, videos: 8,  freq: "2 / week" },
  { id: "growth", label: "Growth", price: 1800, videos: 12, freq: "3 / week" },
  { id: "pro",    label: "Pro",    price: 3000, videos: 20, freq: "5 / week" },
] as const;
type MonthlyId = typeof MONTHLY[number]["id"];

/* ─── Shoot-day packages ─── */
const SHOOT_DAYS = [
  { id: "single",   label: "Single Video", price: 150,  hours: "up to 2h", desc: "One location, one shoot." },
  { id: "mini",     label: "Mini Day",     price: 700,  hours: "4h",        desc: "Short session, one location." },
  { id: "standard", label: "Standard Day", price: 1050, hours: "6h",        desc: "Full shoot day. Most popular." },
  { id: "power",    label: "Power Day",    price: 1500, hours: "8h+",       desc: "Extended day. Maximum output." },
] as const;
type ShootId = typeof SHOOT_DAYS[number]["id"];

/* ─── SMM options ─── */
const SMM_OPTIONS = [
  { id: "none",  label: "No SMM",    desc: "—",                                  price: 0   },
  { id: "basic", label: "SMM Basic", desc: "8 posts, 1 platform",                price: 350 },
  { id: "plus",  label: "SMM Plus",  desc: "12 posts, 2 platforms + DM replies", price: 600 },
  { id: "pro",   label: "SMM Pro",   desc: "Daily management, 8 stories, 3 ch.", price: 950 },
] as const;
type SmmId = "none" | "basic" | "plus" | "pro";

function suggestMonthly(v: number): MonthlyId {
  if (v <= 8)  return "light";
  if (v <= 12) return "growth";
  return "pro";
}

/* ─── Small UI components ─── */
const TabBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className={`relative px-5 py-2.5 text-sm rounded-xl transition-all duration-300 font-medium ${
      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {active && (
      <motion.span
        layoutId="calcTab"
        className="absolute inset-0 bg-surface-elevated border border-white/[0.08] rounded-xl"
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      />
    )}
    <span className="relative z-10">{children}</span>
  </button>
);

const Stepper = ({
  value, min, max, onChange, label, unit, note
}: {
  value: number; min: number; max: number;
  onChange: (v: number) => void; label: string; unit?: string; note?: string;
}) => (
  <div className="flex items-center justify-between gap-4 py-3.5 border-b border-white/[0.05] last:border-0">
    <div className="flex-1 min-w-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      {note && <p className="text-xs text-muted-foreground/50 mt-0.5">{note}</p>}
    </div>
    <div className="flex items-center gap-2.5 flex-shrink-0">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
      >
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="2" y1="6" x2="10" y2="6" /></svg>
      </button>
      <span className="w-14 text-center font-display font-semibold text-sm text-foreground">
        {value}{unit ? ` ${unit}` : ""}
      </span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
      >
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="2" x2="6" y2="10" /><line x1="2" y1="6" x2="10" y2="6" /></svg>
      </button>
    </div>
  </div>
);

const PkgCard = ({
  label, price, sub, selected, onClick, badge
}: {
  label: string; price: string; sub: string; selected: boolean; onClick: () => void; badge?: string;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={`w-full text-left rounded-2xl border p-4 transition-all duration-300 ${
      selected ? "border-primary/60 bg-primary/5" : "border-white/[0.06] bg-surface hover:border-white/[0.14]"
    }`}
  >
    <div className="flex items-start justify-between gap-2">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-display font-semibold text-sm text-foreground">{label}</span>
          {badge && <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30">{badge}</span>}
        </div>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
      <div className={`font-display font-bold text-sm flex-shrink-0 ${selected ? "text-primary" : "text-foreground"}`}>
        {price}
      </div>
    </div>
    <div className={`mt-2 h-px transition-all duration-300 ${selected ? "bg-primary/30" : "bg-transparent"}`} />
  </motion.button>
);

const SmmSelector = ({ value, onChange }: { value: SmmId; onChange: (v: SmmId) => void }) => (
  <div className="grid grid-cols-2 gap-2">
    {SMM_OPTIONS.map((opt) => (
      <button
        key={opt.id}
        onClick={() => onChange(opt.id as SmmId)}
        className={`text-left rounded-xl border p-3 transition-all duration-300 ${
          value === opt.id ? "border-primary/60 bg-primary/5" : "border-white/[0.06] hover:border-white/[0.14]"
        }`}
      >
        <div className={`text-xs font-semibold mb-0.5 ${value === opt.id ? "text-primary" : "text-foreground"}`}>{opt.label}</div>
        <div className="text-[10px] text-muted-foreground leading-snug">{opt.desc}</div>
        {opt.price > 0 && (
          <div className="text-xs font-display font-bold text-foreground mt-1">+€{opt.price}</div>
        )}
      </button>
    ))}
  </div>
);

/* ─── Line item ─── */
const Line = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className={highlight ? "text-primary text-xs font-medium" : "text-foreground font-medium"}>{value}</span>
  </div>
);

/* ─── Main ─── */
type Tab = "custom" | "monthly" | "shoot";

const Calculator = () => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("custom");

  /* Custom tab */
  const [videos,      setVideos]    = useState(0);
  const [shootHours,  setShootHours] = useState(0);
  const [storyPacks,  setStoryPacks] = useState(0);
  const [customSmm,   setCustomSmm]  = useState<SmmId>("none");

  /* Monthly tab */
  const [monthVideos, setMonthVideos] = useState(8);
  const [monthPkg,    setMonthPkg]    = useState<MonthlyId>("light");
  const [monthStories, setMonthStories] = useState(0);
  const [monthSmm,    setMonthSmm]    = useState<SmmId>("none");

  /* Shoot tab */
  const [shootPkg,    setShootPkg]   = useState<ShootId>("standard");
  const [extraHours,  setExtraHours] = useState(0);

  const handleMonthVideos = (v: number) => {
    setMonthVideos(v);
    setMonthPkg(suggestMonthly(v));
  };

  /* Totals */
  const customTotal = useMemo(() =>
    videos * PRICE_VIDEO
    + shootHours * PRICE_HOUR
    + storyPacks * PRICE_STORIES
    + PRICE_SMM[customSmm],
    [videos, shootHours, storyPacks, customSmm]
  );

  const monthlyTotal = useMemo(() => {
    const pkg = MONTHLY.find((p) => p.id === monthPkg)!;
    return pkg.price + monthStories * PRICE_STORIES + PRICE_SMM[monthSmm];
  }, [monthPkg, monthStories, monthSmm]);

  const shootTotal = useMemo(() => {
    const pkg = SHOOT_DAYS.find((p) => p.id === shootPkg)!;
    return pkg.price + (shootPkg === "single" ? extraHours * PRICE_HOUR : 0);
  }, [shootPkg, extraHours]);

  const total = tab === "custom" ? customTotal : tab === "monthly" ? monthlyTotal : shootTotal;
  const selectedMonth = MONTHLY.find((p) => p.id === monthPkg)!;
  const selectedShoot = SHOOT_DAYS.find((p) => p.id === shootPkg)!;

  /* Smart suggestion for custom tab */
  const customSuggestion = useMemo(() => {
    if (tab !== "custom" || customTotal === 0) return null;
    if (customTotal >= 2400 && customSmm !== "none") return { label: "Growth Bundle", price: 2400 };
    if (customTotal >= 1550 && customSmm !== "none") return { label: "Start Bundle", price: 1550 };
    if (customTotal >= 1050) return { label: "Standard Day", price: 1050 };
    if (customTotal >= 700)  return { label: "Mini Day", price: 700 };
    return null;
  }, [tab, customTotal, customSmm]);

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
                Build your package piece by piece — or pick a ready plan. Price updates in real time.
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
                className="lg:col-span-3 flex flex-col gap-5"
              >
                {/* Tab switcher */}
                <div className="premium-card rounded-2xl p-1.5 inline-flex gap-1 self-start">
                  <TabBtn active={tab === "custom"}  onClick={() => setTab("custom")}>Custom</TabBtn>
                  <TabBtn active={tab === "monthly"} onClick={() => setTab("monthly")}>Monthly</TabBtn>
                  <TabBtn active={tab === "shoot"}   onClick={() => setTab("shoot")}>Shoot Day</TabBtn>
                </div>

                <AnimatePresence mode="wait">

                  {/* ── CUSTOM TAB ── */}
                  {tab === "custom" && (
                    <motion.div key="custom" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4">

                      {/* Content */}
                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-1">Content</h3>
                        <p className="text-xs text-muted-foreground mb-4">Add what you need — mix and match freely.</p>
                        <Stepper
                          label="Reels / Short videos"
                          note="Editing only — you provide the footage"
                          value={videos} min={0} max={30}
                          onChange={setVideos}
                          unit={videos === 1 ? "video" : "videos"}
                        />
                        <Stepper
                          label="Shooting hours"
                          note="Filming without editing — €100 / hour"
                          value={shootHours} min={0} max={16}
                          onChange={setShootHours}
                          unit="h"
                        />
                        <Stepper
                          label="Stories packs"
                          note="Pack of 5 Stories — concept + edit"
                          value={storyPacks} min={0} max={20}
                          onChange={setStoryPacks}
                          unit={storyPacks === 1 ? "pack" : "packs"}
                        />
                      </div>

                      {/* SMM */}
                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-1">SMM Management</h3>
                        <p className="text-xs text-muted-foreground mb-4">Add social media management on top of your content.</p>
                        <SmmSelector value={customSmm} onChange={setCustomSmm} />
                      </div>

                      {/* Smart suggestion */}
                      <AnimatePresence>
                        {customSuggestion && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm">
                              <span className="text-muted-foreground">💡 Your build is close to </span>
                              <span className="text-primary font-semibold">{customSuggestion.label}</span>
                              <span className="text-muted-foreground"> (€{customSuggestion.price}) — might be more cost-effective.</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* ── MONTHLY TAB ── */}
                  {tab === "monthly" && (
                    <motion.div key="monthly" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4">

                      {/* Video count */}
                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-4">How many videos per month?</h3>
                        <Stepper
                          label="Videos / month"
                          value={monthVideos} min={1} max={30}
                          onChange={handleMonthVideos}
                          unit="videos"
                        />
                        <p className="text-xs text-muted-foreground mt-3">
                          Suggested: <span className="text-primary font-semibold">{selectedMonth.label} ({selectedMonth.freq})</span>
                        </p>
                      </div>

                      {/* Monthly packages */}
                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-4">Monthly plan</h3>
                        <div className="flex flex-col gap-3">
                          {MONTHLY.map((pkg) => (
                            <PkgCard
                              key={pkg.id}
                              label={pkg.label}
                              price={`€${pkg.price.toLocaleString()} / mo`}
                              sub={`${pkg.videos} videos — ${pkg.freq}`}
                              selected={monthPkg === pkg.id}
                              onClick={() => setMonthPkg(pkg.id)}
                              badge={suggestMonthly(monthVideos) === pkg.id ? "Suggested" : undefined}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Stories addon */}
                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-4">Add Stories</h3>
                        <Stepper
                          label="Stories packs / month"
                          note="Pack of 5 Stories — +€75 each"
                          value={monthStories} min={0} max={20}
                          onChange={setMonthStories}
                          unit={monthStories === 1 ? "pack" : "packs"}
                        />
                      </div>

                      {/* SMM */}
                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-4">SMM Management</h3>
                        <SmmSelector value={monthSmm} onChange={setMonthSmm} />
                      </div>
                    </motion.div>
                  )}

                  {/* ── SHOOT DAY TAB ── */}
                  {tab === "shoot" && (
                    <motion.div key="shoot" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4">

                      <div className="premium-card rounded-2xl p-5">
                        <h3 className="font-display font-semibold text-sm text-foreground mb-4">Choose a shoot package</h3>
                        <div className="flex flex-col gap-3">
                          {SHOOT_DAYS.map((pkg) => (
                            <PkgCard
                              key={pkg.id}
                              label={pkg.label}
                              price={`€${pkg.price.toLocaleString()}`}
                              sub={`${pkg.hours} — ${pkg.desc}`}
                              selected={shootPkg === pkg.id}
                              onClick={() => { setShootPkg(pkg.id); setExtraHours(0); }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Extra hours — only for Single */}
                      <AnimatePresence>
                        {shootPkg === "single" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="premium-card rounded-2xl p-5">
                              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Extra shooting hours</h3>
                              <Stepper
                                label="Additional hours"
                                note="+€100 / hour"
                                value={extraHours} min={0} max={8}
                                onChange={setExtraHours}
                                unit="h"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Shooting-only note */}
                      <div className="rounded-2xl border border-white/[0.05] p-4 text-sm text-muted-foreground">
                        Need filming only (no editing)?{" "}
                        <span className="text-foreground font-medium">€100 / hour</span>
                        {" "}— switch to <button onClick={() => setTab("custom")} className="text-primary underline underline-offset-2">Custom</button> and adjust.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ── RIGHT PANEL — live total ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-2 lg:sticky lg:top-28 flex flex-col gap-4"
              >
                <div className="relative premium-card rounded-3xl p-6 border border-white/[0.06]">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-glow-mint opacity-10 rounded-full blur-2xl pointer-events-none" />

                  <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">Your estimate</div>

                  {/* Line items */}
                  <div className="flex flex-col gap-2.5 mb-5">
                    {tab === "custom" && (
                      <>
                        {videos > 0     && <Line label={`${videos} video${videos > 1 ? "s" : ""} (editing)`}  value={`€${(videos * PRICE_VIDEO).toLocaleString()}`} />}
                        {shootHours > 0 && <Line label={`Shooting — ${shootHours}h`}                          value={`€${(shootHours * PRICE_HOUR).toLocaleString()}`} />}
                        {storyPacks > 0 && <Line label={`Stories — ${storyPacks} pack${storyPacks > 1 ? "s" : ""} (×5)`} value={`€${(storyPacks * PRICE_STORIES).toLocaleString()}`} />}
                        {customSmm !== "none" && <Line label={SMM_OPTIONS.find(o => o.id === customSmm)!.label} value={`+€${PRICE_SMM[customSmm]}`} />}
                        {customTotal === 0 && <p className="text-xs text-muted-foreground">Add items above to see your estimate.</p>}
                      </>
                    )}
                    {tab === "monthly" && (
                      <>
                        <Line label={`${selectedMonth.label} plan (${selectedMonth.videos} videos)`} value={`€${selectedMonth.price.toLocaleString()}`} />
                        {monthStories > 0 && <Line label={`Stories — ${monthStories} pack${monthStories > 1 ? "s" : ""}`} value={`+€${(monthStories * PRICE_STORIES).toLocaleString()}`} />}
                        {monthSmm !== "none" && <Line label={SMM_OPTIONS.find(o => o.id === monthSmm)!.label} value={`+€${PRICE_SMM[monthSmm]}`} />}
                      </>
                    )}
                    {tab === "shoot" && (
                      <>
                        <Line label={`${selectedShoot.label} (${selectedShoot.hours})`} value={`€${selectedShoot.price.toLocaleString()}`} />
                        {shootPkg === "single" && extraHours > 0 && <Line label={`Extra shooting — ${extraHours}h`} value={`+€${(extraHours * PRICE_HOUR).toLocaleString()}`} />}
                      </>
                    )}
                  </div>

                  <div className="h-px bg-white/[0.06] mb-5" />

                  {/* Total */}
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={total}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.25 }}
                        className="font-display font-bold text-3xl text-primary"
                      >
                        €{total.toLocaleString()}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">
                    {tab === "monthly" ? "per month, excl. VAT" : "one-time, excl. VAT"}
                  </p>

                  <Link to="/#contact" className="block">
                    <MagneticButton variant="ghost" className="w-full justify-center text-sm">
                      Request this package
                    </MagneticButton>
                  </Link>

                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Final pricing discussed individually
                  </p>
                </div>

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
