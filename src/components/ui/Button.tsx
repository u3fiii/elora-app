import clsx from 'clsx'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'ghost' | 'outline'
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-2xl px-6 py-3 text-sm font-semibold transition-colors',
        fullWidth && 'w-full',
        variant === 'primary' &&
          'bg-primary text-white shadow-sm hover:bg-primary-dark',
        variant === 'ghost' && 'text-textMuted hover:text-textMain',
        variant === 'outline' &&
          'border border-border bg-surface text-textMain hover:bg-background',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
