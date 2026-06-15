import { WizardAnimatedItem } from '../animation'
import { WheelDatePicker } from '../WheelDatePicker'
import type { ChildBirthDate } from '../../../types'

interface BirthDateSlideProps {
  value: ChildBirthDate
  onChange: (value: ChildBirthDate) => void
}

export function BirthDateSlide({ value, onChange }: BirthDateSlideProps) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="text-center">
        <WizardAnimatedItem>
          <h2 className="text-2xl font-bold text-textMain">تاریخ تولد</h2>
        </WizardAnimatedItem>

        <WizardAnimatedItem>
          <p className="mt-2 text-sm font-semibold text-wizard-title">
            تاریخ تولد فرزندت چه روزیه؟
          </p>
        </WizardAnimatedItem>
      </div>

      <WizardAnimatedItem className="mt-auto translate-y-[4rem]">
        <WheelDatePicker value={value} onChange={onChange} />
      </WizardAnimatedItem>
    </div>
  )
}
