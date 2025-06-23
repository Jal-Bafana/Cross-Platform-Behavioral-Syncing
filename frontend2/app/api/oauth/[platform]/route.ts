import { type NextRequest, NextResponse } from "next/server"
import { PLATFORM_CONFIGS } from "@/lib/platform-sync"

export async function GET(request: NextRequest, { params }: { params: { platform: string } }) {
  const platform = params.platform.toLowerCase()
  const config = PLATFORM_CONFIGS[platform]

  if (!config) {
    return NextResponse.json({ error: "Unsupported platform" }, { status: 400 })
  }

  // In a real implementation, this would redirect to the OAuth provider
  // For demo purposes, we'll return the OAuth URL
  const oauthUrl = generateOAuthUrl(platform, config)

  return NextResponse.json({
    platform: config.platform,
    oauthUrl,
    scopes: config.scopes,
  })
}

function generateOAuthUrl(platform: string, config: any): string {
  const baseUrls: Record<string, string> = {
    github: "https://github.com/login/oauth/authorize",
    youtube: "https://accounts.google.com/oauth2/auth",
    stackoverflow: "https://stackoverflow.com/oauth",
    coursera: "https://accounts.coursera.org/oauth2/v1/auth",
  }

  const clientId = process.env[`${platform.toUpperCase()}_CLIENT_ID`] || "demo_client_id"
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/oauth/${platform}/callback`

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: config.scopes.join(" "),
    response_type: "code",
    state: "demo_state",
  })

  return `${baseUrls[platform]}?${params.toString()}`
}
