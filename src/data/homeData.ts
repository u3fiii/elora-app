import type {
  HomeChild,
  HomeContentCard,
  HomeLearningItem,
  HomeTask,
} from '../types'
import learningBanner1 from '../assets/learning/learning-banner-1.png'
import learningBanner2 from '../assets/learning/learning-banner-2.png'
import learningBanner3 from '../assets/learning/learning-banner-3.png'
import learningBanner4 from '../assets/learning/learning-banner-4.png'
import learningBanner5 from '../assets/learning/learning-banner-5.png'
import learningBanner6 from '../assets/learning/learning-banner-6.png'
import carousel1 from '../assets/carousel/carousel-1.png'
import carousel2 from '../assets/carousel/carousel-2.png'
import carousel3 from '../assets/carousel/carousel-3.png'
import childLiamAvatar from '../assets/avatars/child-liam.png'
import childNimaAvatar from '../assets/avatars/child-nima.png'
import childSaraAvatar from '../assets/avatars/child-sara.png'

export const homeChildren: HomeChild[] = [
  {
    id: 'liam',
    name: 'لیام',
    ageLabel: '۱۴ ماهه',
    avatarImage: childLiamAvatar,
  },
  {
    id: 'sara',
    name: 'سارا',
    ageLabel: '۳ سال',
    avatarImage: childSaraAvatar,
  },
  {
    id: 'nima',
    name: 'نیما',
    ageLabel: '۵ سال',
    avatarImage: childNimaAvatar,
  },
]

export const homeParentName = 'مهسا'

export const homeGreetingDate = 'دوشنبه، ۱۱ خرداد ۱۴۰۴'

export const initialHomeTasks: HomeTask[] = [
  {
    id: 'liam-1',
    label: 'شیردهی صبح',
    colorClass: 'bg-home-mint',
    completed: false,
    subject: 'child',
    description:
      'لیام معمولاً بین ۸ تا ۹ صبح گرسنه می‌شود. یک وعده کامل شیر بدهید و بعد از آن ۱۵ دقیقه استراحت بگذارید.',
    articleLink: { title: 'راهنمای شیردهی در ۱۴ ماهگی' },
  },
  {
    id: 'liam-2',
    label: 'بازی حسی ۳۰ دقیقه',
    colorClass: 'bg-home-pink',
    completed: false,
    subject: 'child',
    description:
      'با وسایل خانگی مثل ظرف پلاستیکی، برنج یا پارچه‌های مختلف بازی حسی انجام دهید تا حواس لمسی تقویت شود.',
  },
  {
    id: 'liam-3',
    label: 'تمرین تنفس ۵ دقیقه',
    colorClass: 'bg-home-lavender',
    completed: false,
    subject: 'parent',
    description:
      'چشم‌ها را ببند و ۴ ثانیه نفس بکش، ۴ ثانیه نگه دار و ۴ ثانیه بازدم کن. این کار به آرامش ذهنت کمک می‌کند.',
    articleLink: { title: 'راهنمای تنفس آرام برای والدین' },
  },
  {
    id: 'liam-4',
    label: 'خواب ظهر ۱ ساعت',
    colorClass: 'bg-home-yellow',
    completed: false,
    subject: 'child',
    description:
      'لیام در این سن به خواب ظهر منظم نیاز دارد. اتاق را تاریک و آرام کن و روتین کوتاه قبل از خواب را تکرار کن.',
  },
  {
    id: 'liam-5',
    label: 'ثبت یادداشت روزانه',
    colorClass: 'bg-home-teal',
    completed: false,
    subject: 'parent',
    description:
      'یک یا دو جمله درباره رفتار، خواب یا غذای امروز لیام بنویس. این یادداشت‌ها بعداً به پیگیری رشد کمک می‌کند.',
  },
]

const saraHomeTasks: HomeTask[] = [
  {
    id: 'sara-1',
    label: 'صبحانه کامل',
    colorClass: 'bg-home-mint',
    completed: false,
    subject: 'child',
    description:
      'سارا در ۳ سالگی به وعده‌های منظم نیاز دارد. پروتئین، میوه و لبنیات را در صبحانه بگنجانید.',
  },
  {
    id: 'sara-2',
    label: 'بازی نمایشی ۲۰ دقیقه',
    colorClass: 'bg-home-pink',
    completed: false,
    subject: 'child',
    description:
      'با عروسک یا وسایل ساده نقش‌بازی کنید. این بازی به زبان و خلاقیت سه‌ساله‌ها کمک می‌کند.',
  },
  {
    id: 'sara-3',
    label: '۱۰ دقیقه استراحت بدون موبایل',
    colorClass: 'bg-home-lavender',
    completed: false,
    subject: 'parent',
    description:
      '۱۰ دقیقه گوشی را کنار بگذار. چشم‌ها را ببند، کشش سبک انجام بده یا فقط بنشین و استراحت کن.',
  },
  {
    id: 'sara-4',
    label: 'نقاشی و رنگ‌آمیزی ۱۵ دقیقه',
    colorClass: 'bg-home-yellow',
    completed: false,
    subject: 'child',
    description:
      'با مداد رنگی یا گواش نقاشی آزاد انجام دهید. تمرکز روی فرآیند مهم‌تر از نتیجه نهایی است.',
  },
  {
    id: 'sara-5',
    label: 'پیاده‌روی کوتاه با هم',
    colorClass: 'bg-home-teal',
    completed: false,
    subject: 'parent',
    description:
      '۱۵ دقیقه در محله قدم بزنید. این کار هم برای سارا تحرک است و هم برای تو فرصتی برای آرامش ذهنی.',
  },
]

const nimaHomeTasks: HomeTask[] = [
  {
    id: 'nima-1',
    label: 'خواندن با هم ۱۵ دقیقه',
    colorClass: 'bg-home-mint',
    completed: false,
    subject: 'child',
    description:
      'هر روز ۱۵ دقیقه کتاب بخوانید. کودک پنج‌ساله می‌تواند بخشی از داستان را خودش تعریف کند.',
    articleLink: { title: 'کتاب‌های مناسب ۵ سالگی' },
  },
  {
    id: 'nima-2',
    label: 'فعالیت بدنی ۳۰ دقیقه',
    colorClass: 'bg-home-yellow',
    completed: false,
    subject: 'child',
    description:
      'دوچرخه، توپ یا بازی حرکتی در فضای باز. تحرک روزانه به تمرکز و خواب بهتر کمک می‌کند.',
  },
  {
    id: 'nima-3',
    label: 'یک لیوان آب بنوش',
    colorClass: 'bg-home-teal',
    completed: false,
    subject: 'parent',
    description:
      'آب کافی به تمرکز و انرژی روزانه کمک می‌کند. یک لیوان آب کنار خودت بگذار و در طول روز یادآوری کن.',
  },
  {
    id: 'nima-4',
    label: 'تمرین شمارش و حروف',
    colorClass: 'bg-home-pink',
    completed: false,
    subject: 'child',
    description:
      'با کارت‌های حروف یا اعداد بازی کنید. نیما می‌تواند حروف آشنا را نام ببرد یا تا ۲۰ بشمارد.',
  },
  {
    id: 'nima-5',
    label: 'آماده‌سازی فردا شب',
    colorClass: 'bg-home-lavender',
    completed: false,
    subject: 'parent',
    description:
      'لباس فردا، کیف مهد یا وسایل مدرسه را از شب قبل آماده کن تا صبح آرام‌تر شروع شود.',
  },
]

export const initialChildTasksById: Record<string, HomeTask[]> = {
  liam: initialHomeTasks,
  sara: saraHomeTasks,
  nima: nimaHomeTasks,
}

export function cloneHomeTasks(tasks: HomeTask[]): HomeTask[] {
  return tasks.map((task) => ({ ...task }))
}

export function createInitialChildTasksState(): Record<string, HomeTask[]> {
  return Object.fromEntries(
    Object.entries(initialChildTasksById).map(([childId, tasks]) => [
      childId,
      cloneHomeTasks(tasks),
    ]),
  )
}

export const homeLearningItems: HomeLearningItem[] = [
  { id: '1', imageSrc: learningBanner1, alt: 'بنر آموزشی لورم ایپسوم' },
  { id: '2', imageSrc: learningBanner2, alt: 'بنر آموزشی Tiny kicks, big dreams' },
  { id: '4', imageSrc: learningBanner4, alt: 'بنر آموزشی بارداری' },
  { id: '3', imageSrc: learningBanner3, alt: 'بنر آموزشی قهرمان کوچک' },
  { id: '5', imageSrc: learningBanner5, alt: 'بنر آموزشی لورم ایپسوم سبز' },
  { id: '6', imageSrc: learningBanner6, alt: 'بنر آموزشی لورم ایپسوم بنفش' },
]

export const homeContentCards: HomeContentCard[] = [
  { id: '1', imageSrc: carousel1, alt: 'Tiny kicks, big dreams learning' },
  { id: '2', imageSrc: carousel2, alt: 'Tiny kicks, big dreams' },
  {
    id: '3',
    imageSrc: carousel3,
    alt: 'چیزایی که پیش از بارداری بهتره بدونیم',
  },
]

export const homeStreakDays = 14
