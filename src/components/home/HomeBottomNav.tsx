import clsx from 'clsx'
import {
  BookOpen,
  Calendar,
  Home,
  MessageCircle,
  User,
} from 'lucide-react'
import type { HomeNavTab } from '../../types'

interface HomeBottomNavProps {
  activeTab: HomeNavTab
  onChange: (tab: HomeNavTab) => void
}

const navItems: {
  id: HomeNavTab
  label: string
  icon: typeof Home
}[] = [
  { id: 'profile', label: 'پروفایل', icon: User },
  { id: 'chat', label: 'گفتگو', icon: MessageCircle },
  { id: 'home', label: 'خانه', icon: Home },
  { id: 'calendar', label: 'تقویم', icon: Calendar },
  { id: 'library', label: 'کتابخانه', icon: BookOpen },
]

export function HomeBottomNav({ activeTab, onChange }: HomeBottomNavProps) {
  return (
    <nav
      dir="ltr"
      className="absolute inset-x-4 bottom-4 z-40 rounded-[50px] border border-white/60 bg-white/55 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl backdrop-saturate-150"
    >
      <div className="flex items-center">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={clsx(
                'flex flex-1 flex-col items-center gap-1 rounded-[28px] px-1 py-1.5 transition-all duration-200',
                isActive
                  ? 'bg-home-teal/90 text-white shadow-[0_2px_10px_rgba(110,183,188,0.35)]'
                  : 'text-home-teal hover:bg-white/45',
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
