import type { GrowthCalendarConfig, GrowthEventMarker } from '../types'

export const growthPathCalendar: GrowthCalendarConfig = {
  year: 1404,
  month: 3,
  today: 11,
  eventDays: {
    1: ['mint'],
    4: ['mint'],
    7: ['yellow'],
    9: ['mint', 'yellow'],
    11: ['mint'],
    12: ['mint', 'yellow'],
    13: ['mint', 'yellow'],
    15: ['yellow'],
    18: ['mint'],
    22: ['mint', 'yellow'],
    25: ['yellow'],
    28: ['mint'],
  },
}

export function getGrowthEventsForMonth(
  year: number,
  month: number,
): Record<number, GrowthEventMarker[]> {
  if (year === growthPathCalendar.year && month === growthPathCalendar.month) {
    return growthPathCalendar.eventDays
  }

  return {}
}
