import { motion } from "framer-motion";
import Header from "@/components/eleden/Header";
import Footer from "@/components/eleden/Footer";
import FloatingParticles from "@/components/eleden/FloatingParticles";
import ScrollToTop from "@/components/eleden/ScrollToTop";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "@/components/eleden/MagneticButton";
import { useNavigate } from "react-router-dom";

const About = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="noise-overlay" />
      <FloatingParticles />
      <Header />

      <main>

        {/* ── ELEDEN MEDIA SECTION ── */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-glow-mint opacity-5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="badge-primary inline-flex items-center gap-1.5 text-xs px-3 py-1 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {t("about.agencyBadge")}
                </span>

                <h1 className="section-title mb-6 leading-tight">
                  {t("about.agencyHeadline")}
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed mb-5 max-w-2xl">
                  {t("about.agencyLead")}
                </p>

                <p className="text-base text-muted-foreground leading-relaxed mb-5 max-w-2xl">
                  {t("about.agencyBody")}
                </p>

              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-10 mt-12"
              >
                {[
                  { label: t("about.stat1Label"), sub: t("about.stat1Sub") },
                  { label: t("about.stat2Label"), sub: t("about.stat2Sub") },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-display text-xl font-semibold text-foreground">
                      {stat.label}
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {stat.sub}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FOUNDER SECTION ── */}
        <section className="py-20 pb-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* Photo column */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="lg:sticky lg:top-28"
              >
                {/* Photo placeholder */}
                <div className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-sm">
                  <div className="absolute inset-0 premium-card flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                        <svg className="w-9 h-9 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <p className="text-sm text-muted-foreground/50 font-medium">
                        {t("about.photoPlaceholder")}
                      </p>
                    </div>
                  </div>
                  {/* subtle gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
              </motion.div>

              {/* Text column */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2"
              >
                <span className="badge-primary inline-flex items-center gap-1.5 text-xs px-3 py-1 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {t("about.founderBadge")}
                </span>

                <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-8 leading-snug">
                  {t("about.headline")}
                </h2>

                <div className="space-y-5 text-muted-foreground leading-relaxed">
                  <p>{t("about.p1")}</p>
                  <p>{t("about.p2")}</p>
                  <p>{t("about.p3")}</p>
                  <p>{t("about.p4")}</p>
                </div>

                <p className="mt-8 text-base text-foreground font-medium">
                  {t("about.closing")}
                </p>

                <div className="mt-8">
                  <MagneticButton
                    variant="primary"
                    onClick={() => navigate("/#contact")}
                  >
                    {t("hero.cta")}
                  </MagneticButton>
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

export default About;
