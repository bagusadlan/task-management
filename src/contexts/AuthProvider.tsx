import { useState, useEffect, ReactNode } from 'react'
import { UserType } from '@/lib/types/authTypes'
import localStorageKey from '@/lib/config/localStorage'
import { AuthContext } from './AuthContext'

interface AuthProviderProps {
  children: ReactNode
}

const user = {
  userID: Date.now().toString(),
  email: 'user@gmail.com',
  password: 'password',
  username: 'User'
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem(localStorageKey.currentUser)
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const isUserTrue = email === user.email && password === user.password

    if (isUserTrue) {
      setCurrentUser(user)
      setIsAuthenticated(true)
      localStorage.setItem(localStorageKey.currentUser, JSON.stringify(user))
      return true
    }
    return false
  }

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    const newUser: UserType = {
      userID: Date.now().toString(),
      username,
      email,
      password
    }

    setCurrentUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem(localStorageKey.currentUser, JSON.stringify(newUser))

    return true
  }

  const logout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem(localStorageKey.currentUser)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
