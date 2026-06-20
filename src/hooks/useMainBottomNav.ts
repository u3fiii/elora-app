import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { HomeNavTab } from '../types'

export const MAIN_NAV_PATHS: Record<HomeNavTab, string> = {
  profile: '/profile',
  chat: '/chat',
  home: '/home',
  calendar: '/calendar',
  library: '/library',
}

interface UseMainBottomNavOptions {
  profileUserName?: string
}

export function useMainBottomNav(
  activeTab: HomeNavTab,
  options: UseMainBottomNavOptions = {},
) {
  const navigate = useNavigate()
  const { profileUserName } = options

  const handleNavChange = useCallback(
    (tab: HomeNavTab) => {
      if (tab === activeTab) return

      if (tab === 'profile' && profileUserName) {
        navigate(MAIN_NAV_PATHS.profile, { state: { userName: profileUserName } })
        return
      }

      navigate(MAIN_NAV_PATHS[tab])
    },
    [activeTab, navigate, profileUserName],
  )

  return handleNavChange
}
