"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import {
  Brain,
  ArrowLeft,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Code,
  Palette,
  Database,
  Globe,
  Users,
  Target,
  Lightbulb,
} from "lucide-react"

export function AboutUs() {
  const navigate = useNavigate()

  const developers = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "Full Stack Developer & AI Specialist",
      bio: "Passionate about creating intelligent systems that bridge the gap between human learning and technology. Specializes in React, Node.js, and machine learning integration.",
      avatar: "/placeholder.svg?height=150&width=150",
      skills: ["React", "JavaScript", "Python", "Machine Learning", "Node.js"],
      socials: {
        github: "https://github.com/alexrodriguez",
        linkedin: "https://linkedin.com/in/alexrodriguez-dev",
        twitter: "https://twitter.com/alexdev",
        email: "alex@syncmind.dev",
      },
      gradient: "from-blue-500 to-purple-600",
      icon: Code,
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "UI/UX Designer & Frontend Engineer",
      bio: "Crafting beautiful and intuitive user experiences with a focus on accessibility and performance. Expert in modern design systems and frontend technologies.",
      avatar: "/placeholder.svg?height=150&width=150",
      skills: ["UI/UX Design", "React", "Tailwind CSS", "Figma", "Animation"],
      socials: {
        github: "https://github.com/sarahchen",
        linkedin: "https://linkedin.com/in/sarahchen-design",
        twitter: "https://twitter.com/sarahdesigns",
        email: "sarah@syncmind.dev",
      },
      gradient: "from-pink-500 to-rose-600",
      icon: Palette,
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Backend Engineer & Data Architect",
      bio: "Building scalable systems and data pipelines that power intelligent recommendations. Expertise in cloud architecture, databases, and API design.",
      avatar: "/placeholder.svg?height=150&width=150",
      skills: ["Node.js", "PostgreSQL", "AWS", "Docker", "GraphQL"],
      socials: {
        github: "https://github.com/marcusjohnson",
        linkedin: "https://linkedin.com/in/marcusjohnson-backend",
        twitter: "https://twitter.com/marcusbuilds",
        email: "marcus@syncmind.dev",
      },
      gradient: "from-green-500 to-emerald-600",
      icon: Database,
    },
  ]

  const companyValues = [
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in the power of connecting learners across platforms and communities.",
    },
    {
      icon: Target,
      title: "Precision",
      description: "Our AI-driven recommendations are tailored to each individual's unique learning journey.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We're constantly pushing the boundaries of what's possible in educational technology.",
    },
  ]

  return (
    <div className="min-h-screen bg-background parallax-bg">
      {/* Navigation Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 glass-card mx-4 mt-4 rounded-2xl"
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-yellow-400 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold gradient-text">SyncMind</h1>
          </div>

          <Button variant="ghost" className="glass-button" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
          <Badge className="glass-button border-purple-500/50 text-purple-300">
            <Globe className="w-4 h-4 mr-2" />
            Meet the Team
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="gradient-text">About</span>
            <br />
            <span className="text-white">SyncMind</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're a passionate team of developers, designers, and data scientists dedicated to revolutionizing how
            people discover and engage with learning content across multiple platforms.
          </p>
        </motion.div>

        {/* Company Values */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-center text-white">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {companyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass-card p-6 text-center glow-effect"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-yellow-400 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-center text-white">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developers.map((dev, index) => (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card p-6 glow-effect group"
              >
                <Card className="bg-transparent border-0 shadow-none">
                  <CardHeader className="text-center space-y-4">
                    {/* Avatar */}
                    <div className="relative mx-auto">
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${dev.gradient} p-1`}>
                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                          <dev.icon className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-yellow-400 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div>
                      <CardTitle className="text-white group-hover:gradient-text transition-all duration-300">
                        {dev.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">{dev.role}</CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{dev.bio}</p>

                    {/* Skills */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {dev.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs glass-button border-white/20">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center space-x-3 pt-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="glass-button hover:bg-gray-600/20"
                        onClick={() => window.open(dev.socials.github, "_blank")}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="glass-button hover:bg-blue-600/20"
                        onClick={() => window.open(dev.socials.linkedin, "_blank")}
                      >
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="glass-button hover:bg-blue-400/20"
                        onClick={() => window.open(dev.socials.twitter, "_blank")}
                      >
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="glass-button hover:bg-red-600/20"
                        onClick={() => window.open(`mailto:${dev.socials.email}`, "_blank")}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card p-8 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            At SyncMind, we believe that learning should be personalized, connected, and intelligent. Our platform
            bridges the gap between different learning platforms, creating a unified experience that adapts to each
            user's unique learning journey.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            By leveraging AI and cross-platform data analysis, we help learners discover content that truly matches
            their interests, skill level, and learning goals across GitHub, YouTube, Coursera, and beyond.
          </p>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Ready to Sync Your Learning?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of learners who are already using SyncMind to discover personalized content across their
            favorite platforms.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="glass-button bg-gradient-to-r from-purple-500 to-yellow-400 hover:from-purple-600 hover:to-yellow-500 text-white border-0 px-8 py-6 text-lg glow-effect"
          >
            <Brain className="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
        </motion.section>
      </div>
    </div>
  )
}
