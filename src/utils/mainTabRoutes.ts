import type { HomeNavTab } from '../types'
import { MAIN_NAV_PATHS } from '../hooks/useMainBottomNav'

export const MAIN_TAB_PATHS = Object.values(MAIN_NAV_PATHS)

export function getMainTabFromPath(pathname: string): HomeNavTab | null {
  const entry = Object.entries(MAIN_NAV_PATHS).find(([, path]) => path === pathname)
  return entry ? (entry[0] as HomeNavTab) : null
}

export function isMainTabPath(pathname: string) {
  return MAIN_TAB_PATHS.includes(pathname)
}

export interface MainTabOutletContext {
  setProfileUserName: (name: string) => void
}
