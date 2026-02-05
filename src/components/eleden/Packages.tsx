import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface Package {
  id: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  recommended?: boolean;
}

const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    price: "from €480 / month",
    tagline: "Perfect for getting started with premium consistency.",
    features: [
      "4 videos / month",
      "Strategy consultation",
      "Content calendar",
      "Basic editing",
      "1 revision round",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "from €860 / month",
    tagline: "For consistent content and real lead generation.",
    features: [
      "8 videos / month",
      "Monthly strategy call",
      "Content calendar",
      "Premium editing",
      "2 revision rounds",
      "Performance report",
    ],
    recommended: true,
  },
  {
    id: "scale",
    name: "Scale",
    price: "€1260 / month",
    tagline: "Maximum growth impact — full system.",
    features: [
      "16+ videos / month",
      "Weekly strategy calls",
      "Full content system",
      "Premium editing",
      "Unlimited revisions",
      "Dedicated manager",
      "Priority support",
    ],
  },
];

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState<string>("growth");

  const activePackage = packages.find((p) => p.id === selectedPackage)!;

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-glow-mint opacity-15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="section-title mb-4">Packages</h2>
          <p className="text-muted-foreground text-lg">
            Choose your content intensity.
          </p>
        </motion.div>

        {/* Package selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Package tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-3"
          >
            {packages.map((pkg) => (
              <PackageTab
                key={pkg.id}
                pkg={pkg}
                isActive={selectedPackage === pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
              />
            ))}

            {/* Custom note */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-6"
            >
              <p className="text-sm text-muted-foreground mb-2">
                <span className="text-champagne">2000+ Package</span> — individual
              </p>
              <p className="text-sm text-muted-foreground">
                Need something tailored? We build custom systems.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Package details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPackage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="premium-card relative"
              >
                {/* Recommended badge */}
                {activePackage.recommended && (
                  <div className="absolute -top-3 right-6">
                    <span className="badge-champagne">Recommended</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                      {activePackage.name}
                    </h3>
                    <p className="text-2xl text-primary font-semibold mb-3">
                      {activePackage.price}
                    </p>
                    <p className="text-muted-foreground">
                      {activePackage.tagline}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="pt-4 border-t border-white/[0.06]">
                    <p className="text-sm font-medium text-foreground mb-4">
                      Includes:
                    </p>
                    <ul className="space-y-3">
                      {activePackage.features.map((feature, index) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="pt-6">
                    <MagneticButton
                      variant="primary"
                      onClick={scrollToContact}
                      className="w-full justify-center"
                    >
                      Request {activePackage.name}
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-sm text-muted-foreground/60 mt-6 text-center"
            >
              All packages can include shooting in Munich (on request).
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface PackageTabProps {
  pkg: Package;
  isActive: boolean;
  onClick: () => void;
}

const PackageTab = ({ pkg, isActive, onClick }: PackageTabProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      className={`w-full text-left p-4 rounded-[14px] border transition-all duration-300 ${
        isActive
          ? "bg-surface-elevated border-primary/30"
          : "bg-surface/50 border-white/[0.06] hover:border-white/10"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-display font-semibold ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`}>
              {pkg.name}
            </span>
            {pkg.recommended && (
              <span className="badge-champagne text-[8px]">★</span>
            )}
          </div>
          <p className={`text-sm mt-1 ${
            isActive ? "text-primary" : "text-muted-foreground/70"
          }`}>
            {pkg.price}
          </p>
        </div>
        <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
          isActive ? "text-primary opacity-100" : "opacity-0"
        }`} />
      </div>
    </motion.button>
  );
};

export default Packages;
