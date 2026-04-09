'use client'

import { motion } from 'framer-motion'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 28,
  md: 40,
  lg: 56,
}

export function Spinner({ size = 'md' }: SpinnerProps) {
  const s = sizes[size]
  const r = (s / 2) - 4
  const cx = s / 2
  const circumference = 2 * Math.PI * r

  return (
    <motion.svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
      style={{ display: 'block' }}
    >
      {/* Track ring */}
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke="#4a0e68"
        strokeOpacity={0.15}
        strokeWidth={2.5}
      />
      {/* Active arc */}
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke="#4a0e68"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray={`${circumference * 0.25} ${circumference * 0.75}`}
        strokeDashoffset={0}
      />
    </motion.svg>
  )
}
