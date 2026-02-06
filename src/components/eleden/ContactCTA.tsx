import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLines } from "./AnimatedText";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactCTA = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    instagram: "",
    email: "",
    website: "",
    goal: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const goalOptions = [
    { value: "brand", label: "Brand" },
    { value: "leads", label: "Leads" },
    { value: "both", label: "Both" },
  ];

  const budgetOptions = [
    { value: "480", label: "€480" },
    { value: "870", label: "€870" },
    { value: "1260", label: "€1,260" },
    { value: "2000", label: "€2,000+" },
    { value: "unsure", label: "Not sure" },
  ];

  const timelineOptions = [
    { value: "asap", label: "ASAP" },
    { value: "2-4weeks", label: "2–4 weeks" },
    { value: "1-2months", label: "1–2 months" },
    { value: "researching", label: "Just researching" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectStyles = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239AA3B2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    backgroundSize: "1.5em",
  } as React.CSSProperties;

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-mint opacity-20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-glow-champagne opacity-15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedLines
            lines={[t("contact.headline1"), t("contact.headline2")]}
            className="mb-6"
            lineClassName="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]"
            delay={0}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-muted-foreground"
          >
            {t("contact.subline")}
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              className="text-center py-12 px-8 rounded-[18px] bg-surface border border-primary/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h3 className="font-display text-2xl font-bold mb-3">
                {t("contact.success.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("contact.success.body")}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label={t("contact.firstName")}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={t("contact.firstName")}
                  required
                  index={0}
                />
                <FormField
                  label={t("contact.lastName")}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={t("contact.lastNameOptional")}
                  index={1}
                />
              </div>

              {/* Company & Instagram Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label={t("contact.companyName")}
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t("contact.companyName")}
                  required
                  index={2}
                />
                <FormField
                  label={t("contact.instagram")}
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@handle"
                  required
                  index={3}
                />
              </div>

              {/* Email & Website Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label={t("contact.email")}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  type="email"
                  index={4}
                />
                <FormField
                  label={t("contact.website")}
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder={t("contact.websiteOptional")}
                  index={5}
                />
              </div>

              {/* Dropdowns Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Goal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-foreground">
                    {t("contact.goal")}
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-[14px] bg-surface border border-white/[0.08] text-foreground focus:outline-none focus:border-primary/40 transition-all duration-300 appearance-none cursor-pointer"
                    style={selectStyles}
                  >
                    <option value="" disabled>
                      {t("contact.select")}
                    </option>
                    {goalOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </motion.select>
                </motion.div>

                {/* Budget */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-foreground">
                    {t("contact.budget")}
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-[14px] bg-surface border border-white/[0.08] text-foreground focus:outline-none focus:border-primary/40 transition-all duration-300 appearance-none cursor-pointer"
                    style={selectStyles}
                  >
                    <option value="" disabled>
                      {t("contact.select")}
                    </option>
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </motion.select>
                </motion.div>

                {/* Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-foreground">
                    {t("contact.timeline")}
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-[14px] bg-surface border border-white/[0.08] text-foreground focus:outline-none focus:border-primary/40 transition-all duration-300 appearance-none cursor-pointer"
                    style={selectStyles}
                  >
                    <option value="" disabled>
                      {t("contact.select")}
                    </option>
                    {timelineOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </motion.select>
                </motion.div>
              </div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-foreground">
                  {t("contact.message")}
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.messagePlaceholder")}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-[14px] bg-surface border border-white/[0.08] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-all duration-300 resize-none"
                />
              </motion.div>

              <motion.div 
                className="pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <MagneticButton
                  variant="primary"
                  className="w-full justify-center"
                  showArrow={!isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.svg
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </motion.svg>
                      {t("contact.sending")}
                    </span>
                  ) : (
                    t("contact.cta")
                  )}
                </MagneticButton>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center text-xs text-muted-foreground/60"
              >
                {t("contact.microcopy")}
              </motion.p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  index: number;
  type?: string;
}

const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  index,
  type = "text",
}: FormFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="space-y-2"
    >
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <motion.input
        whileFocus={{ scale: 1.01 }}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-[14px] bg-surface border border-white/[0.08] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-all duration-300"
      />
    </motion.div>
  );
};

export default ContactCTA;
