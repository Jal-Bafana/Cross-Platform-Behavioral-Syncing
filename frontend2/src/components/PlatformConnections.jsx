"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Github, Youtube, BookOpen, CheckCircle, AlertCircle, Loader2, Zap } from "lucide-react"

export function PlatformConnections() {
  const [platforms, setPlatforms] = useState([
    {
      id: "github",
      name: "GitHub",
      icon: Github,
      connected: true,
      syncing: false,
      lastSync: "2 minutes ago",
      activities: 47,
      color: "from-gray-600 to-gray-800",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: Youtube,
      connected: true,
      syncing: false,
      lastSync: "5 minutes ago",
      activities: 23,
      color: "from-red-500 to-red-700",
    },
    {
      id: "coursera",
      name: "Coursera",
      icon: BookOpen,
      connected: false,
      syncing: false,
      lastSync: "Never",
      activities: 0,
      color: "from-blue-500 to-blue-700",
    },
  ])

  const handleConnect = async (platformId) => {
    setPlatforms((prev) => prev.map((p) => (p.id === platformId ? { ...p, syncing: true } : p)))

    // Simulate connection process
    setTimeout(() => {
      setPlatforms((prev) =>
        prev.map((p) =>
          p.id === platformId
            ? {
                ...p,
                connected: true,
                syncing: false,
                lastSync: "Just now",
                activities: Math.floor(Math.random() * 30) + 10,
              }
            : p,
        ),
      )
    }, 2000)
  }

  const connectedCount = platforms.filter((p) => p.connected).length
  const totalActivities = platforms.reduce((sum, p) => sum + p.activities, 0)

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Platform Connections</h2>
          <Badge className="glass-button border-green-500/50 text-green-300">
            <CheckCircle className="w-4 h-4 mr-2" />
            {connectedCount}/3 Connected
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">{connectedCount}</div>
            <div className="text-sm text-muted-foreground">Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">{totalActivities}</div>
            <div className="text-sm text-muted-foreground">Activities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400">95%</div>
            <div className="text-sm text-muted-foreground">Sync Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">24h</div>
            <div className="text-sm text-muted-foreground">Last Update</div>
          </div>
        </div>
      </motion.div>

      {/* Platform Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card p-6 glow-effect"
            >
              <div className="space-y-4">
                {/* Platform Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${platform.color} flex items-center justify-center`}
                    >
                      <platform.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{platform.name}</h3>
                      <p className="text-xs text-muted-foreground">{platform.lastSync}</p>
                    </div>
                  </div>

                  {platform.connected ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>

                {/* Connection Status */}
                {platform.connected ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Activities</span>
                      <span className="text-white font-medium">{platform.activities}</span>
                    </div>
                    <Progress value={(platform.activities / 50) * 100} className="h-2 bg-white/10" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">Connect to start syncing your data</p>
                    <Button
                      onClick={() => handleConnect(platform.id)}
                      disabled={platform.syncing}
                      className="w-full glass-button bg-gradient-to-r from-purple-500/20 to-yellow-400/20 hover:from-purple-500/40 hover:to-yellow-400/40 border-purple-500/50"
                    >
                      {platform.syncing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Connect
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
