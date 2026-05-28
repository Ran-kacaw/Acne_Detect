import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  Clock,
  Info,
  Mail,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/history', label: 'History', icon: Clock },
  { to: '/about', label: 'About Us', icon: Info },
  { to: '/contact', label: 'Contact Us', icon: Mail },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    setDropdownOpen(false)
    setMobileOpen(false)
    navigate('/login')
  }

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-[linear-gradient(135deg,#0f4f4c_0%,#2a6360_42%,#3c8b89_72%,#e6df8f_160%)]
        border-b border-[#e6df8f]/25
        shadow-[0_10px_30px_rgba(15,79,76,0.28)]
        backdrop-blur-md
      "
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 font-bold text-lg">
          <span className="text-white">Acne</span>
          <span className="text-[#e6df8f]">Detect</span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.to

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                  isActive
                    ? 'bg-[#e6df8f] text-[#1f5a55] shadow-[0_0_18px_rgba(230,223,143,0.45)] scale-105'
                    : 'text-white/85 hover:bg-white/10 hover:text-[#e6df8f] hover:scale-105'
                }`}
              >
                <Icon
                  size={16}
                  className="group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                />
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="
                  flex items-center gap-2
                  bg-white/12 text-white
                  px-4 py-2 rounded-full
                  border border-white/20
                  hover:bg-white/18
                  transition text-sm font-medium
                "
              >
                <User size={16} />
                {user?.name || 'User'}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    <LogOut size={16} />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="
                border border-[#e6df8f]
                text-[#e6df8f]
                px-5 py-2 rounded-full
                text-sm font-medium
                hover:bg-[#e6df8f]
                hover:text-[#1f5a55]
                transition-all duration-300
                hover:scale-105
              "
            >
              Login
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="
            md:hidden
            bg-[linear-gradient(135deg,#0f4f4c_0%,#245755_55%,#2f7f79_100%)]
            border-t border-[#e6df8f]/20
            px-4 py-4 space-y-3
          "
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.to

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm rounded-lg px-3 py-2 transition ${
                  isActive
                    ? 'bg-[#e6df8f] text-[#1f5a55] font-semibold'
                    : 'text-white/90 hover:text-[#e6df8f] hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-[#e6df8f] hover:text-white transition px-3 py-2"
            >
              <LogOut size={16} />
              Keluar
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-[#e6df8f] font-medium hover:text-white transition px-3 py-2"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
