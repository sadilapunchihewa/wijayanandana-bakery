import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import logoImg from '../../assets/images/logo.png.jpg'

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#meals', label: 'Meals' },
  { href: '#bakery', label: 'Bakery' },
  { href: '#history', label: 'Our History' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/login', { replace: true })
  }

  const handleScrollTo = (hash) => {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80)
      return
    }
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-4 sm:px-5"
    >
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border px-4 py-3 shadow-[0_24px_80px_rgba(36,19,11,0.16)] transition-all duration-500 sm:px-5 ${
          scrolled
            ? 'border-white/60 bg-white/78 backdrop-blur-2xl'
            : 'border-white/55 bg-white/58 backdrop-blur-xl'
        }`}
      >
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_14px_34px_rgba(58,34,26,0.18)] ring-1 ring-[#ead9bf] sm:h-16 sm:w-16">
            <img src={logoImg} alt="Wijayanandana logo" className="h-full w-full object-contain p-2" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-extrabold uppercase tracking-[0.24em] text-[#1F2937]">
              Wijayanandana
            </span>
            <span className="block text-[0.72rem] tracking-[0.18em] text-[#D97706]">
              Bakers &amp; Restaurant
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-[0.72rem] font-extrabold uppercase tracking-[0.2em] text-[#6f5141] lg:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleScrollTo(item.href)}
              className="group relative py-2 transition-colors hover:text-[#1F2937]"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => handleScrollTo('#contact')}
            className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#FED7AA] bg-white/62 text-[#1F2937] shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            <span className="sr-only">Cart</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6h15l-2 8H8L6 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#DC2626] text-[0.65rem] font-extrabold text-white">2</span>
          </button>
          {isAuthenticated ? (
            <>
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 rounded-full border border-[#FED7AA] bg-white/50 px-3 py-2 text-xs font-bold text-[#5f4032] transition hover:bg-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3A221A] text-[#F6F0E8]">
                  {user?.name?.[0]?.toUpperCase() ?? 'W'}
                </span>
                <span className="max-w-[110px] truncate">{user?.name ?? 'Guest'}</span>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-[#F59E0B]/50 px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#1F2937] transition hover:border-[#D97706] hover:bg-white"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-full border border-[#F59E0B]/50 px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#1F2937] transition hover:border-[#D97706] hover:bg-white"
            >
              Login
            </NavLink>
          )}
          <button
            type="button"
            onClick={() => handleScrollTo('#contact')}
            className="rounded-full bg-gradient-to-r from-[#DC2626] via-[#D97706] to-[#F59E0B] px-6 py-3 text-xs font-extrabold uppercase tracking-[0.18em] text-white shadow-[0_16px_36px_rgba(217,119,6,0.34)] transition hover:-translate-y-0.5 hover:brightness-105"
          >
            Order Now
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#FED7AA] bg-white/55 text-[#1F2937] shadow-sm md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="flex flex-col gap-1.5">
            <span className={`h-px w-5 bg-current transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-current transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            className="mx-auto mt-3 max-w-7xl rounded-[28px] border border-white/55 bg-white/92 p-4 shadow-[0_24px_70px_rgba(36,19,11,0.18)] backdrop-blur-2xl md:hidden"
          >
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleScrollTo(item.href)}
                  className="flex items-center justify-between rounded-2xl px-3 py-3 text-left text-xs font-extrabold uppercase tracking-[0.18em] text-[#5f4032] hover:bg-[#FFF7ED]"
                >
                  {item.label}
                  <span className="text-[#F59E0B]">+</span>
                </button>
              ))}
            </nav>
            <div className="mt-4 flex gap-2 border-t border-[#FED7AA] pt-4">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 rounded-full border border-[#F59E0B]/50 px-4 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#1F2937]"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-[#F59E0B]/50 px-4 py-3 text-center text-xs font-extrabold uppercase tracking-[0.16em] text-[#1F2937]"
                >
                  Login
                </NavLink>
              )}
              <button
                type="button"
                onClick={() => handleScrollTo('#contact')}
                className="flex-1 rounded-full bg-gradient-to-r from-[#DC2626] to-[#F59E0B] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
