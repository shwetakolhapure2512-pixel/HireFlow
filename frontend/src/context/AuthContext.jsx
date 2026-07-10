import React, { createContext, useState, useCallback } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('access_token'))

  React.useEffect(() => {
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get('/api/auth/user/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      setToken(null)
    } finally {
      setLoading(false)
    }
  }, [token])

  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login/', { email, password })
      const { access, refresh, user: userData } = response.data
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      setToken(access)
      setUser(userData)
      return userData
    } catch (error) {
      throw error.response?.data || error
    }
  }, [])

  const register = useCallback(async (email, password, password_confirm, first_name, last_name, role) => {
    try {
      const response = await axios.post('/api/auth/register/', {
        email,
        password,
        password_confirm,
        first_name,
        last_name,
        role
      })
      const { access, refresh, user: userData } = response.data
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      setToken(access)
      setUser(userData)
      return userData
    } catch (error) {
      throw error.response?.data || error
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setToken(null)
    setUser(null)
  }, [])

  const value = {
    user,
    loading,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
