"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import GlowButton from "./GlowButton"

const PlatformCard = ({ name, icon: Icon, description, gradient, glowColor, stats, onConnect }) => {
  const handleConnectClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Connecting to ${name}...`); // Debug log
    onConnect();
  };

  return (
    <motion.div
      className="relative group h-full"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 ${glowColor}`}
      ></div>

      {/* Card Content */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 h-full group-hover:border-white/20 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="text-gray-400 group-hover:text-white transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
            {name}
          </h3>
          <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">{description}</p>
        </div>

        {/* Stats and Connect Button */}
        <div className="flex items-center justify-between">
          <span className="text-cyan-400 font-semibold text-lg">{stats}</span>
        </div>

        <div className="mt-6">
          <GlowButton
            variant="primary"
            size="medium"
            onClick={handleConnectClick}
            className="w-full"
          >
            Connect Platform
          </GlowButton>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:
              "linear-gradient(45deg, transparent, transparent), linear-gradient(45deg, #00f5ff, #8b5cf6, #ec4899)",
            backgroundClip: "padding-box, border-box",
            backgroundOrigin: "padding-box, border-box",
          }}
        />
      </div>
    </motion.div>
  )
}

export default PlatformCard