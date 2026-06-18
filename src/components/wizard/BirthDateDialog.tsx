import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ChildBirthDate } from '../../types'
import { getDefaultChildBirthDate } from '../../utils/jalali'
import { WheelDatePicker } from './WheelDatePicker'

interface BirthDateDialogProps {
  open: boolean
  value?: ChildBirthDate
  onClose: () => void
  onConfirm: (value: ChildBirthDate) => void
}

const overlayTransition = {
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1],
} as const

const panelTransition = {
  duration: 0.36,
  ease: [0.16, 1, 0.3, 1],
} as const

export function BirthDateDialog({
  open,
  value,
  onClose,
  onConfirm,
}: BirthDateDialogProps) {
  const [draft, setDraft] = useState<ChildBirthDate>(
    value ?? getDefaultChildBirthDate(),
  )

  useEffect(() => {
    if (open) {
      setDraft(value ?? getDefaultChildBirthDate())
    }
  }, [open, value])

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
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
            className="relative z-10 w-full max-w-[340px] overflow-hidden rounded-3xl bg-white px-5 pb-5 pt-4 shadow-xl"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={panelTransition}
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full text-textMuted transition-colors active:bg-black/5"
                aria-label="بستن"
              >
                <X className="h-5 w-5" strokeWidth={2.25} />
              </button>

              <h3 className="text-base font-bold text-textMain">تاریخ</h3>
            </div>

            <WheelDatePicker value={draft} onChange={setDraft} />

            <button
              type="button"
              onClick={() => onConfirm(draft)}
              className="mt-5 w-full rounded-full bg-[#EE9B4A] py-3.5 text-sm font-bold text-white transition-transform active:scale-[0.98]"
            >
              ثبت
            </button>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
