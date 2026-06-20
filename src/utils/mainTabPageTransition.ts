import type { Variants } from 'framer-motion'
import type { HomeNavTab } from '../types'

export const MAIN_TAB_PAGE_TRANSITION = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
}

export const mainTabPageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    zIndex: 1,
  }),
  center: {
    x: 0,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    zIndex: 0,
  }),
}

export function getTabSwitchDirection(
  fromTab: HomeNavTab,
  toTab: HomeNavTab,
  tabElements: Partial<Record<HomeNavTab, HTMLButtonElement | null>>,
) {
  const fromButton = tabElements[fromTab]
  const toButton = tabElements[toTab]

  if (!fromButton || !toButton) return 1

  const fromCenter =
    fromButton.getBoundingClientRect().left + fromButton.offsetWidth / 2
  const toCenter = toButton.getBoundingClientRect().left + toButton.offsetWidth / 2

  return toCenter > fromCenter ? 1 : -1
}
