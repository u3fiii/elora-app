import { ChevronLeft } from 'lucide-react'
import type { HomeLearningItem } from '../../types'

interface HomeLearningSectionProps {
  items: HomeLearningItem[]
}

export function HomeLearningSection({ items }: HomeLearningSectionProps) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between px-[18px]">
        <h2 className="text-base font-extrabold text-home-heading">
          یادگیری و آموزش
        </h2>

        <button
          type="button"
          className="flex items-center gap-0.5 text-xs font-bold text-home-teal transition-opacity hover:opacity-80"
        >
          <span>مشاهده همه</span>
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <div className="scrollbar-hide flex gap-3 overflow-x-auto px-[18px] pb-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="h-[200px] w-[150px] shrink-0 overflow-hidden rounded-[16px] shadow-[0_1px_6px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-95"
          >
            <img
              src={item.imageSrc}
              alt={item.alt}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  )
}
