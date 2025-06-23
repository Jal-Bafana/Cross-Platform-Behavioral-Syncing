import { motion } from "framer-motion";

export const GlowButton = ({ onClick, children, variant = "primary", size = "medium", className = "", ...props }) => {
  const baseClasses = "relative font-semibold rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-purple-500 text-white",
    secondary: "bg-gray-200 text-gray-800",
  };
  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      {...props}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />

      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Optional animated border */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
            transform: "translateX(-100%)",
          }}
          animate={{
            transform: ["translateX(-100%)", "translateX(100%)"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
};

export default GlowButton