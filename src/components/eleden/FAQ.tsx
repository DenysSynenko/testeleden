import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does the collaboration work?",
    answer:
      "We start with a short strategy call, align goals and positioning, then build a repeatable content system. You get clear deliverables, deadlines, and a monthly performance loop.",
  },
  {
    question: "Do you need footage from us, or can you work with client materials?",
    answer:
      "Both. We can shoot on location (Munich + travel) or work remotely using your materials. We also provide clear shooting direction if you want to film in-house.",
  },
  {
    question: "How long does production take?",
    answer:
      "Typical turnaround is 3–7 days per batch depending on volume. We optimize for consistency and speed without sacrificing quality.",
  },
  {
    question: "Which niches do you work with?",
    answer:
      "Premium services, real estate, hospitality, personal brands, product launches — any business that wants trust + leads through short-form.",
  },
  {
    question: "Is there a minimum commitment period?",
    answer:
      "Recommended minimum is 2–3 months to build momentum. Longer collaboration produces stronger compounding results.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-glow-mint opacity-15 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2 className="section-title">Frequently asked questions</h2>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface FAQItemProps {
  faq: typeof faqs[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ faq, index, isOpen, onToggle }: FAQItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-white/[0.06]"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="font-display text-lg font-medium text-foreground pr-8 group-hover:text-primary transition-colors duration-300">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ filter: "blur(4px)" }}
              animate={{ filter: "blur(0px)" }}
              exit={{ filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="pb-6 text-muted-foreground leading-relaxed"
            >
              {faq.answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQ;
