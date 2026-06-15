import clsx from 'clsx'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { WizardAnimatedItem } from '../animation'

interface NameInputSlideProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  title: string
  subtitle: string
  placeholder: string
}

export function NameInputSlide({
  value,
  onChange,
  onSubmit,
  title,
  subtitle,
  placeholder,
}: NameInputSlideProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(true)
  const showCustomCursor = isFocused && value.length === 0
  const canSubmit = value.trim().length >= 2

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true })
  }, [])

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit()
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <WizardAnimatedItem>
          <h2 className="text-2xl font-bold text-textMain">{title}</h2>
        </WizardAnimatedItem>

        <WizardAnimatedItem>
          <p className="mt-2 text-sm font-semibold text-wizard-title">{subtitle}</p>
        </WizardAnimatedItem>
      </div>

      <WizardAnimatedItem>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmit()
              }
            }}
            placeholder={showCustomCursor ? '' : placeholder}
            autoFocus
            className={clsx(
              'w-full rounded-full border-2 bg-white/50 py-3.5 pr-5 text-right text-sm text-textMain outline-none transition-colors',
              'placeholder:text-[#49A3AA]/50',
              showCustomCursor ? 'caret-transparent' : 'caret-[#49A3AA]',
              canSubmit ? 'pl-12' : 'pl-5',
              isFocused
                ? 'animate-wizard-input-pulse border-[#49A3AA] bg-white/70'
                : 'border-transparent',
            )}
            autoComplete="name"
          />

          {showCustomCursor && (
            <>
              <span className="pointer-events-none absolute top-1/2 right-[calc(1.25rem+0.125rem+4px)] -translate-y-1/2 text-sm text-[#49A3AA]/50">
                {placeholder}
              </span>
              <span
                className="animate-cursor-blink pointer-events-none absolute top-1/2 right-5 h-[1.125rem] w-0.5 -translate-y-1/2 rounded-full bg-[#49A3AA]"
                aria-hidden
              />
            </>
          )}

          {canSubmit && (
            <button
              type="button"
              onClick={handleSubmit}
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#49A3AA] text-white transition-transform active:scale-95"
              aria-label="تأیید و ادامه"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </WizardAnimatedItem>
    </div>
  )
}
