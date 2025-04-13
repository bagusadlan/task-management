import { Navigate, Outlet } from 'react-router-dom'

import { useAuthContext } from '@/contexts/AuthContext'
import { ROUTES } from '@/lib/config/routes'

export default function PublicRoute() {
  const { isAuthenticated } = useAuthContext()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.homepageRoute} replace />
  }

  return <Outlet />
}
