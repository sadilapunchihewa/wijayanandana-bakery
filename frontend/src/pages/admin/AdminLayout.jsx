import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import logoImg from '../../assets/images/logo.png.jpg'
import { Icon } from './AdminIcons'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/admin/add-meal', label: 'Add Meal', icon: 'plus' },
  { to: '/admin/meals', label: 'Manage Meals', icon: 'star' },
  { to: '/admin/add-bakery', label: 'Add Bakery Item', icon: 'plus' },
  { to: '/admin/bakery', label: 'Manage Bakery', icon: 'box' },
  { to: '/admin/add-product', label: 'Add Product', icon: 'plus' },
  { to: '/admin/products', label: 'Manage Products', icon: 'box' },
  { to: '/admin/orders', label: 'Orders', icon: 'orders' },
  { to: '/admin/customers', label: 'Customers', icon: 'users' },
  { to: '/admin/reviews', label: 'Reviews', icon: 'star' },
  { to: '/admin/messages', label: 'Messages', icon: 'message' },
  { to: '/admin/settings', label: 'Settings', icon: 'settings' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#120906] text-[#3A221A]">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(200,155,60,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(246,240,232,0.12),transparent_36%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          onLogout={handleLogout}
        />

        <div className={`admin-main flex min-w-0 flex-1 flex-col transition-all duration-300 ${collapsed ? 'admin-main-collapsed' : ''}`}>
          <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 rounded-[28px] border border-[#ead9bf] bg-[#fffaf2]/96 px-4 py-3 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3A221A] text-[#F6F0E8] lg:hidden"
              >
                <Icon name="menu" />
              </button>
              <div className="hidden min-w-0 flex-1 items-center rounded-2xl border border-[#ead9bf] bg-white/60 px-4 py-2.5 md:flex">
                <Icon name="search" className="text-[#9a7657]" />
                <input
                  type="search"
                  placeholder="Search products, orders, customers..."
                  className="ml-3 flex-1 bg-transparent text-sm text-[#3A221A] placeholder:text-[#a98970] outline-none"
                />
              </div>
              <div className="min-w-0 flex-1 md:flex-none">
                <p className="truncate text-xs uppercase tracking-[0.2em] text-[#9a7657]">Welcome back</p>
                <h1 className="truncate font-serif text-2xl text-[#3A221A]">{user?.name ?? 'Admin'}</h1>
              </div>
              <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-[#ead9bf] bg-white/60 text-[#3A221A]">
                <Icon name="bell" />
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-[#C89B3C]" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="hidden items-center gap-3 rounded-2xl border border-[#ead9bf] bg-white/60 px-3 py-2 sm:flex"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3A221A] text-sm font-semibold text-[#F6F0E8]">
                  {user?.name?.[0]?.toUpperCase() ?? 'A'}
                </span>
                <span className="max-w-[120px] truncate text-sm font-semibold text-[#3A221A]">
                  {user?.name ?? 'Admin'}
                </span>
              </button>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <Outlet />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  )
}

function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen, onLogout }) {
  const sidebar = (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -24, opacity: 0 }}
      className={`fixed bottom-4 left-4 top-4 z-40 flex flex-col rounded-[34px] border border-[#5b3a2f] bg-[#24120d] p-4 text-[#F6F0E8] shadow-[0_30px_90px_rgba(0,0,0,0.44)] transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-[18rem]'
      }`}
    >
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white">
          <img src={logoImg} alt="Wijayanandana logo" className="h-full w-full object-contain p-1.5" />
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-bold uppercase tracking-[0.18em]">Wijayanandana</p>
            <p className="text-[0.72rem] text-[#dcc9b6]">Admin Console</p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => setCollapsed(!collapsed)}
        className="mt-4 hidden rounded-2xl border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.16em] text-[#dcc9b6] hover:bg-white/8 lg:block"
      >
        {collapsed ? 'Open' : 'Collapse'}
      </button>

      <nav className="mt-5 flex flex-1 flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-gradient-to-r from-[#C89B3C] to-[#8A5A24] text-[#201008] shadow-[0_14px_34px_rgba(200,155,60,0.24)]'
                  : 'text-[#dcc9b6] hover:bg-white/8 hover:text-white'
              }`
            }
          >
            <Icon name={item.icon} className="shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-3 text-sm font-medium text-[#ffd9c7] hover:bg-white/8"
      >
        <Icon name="logout" />
        {!collapsed && <span>Logout</span>}
      </button>
    </motion.aside>
  )

  return (
    <>
      <div className="hidden lg:block">{sidebar}</div>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              aria-label="Close sidebar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            />
            <div className="lg:hidden">{sidebar}</div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
