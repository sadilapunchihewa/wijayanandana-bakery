import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/common/WhatsAppButton'
import PageTransition from './components/common/PageTransition'
import ProtectedRoute from './components/common/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AddProduct from './pages/admin/AddProduct'
import ManageProducts from './pages/admin/ManageProducts'
import AddMeal from './pages/admin/AddMeal'
import ManageMeals from './pages/admin/ManageMeals'
import AddBakeryProduct from './pages/admin/AddBakeryProduct'
import ManageBakeryProducts from './pages/admin/ManageBakeryProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminPlaceholder from './pages/admin/AdminPlaceholder'

function App() {
  const location = useLocation()
  const authPage = ['/login', '/register'].includes(location.pathname)
  const adminPage = location.pathname.startsWith('/admin')

  return (
    <div className="relative min-h-screen">
      {!authPage && !adminPage && <Navbar />}
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="products" element={<ManageProducts />} />
            <Route path="add-meal" element={<AddMeal />} />
            <Route path="meals" element={<ManageMeals />} />
            <Route path="add-bakery" element={<AddBakeryProduct />} />
            <Route path="bakery" element={<ManageBakeryProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminPlaceholder title="Customers" />} />
            <Route path="reviews" element={<AdminPlaceholder title="Reviews" />} />
            <Route path="messages" element={<AdminPlaceholder title="Messages" />} />
            <Route path="settings" element={<AdminPlaceholder title="Settings" />} />
          </Route>
        </Routes>
      </PageTransition>
      {!authPage && !adminPage && <Footer />}
      {!authPage && !adminPage && <WhatsAppButton />}
    </div>
  )
}

export default App
