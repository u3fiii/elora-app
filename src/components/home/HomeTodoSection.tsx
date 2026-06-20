import clsx from 'clsx'
import { motion, type Variants } from 'framer-motion'
import { ChevronLeft, Flame } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { HomeSegment, HomeTask } from '../../types'
import { playAllTasksDoneSound } from '../../utils/playAllTasksDoneSound'
import { playTaskDoneSound } from '../../utils/playTaskDoneSound'
import { formatPersianNumber } from '../../utils/jalali'
import { wizardItemVariants } from '../wizard/animation/wizardAnimation'
import { AllTasksDoneDialog } from './AllTasksDoneDialog'
import { HomeSegmentedToggle } from './HomeSegmentedToggle'
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

interface HomeTodoSectionProps {
  activeSegment: HomeSegment
  activeChildId: string
  onSegmentChange: (segment: HomeSegment) => void
  babyName: string
  parentName: string
  babyTasks: HomeTask[]
  parentTasks: HomeTask[]
  streakDays: number
  onBabyTasksChange: (tasks: HomeTask[]) => void
  onParentTasksChange: (tasks: HomeTask[]) => void
}

export function HomeTodoSection({
  activeSegment,
  activeChildId,
  onSegmentChange,
  babyName,
  parentName,
  babyTasks,
  parentTasks,
  streakDays,
  onBabyTasksChange,
  onParentTasksChange,
}: HomeTodoSectionProps) {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null)
  const [poppingId, setPoppingId] = useState<string | null>(null)
  const [showAllDoneDialog, setShowAllDoneDialog] = useState(false)

  const activeTasks = activeSegment === 'baby' ? babyTasks : parentTasks
  const onActiveTasksChange =
    activeSegment === 'baby' ? onBabyTasksChange : onParentTasksChange

  const prevAllDoneRef = useRef(
    activeTasks.length > 0 && activeTasks.every((task) => task.completed),
  )

  const allDone =
    activeTasks.length > 0 && activeTasks.every((task) => task.completed)

  const sectionTitle =
    activeSegment === 'baby'
      ? `امروز ۵ کار برای ${babyName}`
      : 'امروز ۵ کار برای خودت'

  const prevSegmentRef = useRef(activeSegment)
  const prevChildRef = useRef(activeChildId)

  useEffect(() => {
    if (prevChildRef.current === activeChildId) return

    setOpenTaskId(null)
    prevAllDoneRef.current =
      activeTasks.length > 0 && activeTasks.every((task) => task.completed)
    prevChildRef.current = activeChildId
  }, [activeChildId, activeTasks])

  useEffect(() => {
    if (prevSegmentRef.current === activeSegment) return

    setOpenTaskId(null)
    prevAllDoneRef.current =
      activeTasks.length > 0 && activeTasks.every((task) => task.completed)
    prevSegmentRef.current = activeSegment
  }, [activeSegment, activeTasks])

  useEffect(() => {
    if (allDone && !prevAllDoneRef.current) {
      setShowAllDoneDialog(true)
    }

    prevAllDoneRef.current = allDone
  }, [allDone])

  const openTask = activeTasks.find((task) => task.id === openTaskId) ?? null

  const toggleTask = (id: string) => {
    const toggledTask = activeTasks.find((task) => task.id === id)
    if (!toggledTask) return

    const nextCompleted = !toggledTask.completed
    const willAllBeDone =
      nextCompleted &&
      activeTasks.every((task) => task.id === id || task.completed)

    if (nextCompleted) {
      if (willAllBeDone) {
        playAllTasksDoneSound()
      } else {
        playTaskDoneSound()
      }

      setPoppingId(id)
      window.setTimeout(() => setPoppingId(null), 280)
    }

    onActiveTasksChange(
      activeTasks.map((task) => {
        if (task.id !== id) return task
        return { ...task, completed: nextCompleted }
      }),
    )
  }

  return (
    <section className="px-[18px] pt-6">
      <div className="rounded-[20px] border border-[#C5E4D8] bg-gradient-to-br from-[#D4EDE4] via-[#F8F5F0] to-[#FFEDE4] p-4 shadow-[0_2px_14px_rgba(0,0,0,0.06)]">
        <HomeSegmentedToggle
          activeSegment={activeSegment}
          babyName={babyName}
          parentName={parentName}
          onChange={onSegmentChange}
          className="mb-4"
        />

        <h2 className="mb-4 text-center text-xs font-semibold text-home-muted">
          {sectionTitle}
        </h2>

        <motion.ul
          key={`${activeSegment}-${activeChildId}`}
          className="space-y-2.5"
          variants={homeTaskListVariants}
          initial="hidden"
          animate="visible"
        >
          {activeTasks.map((task) => (
            <motion.li
              key={task.id}
              variants={wizardItemVariants}
              className={clsx(
                'flex items-center gap-3 rounded-[12px] px-3 py-3 shadow-[0_1px_6px_rgba(0,0,0,0.05)] transition-all duration-300',
                task.completed ? 'bg-white/55' : 'bg-white',
              )}
            >
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

              <div
                className={clsx(
                  'flex min-w-0 flex-1 items-center gap-3 transition-opacity duration-300',
                  task.completed && 'opacity-45',
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  className="min-w-0 flex-1 text-right text-xs leading-snug"
                >
                  <span className="relative inline-block max-w-full">
                    <span
                      className={clsx(
                        'font-medium transition-colors duration-300',
                        task.completed
                          ? 'text-home-muted'
                          : 'text-home-heading',
                      )}
                    >
                      {task.label}
                    </span>
                    {task.completed ? (
                      <span
                        aria-hidden
                        className={clsx(
                          'pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 origin-right bg-home-muted',
                          poppingId === task.id
                            ? 'animate-task-strike'
                            : 'scale-x-100',
                        )}
                      />
                    ) : null}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setOpenTaskId(task.id)}
                  className="flex shrink-0 items-center gap-0.5 rounded-[8px] bg-[#FAF9F7] px-2.5 py-1 text-[10px] text-home-muted transition-colors hover:bg-[#F3EFE8]"
                >
                  <span>بیشتر</span>
                  <ChevronLeft className="h-3 w-3" />
                </button>
              </div>
            </motion.li>
          ))}

          <motion.li
            variants={wizardItemVariants}
            className="flex justify-center"
          >
            <div className="flex items-center gap-1.5 rounded-full bg-home-streakBg px-3 py-1.5">
              <Flame className="h-4 w-4 text-home-peach" />
              <span className="text-xs font-bold text-home-heading">
                {formatPersianNumber(streakDays)} روز متوالی
              </span>
            </div>
          </motion.li>
        </motion.ul>
      </div>

      <TaskDetailSheet task={openTask} onClose={() => setOpenTaskId(null)} />
      <AllTasksDoneDialog
        open={showAllDoneDialog}
        segment={activeSegment}
        babyName={babyName}
        onDismiss={() => setShowAllDoneDialog(false)}
      />
    </section>
  )
}
