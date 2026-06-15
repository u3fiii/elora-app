import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { wizardContainerVariants } from './wizardAnimation'

interface WizardAnimatedSlideProps {
  slideKey: number
  children: ReactNode
}

export function WizardAnimatedSlide({
  slideKey,
  children,
}: WizardAnimatedSlideProps) {
  return (
    <motion.div
      key={slideKey}
      className="w-full overflow-visible"
      variants={wizardContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
