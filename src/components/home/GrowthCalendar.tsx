import clsx from 'clsx'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GrowthEventMarker } from '../../types'
import {
  buildJalaliMonthGrid,
  formatJalaliMonthYear,
  formatPersianNumber,
  JALALI_WEEKDAYS,
} from '../../utils/jalali'

interface GrowthCalendarProps {
  year: number
  month: number
  today?: number
  eventDays: Record<number, GrowthEventMarker[]>
  showNavigation?: boolean
  onPreviousMonth?: () => void
  onNextMonth?: () => void
}

const markerClassNames: Record<GrowthEventMarker, string> = {
  mint: 'bg-home-mint',
  yellow: 'bg-home-yellow',
}

export function GrowthCalendar({
  year,
  month,
  today,
  eventDays,
  showNavigation = false,
  onPreviousMonth,
  onNextMonth,
}: GrowthCalendarProps) {
  const monthCells = buildJalaliMonthGrid(year, month)

  return (
    <div className="rounded-[24px] bg-[#EEF7F2] p-4">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className={clsx(
            'flex items-center gap-1 text-sm font-bold text-home-heading',
            !showNavigation && 'pointer-events-none',
          )}
        >
          <span>{formatJalaliMonthYear(year, month)}</span>
          {showNavigation ? (
            <ChevronDown className="h-4 w-4 text-home-muted" strokeWidth={2.25} />
          ) : null}
        </button>

        {showNavigation ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-home-heading transition-colors hover:bg-white/70"
              aria-label="ماه بعد"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
            </button>
            <button
              type="button"
              onClick={onPreviousMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full text-home-heading transition-colors hover:bg-white/70"
              aria-label="ماه قبل"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>
        ) : (
          <span className="h-8 w-8" aria-hidden />
        )}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {JALALI_WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className="py-1 text-center text-[11px] font-semibold text-home-muted"
          >
            {weekday}
          </div>
        ))}

        {monthCells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-10" aria-hidden />
          }

          const markers = eventDays[day] ?? []
          const isToday = today === day

          return (
            <div
              key={day}
              className="flex h-10 flex-col items-center justify-start pt-0.5"
            >
              <span
                className={clsx(
                  'text-sm leading-none',
                  isToday
                    ? 'font-extrabold text-home-teal'
                    : 'font-medium text-home-heading',
                )}
              >
                {formatPersianNumber(day)}
              </span>

              {markers.length > 0 ? (
                <div className="mt-1 flex items-center gap-0.5">
                  {markers.map((marker, markerIndex) => (
                    <span
                      key={`${day}-${marker}-${markerIndex}`}
                      className={clsx(
                        'h-1.5 w-1.5 rounded-full',
                        markerClassNames[marker],
                      )}
                    />
                  ))}
                </div>
              ) : (
                <span className="mt-1 h-1.5" aria-hidden />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
