import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroImg from '../assets/hero.png'
import { useAuth } from '../context/AuthContext'
import PrimaryButton from '../components/ui/PrimaryButton'
import GlassCard from '../components/ui/GlassCard'

export default function Register() {
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    try {
      await register({ name, email, password })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Registration failed')
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-stretch bg-gradient-to-br from-[#fdf6e9] via-[#f3e5d0] to-[#e6d2bb]">
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <img src={heroImg} alt="Bakery" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1f130d]/90 via-[#2c1a11]/65 to-[#d4af37]/30" />
        <div className="absolute bottom-10 left-10 right-10 rounded-3xl border border-white/15 bg-black/20 p-6 backdrop-blur-sm">
          <p className="text-xs tracking-[0.24em] text-[#f2d8af] uppercase">Create account</p>
          <h1 className="mt-3 text-3xl font-semibold text-[#fdf6e9]">Join the bakery console</h1>
          <p className="mt-2 text-sm text-[#f4dec1]/85">
            Register to manage premium menu items, orders, and customer preferences.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 py-10 lg:w-1/2">
        <GlassCard className="w-full max-w-md rounded-[32px] px-6 py-7 sm:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[0.78rem] tracking-[0.28em] uppercase text-[#a67b49]">
              New profile
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#3a2518]">
              Register
            </h2>
          </motion.div>

          {error && (
            <div className="mt-4 rounded-2xl border border-[#f97373]/30 bg-[#fff2f2] px-3 py-2 text-sm text-[#b91c1c]">
              {error}
            </div>
          )}

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-[0.76rem] tracking-[0.16em] uppercase text-[#7a5b45]">
                Full name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-[#e2d2b8] bg-white/70 px-3 py-2.5 text-sm text-[#3a2518] focus:border-[#d4af37] focus:outline-none"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-[0.76rem] tracking-[0.16em] uppercase text-[#7a5b45]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#e2d2b8] bg-white/70 px-3 py-2.5 text-sm text-[#3a2518] focus:border-[#d4af37] focus:outline-none"
                placeholder="you@wijayanandana.lk"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-[0.76rem] tracking-[0.16em] uppercase text-[#7a5b45]">
                Password
              </label>
              <div className="flex rounded-2xl border border-[#e2d2b8] bg-white/70">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 rounded-l-2xl bg-transparent px-3 py-2.5 text-sm text-[#3a2518] focus:border-[#d4af37] focus:outline-none"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="px-3 text-xs text-[#a67b49]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[0.76rem] tracking-[0.16em] uppercase text-[#7a5b45]">
                Confirm password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-2xl border border-[#e2d2b8] bg-white/70 px-3 py-2.5 text-sm text-[#3a2518] focus:border-[#d4af37] focus:outline-none"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <PrimaryButton type="submit" className="w-full text-[0.8rem]" disabled={submitting}>
              {submitting ? 'Creating account…' : 'Create account'}
            </PrimaryButton>
          </form>

          <p className="mt-5 text-sm text-[#8a6a4c]">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#a66a3b] hover:text-[#8a5b2f]">
              Login
            </Link>
          </p>
        </GlassCard>
      </div>
    </div>
  )
}

