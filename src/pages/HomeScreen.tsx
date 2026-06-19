import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { growthPathCalendar } from '../data/growthCalendarData'
import {
  createInitialChildTasksState,
  homeChildren,
  homeContentCards,
  homeGreetingDate,
  homeLearningItems,
  homeParentName,
  homeStreakDays,
  initialChildTasksById,
  initialParentHomeTasks,
} from '../data/homeData'
import type { HomeNavTab, HomeSegment, HomeTask } from '../types'
import { HomeBottomNav } from '../components/home/HomeBottomNav'
import { HomeForYouCarousel } from '../components/home/HomeForYouCarousel'
import { HomeGreeting } from '../components/home/HomeGreeting'
import { HomeGrowthPathSection } from '../components/home/HomeGrowthPathSection'
import { HomeHeader } from '../components/home/HomeHeader'
import { HomeLearningSection } from '../components/home/HomeLearningSection'
import { MobileStatusBar } from '../components/home/MobileStatusBar'
import { HomeTodoSection } from '../components/home/HomeTodoSection'

interface HomeWizardState {
  childName?: string
  userName?: string
}

export function HomeScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const wizardState = location.state as HomeWizardState | null

  const [activeChildId, setActiveChildId] = useState(homeChildren[0].id)
  const [activeSegment, setActiveSegment] = useState<HomeSegment>('baby')
  const [childTasksById, setChildTasksById] = useState<Record<string, HomeTask[]>>(
    createInitialChildTasksState,
  )
  const [parentTasks, setParentTasks] = useState<HomeTask[]>(initialParentHomeTasks)
  const [activeNavTab, setActiveNavTab] = useState<HomeNavTab>('home')
  const [greetingVisible, setGreetingVisible] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastScrollTop = useRef(0)

  const activeChild = useMemo(
    () =>
      homeChildren.find((child) => child.id === activeChildId) ?? homeChildren[0],
    [activeChildId],
  )

  const babyTasks =
    childTasksById[activeChildId] ??
    childTasksById[homeChildren[0].id] ??
    initialChildTasksById.liam

  const childName =
    activeChildId === homeChildren[0].id && wizardState?.childName?.trim()
      ? wizardState.childName.trim()
      : activeChild.name
  const parentName = wizardState?.userName?.trim() || homeParentName

  const handleBabyTasksChange = (tasks: HomeTask[]) => {
    setChildTasksById((current) => ({
      ...current,
      [activeChildId]: tasks,
    }))
  }

  const handleNavChange = (tab: HomeNavTab) => {
    if (tab === 'profile') {
      navigate('/profile', { state: { userName: parentName } })
      return
    }

    if (tab === 'calendar') {
      navigate('/calendar')
      return
    }

    setActiveNavTab(tab)
  }

  const handleScroll = useCallback(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const scrollTop = scrollElement.scrollTop
    const scrollDelta = scrollTop - lastScrollTop.current

    if (scrollTop <= 8) {
      setGreetingVisible(true)
    } else if (scrollDelta > 6) {
      setGreetingVisible(false)
    } else if (scrollDelta < -6) {
      setGreetingVisible(true)
    }

    lastScrollTop.current = scrollTop
  }, [])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    scrollElement.addEventListener('scroll', handleScroll, { passive: true })
    return () => scrollElement.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="relative flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-home-bg font-vazir text-home-heading">
      <div className="relative z-30 shrink-0 border-b border-[#E8E4DC] bg-home-bg">
        <MobileStatusBar />
        <div className="pt-3">
          <HomeHeader
            childProfiles={homeChildren}
            activeChildId={activeChildId}
            onSelectChild={setActiveChildId}
          />
          <div
            className={clsx(
              'grid transition-[grid-template-rows] duration-300 ease-out',
              greetingVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
            )}
          >
            <div
              className={clsx(
                'overflow-hidden transition-[opacity,transform] duration-300 ease-out',
                greetingVisible
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-2 opacity-0',
              )}
            >
              <HomeGreeting parentName={parentName} date={homeGreetingDate} />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-28"
      >
        <HomeTodoSection
          activeSegment={activeSegment}
          activeChildId={activeChildId}
          onSegmentChange={setActiveSegment}
          babyName={childName}
          parentName={parentName}
          babyTasks={babyTasks}
          parentTasks={parentTasks}
          streakDays={homeStreakDays}
          onBabyTasksChange={handleBabyTasksChange}
          onParentTasksChange={setParentTasks}
        />

        <HomeForYouCarousel cards={homeContentCards} />

        <HomeGrowthPathSection calendar={growthPathCalendar} />

        <HomeLearningSection items={homeLearningItems} />

      </div>

      <HomeBottomNav activeTab={activeNavTab} onChange={handleNavChange} />
    </div>
  )
}
