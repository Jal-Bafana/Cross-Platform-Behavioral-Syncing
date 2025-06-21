"use client"

import { motion } from "framer-motion"

const GlowButton = ({ children, variant = "primary", size = "medium", className = "", ...props }) => {
  const baseClasses = "relative font-semibold rounded-full transition-all duration-300 overflow-hidden group"

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg hover:shadow-cyan-500/25",
    secondary:
      "backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 text-white shadow-lg hover:shadow-white/10",
    ghost: "backdrop-blur-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white",
  }

  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  }

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

      {/* Content */}
      <span className="relative z-10">{children}</span>

      {/* Animated border for primary variant */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
            transform: "translateX(-100%)",
          }}
          animate={{
            transform: ["translateX(-100%)", "translateX(100%)"],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  )
}

export default GlowButton
