import type {
  HomeChild,
  HomeContentCard,
  HomeLearningItem,
  HomeTask,
} from '../types'
import learning1 from '../assets/learning/learning-1.png'
import learning2 from '../assets/learning/learning-2.png'
import learning3 from '../assets/learning/learning-3.png'
import learning4 from '../assets/learning/learning-4.png'
import carousel1 from '../assets/carousel/carousel-1.png'
import carousel2 from '../assets/carousel/carousel-2.png'
import carousel3 from '../assets/carousel/carousel-3.png'

export const homeChildren: HomeChild[] = [
  {
    id: 'liam',
    name: 'لیام',
    ageLabel: '۱۴ ماهه',
    avatarLetter: 'ل',
    avatarClass: 'bg-gradient-to-br from-home-mint to-home-teal',
  },
  {
    id: 'sara',
    name: 'سارا',
    ageLabel: '۳ سال',
    avatarLetter: 'س',
    avatarClass: 'bg-gradient-to-br from-home-pink to-[#E896B4]',
  },
  {
    id: 'nima',
    name: 'نیما',
    ageLabel: '۵ سال',
    avatarLetter: 'ن',
    avatarClass: 'bg-gradient-to-br from-home-yellow to-home-peach',
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
    description:
      'لیام معمولاً بین ۸ تا ۹ صبح گرسنه می‌شود. یک وعده کامل شیر بدهید و بعد از آن ۱۵ دقیق استراحت بگذارید.',
    articleLink: { title: 'راهنمای شیردهی در ۱۴ ماهگی' },
  },
  {
    id: 'liam-2',
    label: 'بازی حسی ۳۰ دقیقه',
    colorClass: 'bg-home-pink',
    completed: false,
    description:
      'با وسایل خانگی مثل ظرف پلاستیکی، برنج یا پارچه‌های مختلف بازی حسی انجام دهید تا حواس لمسی تقویت شود.',
  },
  {
    id: 'liam-3',
    label: 'خواب ظهر',
    colorClass: 'bg-home-yellow',
    completed: false,
    description:
      'محیط را تاریک و آرام کنید. خواب ظهر ۱ تا ۱.۵ ساعته به رشد مغز کودک کمک می‌کند.',
  },
  {
    id: 'liam-4',
    label: 'حمام شبانه',
    colorClass: 'bg-home-lavender',
    completed: true,
    description:
      'آب ولرم و روال ثابت قبل از خواب به آرامش کودک کمک می‌کند. از اسباب‌بازی حمام استفاده کنید.',
    articleLink: { title: 'روال خواب آرامش‌بخش' },
  },
  {
    id: 'liam-5',
    label: 'داستان قبل از خواب',
    colorClass: 'bg-home-peach',
    completed: false,
    description:
      'یک کتاب کوتاه با تصاویر رنگی بخوانید. صدای آرام شما به خواب بهتر کمک می‌کند.',
  },
]

const saraHomeTasks: HomeTask[] = [
  {
    id: 'sara-1',
    label: 'صبحانه کامل',
    colorClass: 'bg-home-mint',
    completed: false,
    description:
      'سارا در ۳ سالگی به وعده‌های منظم نیاز دارد. پروتئین، میوه و لبنیات را در صبحانه بگنجانید.',
  },
  {
    id: 'sara-2',
    label: 'بازی نمایشی ۲۰ دقیقه',
    colorClass: 'bg-home-pink',
    completed: false,
    description:
      'با عروسک یا وسایل ساده نقش‌بازی کنید. این بازی به زبان و خلاقیت سه‌ساله‌ها کمک می‌کند.',
  },
  {
    id: 'sara-3',
    label: 'تمرین دستشویی',
    colorClass: 'bg-home-yellow',
    completed: false,
    description:
      'با تشویق ملایم و روال ثابت، رفتن به دستشویی را تمرین کنید. صبر و تکرار کلید موفقیت است.',
    articleLink: { title: 'آموزش دستشویی در ۳ سالگی' },
  },
  {
    id: 'sara-4',
    label: 'وقت بازی بیرون',
    colorClass: 'bg-home-lavender',
    completed: false,
    description:
      'حداقل ۳۰ دقیقه در حیاط یا پارک بازی کنید. دویدن و بالا رفتن به مهارت حرکتی کمک می‌کند.',
  },
  {
    id: 'sara-5',
    label: 'نقاشی آزاد',
    colorClass: 'bg-home-peach',
    completed: true,
    description:
      'کاغذ و مداد رنگی بدهید و بگذارید آزادانه نقاشی کند. تمرکز روی فرآیند، نه نتیجه.',
  },
]

const nimaHomeTasks: HomeTask[] = [
  {
    id: 'nima-1',
    label: 'آماده‌سازی مهد',
    colorClass: 'bg-home-mint',
    completed: false,
    description:
      'کوله، کفش و بطری آب را شب قبل آماده کنید. این کار صبح‌ها را برای نیما راحت‌تر می‌کند.',
  },
  {
    id: 'nima-2',
    label: 'خواندن با هم ۱۵ دقیقه',
    colorClass: 'bg-home-pink',
    completed: false,
    description:
      'هر روز ۱۵ دقیقه کتاب بخوانید. کودک پنج‌ساله می‌تواند بخشی از داستان را خودش تعریف کند.',
    articleLink: { title: 'کتاب‌های مناسب ۵ سالگی' },
  },
  {
    id: 'nima-3',
    label: 'فعالیت بدنی ۳۰ دقیقه',
    colorClass: 'bg-home-yellow',
    completed: false,
    description:
      'دوچرخه، توپ یا بازی حرکتی در فضای باز. تحرک روزانه به تمرکز و خواب بهتر کمک می‌کند.',
  },
  {
    id: 'nima-4',
    label: 'کمک در کارهای خانه',
    colorClass: 'bg-home-lavender',
    completed: false,
    description:
      'یک کار ساده مثل جمع کردن اسباب‌بازی یا چیدن میز. مسئولیت‌پذیری را از همین سن تقویت کنید.',
  },
  {
    id: 'nima-5',
    label: 'بازی فکری یا پازل',
    colorClass: 'bg-home-peach',
    completed: false,
    description:
      'پازل ۲۴ یا ۴۸ تکه یا بازی حافظه. چالش متناسب با سن باعث رضایت و یادگیری می‌شود.',
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

export const initialParentHomeTasks: HomeTask[] = [
  {
    id: 'p1',
    label: 'تمرین تنفس ۵ دقیقه',
    colorClass: 'bg-home-mint',
    completed: false,
    description:
      'چشم‌ها را ببند و ۴ ثانیه نفس بکش، ۴ ثانیه نگه دار و ۴ ثانیه بازدم کن. این کار به آرامش ذهنت کمک می‌کند.',
    articleLink: { title: 'راهنمای تنفس آرام برای والدین' },
  },
  {
    id: 'p2',
    label: 'یک لیوان آب بنوش',
    colorClass: 'bg-home-teal',
    completed: false,
    description:
      'آب کافی به تمرکز و انرژی روزانه کمک می‌کند. یک لیوان آب کنار خودت بگذار و در طول روز یادآوری کن.',
  },
  {
    id: 'p3',
    label: '۱۰ دقیقه استراحت بدون موبایل',
    colorClass: 'bg-home-lavender',
    completed: false,
    description:
      '۱۰ دقیقه گوشی را کنار بگذار. چشم‌ها را ببند، کشش سبک انجام بده یا فقط بنشین و استراحت کن.',
  },
  {
    id: 'p4',
    label: 'یک وعده سالم برای خودت',
    colorClass: 'bg-home-yellow',
    completed: false,
    description:
      'وقتی برای کودک غذا می‌آوری، یادت نرود خودت هم یک وعده کامل و مغذی بخوری. انرژی تو برای خانواده مهم است.',
  },
  {
    id: 'p5',
    label: 'قبل از خواب ۵ دقیقه بنویس',
    colorClass: 'bg-home-peach',
    completed: false,
    description:
      'سه چیز کوچک که امروز خوب بود یا از آن‌ها سپاسگزار بودی را یادداشت کن. این عادت به آرامش ذهنی کمک می‌کند.',
  },
]

export const homeLearningItems: HomeLearningItem[] = [
  { id: '1', imageSrc: learning1, alt: 'Tiny kicks, big dreams' },
  { id: '2', imageSrc: learning2, alt: 'آموزش والدین' },
  { id: '3', imageSrc: learning3, alt: 'آموزش کودک' },
  { id: '4', imageSrc: learning4, alt: 'Tiny kicks, big dreams' },
]

export const homeContentCards: HomeContentCard[] = [
  { id: '1', imageSrc: carousel1, alt: 'Baby Hat for Every Season' },
  { id: '2', imageSrc: carousel2, alt: 'This is slide No Two' },
  { id: '3', imageSrc: carousel3, alt: 'Baby Hat for Every Season' },
]

export const homeStreakDays = 14
