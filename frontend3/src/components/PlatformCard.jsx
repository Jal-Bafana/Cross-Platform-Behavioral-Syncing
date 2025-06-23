"use client"
import { motion } from "framer-motion"

const PlatformCard = ({ name, icon: Icon, description, color }) => {
  return (
    <motion.div whileHover={{ scale: 1.05, y: -10 }} className="glass-card p-6 h-full group cursor-pointer">
      <div
        className={`w-16 h-16 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{name}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
      <div className="mt-4 flex items-center text-purple-300 group-hover:text-purple-200 transition-colors">
        <span className="text-sm font-medium">Connect Platform</span>
        <motion.div
          className="ml-2 w-2 h-2 bg-current rounded-full"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>
    </motion.div>
  )
}

export default PlatformCard
