import { createContext, useContext } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import type { AuthContextValue } from '@/features/auth/types'

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth()
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)