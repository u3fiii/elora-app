import type { ReactNode } from 'react'
import clsx from 'clsx'
import bgLogoTr from '../../assets/bg-logo-tr.png'
import { wizardDomeConfig } from './wizardDomeConfig'

interface WizardShellProps {
  footer: ReactNode
  header?: ReactNode
  children: ReactNode
  keyboard?: ReactNode
  contentClassName?: string
  contentPaddingTop?: number
}

export function WizardShell({
  footer,
  header,
  children,
  keyboard,
  contentClassName,
  contentPaddingTop = wizardDomeConfig.contentPaddingTop,
}: WizardShellProps) {
  const { blackCircle, logoBgTr } = wizardDomeConfig

  const blackCircleTop = blackCircle.centerY - blackCircle.diameter / 2

  return (
    <div className="relative isolate flex h-dvh w-full flex-col overflow-hidden bg-wizard-dome">
      <img
        src={bgLogoTr}
        alt=""
        className="pointer-events-none absolute z-0 block origin-top-right select-none"
        style={{
          top: logoBgTr.top,
          right: logoBgTr.right,
          width: logoBgTr.width,
          transform: `scale(${logoBgTr.scale})`,
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-1/2 z-[1] -translate-x-1/2 rounded-full bg-black/5"
        style={{
          width: blackCircle.diameter,
          height: blackCircle.diameter,
          top: blackCircleTop,
        }}
        aria-hidden
      />

      {header ? (
        <div className="relative z-10 flex shrink-0 flex-col items-center px-5 pt-16 pb-5">
          {header}
        </div>
      ) : null}

      <div
        className={clsx(
          'relative z-10 flex flex-1 flex-col',
          contentClassName ?? 'px-5 pb-28',
        )}
        style={{ paddingTop: contentPaddingTop }}
      >
        {children}
      </div>

      {keyboard && (
        <div className="absolute inset-x-0 bottom-[4.75rem] z-30 px-5">
          {keyboard}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-8">
        {footer}
      </div>
    </div>
  )
}
