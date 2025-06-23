export const PLATFORM_CONFIGS = {
  github: {
    platform: "GitHub",
    baseUrl: "https://api.github.com",
    scopes: ["user", "repo", "read:user"],
  },
  youtube: {
    platform: "YouTube",
    baseUrl: "https://www.googleapis.com/youtube/v3",
    scopes: ["https://www.googleapis.com/auth/youtube.readonly"],
  },
  coursera: {
    platform: "Coursera",
    baseUrl: "https://api.coursera.org/api",
    scopes: ["view_profile", "view_courses"],
  },
}

export class CrossPlatformAnalyzer {
  constructor() {
    this.activities = []
  }

  addActivity(activity) {
    this.activities.push(activity)
  }

  extractInterests() {
    const topicFrequency = {}

    this.activities.forEach((activity) => {
      activity.tags.forEach((tag) => {
        if (!topicFrequency[tag]) {
          topicFrequency[tag] = { count: 0, sources: new Set(), engagement: 0 }
        }
        topicFrequency[tag].count++
        topicFrequency[tag].sources.add(activity.platform)
        topicFrequency[tag].engagement += activity.engagement
      })
    })

    return Object.entries(topicFrequency)
      .map(([topic, data]) => ({
        topic,
        confidence: Math.min(100, data.count * 10 + data.sources.size * 15 + (data.engagement / data.count) * 5),
        sources: Array.from(data.sources),
        relatedSkills: this.findRelatedSkills(topic),
      }))
      .sort((a, b) => b.confidence - a.confidence)
  }

  findRelatedSkills(topic) {
    const skillMap = {
      React: ["JavaScript", "TypeScript", "JSX", "Hooks", "State Management"],
      "Machine Learning": ["Python", "TensorFlow", "PyTorch", "Data Science", "Statistics"],
      "System Design": ["Architecture", "Scalability", "Databases", "Microservices", "Load Balancing"],
      DevOps: ["Docker", "Kubernetes", "CI/CD", "AWS", "Infrastructure"],
    }

    return skillMap[topic] || []
  }

  generateRecommendations(interests) {
    return interests.slice(0, 5).map((interest, index) => ({
      id: `rec-${index}`,
      title: `Advanced ${interest.topic} Mastery`,
      platform: this.selectBestPlatform(interest),
      type: this.selectContentType(interest),
      confidence: Math.round(interest.confidence),
      tags: [interest.topic, ...interest.relatedSkills.slice(0, 2)],
      description: `Personalized ${interest.topic} content based on your ${interest.sources.join(" and ")} activity`,
      estimatedTime: this.estimateTime(interest),
      difficulty: this.assessDifficulty(interest),
    }))
  }

  selectBestPlatform(interest) {
    if (interest.sources.includes("GitHub")) return "Coursera"
    if (interest.sources.includes("YouTube")) return "YouTube"
    return "Coursera"
  }

  selectContentType(interest) {
    const types = ["Course", "Video Series", "Specialization", "Playlist", "Tutorial"]
    return types[Math.floor(Math.random() * types.length)]
  }

  estimateTime(interest) {
    const times = ["2 hours", "4 hours", "1 week", "2 weeks", "1 month", "3 months"]
    return times[Math.floor(interest.confidence / 20)]
  }

  assessDifficulty(interest) {
    if (interest.confidence > 80) return "Advanced"
    if (interest.confidence > 60) return "Intermediate"
    return "Beginner"
  }
}

export async function syncPlatformData(platform, accessToken) {
  const config = PLATFORM_CONFIGS[platform.toLowerCase()]
  if (!config) throw new Error(`Unsupported platform: ${platform}`)

  // Mock API calls - in real implementation, these would be actual API calls
  const mockActivities = []

  switch (platform.toLowerCase()) {
    case "github":
      mockActivities.push(
        {
          platform: "GitHub",
          type: "code",
          title: "React TypeScript Project",
          tags: ["React", "TypeScript", "Frontend"],
          timestamp: new Date(),
          engagement: 85,
        },
        {
          platform: "GitHub",
          type: "code",
          title: "Machine Learning Pipeline",
          tags: ["Python", "Machine Learning", "Data Science"],
          timestamp: new Date(),
          engagement: 92,
        },
      )
      break

    case "youtube":
      mockActivities.push({
        platform: "YouTube",
        type: "video",
        title: "Advanced React Patterns",
        tags: ["React", "JavaScript", "Patterns"],
        timestamp: new Date(),
        engagement: 78,
      })
      break

    case "coursera":
      mockActivities.push({
        platform: "Coursera",
        type: "course",
        title: "Deep Learning Specialization",
        tags: ["Deep Learning", "Neural Networks", "AI"],
        timestamp: new Date(),
        engagement: 95,
      })
      break
  }

  return mockActivities
}
