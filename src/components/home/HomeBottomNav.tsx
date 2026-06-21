import clsx from 'clsx'
import { useRef } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import {
  BookOpenIcon as BookOpenOutlineIcon,
  CalendarIcon as CalendarOutlineIcon,
  ChatBubbleLeftIcon as ChatBubbleLeftOutlineIcon,
  HomeIcon as HomeOutlineIcon,
  UserIcon as UserOutlineIcon,
} from '@heroicons/react/24/outline'
import {
  BookOpenIcon as BookOpenSolidIcon,
  CalendarIcon as CalendarSolidIcon,
  ChatBubbleLeftIcon as ChatBubbleLeftSolidIcon,
  HomeIcon as HomeSolidIcon,
  UserIcon as UserSolidIcon,
} from '@heroicons/react/24/solid'
import type { HomeNavTab } from '../../types'
import { getTabSwitchDirection } from '../../utils/mainTabPageTransition'

interface HomeBottomNavProps {
  activeTab: HomeNavTab
  onChange: (tab: HomeNavTab, direction: number) => void
}

type NavIconComponent = typeof HomeOutlineIcon

const navItems: {
  id: HomeNavTab
  label: string
  outlineIcon: NavIconComponent
  solidIcon: NavIconComponent
}[] = [
  {
    id: 'profile',
    label: 'پروفایل',
    outlineIcon: UserOutlineIcon,
    solidIcon: UserSolidIcon,
  },
  {
    id: 'chat',
    label: 'گفتگو',
    outlineIcon: ChatBubbleLeftOutlineIcon,
    solidIcon: ChatBubbleLeftSolidIcon,
  },
  {
    id: 'home',
    label: 'خانه',
    outlineIcon: HomeOutlineIcon,
    solidIcon: HomeSolidIcon,
  },
  {
    id: 'calendar',
    label: 'تقویم',
    outlineIcon: CalendarOutlineIcon,
    solidIcon: CalendarSolidIcon,
  },
  {
    id: 'library',
    label: 'کتابخانه',
    outlineIcon: BookOpenOutlineIcon,
    solidIcon: BookOpenSolidIcon,
  },
]

const ACTIVE_PILL_TRANSITION = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 23,
  mass: 0.98,
}

interface NavIconProps {
  outlineIcon: NavIconComponent
  solidIcon: NavIconComponent
  active: boolean
}

function NavIcon({ outlineIcon: OutlineIcon, solidIcon: SolidIcon, active }: NavIconProps) {
  const Icon = active ? SolidIcon : OutlineIcon

  return <Icon className="h-5 w-5" aria-hidden />
}

export function HomeBottomNav({ activeTab, onChange }: HomeBottomNavProps) {
  const tabButtonRefs = useRef<Partial<Record<HomeNavTab, HTMLButtonElement | null>>>({})

  const handleTabPress = (tab: HomeNavTab) => {
    if (tab === activeTab) return

    const direction = getTabSwitchDirection(activeTab, tab, tabButtonRefs.current)
    onChange(tab, direction)
  }

  return (
    <nav
      dir="ltr"
      className="absolute inset-x-4 bottom-4 z-50 rounded-[50px] border border-home-border bg-white px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    >
      <LayoutGroup id="home-bottom-nav">
        <div className="flex items-center">
          {navItems.map(({ id, label, outlineIcon, solidIcon }) => {
            const isActive = activeTab === id

            return (
              <button
                key={id}
                ref={(element) => {
                  tabButtonRefs.current[id] = element
                }}
                type="button"
                onClick={() => handleTabPress(id)}
                className={clsx(
                  'relative flex flex-1 flex-col items-center gap-1 rounded-[28px] px-1 py-1.5 transition-colors duration-200',
                  isActive ? 'text-white' : 'text-home-teal hover:bg-home-pill',
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="home-bottom-nav-active"
                    className="absolute inset-0 rounded-[28px] bg-home-teal/90 shadow-[0_2px_10px_rgba(110,183,188,0.35)]"
                    transition={ACTIVE_PILL_TRANSITION}
                  />
                ) : null}

                <span className="relative z-10 flex flex-col items-center gap-1">
                  <NavIcon
                    outlineIcon={outlineIcon}
                    solidIcon={solidIcon}
                    active={isActive}
                  />
                  <span className="text-[10px] font-semibold leading-none">{label}</span>
                </span>
              </button>
            )
          })}
        </div>
      </LayoutGroup>
    </nav>
  )
}
