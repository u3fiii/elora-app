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

export interface HomeChild {
  id: string
  name: string
  ageLabel: string
  avatarImage: string
}

export interface HomeTask {
  id: string
  label: string
  colorClass: string
  completed: boolean
  description: string
  subject: 'child' | 'parent'
  articleLink?: {
    title: string
  }
}

export interface HomeLearningItem {
  id: string
  imageSrc: string
  alt: string
}

export interface HomeContentCard {
  id: string
  imageSrc: string
  alt: string
}

export type HomeNavTab = 'profile' | 'chat' | 'home' | 'calendar' | 'library'

export type GrowthEventMarker = 'mint' | 'yellow'

export interface GrowthCalendarConfig {
  year: number
  month: number
  today: number
  eventDays: Record<number, GrowthEventMarker[]>
}

export type ParentRole = 'mother' | 'father' | 'other'

export type OtherRoleDetail = 'grandparent' | 'family' | 'caregiver' | 'other'

export type ChildGender = 'boy' | 'girl'

export interface ChildBirthDate {
  year: number
  month: number
  day: number
}

export interface WizardAnswers {
  role?: ParentRole
  otherRoleDetail?: OtherRoleDetail
  userName?: string
  childName?: string
  childGender?: ChildGender
  childBirthDate?: ChildBirthDate
}
