import clsx from 'clsx'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import type { HomeTask } from '../../types'

const PETAL_PATH =
  'M 0,-96 C 24,-92 40,-58 38,-26 C 36,-2 20,8 0,10 C -20,8 -36,-2 -38,-26 C -40,-58 -24,-92 0,-96 Z'

const COLORED_GRADIENTS = [
  ['#EFC26A', '#F5D69C', '#FBF0D8'],
  ['#A8B2EE', '#C9CFF5', '#E8EBFB'],
  ['#FCB0CC', '#FED2E2', '#FFF0F5'],
  ['#74C8C8', '#A0DCDC', '#D8F2F2'],
  ['#7EC9B0', '#A6D9C6', '#D8F0E8'],
] as const

const MUTED_GRADIENTS = [
  ['#F2E2BC', '#F8EDD6', '#FCF6EA'],
  ['#CDD4F2', '#DEE3F8', '#EEF0FB'],
  ['#FAD0DF', '#FCE3EC', '#FEF3F7'],
  ['#B8DEDE', '#D0EBEB', '#E8F6F6'],
  ['#B8DDD0', '#D0EBE0', '#E8F6F0'],
] as const

const MAX_PETALS = 5

function getPetalCount(taskCount: number): number {
  if (taskCount <= 3) return 3
  if (taskCount >= MAX_PETALS) return MAX_PETALS
  return taskCount
}

function getPetalAngle(index: number, petalCount: number): number {
  return index * (360 / petalCount)
}

function getCompletionMessage(completed: number, total: number): string {
  if (completed === 0) return 'هنوز کاری انجام نشده، شروع کن!'
  if (completed >= total) return 'آفرین! گل امروز کامل شد 🌸'

  const oneLeft = total - completed === 1

  if (completed === 1) return 'یه گلبرگ رنگی شد، ادامه بده 💪'
  if (completed === 2) {
    return oneLeft
      ? 'دوتا! یه کار دیگه مونده 🌿'
      : 'دوتا! داری خوب پیش میری 🌱'
  }
  if (completed === 3) {
    return oneLeft ? 'سه‌تا! یه گام دیگه 🌸' : 'سه‌تا! داری نزدیک می‌شی 🌿'
  }
  if (completed === 4) return 'چهارتا! یه گام دیگه 🌸'

  return 'ادامه بده!'
}

const BOUNCE_KEYFRAMES: Keyframe[] = [
  { transform: 'scale(1)' },
  { transform: 'scale(1.18)', offset: 0.4 },
  { transform: 'scale(0.94)', offset: 0.7 },
  { transform: 'scale(1)' },
]

const BOUNCE_OPTIONS: KeyframeAnimationOptions = {
  duration: 600,
  easing: 'ease-out',
  fill: 'forwards',
}

export interface TaskFlowerProgressHandle {
  updatePetal: (index: number, isDone: boolean) => void
}

interface TaskFlowerProgressProps {
  tasks: HomeTask[]
  activeChildId: string
  className?: string
  embedded?: boolean
}

function getPetalFill(index: number, isDone: boolean) {
  return isDone ? `url(#grad-color-${index})` : `url(#grad-muted-${index})`
}

export const TaskFlowerProgress = forwardRef<
  TaskFlowerProgressHandle,
  TaskFlowerProgressProps
>(function TaskFlowerProgress(
  { tasks, activeChildId, className, embedded = false },
  ref,
) {
  const petalRefs = useRef<(SVGPathElement | null)[]>([])
  const petalDoneRef = useRef<boolean[]>([])

  const petalCount = getPetalCount(tasks.length)

  const [petalDone, setPetalDone] = useState<boolean[]>(() =>
    Array.from({ length: petalCount }, (_, index) =>
      Boolean(tasks[index]?.completed),
    ),
  )

  const completedCount = petalDone.filter(Boolean).length

  const applyPetalFill = useCallback((index: number, isDone: boolean) => {
    const path = petalRefs.current[index]
    if (!path) return
    path.setAttribute('fill', getPetalFill(index, isDone))
  }, [])

  const runPetalAnimation = useCallback(
    (index: number, isDone: boolean) => {
      const path = petalRefs.current[index]
      if (!path) return

      path.animate(BOUNCE_KEYFRAMES, BOUNCE_OPTIONS)

      window.setTimeout(() => {
        applyPetalFill(index, isDone)
      }, 150)
    },
    [applyPetalFill],
  )

  const updatePetal = useCallback(
    (index: number, isDone: boolean) => {
      if (index < 0 || index >= petalCount) return
      if (petalDoneRef.current[index] === isDone) return

      petalDoneRef.current[index] = isDone
      setPetalDone((current) => {
        const next = [...current]
        next[index] = isDone
        return next
      })

      runPetalAnimation(index, isDone)
    },
    [runPetalAnimation, petalCount],
  )

  useImperativeHandle(ref, () => ({ updatePetal }), [updatePetal])

  useEffect(() => {
    const next = Array.from({ length: petalCount }, (_, index) =>
      Boolean(tasks[index]?.completed),
    )

    petalDoneRef.current = next
    setPetalDone(next)

    for (let index = 0; index < petalCount; index += 1) {
      applyPetalFill(index, next[index] ?? false)
    }
    // Sync without animation only when switching children.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChildId, applyPetalFill, petalCount])

  const message = getCompletionMessage(completedCount, petalCount)

  return (
    <div
      className={clsx(
        embedded
          ? 'pt-2'
          : 'rounded-[24px] bg-[linear-gradient(150deg,#EEF8F3_0%,#FBF4FF_100%)] px-6 pb-5 pt-7',
        className,
      )}
      aria-label={`${completedCount} از ${petalCount} کار انجام شده`}
    >
      <div className="flex justify-center">
        <svg
          viewBox="-105 -105 210 210"
          className="h-48 w-48"
          aria-hidden
        >
          <defs>
            {COLORED_GRADIENTS.map((stops, index) => (
              <radialGradient
                key={`color-${index}`}
                id={`grad-color-${index}`}
                cx="50%"
                cy="60%"
                r="65%"
              >
                <stop offset="0%" stopColor={stops[0]} />
                <stop offset="60%" stopColor={stops[1]} />
                <stop offset="100%" stopColor={stops[2]} />
              </radialGradient>
            ))}

            {MUTED_GRADIENTS.map((stops, index) => (
              <radialGradient
                key={`muted-${index}`}
                id={`grad-muted-${index}`}
                cx="50%"
                cy="60%"
                r="65%"
              >
                <stop offset="0%" stopColor={stops[0]} />
                <stop offset="60%" stopColor={stops[1]} />
                <stop offset="100%" stopColor={stops[2]} />
              </radialGradient>
            ))}
          </defs>

          {Array.from({ length: petalCount }, (_, index) => (
            <g
              key={index}
              id={`petal-${index}`}
              transform={`rotate(${getPetalAngle(index, petalCount)})`}
            >
              <path
                ref={(element) => {
                  petalRefs.current[index] = element
                }}
                d={PETAL_PATH}
                fill={getPetalFill(index, petalDone[index] ?? false)}
                className="task-flower-petal-path"
              />
            </g>
          ))}

          <circle
            r="46"
            fill="#FFFFFF"
            stroke="#EFEAE3"
            strokeWidth="1.2"
          />

          <g
            key={completedCount}
            className="flower-count-group animate-flower-count-pulse"
          >
            <text
              x="0"
              y="0"
              textAnchor="middle"
              dominantBaseline="central"
              dy="1"
              fill="#2E9171"
              fontSize="26"
              fontFamily="Outfit, sans-serif"
              fontWeight="800"
            >
              {completedCount}
            </text>
          </g>
        </svg>
      </div>

      <p
        className={clsx(
          'text-center font-vazir text-[13px] leading-relaxed',
          embedded ? 'mb-3 mt-3 text-white' : 'mt-4',
          !embedded &&
            (completedCount === petalCount
              ? 'font-bold text-[#2E9171]'
              : 'text-[#9C9690]'),
          embedded && completedCount === petalCount && 'font-bold',
        )}
      >
        {message}
      </p>
    </div>
  )
})
