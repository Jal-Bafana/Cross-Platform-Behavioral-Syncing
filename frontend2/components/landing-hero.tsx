"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Youtube,
  BookOpen,
  MessageSquare,
  Sparkles,
  Brain,
  Network,
  ArrowRight,
  Zap,
  Globe,
  Star,
} from "lucide-react"

interface LandingHeroProps {
  onAuth: () => void
}

export function LandingHero({ onAuth }: LandingHeroProps) {
  const platforms = [
    { icon: Github, name: "GitHub", color: "text-white" },
    { icon: Youtube, name: "YouTube", color: "text-red-500" },
    { icon: BookOpen, name: "Coursera", color: "text-blue-500" },
    { icon: MessageSquare, name: "Stack Overflow", color: "text-orange-500" },
  ]

  const [bubbles, setBubbles] = useState<{ x: number; y: number; duration: number }[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bubbleData = Array.from({ length: 20 }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        duration: Math.random() * 20 + 10,
      }))
      setBubbles(bubbleData)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background parallax-bg overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500/20 rounded-full"
            initial={{ x: bubble.x, y: bubble.y }}
            animate={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Navigation */}
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-gold flex items-center justify-center pulse-glow">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">SyncMind</h1>
          </div>

          <Button variant="ghost" className="glass-button">
            <Star className="w-4 h-4 mr-2" />
            Star on GitHub
          </Button>
        </motion.nav>

        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <Badge className="glass-button border-purple-500/50 text-purple-300">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Learning Intelligence
            </Badge>

            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="gradient-text">Sync Your</span>
              <br />
              <span className="text-white">Digital Footprint</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get personalized recommendations by connecting your learning platforms. One dashboard to rule them all.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={onAuth}
              className="glass-button bg-gradient-to-r from-purple-500 to-gold hover:from-purple-600 hover:to-yellow-500 text-white border-0 px-8 py-6 text-lg glow-effect"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Syncing Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button variant="ghost" size="lg" className="glass-button px-8 py-6 text-lg">
              <Globe className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </motion.div>
        </div>

        {/* Platform Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-card p-6 text-center glow-effect floating-animation"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <platform.icon className={`w-12 h-12 mx-auto mb-3 ${platform.color}`} />
              <h3 className="font-semibold text-white">{platform.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">Connect & Sync</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass-card p-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto">
                <Network className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Cross-Platform Analysis</h3>
              <p className="text-muted-foreground">
                Connect GitHub, YouTube, Coursera, and Stack Overflow for comprehensive insights
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">AI Recommendations</h3>
              <p className="text-muted-foreground">
                Get personalized content suggestions based on your learning patterns
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gold to-orange-500 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Smart Insights</h3>
              <p className="text-muted-foreground">
                Visualize your knowledge graph and discover learning opportunities
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
