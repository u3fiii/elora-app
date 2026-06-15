import clsx from 'clsx'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { wizardItemVariants } from './wizardAnimation'

interface WizardAnimatedItemProps {
  children: ReactNode
  className?: string
}

export function WizardAnimatedItem({
  children,
  className,
}: WizardAnimatedItemProps) {
  return (
    <motion.div
      variants={wizardItemVariants}
      className={clsx('overflow-visible', className)}
    >
      {children}
    </motion.div>
  )
}
