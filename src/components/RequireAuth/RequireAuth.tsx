import type { JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, loading } = useAuth()
  const loc = useLocation()

  if (loading) return <div>Cargando...</div>
  if (!user) return <Navigate to="/" state={{ from: loc }} replace />
  return children
}
