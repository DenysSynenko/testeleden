import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-surface border-t border-white/[0.06]">
      {/* Champagne separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-display text-2xl font-bold mb-4">ELEDEN</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {t("footer.tagline")}
              </p>
              <p className="text-muted-foreground/60 text-sm">
                {t("footer.location")}
              </p>
            </motion.div>
          </div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm font-medium text-foreground mb-4">{t("footer.nav")}</h4>
            <ul className="space-y-3">
              <li>
                <FooterLink onClick={() => scrollToSection("work")}>{t("nav.work")}</FooterLink>
              </li>
              <li>
                <FooterLink onClick={() => scrollToSection("contact")}>{t("nav.contact")}</FooterLink>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm font-medium text-foreground mb-4">{t("footer.legal")}</h4>
            <ul className="space-y-3">
              <li>
                <FooterLink href="/impressum">{t("footer.impressum")}</FooterLink>
              </li>
              <li>
                <FooterLink href="/privacy">{t("footer.privacy")}</FooterLink>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/[0.06]"
        >
          <p className="text-muted-foreground/50 text-xs text-center">
            © {new Date().getFullYear()} ELEDEN. {t("footer.copyright")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

const FooterLink = ({ 
  children, 
  href,
  onClick 
}: { 
  children: React.ReactNode; 
  href?: string;
  onClick?: () => void;
}) => {
  if (href) {
    return (
      <Link
        to={href}
        className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group inline-block"
      >
        {children}
        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary/60 transition-all duration-300 group-hover:w-full" />
      </Link>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group inline-block"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary/60 transition-all duration-300 group-hover:w-full" />
    </button>
  );
};

export default Footer;
