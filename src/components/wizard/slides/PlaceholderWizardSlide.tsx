import { WizardAnimatedItem } from '../animation'

interface PlaceholderWizardSlideProps {
  slideNumber: number
}

export function PlaceholderWizardSlide({
  slideNumber,
}: PlaceholderWizardSlideProps) {
  return (
    <div>
      <WizardAnimatedItem>
        <div className="mb-4 flex h-32 w-full items-center justify-center rounded-2xl bg-wizard-card/60">
          <span className="text-4xl font-bold text-wizard-title/30">
            {slideNumber}
          </span>
        </div>
      </WizardAnimatedItem>

      <WizardAnimatedItem>
        <p className="text-center text-sm text-textMuted">
          سوال {slideNumber} — به‌زودی اضافه می‌شود
        </p>
      </WizardAnimatedItem>
    </div>
  )
}
