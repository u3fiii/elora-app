import clsx from 'clsx'
import { ChevronLeft } from 'lucide-react'

interface WizardContinueButtonProps {
  disabled?: boolean
  onClick: () => void
  label?: string
}

export function WizardContinueButton({
  disabled = false,
  onClick,
  label = 'ادامه',
}: WizardContinueButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full py-2.5 pl-[12px] pr-[20px] text-sm font-bold transition-all',
        disabled
          ? 'bg-[#79CCC2]/25 text-[#49A3AA]/40'
          : 'bg-[#49A3AA] text-white active:scale-[0.98]',
      )}
    >
      <ChevronLeft className="h-4 w-4 text-current" strokeWidth={2.5} />
      <span>{label}</span>
    </button>
  )
}
