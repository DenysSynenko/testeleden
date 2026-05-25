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

  const socialLinks = {
    instagram: { label: "Instagram", url: "https://www.instagram.com/eleden.media/" },
    tiktok: { label: "TikTok", url: "https://www.tiktok.com/@de.synenko" },
    youtube: { label: "YouTube", url: "https://www.youtube.com/@DenysSynenko" },
  };

  return (
    <footer className="relative bg-surface border-t border-white/[0.06]">
      {/* Champagne separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
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
              <li>
                <FooterLink
                  onClick={() => {
                    try { localStorage.removeItem("eleden_cookie_consent_v1"); } catch { /* ignore */ }
                    window.dispatchEvent(new Event("eleden:open-cookie-settings"));
                  }}
                >
                  {t("footer.cookieSettings")}
                </FooterLink>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm font-medium text-foreground mb-4">{t("footer.social")}</h4>
            <div className="flex flex-wrap gap-3">
              {[socialLinks.instagram, socialLinks.tiktok, socialLinks.youtube].map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 pt-6 border-t border-white/[0.06]"
        >
          <p className="text-muted-foreground/60 text-xs text-center">
            {t("footer.trust")}
          </p>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6"
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
