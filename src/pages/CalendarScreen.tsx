import { useMemo, useState } from 'react'
import { GrowthCalendar } from '../components/home/GrowthCalendar'
import { MobileStatusBar } from '../components/home/MobileStatusBar'
import {
  getGrowthEventsForMonth,
  growthPathCalendar,
} from '../data/growthCalendarData'
import { shiftJalaliMonth } from '../utils/jalali'

export function CalendarScreen() {
  const [viewYear, setViewYear] = useState(growthPathCalendar.year)
  const [viewMonth, setViewMonth] = useState(growthPathCalendar.month)

  const eventDays = useMemo(
    () => getGrowthEventsForMonth(viewYear, viewMonth),
    [viewMonth, viewYear],
  )

  const today =
    viewYear === growthPathCalendar.year && viewMonth === growthPathCalendar.month
      ? growthPathCalendar.today
      : undefined

  const handlePreviousMonth = () => {
    const next = shiftJalaliMonth(viewYear, viewMonth, -1)
    setViewYear(next.year)
    setViewMonth(next.month)
  }

  const handleNextMonth = () => {
    const next = shiftJalaliMonth(viewYear, viewMonth, 1)
    setViewYear(next.year)
    setViewMonth(next.month)
  }

  return (
    <div className="relative flex h-full w-full min-w-0 flex-col overflow-hidden bg-home-bg font-vazir text-home-heading">
      <MobileStatusBar />

      <header className="border-b border-[#E8E4DC] bg-home-bg px-[18px] pb-4 pt-3">
        <h1 className="text-center text-base font-extrabold text-home-heading">مسیر رشد</h1>
      </header>

      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-[18px] pb-28 pt-6">
        <GrowthCalendar
          year={viewYear}
          month={viewMonth}
          today={today}
          eventDays={eventDays}
          showNavigation
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />
      </div>
    </div>
  )
}
