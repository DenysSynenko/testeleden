import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/eleden/Header";
import Footer from "@/components/eleden/Footer";
import FloatingParticles from "@/components/eleden/FloatingParticles";
import ScrollToTop from "@/components/eleden/ScrollToTop";
import { useLanguage } from "@/contexts/LanguageContext";
import MagneticButton from "@/components/eleden/MagneticButton";

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="border-b border-white/[0.06] last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-[15px] md:text-base text-foreground group-hover:text-primary transition-colors duration-300 pr-8">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors duration-300"
        >
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="1" x2="6" y2="11" />
            <line x1="1" y1="6" x2="11" y2="6" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm leading-relaxed pb-6 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const { t } = useLanguage();

  const items = Array.from({ length: 7 }, (_, i) => ({
    q: t(`faq.q${i + 1}`),
    a: t(`faq.a${i + 1}`),
  }));

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="noise-overlay" />
      <FloatingParticles />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-glow-mint opacity-6 rounded-full blur-3xl" />
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
                {t("nav.faq")}
              </span>
              <h1 className="section-title mb-4">{t("faq.title")}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Everything you might want to know before working with us.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ list */}
        <section className="py-16 pb-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="premium-card rounded-3xl p-6 md:p-10">
              {items.map((item, i) => (
                <FAQItem key={i} index={i} question={item.q} answer={item.a} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <p className="text-muted-foreground mb-5 text-sm">Still have questions? We reply within 24–48 hours.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/#contact">
                  <MagneticButton variant="ghost" className="text-sm">
                    Send a message →
                  </MagneticButton>
                </Link>
                <Link to="/calculator" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Calculate your package →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default FAQ;
