import { useRef, useState, forwardRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
}

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(({ 
  children, 
  variant = "primary", 
  onClick,
  className = "",
  showArrow = true
}, ref) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentRef = buttonRef.current || (ref as React.RefObject<HTMLButtonElement>)?.current;
    if (!currentRef) return;
    
    const rect = currentRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = (e.clientX - centerX) * 0.15;
    const distanceY = (e.clientY - centerY) * 0.15;
    
    setPosition({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = variant === "primary" 
    ? "btn-primary" 
    : "btn-ghost";

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
      className={`${baseStyles} ${className} group`}
    >
      <span>{children}</span>
      {showArrow && (
        <motion.span
          className="inline-flex"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.span>
      )}
    </motion.button>
  );
});

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
