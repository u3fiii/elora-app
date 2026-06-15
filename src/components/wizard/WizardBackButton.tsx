import clsx from 'clsx'
import { ChevronRight } from 'lucide-react'

interface WizardBackButtonProps {
  disabled?: boolean
  onClick: () => void
  label?: string
}

export function WizardBackButton({
  disabled = false,
  onClick,
  label = 'قبلی',
}: WizardBackButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full py-2.5 pl-[20px] pr-[12px] text-sm font-bold transition-all',
        disabled
          ? 'bg-[#79CCC2]/25 text-[#49A3AA]/40'
          : 'bg-[#79CCC2]/25 text-[#49A3AA] active:scale-[0.98]',
      )}
    >
      <span>{label}</span>
      <ChevronRight className="h-4 w-4 text-current" strokeWidth={2.5} />
    </button>
  )
}
