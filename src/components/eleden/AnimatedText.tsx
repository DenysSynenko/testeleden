import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const AnimatedText = ({ 
  text, 
  className = "", 
  delay = 0,
  as: Component = "p" 
}: AnimatedTextProps) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      <Component className={className}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </Component>
    </motion.div>
  );
};

interface AnimatedLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

export const AnimatedLines = ({ 
  lines, 
  className = "",
  lineClassName = "",
  delay = 0 
}: AnimatedLinesProps) => {
  return (
    <div className={className}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
            whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.7,
              delay: delay + index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedText;
