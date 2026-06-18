import clsx from 'clsx'

interface WizardPaginationProps {
  activeIndex: number
  slideCount: number
  onDotClick?: (index: number) => void
}

export function WizardPagination({
  activeIndex,
  slideCount,
  onDotClick,
}: WizardPaginationProps) {
  const activeVisualIndex = slideCount - 1 - activeIndex

  return (
    <div dir="ltr" className="flex items-center justify-center gap-[3px]">
      {Array.from({ length: slideCount }).map((_, visualIndex) => {
        const slideIndex = slideCount - 1 - visualIndex

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
