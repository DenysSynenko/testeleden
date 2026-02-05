import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedLines } from "./AnimatedText";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {/* Animated Mint glow */}
        <motion.div
          style={{ y: glowY, opacity: glowOpacity }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-glow-mint rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ opacity: glowOpacity }}
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-glow-mint opacity-50 rounded-full blur-3xl"
        />
        {/* Champagne accent glow */}
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-glow-champagne opacity-30 rounded-full blur-3xl"
        />
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24"
      >
        <div className="max-w-4xl">
          {/* Headline */}
          <AnimatedLines
            lines={[
              t("hero.headline1"),
              t("hero.headline2"),
              t("hero.headline3")
            ]}
            className="mb-8"
            lineClassName="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]"
            delay={0.3}
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-6 leading-relaxed"
          >
            {t("hero.subhead")}
          </motion.p>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-muted-foreground/70 mb-10 flex items-center gap-2 flex-wrap"
          >
            <motion.span 
              className="w-1 h-1 rounded-full bg-primary/60"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {t("hero.trust")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton 
              variant="primary"
              onClick={() => scrollToSection("contact")}
            >
              {t("hero.cta.primary")}
            </MagneticButton>
            <MagneticButton 
              variant="ghost"
              onClick={() => scrollToSection("work")}
            >
              {t("hero.cta.secondary")}
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ height: ["20%", "40%", "20%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 bg-primary/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
