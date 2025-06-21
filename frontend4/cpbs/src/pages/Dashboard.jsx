"use client"
import { motion } from "framer-motion"
import { Github, Youtube, BookOpen, RefreshCw } from "lucide-react"
import RecommendationCard from "../components/RecommendationCard"
import GlowButton from "../components/GlowButton"
import ProgressRing from "../components/ProgressRing"
import { Link , useLocation} from "react-router-dom"
import { useAppContext } from "../App"

const Dashboard = () => {
  const {
      user
    } = useAppContext()

  const userProfile = {
    name: user.name,
    avatar: "👨‍💻",
    email: user.email,
  }

  const syncStatus = {
    github: { status: "synced", lastSync: "2 min ago", progress: 95 },
    youtube: { status: "syncing", lastSync: "now", progress: 67 },
    coursera: { status: "synced", lastSync: "5 min ago", progress: 100 },
  }

  const recommendations = {
    github: [
      {
        title: "shadcn/ui",
        description: "Beautifully designed components built with Radix UI and Tailwind CSS",
        stars: "45.2k",
        language: "TypeScript",
        trending: true,
        forks: "2.1k",
      },
      {
        title: "vercel/next.js",
        description: "The React Framework for the Web",
        stars: "118k",
        language: "JavaScript",
        trending: false,
        forks: "25.8k",
      },
      {
        title: "microsoft/vscode",
        description: "Visual Studio Code - Open Source IDE",
        stars: "155k",
        language: "TypeScript",
        trending: true,
        forks: "27.2k",
      },
    ],
    youtube: [
      {
        title: "Advanced React Patterns You Should Know",
        channel: "Web Dev Simplified",
        duration: "28:45",
        views: "234K",
        thumbnail: "🎯",
        uploadedAgo: "2 days ago",
      },
      {
        title: "Building a Full-Stack App with Next.js 14",
        channel: "Fireship",
        duration: "15:32",
        views: "892K",
        thumbnail: "🚀",
        uploadedAgo: "1 week ago",
      },
      {
        title: "JavaScript Performance Optimization Tips",
        channel: "JavaScript Mastery",
        duration: "35:18",
        views: "156K",
        thumbnail: "⚡",
        uploadedAgo: "3 days ago",
      },
    ],
    coursera: [
      {
        title: "Machine Learning Specialization",
        provider: "Stanford University",
        rating: 4.9,
        students: "2.1M",
        duration: "3 months",
        level: "Intermediate",
        certificate: true,
      },
      {
        title: "Full-Stack Web Development with React",
        provider: "Meta",
        rating: 4.7,
        students: "890K",
        duration: "6 months",
        level: "Beginner",
        certificate: true,
      },
      {
        title: "Advanced Data Science with Python",
        provider: "IBM",
        rating: 4.6,
        students: "1.5M",
        duration: "4 months",
        level: "Advanced",
        certificate: true,
      },
    ],
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              {/* Remove the streak, totalPoints, and level from the welcome section */}
              {/* Update the welcome section JSX to remove gamified elements */}
              <div className="flex items-center space-x-6">
                <motion.div className="relative" whileHover={{ scale: 1.05 }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-md opacity-75"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-3xl">
                    {userProfile.avatar}
                  </div>
                </motion.div>

                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {userProfile.name}
                    </span>
                    !
                  </h1>
                  <p className="text-gray-300 text-lg">{userProfile.email}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <GlowButton variant="primary" size="medium">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Sync All Platforms
                </GlowButton>
                <GlowButton variant="secondary" size="medium">
                     <Link to="/analytics" >   
                  View Analytics
                  </Link>
                </GlowButton>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sync Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {Object.entries(syncStatus).map(([platform, status], index) => (
            <motion.div key={platform} whileHover={{ scale: 1.02, y: -5 }} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {platform === "github" && <Github className="w-6 h-6 text-gray-400" />}
                    {platform === "youtube" && <Youtube className="w-6 h-6 text-red-400" />}
                    {platform === "coursera" && <BookOpen className="w-6 h-6 text-blue-400" />}
                    <span className="text-white font-medium capitalize">{platform}</span>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      status.status === "synced"
                        ? "bg-green-400"
                        : status.status === "syncing"
                          ? "bg-yellow-400 animate-pulse"
                          : "bg-red-400"
                    }`}
                  ></div>
                </div>
                <ProgressRing progress={status.progress} size={60} />
                <p className="text-gray-400 text-sm mt-3">Last sync: {status.lastSync}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Github className="w-8 h-8 text-white" />
              <h2 className="text-3xl font-bold text-white">Trending Repositories</h2>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">3 new</span>
            </div>
            <GlowButton variant="ghost" size="small">
              View All
            </GlowButton>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {recommendations.github.map((repo, index) => (
              <motion.div
                key={repo.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <RecommendationCard type="github" data={repo} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* YouTube Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Youtube className="w-8 h-8 text-red-500" />
              <h2 className="text-3xl font-bold text-white">Recommended Videos</h2>
              <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">AI Curated</span>
            </div>
            <GlowButton variant="ghost" size="small">
              View All
            </GlowButton>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {recommendations.youtube.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <RecommendationCard type="youtube" data={video} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Coursera Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <h2 className="text-3xl font-bold text-white">Learning Paths</h2>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                Personalized
              </span>
            </div>
            <GlowButton variant="ghost" size="small">
              View All
            </GlowButton>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {recommendations.coursera.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <RecommendationCard type="coursera" data={course} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <GlowButton variant="primary" size="medium">
              Customize Preferences
            </GlowButton>
            <GlowButton variant="secondary" size="medium">
              Export Learning Data
            </GlowButton>
            <GlowButton variant="ghost" size="medium">
              Connect More Platforms
            </GlowButton>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
