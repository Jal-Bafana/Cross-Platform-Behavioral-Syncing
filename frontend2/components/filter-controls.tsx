"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Code, Video, BookOpen, MessageSquare, Clock, TrendingUp, Star, Zap } from "lucide-react"

interface FilterControlsProps {
  selectedFilters: string[]
  onFiltersChange: (filters: string[]) => void
}

export function FilterControls({ selectedFilters, onFiltersChange }: FilterControlsProps) {
  const filterCategories = [
    {
      name: "Content Type",
      filters: [
        { id: "course", label: "Courses", icon: BookOpen, color: "from-blue-500 to-blue-600" },
        { id: "video", label: "Videos", icon: Video, color: "from-red-500 to-red-600" },
        { id: "article", label: "Articles", icon: MessageSquare, color: "from-green-500 to-green-600" },
        { id: "code", label: "Code", icon: Code, color: "from-purple-500 to-purple-600" },
      ],
    },
    {
      name: "Difficulty",
      filters: [
        { id: "beginner", label: "Beginner", icon: Star, color: "from-green-400 to-green-500" },
        { id: "intermediate", label: "Intermediate", icon: TrendingUp, color: "from-yellow-400 to-yellow-500" },
        { id: "advanced", label: "Advanced", icon: Zap, color: "from-red-400 to-red-500" },
      ],
    },
    {
      name: "Duration",
      filters: [
        { id: "short", label: "< 2 hours", icon: Clock, color: "from-blue-400 to-blue-500" },
        { id: "medium", label: "2-10 hours", icon: Clock, color: "from-purple-400 to-purple-500" },
        { id: "long", label: "> 10 hours", icon: Clock, color: "from-orange-400 to-orange-500" },
      ],
    },
  ]

  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      onFiltersChange(selectedFilters.filter((f) => f !== filterId))
    } else {
      onFiltersChange([...selectedFilters, filterId])
    }
  }

  const clearAllFilters = () => {
    onFiltersChange([])
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Smart Filters</h2>
        {selectedFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="glass-button text-muted-foreground hover:text-white"
          >
            <X className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {selectedFilters.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Active Filters</h3>
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filterId) => {
              const filter = filterCategories.flatMap((cat) => cat.filters).find((f) => f.id === filterId)

              if (!filter) return null

              return (
                <motion.div
                  key={filterId}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge
                    className={`glass-button bg-gradient-to-r ${filter.color} text-white border-0 cursor-pointer`}
                    onClick={() => toggleFilter(filterId)}
                  >
                    <filter.icon className="w-3 h-3 mr-1" />
                    {filter.label}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* Filter Categories */}
      <div className="space-y-6">
        {filterCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <h3 className="text-sm font-medium text-muted-foreground mb-3">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.filters.map((filter, filterIndex) => {
                const isSelected = selectedFilters.includes(filter.id)

                return (
                  <motion.div
                    key={filter.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + filterIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={isSelected ? "default" : "ghost"}
                      size="sm"
                      onClick={() => toggleFilter(filter.id)}
                      className={`glass-button transition-all duration-300 ${
                        isSelected
                          ? `bg-gradient-to-r ${filter.color} text-white border-0 glow-effect`
                          : "hover:bg-white/10"
                      }`}
                    >
                      <filter.icon className="w-4 h-4 mr-2" />
                      {filter.label}
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 pt-6 border-t border-white/10"
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFiltersChange(["course", "intermediate"])}
            className="glass-button hover:bg-blue-500/20"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Intermediate Courses
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFiltersChange(["video", "short"])}
            className="glass-button hover:bg-red-500/20"
          >
            <Video className="w-4 h-4 mr-2" />
            Quick Videos
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onFiltersChange(["advanced", "code"])}
            className="glass-button hover:bg-purple-500/20"
          >
            <Zap className="w-4 h-4 mr-2" />
            Advanced Code
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
