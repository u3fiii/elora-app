import { AnimatePresence, motion } from 'framer-motion'

interface AllTasksDoneDialogProps {
  open: boolean
  onDismiss: () => void
}

const overlayTransition = {
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1],
} as const

const panelTransition = {
  duration: 0.36,
  ease: [0.16, 1, 0.3, 1],
} as const

function TasksDoneIllustration() {
  return (
    <motion.div
      className="mx-auto mb-5 flex h-32 w-32 items-center justify-center"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...panelTransition, delay: 0.08 }}
    >
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden
      >
        <circle cx="64" cy="64" r="52" fill="#E4F4EE" />
        <circle cx="64" cy="64" r="38" fill="#7ECAB0" />
        <path
          d="M44 65L57 78L86 49"
          stroke="white"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="34" r="5" fill="#F2D490" />
        <circle cx="100" cy="30" r="4" fill="#EFA8BE" />
        <circle cx="96" cy="92" r="5" fill="#C4B7E8" />
        <path
          d="M22 78L26 74M26 74L30 78M26 74V82"
          stroke="#6EB7BC"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M104 58L108 54M108 54L112 58M108 54V62"
          stroke="#F5B89A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}

export function AllTasksDoneDialog({ open, onDismiss }: AllTasksDoneDialogProps) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="بستن"
            onClick={onDismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={overlayTransition}
          />

          <motion.div
            className="relative z-10 w-full max-w-[320px] rounded-[24px] bg-white px-6 pb-6 pt-8 text-center shadow-xl"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={panelTransition}
          >
            <TasksDoneIllustration />

            <motion.h2
              className="text-lg font-extrabold text-home-heading"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...panelTransition, delay: 0.12 }}
            >
              آفرین! همه رو انجام دادی
            </motion.h2>

            <motion.p
              className="mt-3 text-sm leading-7 text-home-muted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...panelTransition, delay: 0.18 }}
            >
              امروز هر ۳ کار رو تکمیل کردی. فردا با لیست جدید دوباره شروع کن.
            </motion.p>

            <motion.button
              type="button"
              onClick={onDismiss}
              className="mt-6 w-full rounded-full bg-home-teal py-3.5 text-sm font-bold text-white transition-transform active:scale-[0.98]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...panelTransition, delay: 0.24 }}
            >
              متوجه شدم
            </motion.button>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
