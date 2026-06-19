import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { GrowthCalendarConfig } from '../../types'
import { GrowthCalendar } from './GrowthCalendar'

interface HomeGrowthPathSectionProps {
  calendar: GrowthCalendarConfig
}

export function HomeGrowthPathSection({ calendar }: HomeGrowthPathSectionProps) {
  const navigate = useNavigate()

  return (
    <section className="mt-8 px-[18px]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-extrabold text-home-heading">مسیر رشد</h2>

        <button
          type="button"
          onClick={() => navigate('/calendar')}
          className="flex items-center gap-0.5 text-xs font-bold text-home-teal transition-opacity hover:opacity-80"
        >
          <span>مشاهده</span>
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <GrowthCalendar
        year={calendar.year}
        month={calendar.month}
        today={calendar.today}
        eventDays={calendar.eventDays}
      />
    </section>
  )
}
