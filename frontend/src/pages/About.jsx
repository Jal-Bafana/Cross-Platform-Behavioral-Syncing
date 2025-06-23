"use client"

import { motion } from "framer-motion"
import { Brain, Heart, Users, Zap, Target, Rocket, Shield, Globe, Github, Linkedin } from "lucide-react"
import GlowButton from "../components/GlowButton"
import { useNavigate } from "react-router-dom";


const About = () => {
  const navigate = useNavigate();
  const teamValues = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description:
        "Cutting-edge machine learning algorithms that understand your unique learning patterns and preferences",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Heart,
      title: "User-Centric Design",
      description: "Every feature is crafted with love and attention to what learners actually need in their journey",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: Users,
      title: "Community-Driven",
      description: "Growing together with our vibrant community of passionate learners and educators worldwide",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "Constantly pushing boundaries to make learning more effective, engaging, and accessible",
      color: "from-yellow-400 to-orange-500",
    },
  ]

 

  const techStack = [
    "React",
    "Next.js",
    "JavaScript",
    "Tailwind CSS",
    "Python",
    "FastAPI",
    "MySQL",
    "OAuth 2.0",
    "Natural Language Processing (NLP)",
    "scikit-learn",
    "KeyBERT",
    "sentence-transformers",
    "Selenium",
    "Pandas"
  ]

  const members = [
    {
      name: "Jal",
      github: "https://github.com/Jal-Bafana",
      linkedin: "https://www.linkedin.com/in/jalbafana/",
    },
    {
      name: "Kanish",
      github: "https://github.com/kanishjn",
      linkedin: "https://www.linkedin.com/in/kanish-jain-1b83902ab/",
    },
    {
      name: "Saurabh",
      github: "https://github.com/sdsorigins",
      linkedin: "https://www.linkedin.com/in/saurabh-shandilya-a24988278/",
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About SyncMind
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            We're revolutionizing how people learn by connecting their digital learning footprint across platforms with
            the power of artificial intelligence
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative group"
              whileHover={{ scale: 1.05, y: -5 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-3xl blur-xl"></div>
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
            <div className="flex items-center space-x-4 mb-8">
              <Rocket className="w-10 h-10 text-cyan-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-white">Our Mission</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  In today's digital age, learning happens everywhere - from GitHub repositories to YouTube tutorials,
                  from online courses to documentation. But these learning experiences exist in silos, making it hard to
                  see the bigger picture of your growth journey.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  SyncMind bridges these gaps by using AI to analyze your activity across platforms, understand your
                  learning patterns, and provide personalized recommendations that accelerate your growth exponentially.
                </p>
              </div>
              <div className="relative">
                <motion.div
                  className="w-full h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Brain className="w-24 h-24 text-cyan-400" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              What Drives Us
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all"></div>
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="flex items-start space-x-6">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </div>
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
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative mb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-3xl blur-xl"></div>
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                The Technology
              </span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
              SyncMind is built on a foundation of modern web technologies and advanced AI algorithms. We use machine
              learning to analyze patterns, natural language processing for content relevance, and graph neural networks
              to map knowledge connections.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-white font-medium hover:border-cyan-400/50 transition-all cursor-pointer"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-3xl blur-xl"></div>
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-6xl mb-6"
            >
              💡
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Built with 💡 by the SyncMind Team
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're a passionate team of developers, designers, and AI researchers who believe in the power of connected
              learning and personalized education.
            </p>
            <motion.p
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              Join us in shaping the future of personalized education 🚀
            </motion.p>
          </div>
        </motion.div>

        {/* Member Cards Section - added at the end */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20"
        >
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              className="relative group"
              whileHover={{ scale: 1.05, y: -5 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.5,
                  ease: "easeInOut",
                },
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{member.name}</div>
                <div className="flex justify-center space-x-4 mt-2">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-white transition"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-white transition"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="flex flex-wrap justify-center mt-8">
                    <GlowButton variant="primary" size="medium" onClick={() => navigate("/dashboard")}>
                      Dashboard                    
                  </GlowButton>
        </div>
      </div>
    </div>
  )
}

export default About
