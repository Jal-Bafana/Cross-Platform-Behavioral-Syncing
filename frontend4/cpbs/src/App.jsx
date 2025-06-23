"use client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, createContext, useContext, useEffect } from "react"
import Navbar from "./components/Navbar"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import About from "./pages/About"
import Analytics from "./pages/Analytics"
import StarField from "./components/StarField"

// Create context for platform connections and user auth
const AppContext = createContext()

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}

// Desktop-only prompt component
const DesktopOnlyPrompt = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-6">
    <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center shadow-2xl">
      <div className="mb-6">
        <svg className="w-16 h-16 mx-auto text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">Desktop Required</h1>
      <p className="text-gray-300 mb-6 leading-relaxed">
        This application is optimized for desktop use and requires a larger screen for the best experience.
      </p>
      <p className="text-sm text-gray-400">
        Screen width detected: {window.innerWidth}px
        <br />
        Minimum required: 1024px
      </p>
    </div>
  </div>
)

function App() {
  // Screen size detection
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkScreenSize = () => {
      // You can adjust this breakpoint as needed (1024px = lg breakpoint in Tailwind)
      setIsDesktop(window.innerWidth >= 1024)
    }

    // Check on mount
    checkScreenSize()

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // User authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ name: "", email: "" })

  // Platform connection states
  const [isGitHubConnected, setIsGitHubConnected] = useState(false)
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false)
  const [isCourseraConnected, setIsCourseraConnected] = useState(false)

  // Platform data
  const [platformData, setPlatformData] = useState({
    github: null,
    youtube: null,
    coursera: null,
  })

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    isGitHubConnected,
    setIsGitHubConnected,
    isYouTubeConnected,
    setIsYouTubeConnected,
    isCourseraConnected,
    setIsCourseraConnected,
    platformData,
    setPlatformData,
  }

  // Show desktop-only prompt if screen is too small
  if (!isDesktop) {
    return <DesktopOnlyPrompt />
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          <StarField />
          <div className="relative z-10">
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export default App