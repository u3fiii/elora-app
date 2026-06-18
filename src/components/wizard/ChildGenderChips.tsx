import clsx from 'clsx'
import { Mars, Venus } from 'lucide-react'
import type { ChildGender } from '../../types'

const genderOptions = [
  { id: 'boy' as const, label: 'پسر', Icon: Mars },
  { id: 'girl' as const, label: 'دختر', Icon: Venus },
]

interface ChildGenderChipsProps {
  value?: ChildGender
  onChange: (gender: ChildGender) => void
}

export function ChildGenderChips({ value, onChange }: ChildGenderChipsProps) {
  return (
    <div className="mb-4 flex gap-3">
      {genderOptions.map(({ id, label, Icon }) => {
        const isSelected = value === id

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={clsx(
              'flex flex-1 items-center justify-center gap-2 rounded-full border-2 py-3 text-sm font-semibold transition-colors duration-300',
              isSelected
                ? 'animate-wizard-card-pulse border-wizard-cardBorder bg-wizard-cardSelected text-white'
                : 'border-transparent bg-white/50 text-[#49A3AA]',
            )}
          >
            <span>{label}</span>
            <Icon className="h-5 w-5" strokeWidth={2.25} />
          </button>
        )
      })}
    </div>
  )
}
