import './App.css'

import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { HomePage, LoginPage, RegisterPage, ProductsPage, ProductsDetailPage, CartPage, NotFound404Page } from './pages'
import { ROUTES } from './lib/config/routes'
import { ProtectedRoute, PublicRoute } from './components/ui'

function App() {
  return (
    <Routes>
      <Route path={ROUTES.homepageRoute} element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route index path={ROUTES.loginPageRoute} element={<LoginPage />} />
          <Route index path={ROUTES.registerPageRoute} element={<RegisterPage />} />
        </Route>
        <Route index path={ROUTES.productsPageRoute} element={<ProductsPage />} />
        <Route index path={ROUTES.productsDetailPageRoute} element={<ProductsDetailPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.homepageRoute} element={<HomePage />} />
          <Route index path={ROUTES.cartPageRoute} element={<CartPage />} />
        </Route>
        <Route path='*' element={<NotFound404Page />} />
      </Route>
    </Routes>
  )
}

export default App
