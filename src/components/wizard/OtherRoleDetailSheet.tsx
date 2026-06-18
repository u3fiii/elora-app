import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import { otherRoleDetailOptions } from '../../data/otherRoleData'
import type { OtherRoleDetail } from '../../types'

interface OtherRoleDetailSheetProps {
  open: boolean
  onSelect: (detail: OtherRoleDetail) => void
}

const overlayTransition = {
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1],
} as const

const panelTransition = {
  duration: 0.36,
  ease: [0.16, 1, 0.3, 1],
} as const

export function OtherRoleDetailSheet({
  open,
  onSelect,
}: OtherRoleDetailSheetProps) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <motion.div
            className="absolute inset-0 bg-black/40"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
          />

          <motion.div
            className="relative max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-white px-6 pb-10 pt-8"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={panelTransition}
          >
            <h2 className="text-center text-lg font-bold text-textMain">
              نقشت چیه دقیقا؟
            </h2>

            <div className="mt-6 space-y-3">
              {otherRoleDetailOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSelect(option.id)}
                  className={clsx(
                    'flex w-full items-center justify-center rounded-full bg-wizard-card px-5 py-3.5 text-sm font-semibold text-white transition-transform active:scale-[0.98]',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
