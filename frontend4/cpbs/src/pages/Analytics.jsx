"use client"

import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { Clock, BookOpen, TrendingUp, Activity, Github, Youtube, Award } from "lucide-react"
import { useAppContext } from "../App"
import GlowButton from "../components/GlowButton"

const Analytics = () => {
  const { isGitHubConnected, isYouTubeConnected, isCourseraConnected } = useAppContext()

  // Mock analytics data
  const timeSpentData = [
    { platform: "GitHub", hours: 45, color: "#6B7280" },
    { platform: "YouTube", hours: 32, color: "#EF4444" },
    { platform: "Coursera", hours: 28, color: "#3B82F6" },
  ]

  const resourcesData = [
    { platform: "GitHub", repos: 15, videos: 0, courses: 0 },
    { platform: "YouTube", repos: 0, videos: 127, courses: 0 },
    { platform: "Coursera", repos: 0, videos: 0, courses: 8 },
  ]

  const learningTrendsData = [
    { week: "Week 1", github: 8, youtube: 12, coursera: 6 },
    { week: "Week 2", github: 12, youtube: 15, coursera: 8 },
    { week: "Week 3", github: 15, youtube: 10, coursera: 12 },
    { week: "Week 4", github: 18, youtube: 20, coursera: 10 },
    { week: "Week 5", github: 22, youtube: 18, coursera: 15 },
    { week: "Week 6", github: 25, youtube: 25, coursera: 18 },
  ]

  const skillDistribution = [
    { name: "Programming", value: 40, color: "#00F5FF" },
    { name: "Data Science", value: 25, color: "#8B5CF6" },
    { name: "Web Development", value: 20, color: "#EC4899" },
    { name: "Machine Learning", value: 15, color: "#F59E0B" },
  ]

  const connectedPlatforms = [isGitHubConnected, isYouTubeConnected, isCourseraConnected].filter(Boolean).length

  if (connectedPlatforms === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 relative flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl"></div>
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
              <TrendingUp className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4">No Analytics Available</h2>
              <p className="text-xl text-gray-300 mb-8">
                Connect at least one platform to start viewing your learning analytics
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-full transition-all duration-300"
              >
                Go Back to Connect Platforms
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learning Analytics
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Deep insights into your learning patterns across all connected platforms
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: Clock, label: "Total Hours", value: "105h", color: "from-cyan-400 to-blue-500" },
            { icon: BookOpen, label: "Resources", value: "150", color: "from-purple-400 to-pink-500" },
            { icon: Activity, label: "Platforms", value: connectedPlatforms, color: "from-green-400 to-cyan-500" },
            { icon: Award, label: "Achievements", value: "23", color: "from-yellow-400 to-orange-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              whileHover={{ scale: 1.05, y: -5 }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Time Spent Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-cyan-400" />
                Time Spent Per Platform
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeSpentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="platform" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="hours" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00F5FF" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Skill Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-purple-400" />
                Skill Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={skillDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {skillDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Learning Trends */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3 text-green-400" />
              Learning Trends (Last 6 Weeks)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={learningTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                {isGitHubConnected && (
                  <Area
                    type="monotone"
                    dataKey="github"
                    stackId="1"
                    stroke="#6B7280"
                    fill="rgba(107, 114, 128, 0.3)"
                    name="GitHub"
                  />
                )}
                {isYouTubeConnected && (
                  <Area
                    type="monotone"
                    dataKey="youtube"
                    stackId="1"
                    stroke="#EF4444"
                    fill="rgba(239, 68, 68, 0.3)"
                    name="YouTube"
                  />
                )}
                {isCourseraConnected && (
                  <Area
                    type="monotone"
                    dataKey="coursera"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="rgba(59, 130, 246, 0.3)"
                    name="Coursera"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Platform Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {isGitHubConnected && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-800/20 rounded-xl blur-lg"></div>
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Github className="w-6 h-6 text-gray-400" />
                  <h4 className="text-lg font-bold text-white">GitHub Insights</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Most Used Language</span>
                    <span className="text-white font-medium">JavaScript</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Avg. Commits/Week</span>
                    <span className="text-white font-medium">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Top Repository</span>
                    <span className="text-white font-medium">react-app</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isYouTubeConnected && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-800/20 rounded-xl blur-lg"></div>
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Youtube className="w-6 h-6 text-red-400" />
                  <h4 className="text-lg font-bold text-white">YouTube Insights</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Favorite Category</span>
                    <span className="text-white font-medium">Programming</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Avg. Watch Time</span>
                    <span className="text-white font-medium">2.5h/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Top Channel</span>
                    <span className="text-white font-medium">Fireship</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isCourseraConnected && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-xl blur-lg"></div>
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                  <h4 className="text-lg font-bold text-white">Coursera Insights</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Completion Rate</span>
                    <span className="text-white font-medium">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Favorite Subject</span>
                    <span className="text-white font-medium">ML</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Next Milestone</span>
                    <span className="text-white font-medium">10 Courses</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics
