import clsx from 'clsx'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { CalendarDaysIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import infoIcon from '../../assets/icons/info-outline.png'
import type { HomeTask } from '../../types'
import { playAllTasksDoneSound } from '../../utils/playAllTasksDoneSound'
import { playTaskDoneSound } from '../../utils/playTaskDoneSound'
import { AllTasksDoneDialog } from './AllTasksDoneDialog'
import { TaskDetailSheet } from './TaskDetailSheet'

const PROGRESS_RADIUS = 10
const PROGRESS_STROKE = 3.5
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS

const TASK_CARD_THEMES = [
  { card: 'bg-[#F7F7F7]' },
  { card: 'bg-[#F7F7F7]' },
  { card: 'bg-[#F7F7F7]' },
] as const

const HOME_TASK_STAGGER = 0.05

const homeTaskListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: HOME_TASK_STAGGER,
    },
  },
}

const homeTaskItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

interface HomeTodoSectionProps {
  activeChildId: string
  babyName: string
  date: string
  tasks: HomeTask[]
  onTasksChange: (tasks: HomeTask[]) => void
}

function TaskSubjectTag({
  task,
  babyName,
}: {
  task: HomeTask
  babyName: string
}) {
  return (
    <span
      className={clsx(
        'shrink-0 rounded-full bg-[#E8E8E8] px-2 py-0.5 text-[10px] font-semibold text-[#6E6E6E]',
        task.completed && 'opacity-60',
      )}
    >
      {task.subject === 'child' ? babyName : 'خودت'}
    </span>
  )
}

function TasksProgressRing({
  completed,
  total,
}: {
  completed: number
  total: number
}) {
  const progress = total > 0 ? completed / total : 0
  const strokeDashoffset = PROGRESS_CIRCUMFERENCE * (1 - progress)
  const remaining = total - completed

  return (
    <div
      className="relative size-10 shrink-0"
      aria-label={`${completed} از ${total} کار انجام شده`}
    >
      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 36 36"
        aria-hidden
      >
        <circle
          cx="18"
          cy="18"
          r={PROGRESS_RADIUS}
          fill="none"
          stroke="#E8E4DC"
          strokeWidth={PROGRESS_STROKE}
        />
        <circle
          cx="18"
          cy="18"
          r={PROGRESS_RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={PROGRESS_STROKE}
          strokeLinecap="round"
          strokeDasharray={PROGRESS_CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="text-home-teal transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex translate-y-px items-center justify-center">
        <span
          key={remaining}
          className="animate-task-count-bounce text-[10px] font-bold leading-none tabular-nums text-home-muted"
        >
          {remaining}
        </span>
      </span>
    </div>
  )
}

export function HomeTodoSection({
  activeChildId,
  babyName,
  date,
  tasks,
  onTasksChange,
}: HomeTodoSectionProps) {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null)
  const [poppingId, setPoppingId] = useState<string | null>(null)
  const [showAllDoneDialog, setShowAllDoneDialog] = useState(false)
  const [isTasksExpanded, setIsTasksExpanded] = useState(true)

  const prevAllDoneRef = useRef(
    tasks.length > 0 && tasks.every((task) => task.completed),
  )

  const allDone = tasks.length > 0 && tasks.every((task) => task.completed)

  const prevChildRef = useRef(activeChildId)

  useEffect(() => {
    if (prevChildRef.current === activeChildId) return

    setOpenTaskId(null)
    setIsTasksExpanded(true)
    prevAllDoneRef.current = tasks.length > 0 && tasks.every((task) => task.completed)
    prevChildRef.current = activeChildId
  }, [activeChildId, tasks])

  useEffect(() => {
    if (allDone && !prevAllDoneRef.current) {
      setShowAllDoneDialog(true)
    }

    prevAllDoneRef.current = allDone
  }, [allDone])

  const openTask = tasks.find((task) => task.id === openTaskId) ?? null
  const completedCount = tasks.filter((task) => task.completed).length

  const toggleTask = (id: string) => {
    const toggledTask = tasks.find((task) => task.id === id)
    if (!toggledTask) return

    const nextCompleted = !toggledTask.completed
    const willAllBeDone =
      nextCompleted && tasks.every((task) => task.id === id || task.completed)

    if (nextCompleted) {
      if (willAllBeDone) {
        playAllTasksDoneSound()
      } else {
        playTaskDoneSound()
      }

      setPoppingId(id)
      window.setTimeout(() => setPoppingId(null), 280)
    }

    onTasksChange(
      tasks.map((task) => {
        if (task.id !== id) return task
        return { ...task, completed: nextCompleted }
      }),
    )
  }

  return (
    <section className="space-y-2 px-4 pt-4">
      <div className="flex items-center justify-between rounded-[16px] bg-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-home-teal/15 text-home-teal">
            <CalendarDaysIcon className="h-5 w-5" aria-hidden />
          </div>
          <div className="text-right">
            <h2 className="text-sm font-bold text-home-heading">کارهای امروز</h2>
            <p className="mt-0.5 text-xs text-home-muted">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <TasksProgressRing completed={completedCount} total={tasks.length} />
          <button
            type="button"
            onClick={() => setIsTasksExpanded((current) => !current)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-home-muted transition-colors hover:bg-home-pill hover:text-home-heading"
            aria-expanded={isTasksExpanded}
            aria-label={isTasksExpanded ? 'بستن لیست کارها' : 'نمایش لیست کارها'}
          >
            <ChevronUpDownIcon className="h-5 w-5" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isTasksExpanded ? (
          <motion.div
            key={`${activeChildId}-tasks`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
      <div className="rounded-[16px] bg-white p-3">
        <motion.ul
          key={activeChildId}
          className="space-y-2.5"
          variants={homeTaskListVariants}
          initial="hidden"
          animate="visible"
        >
        {tasks.map((task, index) => {
          const theme = TASK_CARD_THEMES[index % TASK_CARD_THEMES.length]

          return (
          <motion.li
            key={task.id}
            variants={homeTaskItemVariants}
            role="button"
            tabIndex={0}
            onClick={() => toggleTask(task.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                toggleTask(task.id)
              }
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            aria-label={
              task.completed
                ? `${task.label} — انجام شده، برای لغو کلیک کنید`
                : `${task.label} — برای انجام کلیک کنید`
            }
            className={clsx(
              'relative flex cursor-pointer items-center gap-3 rounded-[12px] px-3 py-2.5 transition-colors duration-300 ease-out',
              theme.card,
            )}
          >
            <div className="pointer-events-none flex min-w-0 flex-1 items-center gap-3 text-right">
              <span
                className={clsx(
                  'relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200',
                  task.completed
                    ? 'border-transparent bg-home-teal text-white'
                    : 'border-home-border bg-transparent',
                  poppingId === task.id && 'animate-task-check-pop',
                )}
                aria-hidden
              >
                {task.completed ? (
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>

              <span className="flex shrink-0 items-center gap-1 text-xs leading-snug">
                <span className="relative inline-block max-w-full">
                  <span
                    className={clsx(
                      'font-medium transition-colors duration-300',
                      task.completed
                        ? 'text-home-heading/70'
                        : 'text-home-heading',
                    )}
                  >
                    {task.label}
                  </span>
                  {task.completed ? (
                    <span
                      aria-hidden
                      className={clsx(
                        'pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 origin-right bg-home-heading/70',
                        poppingId === task.id
                          ? 'animate-task-strike'
                          : 'scale-x-100',
                      )}
                    />
                  ) : null}
                </span>

                <TaskSubjectTag task={task} babyName={babyName} />
              </span>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setOpenTaskId(task.id)
              }}
              className={clsx(
                'relative z-10 flex h-9 w-9 shrink-0 -translate-x-2 items-center justify-center transition-opacity hover:opacity-80',
                task.completed && 'opacity-45',
              )}
              aria-label="اطلاعات بیشتر"
            >
              <img
                src={infoIcon}
                alt=""
                className="h-6 w-6 object-contain"
                aria-hidden
              />
            </button>
          </motion.li>
          )
        })}
        </motion.ul>
      </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <TaskDetailSheet task={openTask} onClose={() => setOpenTaskId(null)} />
      <AllTasksDoneDialog
        open={showAllDoneDialog}
        onDismiss={() => setShowAllDoneDialog(false)}
      />
    </section>
  )
}
