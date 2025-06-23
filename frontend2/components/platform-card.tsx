"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Youtube, BookOpen, MessageSquare } from "lucide-react"

interface PlatformCardProps {
  platform: {
    platform: string
    connected: boolean
    lastSync: string
    activities: number
    interests: string[]
  }
  onConnect: (platform: string) => void
  isConnecting: boolean
}

export function PlatformCard({ platform, onConnect, isConnecting }: PlatformCardProps) {
  const getPlatformIcon = (platformName: string) => {
    switch (platformName) {
      case "GitHub":
        return <Github className="w-5 h-5" />
      case "YouTube":
        return <Youtube className="w-5 h-5" />
      case "Stack Overflow":
        return <MessageSquare className="w-5 h-5" />
      case "Coursera":
        return <BookOpen className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getPlatformIcon(platform.platform)}
            <CardTitle>{platform.platform}</CardTitle>
          </div>
          <Badge variant={platform.connected ? "default" : "secondary"}>
            {platform.connected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <CardDescription>
          Last sync: {platform.lastSync} • {platform.activities} activities tracked
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {platform.connected ? (
          <>
            <div className="space-y-2">
              <h4 className="font-medium">Detected Interests:</h4>
              <div className="flex flex-wrap gap-1">
                {platform.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Refresh Data
            </Button>
          </>
        ) : (
          <Button onClick={() => onConnect(platform.platform)} disabled={isConnecting} className="w-full">
            {isConnecting ? "Connecting..." : "Connect Platform"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
