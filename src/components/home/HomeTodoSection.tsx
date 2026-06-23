import clsx from 'clsx'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { motion, type Variants } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { HomeTask } from '../../types'
import { playAllTasksDoneSound } from '../../utils/playAllTasksDoneSound'
import { playTaskDoneSound } from '../../utils/playTaskDoneSound'
import { AllTasksDoneDialog } from './AllTasksDoneDialog'
import { TaskDetailSheet } from './TaskDetailSheet'
import {
  TaskFlowerProgress,
  type TaskFlowerProgressHandle,
} from './TaskFlowerProgress'

const TASK_PETAL_DOT = [
  'bg-[#EFC26A]',
  'bg-[#A8B2EE]',
  'bg-[#FCB0CC]',
  'bg-[#74C8C8]',
  'bg-[#7EC9B0]',
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
  tasks: HomeTask[]
  onTasksChange: (tasks: HomeTask[]) => void
}

export function HomeTodoSection({
  activeChildId,
  tasks,
  onTasksChange,
}: HomeTodoSectionProps) {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null)
  const [poppingId, setPoppingId] = useState<string | null>(null)
  const [showAllDoneDialog, setShowAllDoneDialog] = useState(false)
  const flowerRef = useRef<TaskFlowerProgressHandle>(null)

  const prevAllDoneRef = useRef(
    tasks.length > 0 && tasks.every((task) => task.completed),
  )

  const allDone = tasks.length > 0 && tasks.every((task) => task.completed)

  const prevChildRef = useRef(activeChildId)

  useEffect(() => {
    if (prevChildRef.current === activeChildId) return

    setOpenTaskId(null)
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

    const petalIndex = tasks.findIndex((task) => task.id === id)
    if (petalIndex >= 0) {
      flowerRef.current?.updatePetal(petalIndex, nextCompleted)
    }

    onTasksChange(
      tasks.map((task) => {
        if (task.id !== id) return task
        return { ...task, completed: nextCompleted }
      }),
    )
  }

  return (
    <section className="px-4 pt-4">
      <div className="rounded-[24px] border border-[#AFE6D2] bg-[linear-gradient(150deg,#EDF7F3_0%,#FAF5E5_100%)] p-4">
        <TaskFlowerProgress
          ref={flowerRef}
          tasks={tasks}
          activeChildId={activeChildId}
          embedded
        />
        <motion.ul
          key={activeChildId}
          className="space-y-2.5"
          variants={homeTaskListVariants}
          initial="hidden"
          animate="visible"
        >
        {tasks.map((task, index) => {
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
              'relative flex cursor-pointer items-center gap-3 rounded-[12px] border px-3 py-1 transition-colors duration-300 ease-out',
              task.completed
                ? 'border-[#C5E8DC] bg-[#EAF7F2]'
                : 'border-transparent bg-white',
            )}
          >
            <div className="pointer-events-none flex min-w-0 flex-1 items-center gap-3 text-right">
              <span
                className={clsx(
                  'relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200',
                  task.completed
                    ? 'border-transparent bg-[#2E9171] text-white'
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

              <span className="flex shrink-0 items-center gap-1.5 text-xs leading-snug">
                <span
                  className={clsx(
                    'h-2.5 w-2.5 shrink-0 rounded-full transition-opacity duration-300',
                    TASK_PETAL_DOT[index % TASK_PETAL_DOT.length],
                    task.completed ? 'opacity-100' : 'opacity-35',
                  )}
                  aria-hidden
                />
                <span
                  className={clsx(
                    'font-medium transition-colors duration-300',
                    task.completed ? 'text-[#2E9171]' : 'text-home-heading',
                  )}
                >
                  {task.label}
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                setOpenTaskId(task.id)
              }}
              className={clsx(
                'relative z-10 flex h-9 w-9 shrink-0 -translate-x-2 items-center justify-center text-home-border transition-opacity hover:opacity-80',
                task.completed && 'opacity-70',
              )}
              aria-label="اطلاعات بیشتر"
            >
              <InformationCircleIcon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          </motion.li>
          )
        })}
        </motion.ul>
      </div>

      <TaskDetailSheet task={openTask} onClose={() => setOpenTaskId(null)} />
      <AllTasksDoneDialog
        open={showAllDoneDialog}
        onDismiss={() => setShowAllDoneDialog(false)}
      />
    </section>
  )
}
