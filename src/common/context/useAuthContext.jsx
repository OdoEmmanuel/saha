import { createContext, useContext, useState } from 'react'
import { deleteCookie, hasCookie, setCookie } from 'cookies-next'

const AuthContext = createContext(undefined)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export const authSessionKey = '_SHREYU_AUTH_'

export function AuthProvider({ children }) {
  const [user, setUser] = useState({})

  const saveSession = (user) => {

    setCookie(authSessionKey, JSON.stringify(user.token))
    setUser(user.data)
  }

  const removeSession = () => {
    deleteCookie(authSessionKey)
    setUser(undefined)
    localStorage.removeItem('email')
    localStorage.clear();
  }

  const tokens = localStorage.getItem("token")

  const authorizationService = "https://auth-service.test.saha.ng/"
  const middleware = "https://baascore.test.saha.ng/"
  const [pending,setpending] = useState(false)
  
  const request = "platform-backend"
//  const email = localStorage.getItem('email', data.data.email)
const clientid = import.meta.env.VITE_client_id

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: hasCookie(authSessionKey),
        saveSession,
        removeSession,
        middleware,
        authorizationService,
        tokens, 
       pending,
       setpending,
       request, 
       clientid
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
