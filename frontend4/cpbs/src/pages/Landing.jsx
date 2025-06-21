"use client"
import {useEffect} from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Github, Youtube, BookOpen, Sparkles, Zap, Target, Network, TrendingUp, User } from "lucide-react"
import { useAppContext } from "../App"
import PlatformCard from "../components/PlatformCard"
import FeatureCard from "../components/FeatureCard"
import GlowButton from "../components/GlowButton"
import ConnectedPlatformCard from "../components/ConnectedPlatformCard"

const Landing = () => {
  const navigate = useNavigate()
  const {
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    user,
    isGitHubConnected,
    setIsGitHubConnected,
    isYouTubeConnected,
    setIsYouTubeConnected,
    isCourseraConnected,
    setIsCourseraConnected,
    setPlatformData,
  } = useAppContext()
useEffect(() => {
  const updateAuthState = async () => {
    try {
      // Check if we have an auth token from redirect
      const urlParams = new URLSearchParams(window.location.search);
      const authToken = urlParams.get('auth_token');
      
      if (authToken) {
        // Claim the session
        const claimRes = await fetch(`http://localhost:8000/auth/claim?auth_token=${authToken}`, {
          credentials: "include"
        });
        const claimData = await claimRes.json();
        
        if (claimData.success) {
          // Remove token from URL
          window.history.replaceState({}, '', '/');
          
          // Set the user data
          setIsYouTubeConnected(true);
          setIsAuthenticated(true);
          setUser({
            name: claimData.user.name,
            email: claimData.user.email
          });
          return;
        }
      }
      
      // Normal auth check for existing sessions
      const res = await fetch("http://localhost:8000/auth/status", {
        credentials: "include"
      });
      const data = await res.json();
      console.log("Auth status:", data);

      if (data.google_connected) {
        setIsYouTubeConnected(true);

        const userRes = await fetch(`http://localhost:8000/auth/user?email=${data.google_email}`, {
          credentials: "include"
        });
        const userData = await userRes.json();
        setUser({
          name: userData.user.name,
          email: userData.email
        });
      }

      if (data.github_connected) {
        setIsGitHubConnected(true);
      }

      if (data.google_connected || data.github_connected) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Auth state check failed", err);
    }
  };

  updateAuthState();
}, []);

const handleGoogleSignIn = async () => {
  try {
    const response = await fetch("http://localhost:8000/auth/google/login");
  
    const { auth_url } = await response.json();
    if (auth_url) {
      window.location.href = auth_url;
    }
  } catch (error) {
    console.error("OAuth login failed:", error);
  }
};

const handleGitHubSignIn = async () => {
  try {
    const response = await fetch("http://localhost:8000/auth/github");
    const { url } = await response.json();
    if (url) {
      window.location.href = url;
    }
  } catch (error) {
    console.error("OAuth login failed:", error);
  }
};
 const mockData = {
      github: {
        repos: 15,
        stars: 234,
        contributions: 89,
        topLanguages: ["JavaScript", "Python", "TypeScript"],
      },
      youtube: {
        watchTime: "45h",
        videosWatched: 127,
        channels: 23,
        categories: ["Programming", "Tech Reviews", "Tutorials"],
      },
      coursera: {
        coursesCompleted: 8,
        certificatesEarned: 5,
        hoursLearned: 156,
        subjects: ["Machine Learning", "Web Development", "Data Science"],
      }
    }
      const handleConnectPlatform = (platform) => {
  switch (platform) {
    case "github":
      handleGitHubSignIn(); // OAuth flow
      break;
    case "youtube":
      handleGoogleSignIn(); // OAuth flow
      break;
    case "coursera":
      setIsCourseraConnected(true);
      setPlatformData((prev) => ({ ...prev, coursera: mockData.coursera }));
      break;
  }
};

// When GitHub is connected
useEffect(() => {
  if (isGitHubConnected) {
    setPlatformData((prev) => ({ ...prev, github: mockData.github }));
  }
}, [isGitHubConnected]);

// When YouTube is connected
useEffect(() => {
  if (isYouTubeConnected) {
    setPlatformData((prev) => ({ ...prev, youtube: mockData.youtube }));
  }
}, [isYouTubeConnected]);


  const platforms = [
    {
      name: "GitHub",
      icon: Github,
      description: "Track your coding journey and discover trending repositories",
      gradient: "from-gray-600 via-gray-700 to-black",
      glowColor: "shadow-gray-500/50",
      stats: "50M+ Repos",
      isConnected: isGitHubConnected,
      platform: "github",
    },
    {
      name: "YouTube",
      icon: Youtube,
      description: "Analyze learning videos and get AI-curated recommendations",
      gradient: "from-red-600 via-red-700 to-red-900",
      glowColor: "shadow-red-500/50",
      stats: "2B+ Videos",
      isConnected: isYouTubeConnected,
      platform: "youtube",
    },
    {
      name: "Coursera",
      icon: BookOpen,
      description: "Sync course progress and unlock personalized learning paths",
      gradient: "from-blue-600 via-blue-700 to-blue-900",
      glowColor: "shadow-blue-500/50",
      stats: "4K+ Courses",
      isConnected: isCourseraConnected,
      platform: "coursera",
    },
  ]

  const features = [
    {
      title: "Smart Recommendations",
      description: "AI analyzes your learning patterns across platforms to suggest the perfect next step",
      icon: Sparkles,
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Learning Graph Visualizer",
      description: "See connections between your skills and discover knowledge gaps to fill",
      icon: Network,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Cross-platform Sync Status",
      description: "Real-time synchronization of your progress across all connected platforms",
      icon: Zap,
      color: "from-purple-400 to-pink-500",
    },
  ]

  return (
    <div className="relative min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Sync Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Digital Footprint
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              AI-powered learning dashboard that connects your{" "}
              <span className="text-cyan-400 font-semibold">GitHub</span>,{" "}
              <span className="text-red-400 font-semibold">YouTube</span>, and{" "}
              <span className="text-blue-400 font-semibold">Coursera</span> activity to accelerate your growth
            </motion.p>
          </motion.div>

          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <GlowButton variant="primary" size="large" className="group" onClick={handleGoogleSignIn}>
                <span className="flex items-center space-x-3">
                  <span>Continue with Google</span>
                  <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </span>
              </GlowButton>

              <GlowButton variant="secondary" size="large" onClick={handleGitHubSignIn}>
                <span className="flex items-center space-x-3">
                  <Github className="w-6 h-6" />
                  <span>Continue with GitHub</span>
                </span>
              </GlowButton>
            </motion.div>
          )}

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "10K+", label: "Active Users" },
              { number: "1M+", label: "Synced Activities" },
              { number: "95%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platform Showcase */}
      {isAuthenticated && (
        <section className="py-20 px-6 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Connect Your Universe
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Seamlessly integrate with the platforms you already use to learn and grow
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {platform.isConnected ? (
                    <ConnectedPlatformCard {...platform} />
                  ) : (
                    <PlatformCard {...platform} onConnect={() => handleConnectPlatform(platform.platform)} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Analytics Button */}
            {(isGitHubConnected || isYouTubeConnected || isCourseraConnected) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-center mt-12"
              >
                <GlowButton variant="primary" size="large" onClick={() => navigate("/dashboard")} className="group">
                  <span className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6" />
                    <span>Dashboard</span>
                  </span>
                </GlowButton>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Dynamic Features Showcase */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Powered by AI Intelligence
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced machine learning algorithms that understand your learning style and optimize your growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 120,
                }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 px-6 relative">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-xl"></div>
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12">
                <h3 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Ready to Sync Your Journey?
                  </span>
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join thousands of learners who are already optimizing their growth with AI-powered insights
                </p>
                <GlowButton variant="primary" size="large" onClick={handleGoogleSignIn}>
                  <span className="flex items-center space-x-3">
                    <Target className="w-6 h-6" />
                    <span>Start Your Journey</span>
                  </span>
                </GlowButton>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Landing
