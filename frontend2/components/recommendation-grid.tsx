"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Github,
  Youtube,
  BookOpen,
  MessageSquare,
  Clock,
  Star,
  TrendingUp,
  ExternalLink,
  Bookmark,
  Share,
  Zap,
  Target,
  Search,
} from "lucide-react"

interface Recommendation {
  id: string
  title: string
  platform: string
  type: string
  confidence: number
  tags: string[]
  description: string
  estimatedTime: string
  difficulty: string
  rating: number
  enrolled: number
  thumbnail: string
  instructor: string
}

interface RecommendationGridProps {
  filters: string[]
}

export function RecommendationGrid({ filters }: RecommendationGridProps) {
  const recommendations: Recommendation[] = [
    {
      id: "1",
      title: "Advanced React Patterns and Performance Optimization",
      platform: "Coursera",
      type: "Course",
      confidence: 95,
      tags: ["React", "Performance", "Advanced", "JavaScript"],
      description:
        "Master advanced React patterns including compound components, render props, and performance optimization techniques. Perfect for your GitHub activity patterns.",
      estimatedTime: "6 weeks",
      difficulty: "Advanced",
      rating: 4.8,
      enrolled: 12500,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Sarah Chen",
    },
    {
      id: "2",
      title: "TypeScript Best Practices 2024",
      platform: "YouTube",
      type: "Video Series",
      confidence: 88,
      tags: ["TypeScript", "Best Practices", "JavaScript", "Development"],
      description:
        "Comprehensive TypeScript guide covering latest features, design patterns, and real-world applications matching your coding style.",
      estimatedTime: "4 hours",
      difficulty: "Intermediate",
      rating: 4.9,
      enrolled: 8900,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Alex Rodriguez",
    },
    {
      id: "3",
      title: "Machine Learning with JavaScript and TensorFlow.js",
      platform: "Coursera",
      type: "Specialization",
      confidence: 82,
      tags: ["Machine Learning", "JavaScript", "TensorFlow.js", "AI"],
      description:
        "Bridge your JavaScript expertise with machine learning. Build ML models that run in the browser and Node.js environments.",
      estimatedTime: "3 months",
      difficulty: "Intermediate",
      rating: 4.7,
      enrolled: 15600,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Dr. Maria Santos",
    },
    {
      id: "4",
      title: "System Design for Frontend Engineers",
      platform: "YouTube",
      type: "Playlist",
      confidence: 76,
      tags: ["System Design", "Architecture", "Frontend", "Scalability"],
      description:
        "Learn system design principles specifically for frontend applications. Cover CDNs, caching, and performance at scale.",
      estimatedTime: "8 hours",
      difficulty: "Advanced",
      rating: 4.6,
      enrolled: 6700,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Tech Lead Academy",
    },
    {
      id: "5",
      title: "Building Scalable APIs with Node.js",
      platform: "Coursera",
      type: "Course",
      confidence: 74,
      tags: ["Node.js", "API", "Backend", "Scalability"],
      description: "Design and build production-ready APIs with Node.js, Express, and modern database technologies.",
      estimatedTime: "5 weeks",
      difficulty: "Intermediate",
      rating: 4.5,
      enrolled: 9800,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "James Wilson",
    },
    {
      id: "6",
      title: "React Testing Strategies and Best Practices",
      platform: "YouTube",
      type: "Tutorial",
      confidence: 71,
      tags: ["React", "Testing", "Jest", "Quality Assurance"],
      description:
        "Comprehensive testing strategies for React applications including unit, integration, and e2e testing.",
      estimatedTime: "3 hours",
      difficulty: "Intermediate",
      rating: 4.4,
      enrolled: 5400,
      thumbnail: "/placeholder.svg?height=200&width=300",
      instructor: "Testing Pro",
    },
  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "GitHub":
        return Github
      case "YouTube":
        return Youtube
      case "Coursera":
        return BookOpen
      case "Stack Overflow":
        return MessageSquare
      default:
        return BookOpen
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-400"
    if (confidence >= 75) return "text-blue-400"
    if (confidence >= 60) return "text-yellow-400"
    return "text-gray-400"
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "from-green-500 to-green-600"
      case "Intermediate":
        return "from-yellow-500 to-orange-500"
      case "Advanced":
        return "from-red-500 to-red-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  // Filter recommendations based on selected filters
  const filteredRecommendations = recommendations.filter((rec) => {
    if (filters.length === 0) return true

    const matchesType = filters.some((filter) => {
      switch (filter) {
        case "course":
          return rec.type.toLowerCase().includes("course") || rec.type.toLowerCase().includes("specialization")
        case "video":
          return (
            rec.type.toLowerCase().includes("video") ||
            rec.type.toLowerCase().includes("tutorial") ||
            rec.type.toLowerCase().includes("playlist")
          )
        case "article":
          return rec.type.toLowerCase().includes("article")
        case "code":
          return rec.tags.some((tag) => tag.toLowerCase().includes("code") || tag.toLowerCase().includes("programming"))
        default:
          return false
      }
    })

    const matchesDifficulty = filters.some((filter) => {
      switch (filter) {
        case "beginner":
          return rec.difficulty.toLowerCase() === "beginner"
        case "intermediate":
          return rec.difficulty.toLowerCase() === "intermediate"
        case "advanced":
          return rec.difficulty.toLowerCase() === "advanced"
        default:
          return false
      }
    })

    const matchesDuration = filters.some((filter) => {
      switch (filter) {
        case "short":
          return (
            rec.estimatedTime.includes("hour") &&
            !rec.estimatedTime.includes("week") &&
            !rec.estimatedTime.includes("month")
          )
        case "medium":
          return (
            rec.estimatedTime.includes("week") ||
            (rec.estimatedTime.includes("hour") && Number.parseInt(rec.estimatedTime) > 5)
          )
        case "long":
          return (
            rec.estimatedTime.includes("month") ||
            (rec.estimatedTime.includes("week") && Number.parseInt(rec.estimatedTime) > 4)
          )
        default:
          return false
      }
    })

    return matchesType || matchesDifficulty || matchesDuration
  })

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-white">AI Recommendations</h2>
          <p className="text-muted-foreground">
            {filteredRecommendations.length} personalized suggestions based on your activity
          </p>
        </div>
        <Badge className="glass-button border-purple-500/50 text-purple-300">
          <Target className="w-4 h-4 mr-2" />
          {Math.round(recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length)}
          {Math.round(recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length)}% Match
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((rec, index) => {
          const PlatformIcon = getPlatformIcon(rec.platform)

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card p-6 glow-effect group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10 glass-card">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500/20 to-gold/20">
                      <PlatformIcon className="w-5 h-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Badge variant="outline" className="text-xs glass-button border-white/20">
                      {rec.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{rec.platform}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <span className={`text-sm font-bold ${getConfidenceColor(rec.confidence)}`}>{rec.confidence}%</span>
                  <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${
                        rec.confidence >= 90
                          ? "from-green-400 to-green-500"
                          : rec.confidence >= 75
                            ? "from-blue-400 to-blue-500"
                            : rec.confidence >= 60
                              ? "from-yellow-400 to-yellow-500"
                              : "from-gray-400 to-gray-500"
                      }`}
                      style={{ width: `${rec.confidence}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight mb-2 group-hover:gradient-text transition-all duration-300">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rec.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {rec.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs glass-button border-white/10">
                      {tag}
                    </Badge>
                  ))}
                  {rec.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs glass-button border-white/10">
                      +{rec.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{rec.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{rec.rating}</span>
                    </div>
                  </div>

                  <Badge
                    className={`glass-button bg-gradient-to-r ${getDifficultyColor(rec.difficulty)} text-white border-0 text-xs`}
                  >
                    {rec.difficulty}
                  </Badge>
                </div>

                {/* Instructor & Enrollment */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>by {rec.instructor}</span>
                  <span>{rec.enrolled.toLocaleString()} enrolled</span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 glass-button bg-gradient-to-r from-purple-500/20 to-gold/20 hover:from-purple-500/40 hover:to-gold/40 border-purple-500/50 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Course
                  </Button>

                  <Button variant="ghost" size="sm" className="glass-button">
                    <Bookmark className="w-4 h-4" />
                  </Button>

                  <Button variant="ghost" size="sm" className="glass-button">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Load More */}
      {filteredRecommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button variant="ghost" size="lg" className="glass-button hover:bg-white/10">
            <TrendingUp className="w-4 h-4 mr-2" />
            Load More Recommendations
          </Button>
        </motion.div>
      )}

      {/* No Results */}
      {filteredRecommendations.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="glass-card p-8 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-gold/20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Recommendations Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or connect more platforms for better recommendations.
            </p>
            <Button variant="ghost" className="glass-button" onClick={() => window.location.reload()}>
              <Zap className="w-4 h-4 mr-2" />
              Refresh Recommendations
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
