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
  signIn(name: string, password: string): Promise<Status>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null)

  const signIn = useCallback(async (name: string, password: string): Promise<Status> => {
    // const response = await api.post('users/login', { name, password })
    const response = name === "admin" && password === "admin" ? { data: { token: "token_example" }, status: 200 } : { data: undefined, status: 500 }

    if (response.status != 200) {
      return { status: "error" }
    } 

    const { token } = response.data as any

    api.defaults.headers.authorization = `Bearer ${token}`

    setToken(token)

    return { status: "success" }
  }, [])

  const signOut = useCallback(() => setToken(null), [])

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