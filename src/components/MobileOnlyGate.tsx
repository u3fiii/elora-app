import type { ReactNode } from 'react'
import { useMobileViewport } from '../hooks/useMobileViewport'

interface MobileOnlyGateProps {
  children: ReactNode
}

export function MobileOnlyGate({ children }: MobileOnlyGateProps) {
  const isMobileViewport = useMobileViewport()

  if (!isMobileViewport) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-wizard-bg px-6">
        <div className="max-w-sm text-center">
          <p className="text-2xl font-bold text-textMain">
            لطفاً با موبایل وارد شوید
          </p>
          <p className="mt-3 text-sm font-semibold leading-7 text-wizard-title">
            یا سایز مرورگر را به موبایل تغییر دهید.
          </p>
        </div>
      </div>
    )
  }

  return children
}
