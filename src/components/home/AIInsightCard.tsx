import { ChevronLeft } from 'lucide-react'
import type { AIInsight } from '../../types'

interface AIInsightCardProps {
  insight: AIInsight
}

export function AIInsightCard({ insight }: AIInsightCardProps) {
  return (
    <button
      type="button"
      className="mx-4 mb-8 flex w-[calc(100%-2rem)] items-center gap-3 rounded-2xl bg-primary-light p-4 text-right transition-opacity hover:opacity-90"
    >
      <ChevronLeft className="h-5 w-5 flex-shrink-0 text-textMuted" />
      <p className="flex-1 text-sm leading-relaxed text-textMain">
        {insight.bodyBefore}
        <strong className="font-bold">{insight.highlightedPhrase}</strong>
        {insight.bodyAfter}
      </p>
      <div className="flex flex-shrink-0 flex-col items-center gap-1">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <div className="h-4 w-4 rounded-full bg-primary-light" />
          </div>
          <span className="absolute -bottom-0.5 -left-0.5 h-2.5 w-2.5 rounded-full border-2 border-primary-light bg-green-500" />
        </div>
        <span className="text-xs font-bold text-textMain">الورا</span>
      </div>
    </button>
  )
}
