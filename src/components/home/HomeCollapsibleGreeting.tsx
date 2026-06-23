import { motion } from 'framer-motion'
import { HomeGreeting } from './HomeGreeting'
import { HOME_GREETING_SLOT_HEIGHT } from '../../utils/homeHeaderScroll'

interface HomeCollapsibleGreetingProps {
  parentName: string
  date: string
  isCollapsed: boolean
}

const greetingVariants = {
  expanded: {
    scaleY: 1,
    opacity: 1,
    marginBottom: 0,
  },
  collapsed: {
    scaleY: 0,
    opacity: 0,
    marginBottom: -HOME_GREETING_SLOT_HEIGHT,
  },
}

const greetingTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
}

export function HomeCollapsibleGreeting({
  parentName,
  date,
  isCollapsed,
}: HomeCollapsibleGreetingProps) {
  return (
    <motion.div
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={greetingVariants}
      initial={false}
      transition={greetingTransition}
      style={{ transformOrigin: 'top' }}
      className="h-[54px] overflow-hidden will-change-transform"
    >
      <HomeGreeting parentName={parentName} date={date} />
    </motion.div>
  )
}
