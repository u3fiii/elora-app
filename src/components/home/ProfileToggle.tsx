import clsx from 'clsx'
import { useState } from 'react'

export function ProfileToggle() {
  const [active, setActive] = useState<'baby' | 'parent'>('baby')

  return (
    <div className="mb-6 px-4">
      <div className="inline-flex rounded-2xl border border-border bg-background p-1">
        <button
          type="button"
          onClick={() => setActive('baby')}
          className={clsx(
            'rounded-xl px-4 py-2 text-sm font-medium transition-colors',
            active === 'baby'
              ? 'bg-primary text-white'
              : 'border border-border bg-surface text-textMuted',
          )}
        >
          برای لیام
        </button>
        <button
          type="button"
          onClick={() => setActive('parent')}
          className={clsx(
            'rounded-xl px-4 py-2 text-sm font-medium transition-colors',
            active === 'parent'
              ? 'bg-primary text-white'
              : 'border border-border bg-surface text-textMuted',
          )}
        >
          برای شما
        </button>
      </div>
    </div>
  )
}
