import { useAuth } from '../context/AuthContext'

export const usePrivateRoute = () => {
  const { user, isAuthenticated } = useAuth()
  return { user, isAuthenticated }
}
