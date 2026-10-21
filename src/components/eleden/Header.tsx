import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/eleden.media/",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      )
    },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-surface/80 backdrop-blur-xl border-b border-white/[0.06]" 
            : "bg-transparent"
        }`}
      >
        {/* Champagne line on scroll */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-3">
            {/* Logo */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!isHomePage) {
                  window.location.href = "/";
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="font-display text-lg md:text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors duration-300"
            >
              ELEDEN
            </motion.button>

            {/* Navigation */}
            <nav className="flex items-center gap-3 md:gap-6">
              {/* Social Icons - Desktop only */}
              <div className="hidden md:flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-5 bg-white/10" />

              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-6 text-sm">
                <NavLink onClick={() => scrollToSection("work")}>{t("nav.work")}</NavLink>
                <NavLink onClick={() => scrollToSection("services")}>{t("nav.services")}</NavLink>
                <NavPageLink to="/about">{t("nav.about")}</NavPageLink>
                <NavPageLink to="/faq">{t("nav.faq")}</NavPageLink>
                <NavPageLink to="/calculator">{t("nav.calculator")}</NavPageLink>
                <NavLink onClick={() => scrollToSection("contact")}>{t("nav.contact")}</NavLink>
              </div>

              {/* Language Switcher */}
              <div className="hidden md:flex items-center gap-1 text-sm">
                {(["EN", "DE", "UA"] as Language[]).map((lang, index) => (
                  <div key={lang} className="flex items-center">
                    <motion.button
                      onClick={() => setLanguage(lang)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-2 py-1 rounded-md transition-all duration-300 relative ${
                        language === lang
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {language === lang && (
                        <motion.div
                          layoutId="languageIndicator"
                          className="absolute inset-0 bg-primary/10 rounded-md border border-primary/20"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                        />
                      )}
                      <span className="relative z-10">{lang}</span>
                    </motion.button>
                    {index < 2 && (
                      <span className="text-muted-foreground/30 mx-1">|</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-surface/40 backdrop-blur-xl hover:border-primary/40 transition-colors"
              >
                <span className="sr-only">Menu</span>
                <span className="relative w-4 h-3 flex flex-col justify-between">
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="block h-px w-full bg-foreground origin-center"
                  />
                  <motion.span
                    animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="block h-px w-full bg-foreground"
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="block h-px w-full bg-foreground origin-center"
                  />
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile dropdown panel */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuOpen(false)}
                className="md:hidden fixed inset-0 top-16 bg-background/60 backdrop-blur-sm z-40"
              />
              <motion.div
                initial={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden absolute top-full left-3 right-3 mt-2 z-50 origin-top"
              >
                <div className="rounded-2xl border border-white/[0.08] bg-surface/95 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden">
                  {/* Top hairline */}
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                  <nav className="p-2">
                    {[
                      { id: "work", label: t("nav.work"), page: null },
                      { id: "services", label: t("nav.services"), page: null },
                      { id: "contact", label: t("nav.contact"), page: null },
                      { id: "about", label: t("nav.about"), page: "/about" },
                      { id: "faq", label: t("nav.faq"), page: "/faq" },
                      { id: "calculator", label: t("nav.calculator"), page: "/calculator" },
                    ].map((item, i) => (
                      item.page ? (
                        <motion.div key={item.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}>
                          <Link
                            to={item.page}
                            onClick={() => setMenuOpen(false)}
                            className="group w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-foreground/90 hover:bg-white/[0.04] hover:text-foreground transition-colors"
                          >
                            <span className="font-display text-lg tracking-tight">{item.label}</span>
                            <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors -translate-x-1 group-hover:translate-x-0 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: 0.05 + i * 0.05 }}
                          onClick={() => scrollToSection(item.id)}
                          className="group w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-foreground/90 hover:bg-white/[0.04] hover:text-foreground transition-colors"
                        >
                          <span className="font-display text-lg tracking-tight">{item.label}</span>
                          <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors -translate-x-1 group-hover:translate-x-0 duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.button>
                      )
                    ))}
                  </nav>

                  <div className="h-px bg-white/[0.06] mx-4" />

                  {/* Language switcher */}
                  <div className="px-4 py-4 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Language</span>
                    <div className="flex items-center gap-1">
                      {(["EN", "DE", "UA"] as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setLanguage(lang)}
                          className={`px-2.5 py-1 rounded-md text-xs transition-all ${
                            language === lang
                              ? "bg-primary/15 border border-primary/30 text-foreground"
                              : "border border-transparent text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.06] mx-4" />

                  {/* Socials */}
                  <div className="px-4 py-4 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Follow</span>
                    <div className="flex items-center gap-4">
                      {socialLinks.map((s) => (
                        <a
                          key={s.name}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label={s.name}
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

const NavLink = ({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className="relative text-[13px] md:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group whitespace-nowrap"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-px bg-primary origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%" }}
      />
    </motion.button>
  );
};

const NavPageLink = ({
  children,
  to
}: {
  children: React.ReactNode;
  to: string;
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative group"
    >
      <Link
        to={to}
        className="text-[13px] md:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 whitespace-nowrap"
      >
        {children}
      </Link>
      <motion.span
        className="absolute -bottom-1 left-0 h-px bg-primary origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ width: "100%" }}
      />
    </motion.div>
  );
};

export default Header;
