import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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

  const scrollToSection = (id: string) => {
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
    { 
      name: "TikTok", 
      url: "https://www.tiktok.com/@de.synenko?_r=1&_t=ZG-93gzwE0wwz2",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      )
    },
    { 
      name: "YouTube", 
      url: "https://youtube.com/@denyssynenko?si=5YAiNACsPNu_lrTy",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
          <div className="flex items-center justify-between h-20">
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
              className="font-display text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors duration-300"
            >
              ELEDEN
            </motion.button>

            {/* Navigation */}
            <nav className="flex items-center gap-6">
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
              <div className="hidden md:flex items-center gap-8">
                <NavLink onClick={() => scrollToSection("work")}>{t("nav.work")}</NavLink>
                <NavLink onClick={() => scrollToSection("services")}>{t("nav.services")}</NavLink>
                <NavLink onClick={() => scrollToSection("contact")}>{t("nav.contact")}</NavLink>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 text-sm">
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
            </nav>
          </div>
        </div>
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
      className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
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

export default Header;
