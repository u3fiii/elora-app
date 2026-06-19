import { useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { HomeBottomNav } from '../components/home/HomeBottomNav'
import { GrowthCalendar } from '../components/home/GrowthCalendar'
import { MobileStatusBar } from '../components/home/MobileStatusBar'
import {
  getGrowthEventsForMonth,
  growthPathCalendar,
} from '../data/growthCalendarData'
import type { HomeNavTab } from '../types'
import { shiftJalaliMonth } from '../utils/jalali'

export function CalendarScreen() {
  const navigate = useNavigate()
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

  const handleNavChange = (tab: HomeNavTab) => {
    if (tab === 'home') {
      navigate('/home')
      return
    }

    if (tab === 'profile') {
      navigate('/profile')
    }
  }

  return (
    <div className="relative flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-home-bg font-vazir text-home-heading">
      <MobileStatusBar />

      <header className="border-b border-[#E8E4DC] bg-home-bg px-[18px] pb-4 pt-3">
        <div className="relative flex items-center justify-center">
          <h1 className="text-base font-extrabold text-home-heading">مسیر رشد</h1>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="absolute end-0 flex h-9 w-9 items-center justify-center rounded-full text-home-heading transition-colors hover:bg-[#F5F5F5]"
            aria-label="بازگشت"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>
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

      <HomeBottomNav activeTab="calendar" onChange={handleNavChange} />
    </div>
  )
}
