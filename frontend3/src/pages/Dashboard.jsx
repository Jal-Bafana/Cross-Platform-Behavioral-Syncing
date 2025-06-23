"use client"
import { motion } from "framer-motion"
import { Github, Youtube, BookOpen, RefreshCw, User } from "lucide-react"
import RecommendationCard from "../components/RecommendationCard"

const Dashboard = () => {
  const recommendations = {
    github: [
      {
        title: "React Query",
        description: "Powerful data synchronization for React",
        stars: "35.2k",
        language: "TypeScript",
      },
      {
        title: "Framer Motion",
        description: "Production-ready motion library for React",
        stars: "21.8k",
        language: "JavaScript",
      },
      { title: "Tailwind CSS", description: "Utility-first CSS framework", stars: "75.1k", language: "CSS" },
    ],
    youtube: [
      { title: "Advanced React Patterns", channel: "Tech With Tim", duration: "45:32", views: "234K" },
      { title: "Building Modern UIs", channel: "Fireship", duration: "12:18", views: "892K" },
      { title: "JavaScript Performance Tips", channel: "Web Dev Simplified", duration: "28:45", views: "156K" },
    ],
    coursera: [
      { title: "Machine Learning Specialization", provider: "Stanford University", rating: 4.9, students: "2.1M" },
      { title: "Full Stack Web Development", provider: "Meta", rating: 4.7, students: "890K" },
      { title: "Data Science with Python", provider: "IBM", rating: 4.6, students: "1.5M" },
    ],
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 mb-12"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Welcome, Learner!</h1>
                <p className="text-gray-300">Your personalized learning dashboard</p>
              </div>
            </div>
            <button className="glass-button flex items-center space-x-2 px-6 py-3 rounded-full hover:scale-105 transition-transform">
              <RefreshCw className="w-5 h-5" />
              <span>Sync Now</span>
            </button>
          </div>
        </motion.div>

        {/* GitHub Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Github className="w-8 h-8 text-white" />
            <h2 className="text-2xl font-bold text-white">GitHub Repositories</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Youtube className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-bold text-white">YouTube Videos</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-white">Coursera Courses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
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

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-4">
            <button className="glass-button px-6 py-3 rounded-full hover:scale-105 transition-transform">
              View All Recommendations
            </button>
            <button className="glass-button-secondary px-6 py-3 rounded-full hover:scale-105 transition-transform">
              Customize Preferences
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
