"use client"

import { motion } from "framer-motion"
import { CheckCircle, TrendingUp, Loader } from "lucide-react"
import { useAppContext } from "../App"

const ConnectedPlatformCard = ({ name, icon: Icon, gradient, platform, isLoading }) => {
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
          { label: "Channel name", value: data?.channelName || "0h" },
          { label: "subscribers", value: data?.subscribers || 0 },
          { label: "Recently Liked video", value: data?.recentLikedVideo || 0 },
        ]
      case "coursera":
        return [
          { label: "Connection status", value: "Connected" || 0 },
        ]
      default:
        return []
    }
  }

  const displayData = getDisplayData()

  // Loading Animation Component
  const LoadingAnimation = () => (
    <div className="relative h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.div
          className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center relative overflow-hidden`}
        >
          <Icon className="w-8 h-8 text-white/50" />
          {/* Scanning effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: [-100, 100],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Loading content */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {name}
          </h3>
          <motion.span 
            className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            Loading...
          </motion.span>
        </div>
        <p className="text-gray-300 text-sm mb-4">Fetching your data from {name}...</p>
      </div>

      {/* Loading skeleton data */}
      <div className="space-y-3 flex-1">
        {[1, 2, 3].map((item, index) => (
          <motion.div
            key={item}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-cyan-400/20 relative overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Skeleton content */}
            <div className="flex-1 space-y-2">
              <motion.div 
                className="h-3 bg-gradient-to-r from-gray-600 to-gray-500 rounded animate-pulse"
                style={{ width: `${60 + Math.random() * 30}%` }}
              />
            </div>
            <motion.div 
              className="h-3 w-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded animate-pulse ml-4"
            />
            
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent"
              animate={{
                x: [-100, 100],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Loading indicator */}
      <motion.div
        className="flex items-center justify-center mt-4 text-cyan-400"
        animate={{ 
          y: [0, -3, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 2, 
          repeat: Number.POSITIVE_INFINITY, 
          ease: "easeInOut" 
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Loader className="w-4 h-4 mr-2" />
        </motion.div>
        <span className="text-xs font-medium">Syncing Data</span>
      </motion.div>
    </div>
  )

  return (
    <motion.div
      className="relative group h-full"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500 ${
          isLoading ? 'animate-pulse' : ''
        }`}
      ></div>

      {/* Card Content */}
      <div className={`relative backdrop-blur-xl bg-white/10 border rounded-2xl p-8 h-full transition-all duration-300 ${
        isLoading 
          ? 'border-cyan-400/30 group-hover:border-cyan-400/50' 
          : 'border-green-400/30 group-hover:border-green-400/50'
      }`}>
        
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
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
              <span className="text-xs font-medium">Data Synced</span>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default ConnectedPlatformCard