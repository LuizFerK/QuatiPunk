import { createContext, useCallback, useState, useContext, ReactNode } from 'react'
import api from '../api'

interface AuthProviderProps {
  children: ReactNode
}

interface Status {
  status: "success" | "error" 
}

interface AuthContextData {
  token: string | null
  signIn(password: string): Promise<Status>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    const token = localStorage.getItem('@QuatiPunk:token')

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return token
    }

    return null
  })

  const signIn = useCallback(async (password: string): Promise<Status> => {
    // const response = await api.post('sessions', { password })
    const response = password == "admin" ? { data: { token: "aisudhasioudh" }, status: 200 } : { data: undefined, status: 500 }

    if (response.status != 200) {
      return { status: "error" }
    } 

    const { token } = response.data as any

    localStorage.setItem('@QuatiPunk:token', token)
    api.defaults.headers.authorization = `Bearer ${token}`

    setToken(token)

    return { status: "success" }
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@QuatiPunk:token')

    setToken(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{ token, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  return context
}