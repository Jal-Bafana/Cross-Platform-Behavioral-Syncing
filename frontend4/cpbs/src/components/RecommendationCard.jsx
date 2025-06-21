"use client"

import { motion } from "framer-motion"
import { Star, ExternalLink, Clock, Users, Eye, GitFork, Award } from "lucide-react"

const RecommendationCard = ({ type, data }) => {
  const renderGitHubCard = () => (
    <motion.div
      className="relative group cursor-pointer h-full"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-800/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 h-full group-hover:border-gray-400/30 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-gray-300 transition-colors line-clamp-1">
                {data.title}
              </h3>
              {data.trending && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium"
                >
                  🔥 Trending
                </motion.div>
              )}
            </div>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{data.description}</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="text-gray-400 group-hover:text-gray-300 transition-colors ml-2"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{data.stars}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <GitFork className="w-4 h-4" />
              <span>{data.forks}</span>
            </div>
          </div>
          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">{data.language}</span>
        </div>
      </div>
    </motion.div>
  )

  const renderYouTubeCard = () => (
    <motion.div
      className="relative group cursor-pointer h-full"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 h-full group-hover:border-red-400/30 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3 flex-1">
            <div className="text-4xl">{data.thumbnail}</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white group-hover:text-red-300 transition-colors line-clamp-2 mb-2">
                {data.title}
              </h3>
              <p className="text-gray-300 text-sm mb-2">{data.channel}</p>
              <p className="text-gray-400 text-xs">{data.uploadedAgo}</p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="text-gray-400 group-hover:text-red-300 transition-colors ml-2"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{data.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <Eye className="w-4 h-4" />
              <span>{data.views}</span>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium"
          >
            Watch Now
          </motion.div>
        </div>
      </div>
    </motion.div>
  )

  const renderCourseraCard = () => (
    <motion.div
      className="relative group cursor-pointer h-full"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 h-full group-hover:border-blue-400/30 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
                {data.title}
              </h3>
              {data.certificate && <Award className="w-4 h-4 text-yellow-400" />}
            </div>
            <p className="text-gray-300 text-sm mb-2">{data.provider}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>{data.duration}</span>
              <span>•</span>
              <span className="capitalize">{data.level}</span>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="text-gray-400 group-hover:text-blue-300 transition-colors ml-2"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-medium">{data.rating}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <Users className="w-4 h-4" />
              <span>{data.students}</span>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium"
          >
            Enroll Now
          </motion.div>
        </div>
      </div>
    </motion.div>
  )

  switch (type) {
    case "github":
      return renderGitHubCard()
    case "youtube":
      return renderYouTubeCard()
    case "coursera":
      return renderCourseraCard()
    default:
      return null
  }
}

export default RecommendationCard
