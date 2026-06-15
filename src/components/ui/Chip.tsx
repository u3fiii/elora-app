import clsx from 'clsx'
import type { ReactNode } from 'react'

interface ChipProps {
  children: ReactNode
  className?: string
  icon?: ReactNode
}

export function Chip({ children, className, icon }: ChipProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
