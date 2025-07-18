import React, { type JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const RequireAdmin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth()
  const loc = useLocation()

  if (loading) return <div>Cargando...</div>
  if (!user)    return <Navigate to="/" replace state={{ from: loc }} />
  if (!isAdmin) return <Navigate to="/" replace />

  return children
}

export default RequireAdmin
