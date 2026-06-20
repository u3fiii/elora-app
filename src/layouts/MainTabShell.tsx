import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { HomeBottomNav } from '../components/home/HomeBottomNav'
import { homeParentName } from '../data/homeData'
import { MAIN_NAV_PATHS } from '../hooks/useMainBottomNav'
import type { HomeNavTab } from '../types'
import {
  getMainTabFromPath,
  type MainTabOutletContext,
} from '../utils/mainTabRoutes'
import {
  MAIN_TAB_PAGE_TRANSITION,
  mainTabPageVariants,
} from '../utils/mainTabPageTransition'

export function MainTabShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab = getMainTabFromPath(location.pathname) ?? 'home'
  const [slideDirection, setSlideDirection] = useState(1)
  const profileUserNameRef = useRef(homeParentName)

  const outletContext = useRef<MainTabOutletContext>({
    setProfileUserName: (name: string) => {
      profileUserNameRef.current = name
    },
  }).current

  const handleNavChange = useCallback(
    (tab: HomeNavTab, direction: number) => {
      if (tab === activeTab) return

      setSlideDirection(direction)

      if (tab === 'profile') {
        navigate(MAIN_NAV_PATHS.profile, {
          state: { userName: profileUserNameRef.current },
        })
        return
      }

      navigate(MAIN_NAV_PATHS[tab])
    },
    [activeTab, navigate],
  )

  return (
    <div className="relative flex h-dvh w-full min-w-0 flex-col overflow-hidden">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <AnimatePresence mode="sync" custom={slideDirection} initial={false}>
          <motion.div
            key={location.pathname}
            custom={slideDirection}
            variants={mainTabPageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={MAIN_TAB_PAGE_TRANSITION}
            className="absolute inset-0 overflow-hidden will-change-transform"
          >
            <Outlet context={outletContext} />
          </motion.div>
        </AnimatePresence>
      </div>

      <HomeBottomNav activeTab={activeTab} onChange={handleNavChange} />
    </div>
  )
}
