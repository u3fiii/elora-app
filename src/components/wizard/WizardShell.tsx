import type { ReactNode } from 'react'
import clsx from 'clsx'

interface WizardShellProps {
  footer: ReactNode
  children: ReactNode
  keyboard?: ReactNode
  contentClassName?: string
}

export function WizardShell({
  footer,
  children,
  keyboard,
  contentClassName,
}: WizardShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-visible bg-wizard-bg">
      <div
        className={clsx(
          'relative z-10 flex flex-1 flex-col overflow-visible px-5 pt-[6.75rem]',
          contentClassName ?? 'pb-28',
        )}
      >
        {children}
      </div>

      {keyboard && (
        <div className="fixed bottom-[4.75rem] left-1/2 z-30 w-full max-w-[430px] -translate-x-1/2">
          {keyboard}
        </div>
      )}

      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 px-5 pb-8">
        {footer}
      </div>
    </div>
  )
}
