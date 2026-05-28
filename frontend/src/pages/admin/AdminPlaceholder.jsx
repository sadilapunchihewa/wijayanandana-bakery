import { motion } from 'framer-motion'

const copy = {
  Customers: 'Track repeat customers, phone numbers, and favourite bakery or meal orders.',
  Reviews: 'Curate customer feedback, star ratings, and homepage testimonials.',
  Messages: 'Manage website enquiries, WhatsApp leads, and cake order requests.',
  Settings: 'Control brand settings, opening hours, categories, and admin preferences.',
}

export default function AdminPlaceholder({ title }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[38px] border border-white/70 bg-[#fffaf2]/92 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.14)]"
    >
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C89B3C]/18 blur-3xl" />
      <div className="relative max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">Admin module</p>
        <h1 className="mt-3 font-serif text-6xl text-[#3A221A]">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-[#7b5c49]">
          {copy[title] || 'This premium admin section is ready for the next management workflow.'}
        </p>
        <div className="mt-8 rounded-[28px] border border-[#ead9bf] bg-white/58 p-6">
          <p className="font-semibold text-[#3A221A]">Ready for expansion</p>
          <p className="mt-2 text-sm leading-6 text-[#7b5c49]">
            The dashboard navigation and protected route are already connected. Add the API model
            and fields for this module when you want to make it fully dynamic.
          </p>
        </div>
      </div>
    </motion.section>
  )
}
