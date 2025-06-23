"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Github, Youtube, BookOpen, Clock, TrendingUp, Star, GitCommit, Play, Award } from "lucide-react"

export function ActivityFeed() {
  const activities = [
    {
      id: "1",
      platform: "GitHub",
      type: "commit",
      title: "Pushed to react-dashboard",
      description: "Added new authentication flow with OAuth integration",
      timestamp: "2 hours ago",
      engagement: 95,
      tags: ["React", "JavaScript", "OAuth"],
      icon: GitCommit,
      color: "text-gray-400",
    },
    {
      id: "2",
      platform: "YouTube",
      type: "watch",
      title: "Advanced React Patterns",
      description: "Completed 45-minute tutorial on compound components",
      timestamp: "4 hours ago",
      engagement: 88,
      tags: ["React", "Patterns", "Frontend"],
      icon: Play,
      color: "text-red-500",
    },
    {
      id: "3",
      platform: "Coursera",
      type: "complete",
      title: "Machine Learning Fundamentals",
      description: "Completed Week 3: Neural Networks and Deep Learning",
      timestamp: "1 day ago",
      engagement: 92,
      tags: ["ML", "Neural Networks", "Python"],
      icon: Award,
      color: "text-blue-500",
    },
    {
      id: "4",
      platform: "GitHub",
      type: "star",
      title: "Starred tensorflow/tensorflow",
      description: "Exploring machine learning frameworks for upcoming project",
      timestamp: "2 days ago",
      engagement: 76,
      tags: ["TensorFlow", "ML", "Python"],
      icon: Star,
      color: "text-yellow-500",
    },
  ]

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "GitHub":
        return Github
      case "YouTube":
        return Youtube
      case "Coursera":
        return BookOpen
      default:
        return Github
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Activity Feed</h2>
          <Badge className="glass-button border-blue-500/50 text-blue-300">
            <TrendingUp className="w-4 h-4 mr-2" />
            Live Updates
          </Badge>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => {
            const PlatformIcon = getPlatformIcon(activity.platform)
            const ActivityIcon = activity.icon

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="glass-card p-4 border-l-4 border-l-purple-500/50 glow-effect"
              >
                <div className="flex items-start space-x-4">
                  {/* Platform Avatar */}
                  <div className="relative">
                    <Avatar className="w-12 h-12 glass-card">
                      <AvatarFallback className="bg-gradient-to-r from-purple-500/20 to-yellow-400/20">
                        <PlatformIcon className="w-6 h-6 text-white" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-yellow-400 flex items-center justify-center">
                      <ActivityIcon className={`w-3 h-3 ${activity.color}`} />
                    </div>
                  </div>

                  {/* Activity Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{activity.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{activity.timestamp}</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{activity.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {activity.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs glass-button border-white/20">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="text-sm text-muted-foreground">Engagement:</div>
                        <div
                          className={`text-sm font-medium ${
                            activity.engagement > 90
                              ? "text-green-400"
                              : activity.engagement > 75
                                ? "text-blue-400"
                                : activity.engagement > 60
                                  ? "text-yellow-400"
                                  : "text-gray-400"
                          }`}
                        >
                          {activity.engagement}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
