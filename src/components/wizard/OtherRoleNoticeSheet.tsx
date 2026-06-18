import { AnimatePresence, motion } from 'framer-motion'

interface OtherRoleNoticeSheetProps {
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

export function OtherRoleNoticeSheet({
  open,
  onDismiss,
}: OtherRoleNoticeSheetProps) {
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
            className="relative rounded-t-3xl bg-white px-6 pb-10 pt-8"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={panelTransition}
          >
            <p className="text-center text-sm font-semibold leading-7 text-textMain">
              در حال حاضر صرفا نقش‌های پدر و مادر رو داریم توی اپ و این آپشن
              سایر نقش‌ها به زودی اضافه میشه.
            </p>

            <button
              type="button"
              onClick={onDismiss}
              className="mt-8 w-full rounded-full bg-[#49A3AA] py-3.5 text-sm font-bold text-white transition-transform active:scale-[0.98]"
            >
              متوجه شدم
            </button>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
