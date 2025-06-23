"use client"
import { Star, ExternalLink, Clock, Users } from "lucide-react"

const RecommendationCard = ({ type, data }) => {
  const renderGitHubCard = () => (
    <div className="glass-card p-6 h-full group hover:scale-105 transition-transform duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">{data.title}</h3>
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-300 transition-colors" />
      </div>
      <p className="text-gray-300 text-sm mb-4">{data.description}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-1 text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
          <span>{data.stars}</span>
        </div>
        <span className="text-gray-400">{data.language}</span>
      </div>
    </div>
  )

  const renderYouTubeCard = () => (
    <div className="glass-card p-6 h-full group hover:scale-105 transition-transform duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-red-300 transition-colors">{data.title}</h3>
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-300 transition-colors" />
      </div>
      <p className="text-gray-300 text-sm mb-4">{data.channel}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-1 text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{data.duration}</span>
        </div>
        <span className="text-gray-400">{data.views} views</span>
      </div>
    </div>
  )

  const renderCourseraCard = () => (
    <div className="glass-card p-6 h-full group hover:scale-105 transition-transform duration-300">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">{data.title}</h3>
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-300 transition-colors" />
      </div>
      <p className="text-gray-300 text-sm mb-4">{data.provider}</p>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-1 text-yellow-400">
          <Star className="w-4 h-4 fill-current" />
          <span>{data.rating}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <Users className="w-4 h-4" />
          <span>{data.students}</span>
        </div>
      </div>
    </div>
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
