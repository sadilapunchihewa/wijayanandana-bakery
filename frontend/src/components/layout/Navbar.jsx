import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import PrimaryButton from '../ui/PrimaryButton'

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#cakes', label: 'Cakes' },
  { href: '#hotel', label: 'Hotel Food' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const handleScrollTo = (hash) => {
    if (!hash.startsWith('#')) return
    const el = document.querySelector(hash)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4"
    >
      <div
        className={`glass-panel flex w-full max-w-6xl items-center justify-between gap-4 rounded-3xl px-4 py-3 transition-all duration-500 ${
          scrolled ? 'backdrop-blur-2xl' : 'bg-white/60'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3a2518] via-[#5a3b29] to-[#c89b3c] text-xs font-semibold tracking-[0.12em] text-[#fdf6e9] shadow-md shadow-black/20">
            WB
          </div>
          <div className="leading-tight">
            <Link
              to="/"
              className="text-sm font-semibold tracking-[0.16em] text-[#3a2518] uppercase"
            >
              Wijayanandana
            </Link>
            <p className="text-[0.7rem] text-[#7a5b45]">Hotel &amp; Bakery</p>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-xs font-medium text-[#7a5b45] md:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleScrollTo(item.href)}
              className="relative cursor-pointer tracking-[0.18em] uppercase transition-colors hover:text-[#3a2518]"
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#e2d2b8] bg-white/40 text-[#5a3b29] shadow-sm shadow-black/5 hover:bg-white/70 md:inline-flex"
          >
            <span className="sr-only">Cart</span>
            <span className="text-lg">🧺</span>
          </button>

          {isAuthenticated ? (
            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 rounded-full bg-[#f7efe3] px-3 py-1 transition-colors hover:bg-[#efe1ce]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#f2d3a0] to-[#e0b268] text-[0.7rem] font-semibold text-[#3a2518]">
                  {user?.name?.[0]?.toUpperCase() ?? 'W'}
                </div>
                <span className="max-w-[120px] truncate text-[0.7rem] text-[#7a5b45]">
                  {user?.name ?? 'Guest'}
                </span>
              </button>
              <PrimaryButton variant="ghost" onClick={handleLogout} className="text-[0.7rem]">
                Logout
              </PrimaryButton>
            </div>
          ) : (
            <NavLink to="/login" className="hidden md:inline-flex">
              <PrimaryButton variant="ghost" className="text-[0.7rem]">
                Login
              </PrimaryButton>
            </NavLink>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#e2d2b8] bg-white/40 text-[#5a3b29] shadow-sm shadow-black/5 hover:bg-white/70 md:hidden"
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="flex flex-col items-center justify-center gap-1">
              <span
                className={`h-[1.5px] w-4 rounded-full bg-[#5a3b29] transition-transform ${
                  open ? 'translate-y-[4px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[1.5px] w-4 rounded-full bg-[#5a3b29] transition-transform ${
                  open ? '-translate-y-[4px] -rotate-45' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="absolute left-4 right-4 top-[4.25rem] md:hidden"
        >
          <div className="glass-panel flex flex-col gap-3 rounded-3xl px-4 py-3 text-xs text-[#7a5b45]">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleScrollTo(item.href)}
                  className="flex items-center justify-between rounded-2xl px-2 py-1.5 hover:bg-[#f7efe3]"
                >
                  <span className="tracking-[0.18em] uppercase">{item.label}</span>
                  <span className="text-[0.65rem] text-[#b08955]">view</span>
                </button>
              ))}
            </nav>
            <div className="mt-1 flex items-center justify-between gap-2 border-t border-dashed border-[#e4d2b7] pt-2">
                <span className="text-[0.7rem] text-[#7a5b45]">
                {isAuthenticated ? user?.name ?? 'Guest' : 'Welcome to Wijayanandana'}
              </span>
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <NavLink to="/profile" className="text-[0.7rem] font-medium text-[#a66a3b]">
                    Profile
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-[0.7rem] font-medium text-[#a66a3b]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <NavLink to="/login" className="text-[0.7rem] font-medium text-[#a66a3b]">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="text-[0.7rem] font-medium text-[#a66a3b]">
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

