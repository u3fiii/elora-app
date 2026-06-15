import { WizardBackButton } from './WizardBackButton'
import { WizardContinueButton } from './WizardContinueButton'
import { WizardPagination } from './WizardPagination'

interface WizardFooterProps {
  activeIndex: number
  onDotClick: (index: number) => void
  showBack: boolean
  onBack: () => void
  continueDisabled?: boolean
  onContinue: () => void
  continueLabel?: string
}

export function WizardFooter({
  activeIndex,
  onDotClick,
  showBack,
  onBack,
  continueDisabled = false,
  onContinue,
  continueLabel = 'ادامه',
}: WizardFooterProps) {
  return (
    <div
      dir="ltr"
      className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2"
    >
      <div className="flex justify-start">
        <WizardContinueButton
          disabled={continueDisabled}
          onClick={onContinue}
          label={continueLabel}
        />
      </div>

      <WizardPagination activeIndex={activeIndex} onDotClick={onDotClick} />

      <div className="flex justify-end">
        {showBack ? <WizardBackButton onClick={onBack} /> : null}
      </div>
    </div>
  )
}
