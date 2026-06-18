import clsx from 'clsx'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import type { ChildBirthDate } from '../../../types'
import { formatChildBirthDateLabel } from '../../../utils/jalali'
import { BirthDateDialog } from '../BirthDateDialog'
import { WizardAnimatedItem } from '../animation'

interface BirthDateSlideProps {
  value?: ChildBirthDate
  onChange: (value: ChildBirthDate) => void
}

export function BirthDateSlide({ value, onChange }: BirthDateSlideProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const openDialog = () => setIsDialogOpen(true)

  const handleConfirm = (nextValue: ChildBirthDate) => {
    onChange(nextValue)
    setIsDialogOpen(false)
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <WizardAnimatedItem>
          <h2 className="text-2xl font-bold text-textMain">تاریخ تولد فرزند</h2>
        </WizardAnimatedItem>

        <WizardAnimatedItem>
          <p className="mt-2 text-sm font-semibold text-wizard-title">
            تاریخ تولد فرزندت چه روزیه؟
          </p>
        </WizardAnimatedItem>
      </div>

      <WizardAnimatedItem>
        <button
          type="button"
          onClick={openDialog}
          className={clsx(
            'relative flex w-full items-center rounded-full border-2 bg-white/50 py-3.5 pr-5 text-right text-sm outline-none transition-colors',
            value
              ? 'border-[#49A3AA] bg-white/70 pl-12 text-textMain'
              : 'border-transparent pl-5 text-[#49A3AA]/50',
          )}
        >
          {value ? (
            <>
              <span className="w-full">{formatChildBirthDateLabel(value)}</span>
              <Pencil
                className="absolute left-4 h-4 w-4 text-[#49A3AA]"
                strokeWidth={2.25}
              />
            </>
          ) : (
            <span>تاریخ تولد فرزند</span>
          )}
        </button>
      </WizardAnimatedItem>

      <BirthDateDialog
        open={isDialogOpen}
        value={value}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
