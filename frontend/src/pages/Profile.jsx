import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import GlassCard from '../components/ui/GlassCard'
import PrimaryButton from '../components/ui/PrimaryButton'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const payload = { name, email }
      if (password.trim()) payload.password = password
      await updateProfile(payload)
      setPassword('')
      setMessage('Profile updated successfully')
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-4xl px-4 pb-16 pt-28">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[0.78rem] tracking-[0.28em] uppercase text-[#a67b49]">User management</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#3a2518] md:text-4xl">
          Profile settings
        </h1>
      </motion.div>

      <GlassCard className="mt-6 rounded-[32px] p-6 sm:p-8">
        <form onSubmit={onSave} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-[0.76rem] tracking-[0.16em] uppercase text-[#7a5b45]">
                Full name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-[#e2d2b8] bg-white/70 px-3 py-2.5 text-sm text-[#3a2518] focus:border-[#d4af37] focus:outline-none"
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
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[0.76rem] tracking-[0.16em] uppercase text-[#7a5b45]">
              New password (optional)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#e2d2b8] bg-white/70 px-3 py-2.5 text-sm text-[#3a2518] focus:border-[#d4af37] focus:outline-none"
              placeholder="Leave blank to keep current password"
              minLength={6}
            />
          </div>

          {message && (
            <div className="rounded-2xl border border-[#86efac]/50 bg-[#f0fdf4] px-3 py-2 text-sm text-[#166534]">
              {message}
            </div>
          )}
          {error && (
            <div className="rounded-2xl border border-[#f97373]/30 bg-[#fff2f2] px-3 py-2 text-sm text-[#b91c1c]">
              {error}
            </div>
          )}

          <PrimaryButton type="submit" disabled={saving} className="text-[0.8rem]">
            {saving ? 'Saving…' : 'Save changes'}
          </PrimaryButton>
        </form>
      </GlassCard>
    </div>
  )
}

