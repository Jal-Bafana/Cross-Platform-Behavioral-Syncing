"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Github, Youtube, BookOpen, Sparkles, Brain, TrendingUp } from "lucide-react"
import PlatformCard from "../components/PlatformCard"
import FeatureCard from "../components/FeatureCard"
import ParticleBackground from "../components/ParticleBackground"

const Landing = () => {
  const platforms = [
    {
      name: "GitHub",
      icon: Github,
      description: "Track your coding journey and discover new repositories",
      color: "from-gray-600 to-gray-800",
    },
    {
      name: "YouTube",
      icon: Youtube,
      description: "Analyze your learning videos and get personalized recommendations",
      color: "from-red-600 to-red-800",
    },
    {
      name: "Coursera",
      icon: BookOpen,
      description: "Sync your course progress and find relevant learning paths",
      color: "from-blue-600 to-blue-800",
    },
  ]

  const features = [
    {
      title: "AI Recommendations",
      description: "Get personalized learning suggestions based on your activity across platforms",
      icon: Sparkles,
    },
    {
      title: "Smart Insights",
      description: "Understand your learning patterns and optimize your growth",
      icon: TrendingUp,
    },
    {
      title: "Knowledge Graph",
      description: "Visualize connections between your interests and skills",
      icon: Brain,
    },
  ]

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sync Your Digital Footprint
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              AI-powered learning dashboard for your online platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="glass-button group px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 hover:scale-105">
              <span className="flex items-center space-x-2">
                <span>Continue with Google</span>
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </span>
            </button>

            <button className="glass-button-secondary group px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 hover:scale-105">
              <span className="flex items-center space-x-2">
                <Github className="w-5 h-5" />
                <span>Continue with GitHub</span>
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            Connect Your Learning Platforms
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <PlatformCard {...platform} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          >
            Powered by AI Intelligence
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-12 max-w-2xl mx-auto"
          >
            <h3 className="text-3xl font-bold text-white mb-6">Ready to sync your learning journey?</h3>
            <p className="text-gray-300 mb-8">
              Join thousands of learners who are already optimizing their growth with SyncMind.
            </p>
            <Link
              to="/dashboard"
              className="glass-button inline-block px-8 py-4 text-lg font-semibold text-white rounded-full transition-all duration-300 hover:scale-105"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Landing
