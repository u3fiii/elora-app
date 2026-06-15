import { FileText, Headphones, Play } from 'lucide-react'
import type { ContentCard } from '../../types'
import { Chip } from '../ui/Chip'

interface ForYouSectionProps {
  content: ContentCard[]
  babyName: string
  ageMonths: number
}

const typeConfig = {
  article: { label: 'مطلب', icon: FileText },
  video: { label: 'ویدیو', icon: Play },
  audio: { label: 'صوت', icon: Headphones },
}

export function ForYouSection({
  content,
  babyName,
  ageMonths,
}: ForYouSectionProps) {
  return (
    <section className="mb-8">
      <div className="mb-4 px-4">
        <h2 className="text-lg font-bold text-textMain">برای شما امروز</h2>
        <p className="mt-0.5 text-xs text-textMuted">
          متناسب با {babyName}، {ageMonths} ماهه
        </p>
      </div>

      <div className="scrollbar-hide flex gap-3 overflow-x-auto px-4 pb-1">
        {content.map((item) => {
          const config = typeConfig[item.type]
          const Icon = config.icon

          return (
            <article
              key={item.id}
              className="min-w-[180px] flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
            >
              <div className={`h-24 ${item.thumbnailColor}`} />
              <div className="p-3">
                <Chip className={`mb-2 ${item.badgeColor}`} icon={<Icon className="h-3 w-3" />}>
                  {config.label}
                </Chip>
                <h3 className="mb-1 text-sm font-bold leading-snug text-textMain">
                  {item.title}
                </h3>
                <p className="text-xs text-textMuted">{item.meta}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
