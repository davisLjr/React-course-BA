import React, { type JSX } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Loader2 } from 'lucide-react'

const RequireAdmin: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user, isAdmin, loading } = useAuth()
  const loc = useLocation()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '1.5rem'
      }}>
        <Loader2 size={48} style={{ animation: 'spin 1s linear infinite' }} />
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }
  if (!user)    return <Navigate to="/" replace state={{ from: loc }} />
  if (!isAdmin) return <Navigate to="/" replace />

  return children
}

export default RequireAdmin
