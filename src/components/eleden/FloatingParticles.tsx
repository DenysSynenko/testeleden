import { motion } from "framer-motion";
import { useMemo } from "react";

const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 3,
        duration: 12 + Math.random() * 14,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 60,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            backgroundColor: "hsl(var(--primary-deep))",
            boxShadow:
              "0 0 10px hsl(var(--primary) / 1), 0 0 20px hsl(var(--primary) / 0.6)",
          }}
          animate={{
            y: [0, -160, 0],
            x: [0, p.drift, 0],
            opacity: [0, 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;