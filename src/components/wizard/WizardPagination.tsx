import clsx from 'clsx'
import { WIZARD_SLIDE_COUNT } from '../../data/wizardData'

interface WizardPaginationProps {
  activeIndex: number
  onDotClick?: (index: number) => void
}

export function WizardPagination({
  activeIndex,
  onDotClick,
}: WizardPaginationProps) {
  const activeVisualIndex = WIZARD_SLIDE_COUNT - 1 - activeIndex

  return (
    <div className="flex items-center justify-center gap-[3px]">
      {Array.from({ length: WIZARD_SLIDE_COUNT }).map((_, visualIndex) => {
        const slideIndex = WIZARD_SLIDE_COUNT - 1 - visualIndex

        return (
          <button
            key={visualIndex}
            type="button"
            aria-label={`سوال ${slideIndex + 1}`}
            onClick={() => onDotClick?.(slideIndex)}
            className={clsx(
              'h-1.5 rounded-sm transition-all',
              visualIndex === activeVisualIndex
                ? 'w-2.5 bg-[#49A3AA]'
                : 'w-1.5 bg-[#79CCC2]',
            )}
          />
        )
      })}
    </div>
  )
}
