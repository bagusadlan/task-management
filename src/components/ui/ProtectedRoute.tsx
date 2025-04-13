import { Navigate, Outlet } from 'react-router-dom'

import { useAuthContext } from '@/contexts/AuthContext'
import { ROUTES } from '@/lib/config/routes'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.loginPageRoute} replace />
  }

  return <Outlet />
}
