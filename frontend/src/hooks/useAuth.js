import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

export const useAuth = () => {
  const { user, setUser, clearUser } = useAppStore()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    if (token && userStr && !user) {
      try {
        const parsedUser = JSON.parse(userStr)
        setUser({ ...parsedUser, token })
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
  }, [setUser, user])

  const isAuthenticated = !!user?.token

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    clearUser()
  }

  return { user, isAuthenticated, logout }
}

