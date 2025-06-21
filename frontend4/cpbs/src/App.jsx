"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, createContext, useContext } from "react"
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

function App() {
  // User authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
const [user, setUser] = useState({ name: "", email: "" });
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

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
          <StarField />
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export default App
