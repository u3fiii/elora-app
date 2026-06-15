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
