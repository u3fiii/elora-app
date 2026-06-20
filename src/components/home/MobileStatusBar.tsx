function SignalBars() {
  return (
    <svg
      viewBox="0 0 18 12"
      className="h-2.5 w-[15px]"
      fill="currentColor"
      aria-hidden
    >
      <rect x="0" y="7" width="3" height="5" rx="0.75" />
      <rect x="5" y="5" width="3" height="7" rx="0.75" />
      <rect x="10" y="2.5" width="3" height="9.5" rx="0.75" />
      <rect x="15" y="0" width="3" height="12" rx="0.75" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg
      viewBox="0 0 16 12"
      className="h-2.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M8 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" stroke="none" />
      <path d="M4.8 7.2a4.2 4.2 0 0 1 6.4 0" />
      <path d="M2.1 4.5a7.8 7.8 0 0 1 11.8 0" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 27 13" className="h-3 w-6" aria-hidden>
      <rect
        x="0.75"
        y="0.75"
        width="22"
        height="11.5"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.45"
      />
      <rect x="2.5" y="2.5" width="17" height="8" rx="1.5" fill="currentColor" />
      <path
        d="M24.5 4.5v4c.8-.3 1.3-1 1.3-2s-.5-1.7-1.3-2Z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  )
}

export function MobileStatusBar() {
  return (
    <div
      className="flex h-8 shrink-0 items-end justify-between bg-transparent px-7 pb-1 pt-1.5 text-home-heading"
      dir="ltr"
      aria-hidden
    >
      <span className="text-[13px] font-semibold leading-none tracking-[-0.02em]">
        9:41
      </span>

      <div className="flex items-center gap-[5px]">
        <SignalBars />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  )
}
