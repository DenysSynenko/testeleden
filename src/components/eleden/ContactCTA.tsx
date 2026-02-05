import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedLines } from "./AnimatedText";
import MagneticButton from "./MagneticButton";

const budgetOptions = [
  { value: "480", label: "€480 / month" },
  { value: "860", label: "€860 / month" },
  { value: "1260", label: "€1260+ / month" },
  { value: "2000", label: "€2000+ / month (individual)" },
];

const ContactCTA = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    product: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-mint opacity-20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-glow-champagne opacity-15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedLines
            lines={[
              "Ready to build a premium",
              "content system?"
            ]}
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
            Send a request — we'll reply within 24–48 hours.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 px-8 rounded-[18px] bg-surface border border-primary/20"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">
                Request received
              </h3>
              <p className="text-muted-foreground">
                We'll get back to you within 24–48 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
                <FormField
                  label="Company / Instagram"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="@handle or company"
                  required
                />
              </div>

              <FormField
                label="What do you sell?"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Describe your product or service"
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Monthly content budget
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[14px] bg-surface border border-white/[0.08] text-foreground focus:outline-none focus:border-primary/40 transition-colors duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239AA3B2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.5em",
                  }}
                >
                  <option value="" disabled>
                    Select budget
                  </option>
                  {budgetOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <MagneticButton
                  variant="primary"
                  className="w-full justify-center"
                  showArrow={!isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4"
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
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Request a strategy call"
                  )}
                </MagneticButton>
              </div>

              <p className="text-center text-xs text-muted-foreground/60">
                No spam. We only use your details to reply.
              </p>
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
}

const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-[14px] bg-surface border border-white/[0.08] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 transition-colors duration-300"
      />
    </div>
  );
};

export default ContactCTA;
