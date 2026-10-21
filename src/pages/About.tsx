import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/eleden/Header";
import Footer from "@/components/eleden/Footer";
import FloatingParticles from "@/components/eleden/FloatingParticles";
import ScrollToTop from "@/components/eleden/ScrollToTop";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "@/components/eleden/MagneticButton";

const About = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="noise-overlay" />
      <FloatingParticles />
      <Header />

      <main>
        {/* ── Hero banner ── */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <motion.div style={{ y: glowY }} className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-glow-mint opacity-8 rounded-full blur-3xl" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <span className="badge-primary inline-flex items-center gap-1.5 text-xs px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                {t("nav.about")}
              </span>
              <h1 className="section-title mb-6">{t("about.headline")}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                {t("about.p1")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── About Denys ── */}
        <section ref={containerRef} className="relative py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Photo placeholder */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-[24px] overflow-hidden bg-surface border border-white/[0.06] relative">
                  {/* Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                    {/* Portrait silhouette icon */}
                    <svg className="w-24 h-24 text-muted-foreground/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <p className="text-xs text-muted-foreground/30 text-center font-mono">Denys Synenko</p>
                  </div>
                  {/* Subtle gradient bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface/60 to-transparent" />
                </div>

                {/* Floating stat */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute -bottom-6 -right-6 premium-card px-5 py-4 rounded-2xl"
                >
                  <div className="text-2xl font-display font-bold text-primary mb-0.5">Munich</div>
                  <div className="text-xs text-muted-foreground">Based in Germany</div>
                </motion.div>
              </motion.div>

              {/* Text content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6 pt-4"
              >
                <div>
                  <h2 className="font-display text-3xl font-bold mb-2">Denys Synenko</h2>
                  <p className="text-primary text-sm font-medium">Founder · Content Creator · Filmmaker</p>
                </div>

                {[t("about.p2"), t("about.p3"), t("about.p4")].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {text}
                  </motion.p>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="premium-card rounded-2xl p-6 border-l-2 border-primary/40"
                >
                  <p className="text-foreground/90 leading-relaxed italic text-[15px]">
                    "{t("about.closing")}"
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Link to="/#contact">
                    <MagneticButton variant="ghost" className="text-sm">
                      Work together →
                    </MagneticButton>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── About Company ── */}
        <section className="relative py-24 overflow-hidden">
          {/* Background separator glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-glow-mint opacity-5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-14"
            >
              <span className="badge-primary inline-flex items-center gap-1.5 text-xs px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Agency
              </span>
              <h2 className="section-title mb-4">Denys Synenko Medienproduktion</h2>
              <p className="text-muted-foreground text-lg max-w-xl">
                Official media production agency registered in Munich, Germany.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4" />
                    </svg>
                  ),
                  title: "Registered Business",
                  body: "Operating as Einzelunternehmer (sole proprietor) under German commercial law. Fully registered in Munich.",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  title: "Full Production Cycle",
                  body: "Strategy → Concept → Shooting → Editing → Publishing. Every step handled in-house for maximum quality control.",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  title: "Munich Based · Worldwide",
                  body: "Locally rooted in Munich. Available for remote projects globally. Shooting organized across Europe.",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  ),
                  title: "Short-Form Specialists",
                  body: "Reels, TikToks, YouTube Shorts — vertical video built for platform algorithms and human attention spans.",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  title: "Founder-Led Quality",
                  body: "Every project is overseen directly by Denys. No junior handoffs — consistent creative direction from first call to delivery.",
                },
                {
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                    </svg>
                  ),
                  title: "Results-Focused",
                  body: "Content built around your business goals — brand awareness, leads, or community growth. We measure what matters.",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="premium-card rounded-2xl p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    {card.icon}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-14 flex flex-col sm:flex-row items-center gap-4"
            >
              <Link to="/#contact">
                <MagneticButton variant="ghost" className="text-sm">
                  Start a project →
                </MagneticButton>
              </Link>
              <Link to="/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Calculate your package →
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
