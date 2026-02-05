import { motion } from "framer-motion";
import { AnimatedLines } from "./AnimatedText";
import MagneticButton from "./MagneticButton";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        {/* Mint glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-glow-mint rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-glow-mint opacity-50 rounded-full blur-3xl"
        />
        {/* Champagne accent glow */}
        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-glow-champagne opacity-30 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Headline */}
          <AnimatedLines
            lines={[
              "ELEDEN — premium",
              "content systems for",
              "modern businesses."
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
            We turn scattered ideas into short-form video systems that build brand trust and generate qualified inquiries.
          </motion.p>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-muted-foreground/70 mb-10 flex items-center gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-primary/60" />
            Based in Munich
            <span className="w-1 h-1 rounded-full bg-white/20" />
            Available worldwide
            <span className="w-1 h-1 rounded-full bg-white/20" />
            Reply within 24–48 hours
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
              Request a strategy call
            </MagneticButton>
            <MagneticButton 
              variant="ghost"
              onClick={() => scrollToSection("work")}
            >
              View selected work
            </MagneticButton>
          </motion.div>
        </div>
      </div>

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
