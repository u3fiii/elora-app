import { Link } from 'react-router-dom'
import type { ScheduleItem } from '../../types'
import { Card } from '../ui/Card'

interface TodaysPlanSectionProps {
  items: ScheduleItem[]
}

export function TodaysPlanSection({ items }: TodaysPlanSectionProps) {
  return (
    <section className="mb-8 px-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-textMain">برنامه امروز</h2>
        <Link to="/calendar" className="text-sm font-semibold text-primary">
          تقویم
        </Link>
      </div>

      <Card className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 p-4">
            <span className="w-10 flex-shrink-0 text-sm font-medium text-textMain">
              {item.time}
            </span>
            <span
              className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${item.dotColor}`}
            />
            <div className="flex-1 text-right">
              <p className="text-sm font-semibold text-textMain">{item.title}</p>
              <p className="mt-0.5 text-xs text-textMuted">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </Card>
    </section>
  )
}
