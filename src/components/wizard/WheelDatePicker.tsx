import { useMemo } from 'react'
import {
  formatPersianNumber,
  getJalaliMonthDays,
  JALALI_MONTHS,
  JALALI_YEAR_MAX,
  JALALI_YEAR_MIN,
} from '../../utils/jalali'
import type { ChildBirthDate } from '../../types'
import { WheelPickerColumn } from './WheelPickerColumn'

interface WheelDatePickerProps {
  value: ChildBirthDate
  onChange: (value: ChildBirthDate) => void
}

function createRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

export function WheelDatePicker({ value, onChange }: WheelDatePickerProps) {
  const years = useMemo(
    () =>
      createRange(JALALI_YEAR_MIN, JALALI_YEAR_MAX).map((year) => ({
        value: year,
        label: formatPersianNumber(year),
      })),
    [],
  )

  const months = useMemo(
    () =>
      JALALI_MONTHS.map((label, index) => ({
        value: index + 1,
        label,
      })),
    [],
  )

  const maxDays = getJalaliMonthDays(value.year, value.month)

  const days = useMemo(
    () =>
      createRange(1, maxDays).map((day) => ({
        value: day,
        label: formatPersianNumber(day),
      })),
    [maxDays],
  )

  const updateDate = (partial: Partial<ChildBirthDate>) => {
    const next = { ...value, ...partial }
    const nextMaxDays = getJalaliMonthDays(next.year, next.month)
    if (next.day > nextMaxDays) {
      next.day = nextMaxDays
    }
    onChange(next)
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[82px] z-10 h-14 rounded-xl bg-white/10" />

      <div className="relative z-0 flex" dir="rtl">
        <WheelPickerColumn
          items={days}
          value={value.day}
          onChange={(day) => updateDate({ day })}
        />
        <WheelPickerColumn
          items={months}
          value={value.month}
          onChange={(month) => updateDate({ month })}
        />
        <WheelPickerColumn
          items={years}
          value={value.year}
          onChange={(year) => updateDate({ year })}
        />
      </div>
    </div>
  )
}
