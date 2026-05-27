import { motion } from 'framer-motion'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/94771234567"
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="fixed bottom-6 right-4 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 shadow-xl shadow-[#25D366]/30 md:right-8"
    >
      <span className="text-xl">🟢</span>
      <span className="hidden text-xs font-semibold tracking-[0.18em] uppercase text-white md:inline">
        Order via WhatsApp
      </span>
    </motion.a>
  )
}

