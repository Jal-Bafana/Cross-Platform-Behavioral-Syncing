"use client"
import { motion } from "framer-motion"

const FeatureCard = ({ title, description, icon: Icon }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="glass-card p-6 text-center group cursor-pointer">
      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  )
}

export default FeatureCard
