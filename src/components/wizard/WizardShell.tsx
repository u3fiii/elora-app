import type { ReactNode } from 'react'
import clsx from 'clsx'
import bgLogoTr from '../../assets/bg-logo-tr.png'
import { wizardDomeConfig } from './wizardDomeConfig'
import { wizardDotOverlayClass } from './wizardDotPattern'

interface WizardShellProps {
  footer: ReactNode
  header?: ReactNode
  children: ReactNode
  keyboard?: ReactNode
  contentClassName?: string
}

export function WizardShell({
  footer,
  header,
  children,
  keyboard,
  contentClassName,
}: WizardShellProps) {
  const { contentPaddingTop, blackCircle, logoBgTr, showDotPattern } =
    wizardDomeConfig

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

      {showDotPattern ? (
        <div
          className={clsx(
            'pointer-events-none absolute inset-0 z-[2]',
            wizardDotOverlayClass,
          )}
          aria-hidden
        />
      ) : null}

      {header ? (
        <div className="relative z-10 flex shrink-0 flex-col items-center px-5 pt-16 pb-5">
          {header}
        </div>
      ) : null}

      <div
        className={clsx(
          'relative z-10 flex flex-1 flex-col px-5',
          contentClassName ?? 'pb-28',
        )}
        style={{ paddingTop: contentPaddingTop }}
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
