import { useEffect, useRef, useState } from 'react'
import { formatPersianNumber } from '../../utils/jalali'

interface ProfileCreatingSheetProps {
  onComplete: () => void
}

const DURATION_MS = 2800

export function ProfileCreatingSheet({ onComplete }: ProfileCreatingSheetProps) {
  const [progress, setProgress] = useState(0)
  const completedRef = useRef(false)

  useEffect(() => {
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const next = Math.min(100, Math.round((elapsed / DURATION_MS) * 100))
      setProgress(next)

      if (next >= 100) {
        if (!completedRef.current) {
          completedRef.current = true
          onComplete()
        }
        return
      }

      requestAnimationFrame(tick)
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" aria-hidden />

      <div className="relative rounded-t-3xl bg-white px-6 pb-10 pt-8">
        <h2 className="text-center text-lg font-bold text-textMain">
          در حال ساخت پروفایل
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-textMuted">
          لطفا کمی صبر کنید
        </p>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-[#E8E8E8]">
          <div
            className="h-full rounded-full bg-[#49A3AA] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-center text-sm font-semibold text-[#49A3AA]">
          {formatPersianNumber(progress)}٪
        </p>
      </div>
    </div>
  )
}
