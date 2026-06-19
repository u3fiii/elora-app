import clsx from 'clsx'
import type { HomeSegment } from '../../types'

interface HomeSegmentedToggleProps {
  activeSegment: HomeSegment
  babyName: string
  parentName: string
  onChange: (segment: HomeSegment) => void
  className?: string
}

export function HomeSegmentedToggle({
  activeSegment,
  babyName,
  parentName,
  onChange,
  className,
}: HomeSegmentedToggleProps) {
  return (
    <div
      className={clsx(
        'mx-auto flex w-fit rounded-full bg-white p-1 shadow-[0_1px_4px_rgba(0,0,0,0.06)]',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange('baby')}
        className={clsx(
          'rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200',
          activeSegment === 'baby'
            ? 'bg-home-mint text-white shadow-[0_2px_8px_rgba(126,202,176,0.4)]'
            : 'text-home-mint',
        )}
      >
        برای {babyName}
      </button>
      <button
        type="button"
        onClick={() => onChange('parent')}
        className={clsx(
          'rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200',
          activeSegment === 'parent'
            ? 'bg-home-mint text-white shadow-[0_2px_8px_rgba(126,202,176,0.4)]'
            : 'text-home-mint',
        )}
      >
        برای {parentName}
      </button>
    </div>
  )
}
