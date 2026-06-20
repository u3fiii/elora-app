import { useScroll } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
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
import type { HomeSegment, HomeTask } from '../types'
import type { MainTabOutletContext } from '../utils/mainTabRoutes'
import { HomeCollapsibleGreeting } from '../components/home/HomeCollapsibleGreeting'
import { useHomeGreetingCollapse } from '../hooks/useHomeGreetingCollapse'
import { HomeForYouCarousel } from '../components/home/HomeForYouCarousel'
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
  const location = useLocation()
  const { setProfileUserName } = useOutletContext<MainTabOutletContext>()
  const wizardState = location.state as HomeWizardState | null

  const [activeChildId, setActiveChildId] = useState(homeChildren[0].id)
  const [activeSegment, setActiveSegment] = useState<HomeSegment>('baby')
  const [childTasksById, setChildTasksById] = useState<Record<string, HomeTask[]>>(
    createInitialChildTasksState,
  )
  const [parentTasks, setParentTasks] = useState<HomeTask[]>(initialParentHomeTasks)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll({ container: scrollRef })
  const isGreetingCollapsed = useHomeGreetingCollapse(scrollY, scrollRef)

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

  useEffect(() => {
    setProfileUserName(parentName)
  }, [parentName, setProfileUserName])

  const handleBabyTasksChange = (tasks: HomeTask[]) => {
    setChildTasksById((current) => ({
      ...current,
      [activeChildId]: tasks,
    }))
  }

  return (
    <div className="relative flex h-full w-full min-w-0 flex-col overflow-hidden bg-home-bg font-vazir text-home-heading">
      <div
        ref={scrollRef}
        className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-28"
      >
        <header className="sticky top-0 z-30 border-b border-white/60 bg-white/55 shadow-[0_4px_24px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl backdrop-saturate-150">
          <MobileStatusBar />
          <div className="pt-3">
            <HomeHeader
              childProfiles={homeChildren}
              activeChildId={activeChildId}
              onSelectChild={setActiveChildId}
            />
            <HomeCollapsibleGreeting
              parentName={parentName}
              date={homeGreetingDate}
              isCollapsed={isGreetingCollapsed}
            />
          </div>
        </header>

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
    </div>
  )
}
