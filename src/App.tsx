import './App.css'

import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout'
import { HomePage, LoginPage, RegisterPage, ProductsPage, ProductsDetailPage, CartPage } from './pages'
import { ROUTES } from './lib/config/routes'

function App() {
  return (
    <Routes>
      <Route path={ROUTES.homepageRoute} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route index path={ROUTES.loginPageRoute} element={<LoginPage />} />
        <Route index path={ROUTES.registerPageRoute} element={<RegisterPage />} />
        <Route index path={ROUTES.productsPageRoute} element={<ProductsPage />} />
        <Route index path={ROUTES.productsDetailPageRoute} element={<ProductsDetailPage />} />
        <Route index path={ROUTES.cartPageRoute} element={<CartPage />} />
      </Route>
    </Routes>
  )
}

export default App
