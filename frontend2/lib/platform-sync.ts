interface PlatformAPI {
  platform: string
  baseUrl: string
  scopes: string[]
}

export const PLATFORM_CONFIGS: Record<string, PlatformAPI> = {
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
  stackoverflow: {
    platform: "Stack Overflow",
    baseUrl: "https://api.stackexchange.com/2.3",
    scopes: ["read_inbox", "no_expiry"],
  },
  coursera: {
    platform: "Coursera",
    baseUrl: "https://api.coursera.org/api",
    scopes: ["view_profile", "view_courses"],
  },
}

export interface UserActivity {
  platform: string
  type: "code" | "video" | "question" | "course"
  title: string
  tags: string[]
  timestamp: Date
  engagement: number
}

export interface LearningInterest {
  topic: string
  confidence: number
  sources: string[]
  relatedSkills: string[]
}

export class CrossPlatformAnalyzer {
  private activities: UserActivity[] = []

  addActivity(activity: UserActivity) {
    this.activities.push(activity)
  }

  extractInterests(): LearningInterest[] {
    const topicFrequency: Record<string, { count: number; sources: Set<string>; engagement: number }> = {}

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

  private findRelatedSkills(topic: string): string[] {
    const skillMap: Record<string, string[]> = {
      React: ["JavaScript", "TypeScript", "JSX", "Hooks", "State Management"],
      "Machine Learning": ["Python", "TensorFlow", "PyTorch", "Data Science", "Statistics"],
      "System Design": ["Architecture", "Scalability", "Databases", "Microservices", "Load Balancing"],
      DevOps: ["Docker", "Kubernetes", "CI/CD", "AWS", "Infrastructure"],
    }

    return skillMap[topic] || []
  }

  generateRecommendations(interests: LearningInterest[]): any[] {
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

  private selectBestPlatform(interest: LearningInterest): string {
    if (interest.sources.includes("GitHub")) return "Coursera"
    if (interest.sources.includes("YouTube")) return "YouTube"
    return "Coursera"
  }

  private selectContentType(interest: LearningInterest): string {
    const types = ["Course", "Video Series", "Specialization", "Playlist", "Tutorial"]
    return types[Math.floor(Math.random() * types.length)]
  }

  private estimateTime(interest: LearningInterest): string {
    const times = ["2 hours", "4 hours", "1 week", "2 weeks", "1 month", "3 months"]
    return times[Math.floor(interest.confidence / 20)]
  }

  private assessDifficulty(interest: LearningInterest): string {
    if (interest.confidence > 80) return "Advanced"
    if (interest.confidence > 60) return "Intermediate"
    return "Beginner"
  }
}

export async function syncPlatformData(platform: string, accessToken: string): Promise<UserActivity[]> {
  const config = PLATFORM_CONFIGS[platform.toLowerCase()]
  if (!config) throw new Error(`Unsupported platform: ${platform}`)

  // Mock API calls - in real implementation, these would be actual API calls
  const mockActivities: UserActivity[] = []

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
