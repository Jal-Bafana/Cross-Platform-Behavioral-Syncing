"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Network, Brain, TrendingUp, Target, Layers } from "lucide-react"

export function KnowledgeGraph() {
  const knowledgeNodes = [
    {
      id: "react",
      label: "React",
      category: "Frontend",
      strength: 95,
      connections: ["javascript", "jsx", "hooks"],
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "javascript",
      label: "JavaScript",
      category: "Language",
      strength: 88,
      connections: ["react", "nodejs", "frontend"],
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "ml",
      label: "Machine Learning",
      category: "AI/ML",
      strength: 72,
      connections: ["python", "tensorflow", "datascience"],
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "python",
      label: "Python",
      category: "Language",
      strength: 78,
      connections: ["ml", "datascience", "backend"],
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "systemdesign",
      label: "System Design",
      category: "Architecture",
      strength: 65,
      connections: ["backend", "databases", "scalability"],
      color: "from-orange-500 to-red-600",
    },
  ]

  const avgStrength = knowledgeNodes.reduce((sum, node) => sum + node.strength, 0) / knowledgeNodes.length

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Knowledge Graph</h2>
          <Badge className="glass-button border-purple-500/50 text-purple-300">
            <Brain className="w-4 h-4 mr-2" />
            AI Analysis
          </Badge>
        </div>

        {/* Graph Visualization */}
        <div className="relative h-64 mb-6 glass-card p-4 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Central Node */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-yellow-400 flex items-center justify-center pulse-glow"
            >
              <Network className="w-8 h-8 text-white" />
            </motion.div>

            {/* Surrounding Nodes */}
            {knowledgeNodes.slice(0, 5).map((node, index) => {
              const angle = index * 72 * (Math.PI / 180)
              const radius = 80
              const x = Math.cos(angle) * radius
              const y = Math.sin(angle) * radius

              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{ scale: 1, x, y }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`absolute w-12 h-12 rounded-full bg-gradient-to-r ${node.color} flex items-center justify-center text-xs font-bold text-white shadow-lg`}
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  {node.label.slice(0, 2).toUpperCase()}
                </motion.div>
              )
            })}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {knowledgeNodes.slice(0, 5).map((_, index) => {
                const angle = index * 72 * (Math.PI / 180)
                const radius = 80
                const x = Math.cos(angle) * radius + 128
                const y = Math.sin(angle) * radius + 128

                return (
                  <motion.line
                    key={index}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    x1="128"
                    y1="128"
                    x2={x}
                    y2={y}
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                )
              })}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ffd700" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Knowledge Stats */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Overall Knowledge Score</span>
            <span className="text-lg font-bold gradient-text">{Math.round(avgStrength)}%</span>
          </div>
          <Progress value={avgStrength} className="h-2 bg-white/10" />
        </div>
      </motion.div>

      {/* Knowledge Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Skill Breakdown</h3>
        <div className="space-y-3">
          {knowledgeNodes.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between p-3 glass-card"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${node.color} flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white">{node.label.slice(0, 2).toUpperCase()}</span>
                </div>
                <div>
                  <div className="font-medium text-white">{node.label}</div>
                  <div className="text-xs text-muted-foreground">{node.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-bold ${
                    node.strength > 90
                      ? "text-green-400"
                      : node.strength > 75
                        ? "text-blue-400"
                        : node.strength > 60
                          ? "text-yellow-400"
                          : "text-gray-400"
                  }`}
                >
                  {node.strength}%
                </div>
                <div className="text-xs text-muted-foreground">{node.connections.length} connections</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 glass-card">
            <Target className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <div className="font-medium text-white">Strong Frontend Foundation</div>
              <div className="text-sm text-muted-foreground">Your React and JavaScript skills are highly developed</div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 glass-card">
            <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <div className="font-medium text-white">Growing ML Interest</div>
              <div className="text-sm text-muted-foreground">Machine Learning knowledge is rapidly expanding</div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 glass-card">
            <Layers className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <div className="font-medium text-white">System Design Gap</div>
              <div className="text-sm text-muted-foreground">Consider focusing on architecture and scalability</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
