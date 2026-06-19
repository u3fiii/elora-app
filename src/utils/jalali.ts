import type { ChildBirthDate } from '../types'

export const JALALI_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
] as const

export const JALALI_YEAR_MIN = 1390
export const JALALI_YEAR_MAX = 1404

export function formatPersianNumber(value: number): string {
  return value.toLocaleString('fa-IR', { useGrouping: false })
}

export function isJalaliLeapYear(year: number): boolean {
  const remainder = year % 33
  return [1, 5, 9, 13, 17, 22, 26, 30].includes(remainder)
}

export function getJalaliMonthDays(year: number, month: number): number {
  if (month <= 6) return 31
  if (month <= 11) return 30
  return isJalaliLeapYear(year) ? 30 : 29
}

export function getDefaultChildBirthDate() {
  return {
    year: 1401,
    month: 9,
    day: 15,
  }
}

export function formatChildBirthDateLabel(date: ChildBirthDate): string {
  return `${formatPersianNumber(date.day)} ${JALALI_MONTHS[date.month - 1]} ${formatPersianNumber(date.year)}`
}

export const JALALI_WEEKDAYS = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
] as const

export function jalaliToGregorian(
  jy: number,
  jm: number,
  jd: number,
): { gy: number; gm: number; gd: number } {
  let gy: number
  let jyLocal = jy

  if (jyLocal > 979) {
    gy = 1600
    jyLocal -= 979
  } else {
    gy = 621
  }

  let days =
    365 * jyLocal +
    Math.floor(jyLocal / 33) * 8 +
    Math.floor(((jyLocal % 33) + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186)

  gy += 400 * Math.floor(days / 146097)
  days %= 146097

  if (days > 36524) {
    gy += 100 * Math.floor(--days / 36524)
    days %= 36524
    if (days >= 365) days++
  }

  gy += 4 * Math.floor(days / 1461)
  days %= 1461

  if (days > 365) {
    gy += Math.floor((days - 1) / 365)
    days = (days - 1) % 365
  }

  let gd = days + 1

  const monthLengths = [
    0, 31, gy % 4 === 0 && (gy % 100 !== 0 || gy % 400 === 0) ? 29 : 28, 31,
    30, 31, 30, 31, 31, 30, 31, 30, 31,
  ]

  let gm = 0
  for (; gm < 13 && gd > monthLengths[gm]; gm++) {
    gd -= monthLengths[gm]
  }

  return { gy, gm, gd }
}

export function getJalaliWeekday(jy: number, jm: number, jd: number): number {
  const { gy, gm, gd } = jalaliToGregorian(jy, jm, jd)
  const jsDay = new Date(gy, gm - 1, gd).getDay()
  return (jsDay + 1) % 7
}

export function buildJalaliMonthGrid(year: number, month: number): (number | null)[] {
  const daysInMonth = getJalaliMonthDays(year, month)
  const startWeekday = getJalaliWeekday(year, month, 1)
  const cells: (number | null)[] = []

  for (let index = 0; index < startWeekday; index++) {
    cells.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day)
  }

  return cells
}

export function shiftJalaliMonth(
  year: number,
  month: number,
  delta: number,
): { year: number; month: number } {
  let nextMonth = month + delta
  let nextYear = year

  while (nextMonth > 12) {
    nextMonth -= 12
    nextYear++
  }

  while (nextMonth < 1) {
    nextMonth += 12
    nextYear--
  }

  return { year: nextYear, month: nextMonth }
}

export function formatJalaliMonthYear(year: number, month: number): string {
  return `${JALALI_MONTHS[month - 1]} ${formatPersianNumber(year)}`
}
