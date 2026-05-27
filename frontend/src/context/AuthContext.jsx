import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  getProfileRequest,
  loginRequest,
  registerRequest,
  updateProfileRequest,
} from '../services/authService'

const AuthContext = createContext(null)

const STORAGE_KEY = 'wijaya_auth'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      setLoading(false)
      return
    }
    try {
      const parsed = JSON.parse(raw)
      if (parsed?.token) {
        setToken(parsed.token)
        setUser(parsed.user ?? null)
        getProfileRequest()
          .then((freshUser) => {
            setUser(freshUser)
            window.localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({ token: parsed.token, user: freshUser }),
            )
          })
          .catch(() => {
            // silently keep cached user
          })
      }
    } catch {
      // ignore corrupted storage
    } finally {
      setLoading(false)
    }
  }, [])

  const login = async (credentials) => {
    const response = await loginRequest(credentials)
    const payload = {
      token: response.token,
      user: response.user,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setToken(response.token)
    setUser(response.user)
    return response
  }

  const register = async (credentials) => {
    const response = await registerRequest(credentials)
    const payload = {
      token: response.token,
      user: response.user,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setToken(response.token)
    setUser(response.user)
    return response
  }

  const refreshProfile = async () => {
    const freshUser = await getProfileRequest()
    setUser(freshUser)
    if (token) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ token, user: freshUser }),
      )
    }
    return freshUser
  }

  const updateProfile = async (payload) => {
    const freshUser = await updateProfileRequest(payload)
    setUser(freshUser)
    if (token) {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ token, user: freshUser }),
      )
    }
    return freshUser
  }

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      refreshProfile,
      updateProfile,
      logout,
    }),
    [token, user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

