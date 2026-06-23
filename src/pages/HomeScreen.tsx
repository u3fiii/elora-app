import { useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
import {
  createInitialChildTasksState,
  homeChildren,
  homeContentCards,
  homeGreetingDate,
  homeLearningItems,
  homeParentName,
  initialChildTasksById,
} from '../data/homeData'
import type { HomeTask } from '../types'
import type { MainTabOutletContext } from '../utils/mainTabRoutes'
import { HomeCollapsibleGreeting } from '../components/home/HomeCollapsibleGreeting'
import { useHomeGreetingCollapse } from '../hooks/useHomeGreetingCollapse'
import { HomeForYouCarousel } from '../components/home/HomeForYouCarousel'
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
  const [childTasksById, setChildTasksById] = useState<Record<string, HomeTask[]>>(
    createInitialChildTasksState,
  )
  const scrollRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll({ container: scrollRef })
  const isGreetingCollapsed = useHomeGreetingCollapse(scrollY, scrollRef)

  const dailyTasks =
    childTasksById[activeChildId] ??
    childTasksById[homeChildren[0].id] ??
    initialChildTasksById.liam

  const parentName = wizardState?.userName?.trim() || homeParentName

  useEffect(() => {
    setProfileUserName(parentName)
  }, [parentName, setProfileUserName])

  const handleTasksChange = (tasks: HomeTask[]) => {
    setChildTasksById((current) => ({
      ...current,
      [activeChildId]: tasks,
    }))
  }

  return (
    <div className="relative flex h-full w-full min-w-0 flex-col overflow-hidden bg-white font-vazir text-home-heading">
      <div
        ref={scrollRef}
        className="scrollbar-hide min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-28"
      >
        <header className="sticky top-0 z-30 border-b border-home-border bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
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
          activeChildId={activeChildId}
          tasks={dailyTasks}
          onTasksChange={handleTasksChange}
        />

        <HomeForYouCarousel cards={homeContentCards} />

        <HomeLearningSection items={homeLearningItems} />
      </div>
    </div>
  )
}
