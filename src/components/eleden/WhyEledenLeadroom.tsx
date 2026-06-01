import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Star, Puzzle } from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Results you can see",
    text:
      "We don't just produce content — we build systems that generate leads. Our case study with Almeno Immobilien: 200+ qualified leads in 2 months on a modest ad budget.",
  },
  {
    icon: ShieldCheck,
    title: "Price that makes sense",
    text:
      "Full-system packages starting at €999/month. Comparable agencies in Germany charge €2,500–4,500 for the same scope. You get more, you pay less.",
  },
  {
    icon: Star,
    title: "World-class standards",
    text:
      "We operate by the same production and performance standards used by top global agencies — applied to your budget and your market.",
  },
  {
    icon: Puzzle,
    title: "Two specialists, zero gaps",
    text:
      "ELEDEN handles content. Leadroom handles ads. No hand-offs, no miscommunication — one integrated team working toward your growth.",
  },
];

const WhyEledenLeadroom = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-glow-mint opacity-[0.07] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <h2 className="section-title mb-4">Why ELEDEN &amp; Leadroom?</h2>
          <p className="text-muted-foreground text-lg">
            Two specialists. One system. Real results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-[18px] p-7 bg-surface-elevated border border-white/[0.08] hover:border-primary/40 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/25 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{r.text}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="relative rounded-[14px] bg-surface-elevated/80 border border-white/[0.06] pl-6 pr-6 py-5 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            <p className="font-display text-lg sm:text-xl text-foreground">
              <span className="text-primary font-bold">200+ qualified leads</span>
              <span className="text-muted-foreground"> · 2 months · modest ad budget — </span>
              <span className="text-foreground">Almeno Immobilien</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyEledenLeadroom;