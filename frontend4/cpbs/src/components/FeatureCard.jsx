"use client"

import { motion } from "framer-motion"

const FeatureCard = ({ title, description, icon: Icon, color }) => {
  return (
    <motion.div
      className="relative group cursor-pointer h-full"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500`}
      ></div>

      {/* Card Content */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 h-full text-center group-hover:border-white/20 transition-all duration-300">
        {/* Animated Icon */}
        <motion.div
          className={`w-20 h-20 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mx-auto mb-6`}
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">{description}</p>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-60"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default FeatureCard
