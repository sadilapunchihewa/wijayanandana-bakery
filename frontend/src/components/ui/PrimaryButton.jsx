import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function PrimaryButton({ children, variant = 'solid', className = '', ...rest }) {
  const base =
    'relative inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f3ec]'

  const styles =
    variant === 'ghost'
      ? 'border border-[#e2d2b8] bg-white/40 text-[#5a3b29] hover:bg-white/70'
      : 'bg-gradient-to-r from-[#d4af37] via-[#c89b3c] to-[#8b5a2b] text-[#2d1b12] shadow-lg shadow-[#d4af37]/30 hover:brightness-105'

  return (
    <motion.button
      whileHover={{ y: -1, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${styles} ${className}`}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['solid', 'ghost']),
  className: PropTypes.string,
}

