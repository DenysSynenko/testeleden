import { motion } from "framer-motion";
import { useMemo } from "react";

const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        startY: -10 - Math.random() * 30,
        size: Math.random() * 1.5 + 1,
        duration: 18 + Math.random() * 22,
        delay: Math.random() * 20,
        driftX: (Math.random() - 0.5) * 80,
        sway: 20 + Math.random() * 40,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            left: `${p.left}%`,
            top: `${p.startY}%`,
            width: p.size,
            height: p.size,
            backgroundColor: "hsl(var(--primary))",
            filter: "blur(0.3px)",
            boxShadow: "0 0 4px hsl(var(--primary) / 0.7)",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, p.sway, -p.sway, p.driftX, 0],
            opacity: [0, 0.5, 0.5, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.5, 0.9, 1],
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;