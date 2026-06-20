import clsx from 'clsx'
import { Bell, ChevronDown, Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { HomeChild } from '../../types'

interface HomeHeaderProps {
  childProfiles: HomeChild[]
  activeChildId: string
  onSelectChild: (id: string) => void
}

interface ChildAvatarProps {
  child: HomeChild
  className?: string
}

function ChildAvatar({ child, className }: ChildAvatarProps) {
  return (
    <img
      src={child.avatarImage}
      alt={child.name}
      className={clsx('h-7 w-7 shrink-0 rounded-full object-cover', className)}
    />
  )
}

export function HomeHeader({
  childProfiles,
  activeChildId,
  onSelectChild,
}: HomeHeaderProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const activeChild =
    childProfiles.find((child) => child.id === activeChildId) ?? childProfiles[0]

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <header className="flex items-center justify-between px-[18px] pb-2 pt-0">
      <div ref={rootRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex items-center gap-2 rounded-full border border-home-border bg-white py-1 pe-3 ps-1.5 transition-shadow hover:shadow-[0_2px_14px_rgba(0,0,0,0.06)]"
        >
          <ChildAvatar child={activeChild} />
          <div className="text-right leading-tight">
            <p className="text-xs font-bold text-home-heading">
              {activeChild.name}
            </p>
            <p className="text-[10px] text-home-muted">{activeChild.ageLabel}</p>
          </div>
          <ChevronDown
            className={clsx(
              'h-3.5 w-3.5 text-home-muted transition-transform',
              open && 'rotate-180',
            )}
          />
        </button>

        {open ? (
          <div className="absolute start-0 top-[calc(100%+8px)] z-50 min-w-[180px] rounded-[14px] border border-home-border bg-white p-1 shadow-[0_2px_14px_rgba(0,0,0,0.08)]">
            {childProfiles.map((child) => {
              const isActive = child.id === activeChildId

              return (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => {
                    onSelectChild(child.id)
                    setOpen(false)
                  }}
                  className={clsx(
                    'flex w-full items-center gap-2.5 rounded-[8px] px-3 py-2.5 text-right transition-colors',
                    isActive ? 'bg-home-doneBg' : 'hover:bg-home-pill',
                  )}
                >
                  <ChildAvatar child={child} />
                  <div className="leading-tight">
                    <p className="text-xs font-bold text-home-heading">
                      {child.name}
                    </p>
                    <p className="text-[10px] text-home-muted">
                      {child.ageLabel}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-home-chipBorder bg-white text-home-heading transition-colors hover:bg-home-pill"
          aria-label="جستجو"
        >
          <Search className="h-[18px] w-[18px]" strokeWidth={2} />
        </button>
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-home-chipBorder bg-white text-home-heading transition-colors hover:bg-home-pill"
          aria-label="اعلان‌ها"
        >
          <Bell className="h-[18px] w-[18px]" strokeWidth={2} />
          <span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-[#EF4444]" />
        </button>
      </div>
    </header>
  )
}
