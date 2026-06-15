import clsx from 'clsx'
import { Delete } from 'lucide-react'
import type { ReactNode } from 'react'

const KEYBOARD_ROWS = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح'],
  ['ش', 'س', 'ی', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ک'],
  ['ظ', 'ط', 'ز', 'ر', 'ذ', 'د', 'پ', 'و', 'ژ', 'گ'],
]

interface MockMobileKeyboardProps {
  onKey: (key: string) => void
  onBackspace: () => void
  onSpace: () => void
}

function KeyButton({
  children,
  className,
  onClick,
  ariaLabel,
}: {
  children: ReactNode
  className?: string
  onClick: () => void
  ariaLabel?: string
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        'flex h-10 items-center justify-center rounded-lg bg-white text-base font-medium text-textMain shadow-sm active:bg-gray-100',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function MockMobileKeyboard({
  onKey,
  onBackspace,
  onSpace,
}: MockMobileKeyboardProps) {
  return (
    <div
      className="rounded-t-2xl border-t border-black/10 bg-[#D1D5DB]/90 px-1.5 pb-2 pt-2 backdrop-blur-sm"
      onMouseDown={(e) => e.preventDefault()}
    >
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="mb-1.5 flex justify-center gap-1 last:mb-0"
        >
          {row.map((key) => (
            <KeyButton
              key={key}
              className="min-w-[8%] flex-1"
              onClick={() => onKey(key)}
            >
              {key}
            </KeyButton>
          ))}
        </div>
      ))}

      <div className="flex gap-1">
        <KeyButton className="flex-[3]" onClick={onSpace} ariaLabel="فاصله">
          فاصله
        </KeyButton>
        <KeyButton className="flex-1" onClick={onBackspace} ariaLabel="پاک کردن">
          <Delete className="h-5 w-5" />
        </KeyButton>
      </div>
    </div>
  )
}
