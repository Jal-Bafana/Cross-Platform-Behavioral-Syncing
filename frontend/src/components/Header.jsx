"use client"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Brain } from "lucide-react"

const Header = () => {
  const location = useLocation()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20"
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors">
          <Brain className="w-8 h-8" />
          <span className="text-xl font-bold">SyncMind</span>
        </Link>

        <div className="flex space-x-6">
          <Link
            to="/"
            className={`text-white hover:text-purple-300 transition-colors ${location.pathname === "/" ? "text-purple-300" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`text-white hover:text-purple-300 transition-colors ${location.pathname === "/dashboard" ? "text-purple-300" : ""}`}
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className={`text-white hover:text-purple-300 transition-colors ${location.pathname === "/about" ? "text-purple-300" : ""}`}
          >
            About
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
