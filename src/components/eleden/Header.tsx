import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Language = "EN" | "DE" | "UA";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<Language>("EN");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
            />
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-display text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ELEDEN
            </motion.a>

            {/* Navigation */}
            <nav className="flex items-center gap-8">
              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-8">
                <NavLink onClick={() => scrollToSection("work")}>Work</NavLink>
                <NavLink onClick={() => scrollToSection("contact")}>Contact</NavLink>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 text-sm">
                {(["EN", "DE", "UA"] as Language[]).map((lang, index) => (
                  <div key={lang} className="flex items-center">
                    <button
                      onClick={() => setLanguage(lang)}
                      className={`px-2 py-1 rounded-md transition-all duration-300 ${
                        language === lang
                          ? "text-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                    {index < 2 && (
                      <span className="text-white/20 mx-1">|</span>
                    )}
                  </div>
                ))}
              </div>
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
      whileHover={{ y: -1 }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
    </motion.button>
  );
};

export default Header;
