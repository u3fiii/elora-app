import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, FileText } from 'lucide-react'
import clsx from 'clsx'
import { createPortal } from 'react-dom'
import type { HomeTask } from '../../types'

interface TaskDetailSheetProps {
  task: HomeTask | null
  onClose: () => void
}

const overlayTransition = {
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1],
} as const

const panelTransition = {
  duration: 0.36,
  ease: [0.16, 1, 0.3, 1],
} as const

export function TaskDetailSheet({ task, onClose }: TaskDetailSheetProps) {
  return createPortal(
    <AnimatePresence>
      {task ? (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="بستن"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
          />

          <motion.div
            className="relative max-h-[85dvh] overflow-y-auto rounded-t-[22px] bg-white px-[18px] pb-8 pt-5"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={panelTransition}
          >
            <div
              className={clsx('mb-4 h-1 w-12 rounded-full', task.colorClass)}
            />

            <h3 className="text-base font-extrabold text-home-heading">
              {task.label}
            </h3>

            <p className="mt-3 text-sm leading-7 text-home-muted">
              {task.description}
            </p>

            {task.articleLink ? (
              <button
                type="button"
                className="mt-5 flex w-full items-center gap-3 rounded-[18px] bg-home-doneBg p-3 text-right transition-opacity hover:opacity-90"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-home-mint text-white">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-[11px] text-home-mint">مقاله پیشنهادی</p>
                  <p className="text-sm font-bold text-home-heading">
                    {task.articleLink.title}
                  </p>
                </div>
                <ChevronLeft className="h-4 w-4 shrink-0 text-home-muted" />
              </button>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-home-teal py-3.5 text-sm font-bold text-white transition-transform active:scale-[0.98]"
            >
              بستن
            </button>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
