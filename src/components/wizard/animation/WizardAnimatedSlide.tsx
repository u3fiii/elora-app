import clsx from 'clsx'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { wizardContainerVariants } from './wizardAnimation'

interface WizardAnimatedSlideProps {
  slideKey: number | string
  children: ReactNode
  className?: string
}

export function WizardAnimatedSlide({
  slideKey,
  children,
  className,
}: WizardAnimatedSlideProps) {
  return (
    <motion.div
      key={slideKey}
      className={clsx('overflow-visible', className ?? 'w-full')}
      variants={wizardContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
