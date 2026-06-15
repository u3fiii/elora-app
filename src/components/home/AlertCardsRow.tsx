import { useState } from 'react'
import { X } from 'lucide-react'
import type { AlertCard } from '../../types'
import { Card } from '../ui/Card'

interface AlertCardsRowProps {
  cards: AlertCard[]
}

export function AlertCardsRow({ cards: initialCards }: AlertCardsRowProps) {
  const [cards, setCards] = useState(initialCards)

  const dismiss = (id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id))
  }

  if (cards.length === 0) return null

  return (
    <div className="mb-6 px-4">
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`relative min-w-[260px] flex-shrink-0 border-r-4 p-4 ${card.accentClass}`}
          >
            <button
              type="button"
              onClick={() => dismiss(card.id)}
              className="absolute left-3 top-3 rounded-full p-0.5 text-textMuted hover:bg-background hover:text-textMain"
              aria-label="بستن"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-textMuted">
              {card.category}
            </p>
            <p className="mb-1 pr-6 text-sm font-bold text-textMain">
              {card.title}
            </p>
            <p className="text-xs text-textMuted">{card.subtitle}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
