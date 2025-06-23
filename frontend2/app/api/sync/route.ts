import { type NextRequest, NextResponse } from "next/server"
import { syncPlatformData, CrossPlatformAnalyzer } from "@/lib/platform-sync"

export async function POST(request: NextRequest) {
  try {
    const { platform, accessToken } = await request.json()

    if (!platform || !accessToken) {
      return NextResponse.json({ error: "Platform and access token are required" }, { status: 400 })
    }

    // Sync data from the specified platform
    const activities = await syncPlatformData(platform, accessToken)

    // Analyze activities to extract learning interests
    const analyzer = new CrossPlatformAnalyzer()
    activities.forEach((activity) => analyzer.addActivity(activity))

    const interests = analyzer.extractInterests()
    const recommendations = analyzer.generateRecommendations(interests)

    return NextResponse.json({
      success: true,
      data: {
        activities: activities.length,
        interests,
        recommendations,
      },
    })
  } catch (error) {
    console.error("Sync error:", error)
    return NextResponse.json({ error: "Failed to sync platform data" }, { status: 500 })
  }
}
