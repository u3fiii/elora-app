import { WizardContinueButton } from './WizardContinueButton'

interface SupplementaryWizardFooterProps {
  continueDisabled?: boolean
  onContinue: () => void
  onSkip: () => void
  continueLabel?: string
}

export function SupplementaryWizardFooter({
  continueDisabled = false,
  onContinue,
  onSkip,
  continueLabel = 'بعدی',
}: SupplementaryWizardFooterProps) {
  return (
    <div dir="ltr" className="flex w-full items-center justify-between gap-2">
      <WizardContinueButton
        disabled={continueDisabled}
        onClick={onContinue}
        label={continueLabel}
      />

      <button
        type="button"
        onClick={onSkip}
        className="inline-flex items-center rounded-full bg-[#79CCC2]/25 px-5 py-2.5 text-sm font-bold text-[#49A3AA] transition-all active:scale-[0.98]"
      >
        رد کردن
      </button>
    </div>
  )
}
