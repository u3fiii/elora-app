import clsx from 'clsx'
import {
  BookOpen,
  Calendar,
  Home,
  MessageCircle,
  User,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/profile', label: 'پروفایل', icon: User },
  { to: '/chat', label: 'گفتگو', icon: MessageCircle },
  { to: '/calendar', label: 'تقویم', icon: Calendar },
  { to: '/library', label: 'کتابخانه', icon: BookOpen },
  { to: '/home', label: 'خانه', icon: Home },
]

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-surface">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs transition-colors',
                isActive ? 'text-primary' : 'text-textMuted',
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={clsx('h-5 w-5', isActive && 'stroke-[2.5]')}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
