import clsx from 'clsx'
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

interface HomeBottomNavProps {
  activeTab: HomeNavTab
  onChange: (tab: HomeNavTab) => void
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
  return (
    <nav
      dir="ltr"
      className="absolute inset-x-4 bottom-4 z-40 rounded-[50px] border border-white/60 bg-white/55 px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl backdrop-saturate-150"
    >
      <LayoutGroup id="home-bottom-nav">
        <div className="flex items-center">
          {navItems.map(({ id, label, outlineIcon, solidIcon }) => {
            const isActive = activeTab === id

            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange(id)}
                className={clsx(
                  'relative flex flex-1 flex-col items-center gap-1 rounded-[28px] px-1 py-1.5 transition-colors duration-200',
                  isActive ? 'text-white' : 'text-home-teal hover:bg-white/45',
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="home-bottom-nav-active"
                    className="absolute inset-0 rounded-[28px] bg-home-teal/90 shadow-[0_2px_10px_rgba(110,183,188,0.35)]"
                    transition={{
                      type: 'spring',
                      stiffness: 460,
                      damping: 34,
                      mass: 0.72,
                    }}
                  />
                ) : null}

                <span className="relative z-10 flex flex-col items-center gap-1">
                  <NavIcon
                    outlineIcon={outlineIcon}
                    solidIcon={solidIcon}
                    active={isActive}
                  />
                  <span className="text-[10px] font-semibold">{label}</span>
                </span>
              </button>
            )
          })}
        </div>
      </LayoutGroup>
    </nav>
  )
}
