import { type MotionValue } from 'framer-motion'
import { useEffect, useRef, useState, type RefObject } from 'react'

const DIRECTION_THRESHOLD = 15
const COOLDOWN_MS = 450

export function useHomeGreetingCollapse(
  scrollY: MotionValue<number>,
  scrollRef: RefObject<HTMLElement | null>,
) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isCollapsedRef = useRef(false)
  const accumulatedDelta = useRef(0)
  const lastScrollY = useRef(0)
  const lastFlipTime = useRef(0)

  useEffect(() => {
    lastScrollY.current = scrollRef.current?.scrollTop ?? scrollY.get()

    const unsubscribe = scrollY.on('change', (latest) => {
      const now = Date.now()

      if (now - lastFlipTime.current < COOLDOWN_MS) {
        accumulatedDelta.current = 0
        lastScrollY.current = latest
        return
      }

      const delta = latest - lastScrollY.current
      lastScrollY.current = latest

      if (delta === 0) return

      if (
        Math.sign(delta) === Math.sign(accumulatedDelta.current) ||
        accumulatedDelta.current === 0
      ) {
        accumulatedDelta.current += delta
      } else {
        accumulatedDelta.current = delta
      }

      if (accumulatedDelta.current > DIRECTION_THRESHOLD && !isCollapsedRef.current) {
        isCollapsedRef.current = true
        setIsCollapsed(true)
        accumulatedDelta.current = 0
        lastFlipTime.current = now
      } else if (
        accumulatedDelta.current < -DIRECTION_THRESHOLD &&
        isCollapsedRef.current
      ) {
        isCollapsedRef.current = false
        setIsCollapsed(false)
        accumulatedDelta.current = 0
        lastFlipTime.current = now
      }
    })

    return unsubscribe
  }, [scrollRef, scrollY])

  return isCollapsed
}
