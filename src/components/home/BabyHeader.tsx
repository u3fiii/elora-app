import { Bell, ChevronDown, Search } from 'lucide-react'
import type { BabyProfile } from '../../types'

interface BabyHeaderProps {
  baby: BabyProfile
}

export function BabyHeader({ baby }: BabyHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <button
        type="button"
        className="flex items-center gap-2 rounded-2xl px-2 py-1 hover:bg-surface"
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${baby.avatarColorClass}`}
        >
          {baby.avatarLetter}
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-textMain">
            {baby.name}، {baby.ageMonths} ماهه
          </p>
        </div>
        <ChevronDown className="h-4 w-4 rotate-90 text-textMuted" />
      </button>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-full p-2 text-textMain hover:bg-surface"
          aria-label="اعلان‌ها"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <button
          type="button"
          className="rounded-full p-2 text-textMain hover:bg-surface"
          aria-label="جستجو"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
