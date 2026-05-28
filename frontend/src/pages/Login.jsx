import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PrimaryButton from '../components/ui/PrimaryButton'
import GlassCard from '../components/ui/GlassCard'
import heroImg from '../assets/hero.png'
import logoImg from '../assets/images/logo.png.jpg'

const fieldVariants = {
  focused: {
    scale: 1.01,
    boxShadow: '0 18px 45px rgba(0,0,0,0.08)',
    transition: { duration: 0.25 },
  },
  idle: {
    scale: 1,
    boxShadow: '0 12px 30px rgba(0,0,0,0.03)',
    transition: { duration: 0.25 },
  },
}

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const result = await login({ email, password })
      const redirectTo = location.state?.from?.pathname || '/'
      navigate(redirectTo, { replace: true })
      return result
    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Login failed'
      setError(message)
      setSubmitting(false)
      return null
    }
  }

  return (
    <div className="flex min-h-screen items-stretch bg-gradient-to-br from-[#fdf6e9] via-[#f3e5d0] to-[#e6d2bb]">
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden px-8 pb-16 pt-24 lg:flex">
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate flex h-[80vh] w-full max-w-md flex-col justify-between overflow-hidden rounded-[40px] bg-[#1c120d] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#fef3c7_0,#1c120d_40%)] opacity-70" />
          <div className="absolute -right-16 top-16 h-48 w-48 rounded-full bg-[#f5d19b]/60 blur-3xl" />
          <div className="absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-[#9b6b3b]/40 blur-2xl" />

          <div className="relative px-10 pt-10">
            <div className="mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl bg-white/95 shadow-[0_18px_45px_rgba(0,0,0,0.3)] ring-1 ring-white/40">
              <img
                src={logoImg}
                alt="Wijayanandana logo"
                className="h-full w-full object-contain p-2"
              />
            </div>
            <p className="text-[0.78rem] tracking-[0.28em] uppercase text-[#f2d8af]/80">
              Wijayanandana
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#fdf6e9]">
              Fresh baked luxury,
              <br />
              every morning.
            </h1>
            <p className="mt-3 text-sm text-[#f4dec1]/80">
              Sign in to manage today&apos;s breads, cakes, short eats, breakfast, lunch, and dinner
              service.
            </p>
          </div>

          <div className="relative flex flex-1 items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0, rotate: -4 }}
              animate={{ y: 0, opacity: 1, rotate: -2 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative h-44 w-72 overflow-hidden rounded-[32px] border border-white/10 bg-[#201310]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-[#f5d19b]/40" />
              <img
                src={heroImg}
                alt="Fresh artisan bread and cake selection"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </div>

          <div className="relative px-10 pb-9 text-xs text-[#f4dec1]/70">
            <div className="flex items-center justify-between">
              <p>Curating taste since 1998.</p>
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-[#f2d8af]">
                Anguruwella · Ruwanwella
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex w-full items-center justify-center px-4 py-10 sm:px-8 lg:w-1/2 lg:px-10">
        <GlassCard className="w-full max-w-md rounded-[32px] px-6 py-6 sm:px-8 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white shadow-md shadow-black/10 ring-1 ring-[#e2d2b8]">
                <img
                  src={logoImg}
                  alt="Wijayanandana logo"
                  className="h-full w-full object-contain p-2"
                />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-[0.16em] text-[#3a2518] uppercase">
                  Wijayanandana
                </p>
                <p className="text-[0.76rem] text-[#7a5b45]">Food Hotel &amp; Bakery</p>
              </div>
            </div>
            <p className="text-[0.78rem] tracking-[0.28em] uppercase text-[#a67b49]">
              Welcome back
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#3a2518] sm:text-3xl">
              Sign in to the bakery console
            </h2>
            <p className="mt-2 text-[0.86rem] text-[#7a5b45]">
              Manage orders, curate today&apos;s selection and keep our guests delighted.
            </p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 flex items-center gap-2 rounded-2xl border border-[#f97373]/30 bg-[#fef2f2] px-3 py-2 text-[0.78rem] text-[#b91c1c]"
            >
              <span>⚠️</span>
              <span className="line-clamp-2">{error}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <motion.div
              variants={fieldVariants}
              initial="idle"
              whileFocus="focused"
              className="group"
            >
              <label
                htmlFor="email"
                className="mb-1 block text-[0.78rem] font-medium tracking-[0.16em] uppercase text-[#7a5b45]"
              >
                Email
              </label>
              <motion.div
                variants={fieldVariants}
                className="flex items-center rounded-2xl border border-[#e2d2b8] bg-white/70 px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.03)] focus-within:border-[#d4af37]"
              >
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="flex-1 bg-transparent text-sm text-[#3a2518] placeholder:text-[#b59b7b] focus:outline-none"
                  placeholder="you@wijayanandana.lk"
                />
              </motion.div>
            </motion.div>

            <motion.div variants={fieldVariants} initial="idle" whileFocus="focused" className="group">
              <label
                htmlFor="password"
                className="mb-1 block text-[0.78rem] font-medium tracking-[0.16em] uppercase text-[#7a5b45]"
              >
                Password
              </label>
              <motion.div
                variants={fieldVariants}
                className="flex items-center rounded-2xl border border-[#e2d2b8] bg-white/70 px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.03)] focus-within:border-[#d4af37]"
              >
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="flex-1 bg-transparent text-sm text-[#3a2518] placeholder:text-[#b59b7b] focus:outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="ml-2 text-xs text-[#a67b49] hover:text-[#7a5b45]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </motion.div>
            </motion.div>

            <div className="flex items-center justify-between pt-1 text-[0.75rem] text-[#8a6a4c]">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-[#d6c2a4] text-[#d4af37] focus:ring-[#d4af37]"
                />
                <label htmlFor="remember">Remember this device</label>
              </div>
              <button
                type="button"
                className="text-[0.74rem] font-medium text-[#b08955] hover:text-[#8a6a4c]"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-3">
              <PrimaryButton
                type="submit"
                disabled={submitting}
                className="w-full justify-center text-[0.82rem]"
              >
                {submitting ? 'Signing you in…' : 'Login to dashboard'}
              </PrimaryButton>
            </div>
          </form>

          <p className="mt-4 text-[0.75rem] text-[#9b7a55]">
            Access restricted to authorized staff. Guests can explore the public menu on our main
            site.
          </p>
          <p className="mt-2 text-[0.8rem] text-[#8a6a4c]">
            Need an account?{' '}
            <Link to="/register" className="font-medium text-[#a66a3b] hover:text-[#8a5b2f]">
              Register
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  )
}

