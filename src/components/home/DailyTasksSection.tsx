import clsx from 'clsx'
import { Flame } from 'lucide-react'
import { useState } from 'react'
import type { DailyTask } from '../../types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface DailyTasksSectionProps {
  tasks: DailyTask[]
  motivation: string
  streakDays: number
  babyName: string
}

const petalClasses = [
  'absolute top-0 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-primary',
  'absolute top-[22%] right-[8%] h-8 w-8 rounded-full bg-accentPink',
  'absolute bottom-[22%] right-[8%] h-8 w-8 rounded-full bg-accentYellow',
  'absolute bottom-[22%] left-[8%] h-8 w-8 rounded-full bg-accentBlue',
  'absolute top-[22%] left-[8%] h-8 w-8 rounded-full bg-primary-dark',
]

export function DailyTasksSection({
  tasks: initialTasks,
  motivation,
  streakDays,
  babyName,
}: DailyTasksSectionProps) {
  const [tasks, setTasks] = useState(initialTasks)

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const completeAll = () => {
    setTasks((prev) => prev.map((task) => ({ ...task, completed: true })))
  }

  return (
    <section className="mb-8 px-4">
      <h2 className="mb-6 text-lg font-bold text-textMain">
        امروز ۵ کار برای {babyName}
      </h2>

      <div className="relative mx-auto mb-6 h-36 w-36">
        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-light" />
        {petalClasses.map((className, index) => (
          <div key={index} className={className} />
        ))}
      </div>

      <Card className="relative mb-6 border-none bg-surface px-4 py-3 shadow-md">
        <div className="absolute -top-2 right-8 h-4 w-4 rotate-45 border-r border-t border-border bg-surface" />
        <p className="text-center text-sm text-textMain">{motivation}</p>
      </Card>

      <ul className="mb-4 space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleTask(task.id)}
              className="flex flex-1 items-center gap-3"
            >
              <span
                className={clsx(
                  'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  task.completed
                    ? 'border-primary bg-primary'
                    : 'border-border bg-surface',
                )}
              >
                {task.completed && (
                  <svg
                    className="h-3 w-3 text-white"
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
                )}
              </span>
              <span
                className={clsx(
                  'flex-1 text-right text-sm',
                  task.completed
                    ? 'text-textMuted line-through'
                    : 'text-textMain',
                )}
              >
                {task.label}
              </span>
            </button>
            <span
              className={clsx(
                'h-2.5 w-2.5 flex-shrink-0 rounded-full',
                task.dotColor,
              )}
            />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-full bg-accentYellow-light px-3 py-1.5">
          <Flame className="h-4 w-4 text-orange-500" />
          <span className="text-xs font-semibold text-textMain">
            {streakDays} روز متوالی
          </span>
        </div>
        <Button
          variant="outline"
          className="px-4 py-2 text-xs"
          onClick={completeAll}
        >
          تکمیل همه
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-textMuted">
        لیست جدید در نیمه‌شب
      </p>
    </section>
  )
}
