import type {
  AIInsight,
  AlertCard,
  BabyProfile,
  ContentCard,
  DailyTask,
  ParentProfile,
  ScheduleItem,
} from '../types'

export const babyProfile: BabyProfile = {
  id: '1',
  name: 'لیام',
  ageMonths: 14,
  avatarLetter: 'ل',
  avatarColorClass: 'bg-primary',
}

export const parentProfile: ParentProfile = {
  name: 'آش',
}

export const greetingDate = 'دوشنبه، ۱۱ خرداد'

export const alertCards: AlertCard[] = [
  {
    id: '1',
    category: 'سلامت',
    title: 'واکسیناسیون موعدش رسیده',
    subtitle: 'واکسن MMRV برای ۱۵ ماهگی — تا ۳ روز دیگر',
    accentClass: 'border-accentPink',
  },
  {
    id: '2',
    category: 'تندرستی',
    title: 'چک‌آپ ماهانه',
    subtitle: 'وزن و قد لیام — هفته آینده وقت بگیرید',
    accentClass: 'border-primary',
  },
  {
    id: '3',
    category: 'رشد',
    title: 'نکته‌ی رشد این هفته',
    subtitle: 'لیام احتمالاً شروع به راه رفتن می‌کند',
    accentClass: 'border-accentYellow',
  },
]

export const dailyTasks: DailyTask[] = [
  {
    id: '1',
    label: 'قطره ویتامین D بدهید',
    dotColor: 'bg-primary',
    completed: true,
  },
  {
    id: '2',
    label: '۱۵ دقیقه کتاب بخوانید',
    dotColor: 'bg-accentPink',
    completed: true,
  },
  {
    id: '3',
    label: 'یک وعده جدید غذا امتحان کنید',
    dotColor: 'bg-accentYellow',
    completed: false,
  },
  {
    id: '4',
    label: 'زمان بازی آزاد بگذارید',
    dotColor: 'bg-accentBlue',
    completed: false,
  },
  {
    id: '5',
    label: 'قبل از خواب ماساژ ملایم',
    dotColor: 'bg-primary-dark',
    completed: false,
  },
]

export const dailyMotivation =
  'بیشتر والدین روز سوم می‌مونن، شما ازش گذشتید!'

export const streakDays = 14

export const aiInsight: AIInsight = {
  id: '1',
  bodyBefore: 'لیام بعدازظهرها ',
  highlightedPhrase: 'بی‌قرار',
  bodyAfter: ' بوده. می‌خواید بدونید چرا؟',
}

export const forYouContent: ContentCard[] = [
  {
    id: '1',
    type: 'article',
    title: 'علائم دندان درآوردن در ۱۴ ماهگی',
    meta: 'مقاله · ۵ دقیقه',
    thumbnailColor: 'bg-accentPink-light',
    badgeColor: 'bg-accentPink-light text-accentPink',
  },
  {
    id: '2',
    type: 'video',
    title: 'تمرینات تقویت تعادل برای نوپاها',
    meta: 'ویدیو · ۸ دقیقه',
    thumbnailColor: 'bg-accentYellow-light',
    badgeColor: 'bg-accentYellow-light text-amber-700',
  },
  {
    id: '3',
    type: 'audio',
    title: 'مدیتیشن ۵ دقیقه‌ای برای والدین',
    meta: 'صوت · ۵ دقیقه',
    thumbnailColor: 'bg-accentBlue-light',
    badgeColor: 'bg-accentBlue-light text-indigo-600',
  },
]

export const todaysPlan: ScheduleItem[] = [
  {
    id: '1',
    time: '۸:۳۰',
    title: 'قطره ویتامین D',
    subtitle: '۴۰۰ واحد، روزانه',
    dotColor: 'bg-primary',
  },
  {
    id: '2',
    time: '۱۲:۰۰',
    title: 'وعده ناهار',
    subtitle: 'سوپ عدس و نان تست',
    dotColor: 'bg-accentYellow',
  },
  {
    id: '3',
    time: '۱۹:۳۰',
    title: 'حمام و خواب',
    subtitle: 'روال آرامش‌بخش قبل از خواب',
    dotColor: 'bg-accentPink',
  },
]
