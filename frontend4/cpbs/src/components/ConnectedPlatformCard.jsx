"use client"

import { motion } from "framer-motion"
import { CheckCircle, TrendingUp } from "lucide-react"
import { useAppContext } from "../App"

const ConnectedPlatformCard = ({ name, icon: Icon, gradient, platform }) => {
  const { platformData } = useAppContext()
  const data = platformData[platform]

  const getDisplayData = () => {
    switch (platform) {
      case "github":
        return [
          { label: "Repositories", value: data?.repos || 0 },
          { label: "Total Stars", value: data?.stars || 0 },
          { label: "Contributions", value: data?.contributions || 0 },
        ]
      case "youtube":
        return [
          { label: "Watch Time", value: data?.watchTime || "0h" },
          { label: "Videos Watched", value: data?.videosWatched || 0 },
          { label: "Channels", value: data?.channels || 0 },
        ]
      case "coursera":
        return [
          { label: "Courses Completed", value: data?.coursesCompleted || 0 },
          { label: "Certificates", value: data?.certificatesEarned || 0 },
          { label: "Hours Learned", value: data?.hoursLearned || 0 },
        ]
      default:
        return []
    }
  }

  const displayData = getDisplayData()

  return (
    <motion.div
      className="relative group h-full"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500`}
      ></div>

      {/* Card Content */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-green-400/30 rounded-2xl p-8 h-full group-hover:border-green-400/50 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <motion.div
            className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center`}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="text-green-400"
          >
            <CheckCircle className="w-6 h-6" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              {name}
            </h3>
            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">Connected</span>
          </div>
          <p className="text-gray-300 text-sm mb-4">Platform successfully synced and analyzing your data</p>
        </div>

        {/* Data Summary */}
        <div className="space-y-3">
          {displayData.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="text-gray-300 text-sm">{item.label}</span>
              <span className="text-white font-semibold">{item.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Trending Indicator */}
        <motion.div
          className="flex items-center justify-center mt-4 text-green-400 opacity-80"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-xs font-medium">Data Syncing</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ConnectedPlatformCard
