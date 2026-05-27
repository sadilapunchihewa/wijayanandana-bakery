import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', ...rest }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className={`glass-panel ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

