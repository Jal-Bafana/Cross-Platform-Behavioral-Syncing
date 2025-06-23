"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Brain, Search, Filter } from "lucide-react"
import { PlatformConnections } from "@/components/PlatformConnections"
import { ActivityFeed } from "@/components/ActivityFeed"
import { RecommendationGrid } from "@/components/RecommendationGrid"
import { KnowledgeGraph } from "@/components/KnowledgeGraph"
import { FilterControls } from "@/components/FilterControls"

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState([])

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

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search across platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 glass-button border-0"
              />
            </div>
            <Button variant="ghost" size="icon" className="glass-button">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Platform Connections */}
        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <PlatformConnections />
        </motion.section>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ActivityFeed />
          </motion.div>

          {/* Knowledge Graph */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <KnowledgeGraph />
          </motion.div>
        </div>

        {/* Filter Controls */}
        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <FilterControls selectedFilters={selectedFilters} onFiltersChange={setSelectedFilters} />
        </motion.section>

        {/* Recommendations Grid */}
        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <RecommendationGrid filters={selectedFilters} />
        </motion.section>
      </div>
    </div>
  )
}
