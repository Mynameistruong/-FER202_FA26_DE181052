import { useCallback, useContext, useMemo, useState } from 'react'
import { AuthContext } from './AuthContext.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('demoUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = useCallback((username, password) => {
    if (!username?.trim()) return false

    if (username === 'admin' && password === '123') {
      const nextUser = { username, role: 'admin' }
      setUser(nextUser)
      localStorage.setItem('demoUser', JSON.stringify(nextUser))
      return true
    }

    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('demoUser')
  }, [])

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === null) {
    throw new Error('useAuth phải được dùng trong <AuthProvider>')
  }

  return context
}
