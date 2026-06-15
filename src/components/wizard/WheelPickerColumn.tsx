import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

export const WHEEL_ITEM_HEIGHT = 44
const WHEEL_PADDING_ITEMS = 2

export interface WheelPickerItem<T> {
  value: T
  label: string
}

function getRowOpacityClass(distanceFromCenter: number) {
  if (distanceFromCenter === 0) return 'opacity-100'
  if (distanceFromCenter === 1) return 'opacity-50'
  return 'opacity-20'
}

interface WheelPickerColumnProps<T> {
  items: WheelPickerItem<T>[]
  value: T
  onChange: (value: T) => void
}

export function WheelPickerColumn<T extends string | number>({
  items,
  value,
  onChange,
}: WheelPickerColumnProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<number | undefined>(undefined)
  const initialIndex = items.findIndex((item) => item.value === value)
  const [centerIndex, setCenterIndex] = useState(() =>
    Math.max(0, initialIndex),
  )

  useEffect(() => {
    const index = items.findIndex((item) => item.value === value)
    if (index >= 0) {
      setCenterIndex(index)
    }
  }, [items, value])

  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const index = items.findIndex((item) => item.value === value)
    if (index < 0) return

    const targetScrollTop = index * WHEEL_ITEM_HEIGHT
    if (Math.abs(element.scrollTop - targetScrollTop) > 1) {
      element.scrollTop = targetScrollTop
    }
  }, [items, value])

  const handleScroll = () => {
    const element = scrollRef.current
    if (!element) return

    const index = Math.round(element.scrollTop / WHEEL_ITEM_HEIGHT)
    const clampedIndex = Math.max(0, Math.min(index, items.length - 1))
    setCenterIndex(clampedIndex)

    window.clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = window.setTimeout(() => {
      element.scrollTop = clampedIndex * WHEEL_ITEM_HEIGHT

      const nextValue = items[clampedIndex]?.value
      if (nextValue !== undefined && nextValue !== value) {
        onChange(nextValue)
      }
    }, 80)
  }

  return (
    <div className="relative h-[220px] min-w-0 flex-1 overflow-hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="scrollbar-hide h-full overflow-y-auto snap-y snap-mandatory"
      >
        {Array.from({ length: WHEEL_PADDING_ITEMS }).map((_, index) => (
          <div
            key={`pad-top-${index}`}
            className="h-11 shrink-0 snap-center"
            aria-hidden
          />
        ))}

        {items.map((item, index) => {
          const distanceFromCenter = Math.abs(index - centerIndex)
          const isCenter = distanceFromCenter === 0

          return (
            <div
              key={String(item.value)}
              className={clsx(
                'flex h-11 shrink-0 snap-center items-center justify-center px-1 text-sm text-textMain transition-opacity',
                getRowOpacityClass(distanceFromCenter),
                isCenter ? 'font-bold' : 'font-medium',
              )}
            >
              {item.label}
            </div>
          )
        })}

        {Array.from({ length: WHEEL_PADDING_ITEMS }).map((_, index) => (
          <div
            key={`pad-bottom-${index}`}
            className="h-11 shrink-0 snap-center"
            aria-hidden
          />
        ))}
      </div>
    </div>
  )
}
