import clsx from 'clsx'
import { motion, type Variants } from 'framer-motion'
import { Info } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { HomeTask } from '../../types'
import { playAllTasksDoneSound } from '../../utils/playAllTasksDoneSound'
import { playTaskDoneSound } from '../../utils/playTaskDoneSound'
import { AllTasksDoneDialog } from './AllTasksDoneDialog'
import { TaskDetailSheet } from './TaskDetailSheet'

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
  const isChildTask = task.subject === 'child'

  return (
    <span
      className={clsx(
        'shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold',
        isChildTask
          ? 'bg-home-mint/35 text-home-teal'
          : 'bg-home-lavender/35 text-home-heading/75',
        task.completed && 'opacity-60',
      )}
    >
      {isChildTask ? babyName : 'خودت'}
    </span>
  )
}

export function HomeTodoSection({
  activeChildId,
  babyName,
  tasks,
  onTasksChange,
}: HomeTodoSectionProps) {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null)
  const [poppingId, setPoppingId] = useState<string | null>(null)
  const [showAllDoneDialog, setShowAllDoneDialog] = useState(false)

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

    onTasksChange(
      tasks.map((task) => {
        if (task.id !== id) return task
        return { ...task, completed: nextCompleted }
      }),
    )
  }

  return (
    <section className="px-[18px] pt-12">
      <h2 className="mb-3 mr-2 text-right text-sm font-bold text-home-heading">
        امروز ۳ کار برای تو
      </h2>

      <motion.ul
        key={activeChildId}
        className="space-y-2.5"
        variants={homeTaskListVariants}
        initial="hidden"
        animate="visible"
      >
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            variants={homeTaskItemVariants}
            className={clsx(
              'relative box-border flex items-center gap-3 rounded-[12px] border bg-white px-3 py-3',
              'transition-[border-color,opacity,color] duration-300 ease-out',
              task.completed
                ? 'border-transparent'
                : 'border-solid border-home-border',
            )}
          >
            <span
              aria-hidden
              className={clsx(
                'pointer-events-none absolute inset-0 rounded-[12px] border border-dashed border-home-teal',
                'transition-opacity duration-300 ease-out',
                task.completed ? 'opacity-100' : 'opacity-0',
              )}
            />

            <button
              type="button"
              onClick={() => toggleTask(task.id)}
              className={clsx(
                'relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200',
                task.completed
                  ? 'border-transparent bg-home-teal text-white'
                  : 'border-[#D8D4CA] bg-white',
                poppingId === task.id && 'animate-task-check-pop',
              )}
              aria-label={task.completed ? 'علامت‌گذاری نشده' : 'انجام شد'}
            >
              {task.completed ? (
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : null}
            </button>

            <button
              type="button"
              onClick={() => toggleTask(task.id)}
              className="flex shrink-0 items-center gap-1 text-right text-xs leading-snug"
            >
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
            </button>

            <div className="min-w-0 flex-1" aria-hidden />

            <button
              type="button"
              onClick={() => setOpenTaskId(task.id)}
              className={clsx(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-home-muted transition-colors hover:bg-[#F3EFE8] hover:text-home-heading',
                task.completed && 'opacity-45',
              )}
              aria-label="اطلاعات بیشتر"
            >
              <Info className="h-4 w-4" strokeWidth={2} />
            </button>
          </motion.li>
        ))}
      </motion.ul>

      <TaskDetailSheet task={openTask} onClose={() => setOpenTaskId(null)} />
      <AllTasksDoneDialog
        open={showAllDoneDialog}
        onDismiss={() => setShowAllDoneDialog(false)}
      />
    </section>
  )
}
