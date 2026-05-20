import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "eleden_cookie_consent_v1";

const CookieBanner = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const id = window.setTimeout(() => setVisible(true), 800);
        return () => window.clearTimeout(id);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const persist = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[60] sm:left-6 sm:right-auto sm:max-w-md"
          role="dialog"
          aria-live="polite"
          aria-label={t("cookies.title")}
        >
          <div className="glass-elevated rounded-[18px] border border-white/[0.08] p-5 sm:p-6 shadow-2xl">
            <h2 className="font-display text-base font-semibold text-foreground mb-1">
              {t("cookies.title")}
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {t("cookies.body")}{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
                {t("cookies.privacy")}
              </a>
              .
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => persist("accepted")}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {t("cookies.accept")}
              </button>
              <button
                onClick={() => persist("declined")}
                className="px-4 py-2 rounded-full bg-surface border border-white/[0.08] text-sm text-foreground hover:border-white/20 transition-colors"
              >
                {t("cookies.decline")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;