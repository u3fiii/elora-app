import { WizardBackButton } from './WizardBackButton'
import { WizardContinueButton } from './WizardContinueButton'

interface WizardFooterProps {
  showBack: boolean
  onBack: () => void
  continueDisabled?: boolean
  onContinue: () => void
  continueLabel?: string
}

export function WizardFooter({
  showBack,
  onBack,
  continueDisabled = false,
  onContinue,
  continueLabel = 'ادامه',
}: WizardFooterProps) {
  return (
    <div dir="ltr" className="flex w-full items-center justify-between gap-2">
      <WizardContinueButton
        disabled={continueDisabled}
        onClick={onContinue}
        label={continueLabel}
      />

      {showBack ? <WizardBackButton onClick={onBack} /> : <div className="w-[72px]" />}
    </div>
  )
}
