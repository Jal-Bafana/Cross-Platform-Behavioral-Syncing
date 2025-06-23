"use client"
import { motion } from "framer-motion"
import { Brain, Heart, Users, Zap } from "lucide-react"

const About = () => {
  const teamValues = [
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Leveraging cutting-edge machine learning to understand your learning patterns",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Built with love and attention to what learners actually need",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Growing together with our community of passionate learners",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Constantly pushing boundaries to make learning more effective",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About SyncMind
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're on a mission to revolutionize how people learn by connecting their digital learning footprint across
            platforms.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            In today's digital age, learning happens everywhere - from GitHub repositories to YouTube tutorials, from
            online courses to documentation. But these learning experiences exist in silos, making it hard to see the
            bigger picture of your growth journey.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            SyncMind bridges these gaps by using AI to analyze your activity across platforms, understand your learning
            patterns, and provide personalized recommendations that accelerate your growth.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Drives Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {teamValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="glass-card p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-gray-300">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-6">The Technology</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            SyncMind is built on a foundation of modern web technologies and advanced AI algorithms. We use machine
            learning to analyze patterns in your learning behavior, natural language processing to understand content
            relevance, and graph neural networks to map knowledge connections.
          </p>
          <div className="flex flex-wrap gap-3">
            {["React", "Node.js", "Python", "TensorFlow", "GraphQL", "PostgreSQL"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white/10 rounded-full text-sm text-purple-300 border border-purple-500/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center glass-card p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Built with 💡 by the SyncMind Team</h2>
          <p className="text-gray-300 text-lg mb-6">
            We're a passionate team of developers, designers, and AI researchers who believe in the power of connected
            learning.
          </p>
          <p className="text-purple-300 font-semibold">Join us in shaping the future of personalized education.</p>
        </motion.div>
      </div>
    </div>
  )
}

export default About
