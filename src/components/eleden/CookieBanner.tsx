import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "eleden_cookie_consent_v1";
const ALLOWED_PATHS = ["/privacy", "/impressum"];

const CookieBanner = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const onLegalPage = ALLOWED_PATHS.includes(location.pathname);
  const showModal = visible && !onLegalPage;

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!showModal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showModal]);

  const persist = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, ts: new Date().toISOString(), v: 1 })
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-body"
        >
          {/* Page-blocking blurred backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-background/85"
          />

          {/* Centered modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg glass-elevated rounded-[18px] border border-white/[0.08] p-6 sm:p-8 shadow-2xl"
          >
            <h2
              id="cookie-title"
              className="font-display text-xl sm:text-2xl font-semibold text-foreground mb-3"
            >
              {t("cookies.title")}
            </h2>
            <p
              id="cookie-body"
              className="text-sm text-muted-foreground mb-3 leading-relaxed"
            >
              {t("cookies.body")}
            </p>
            <p className="text-xs text-muted-foreground/80 mb-6 leading-relaxed">
              {t("cookies.legal")}{" "}
              <a
                href="/privacy"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t("cookies.privacy")}
              </a>
              {" · "}
              <a
                href="/impressum"
                className="underline underline-offset-2 hover:text-foreground"
              >
                {t("cookies.impressum")}
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => persist("declined")}
                className="flex-1 px-4 py-3 rounded-full bg-surface border border-white/[0.08] text-sm text-foreground hover:border-white/20 transition-colors"
              >
                {t("cookies.decline")}
              </button>
              <button
                onClick={() => persist("accepted")}
                className="flex-1 px-4 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                {t("cookies.accept")}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;