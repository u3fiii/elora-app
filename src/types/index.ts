export interface BabyProfile {
  id: string
  name: string
  ageMonths: number
  avatarLetter: string
  avatarColorClass: string
}

export interface AlertCard {
  id: string
  category: string
  title: string
  subtitle: string
  accentClass: string
}

export interface DailyTask {
  id: string
  label: string
  dotColor: string
  completed: boolean
}

export interface ContentCard {
  id: string
  type: 'article' | 'video' | 'audio'
  title: string
  meta: string
  thumbnailColor: string
  badgeColor: string
}

export interface ScheduleItem {
  id: string
  time: string
  title: string
  subtitle: string
  dotColor: string
}

export interface AIInsight {
  id: string
  bodyBefore: string
  highlightedPhrase: string
  bodyAfter: string
}

export interface ParentProfile {
  name: string
}

export type ParentRole = 'mother' | 'father' | 'other'

export interface ChildBirthDate {
  year: number
  month: number
  day: number
}

export interface WizardAnswers {
  role?: ParentRole
  userName?: string
  childName?: string
  childBirthDate?: ChildBirthDate
}
