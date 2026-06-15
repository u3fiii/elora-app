import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

const slides = [
  {
    id: 1,
    title: 'هر روز، یک قدم کوچک',
    description:
      'الورا همراه روزانه شماست — با کارهای کوچک و قابل انجام، والدگری را لذت‌بخش‌تر می‌کند.',
    color: 'bg-primary-light',
    blob: 'bg-primary',
  },
  {
    id: 2,
    title: '۵ کار کوچک برای امروز',
    description:
      'هر روز پنج کار ساده برای کودکتان — با گیمیفیکیشن و پیشرفت قابل لمس، انگیزه بمانید.',
    color: 'bg-accentPink-light',
    blob: 'bg-accentPink',
  },
  {
    id: 3,
    title: 'محتوای متناسب با کودک شما',
    description:
      'مقالات، ویدیوها و صوت‌های شخصی‌سازی‌شده بر اساس سن و نیاز کودکتان.',
    color: 'bg-accentYellow-light',
    blob: 'bg-accentYellow',
  },
  {
    id: 4,
    title: 'همراه هوشمند الورا',
    description:
      'دستیار هوشمند الورا نکات، یادآوری‌ها و پاسخ‌های شخصی‌سازی‌شده را در اختیارتان می‌گذارد.',
    color: 'bg-accentBlue-light',
    blob: 'bg-accentBlue',
  },
]

export function OnboardingScreen() {
  const navigate = useNavigate()
  const [emblaRef, emblaApi] = useEmblaCarousel({ direction: 'rtl' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const isLastSlide = selectedIndex === slides.length - 1

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex-1 overflow-hidden pb-36" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex min-w-0 flex-[0_0_100%] flex-col items-center justify-center px-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className={`mb-10 flex h-56 w-full items-center justify-center rounded-3xl ${slide.color}`}
                >
                  <div
                    className={`h-24 w-24 rounded-full ${slide.blob} opacity-80`}
                  />
                </motion.div>
              </AnimatePresence>
              <h2 className="mb-3 text-center text-2xl font-bold text-textMain">
                {slide.title}
              </h2>
              <p className="text-center text-sm leading-relaxed text-textMuted">
                {slide.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 bg-background px-8 pb-8 pt-4">
        <div className="mb-6 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`اسلاید ${index + 1}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === selectedIndex
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>

        {isLastSlide ? (
          <Button fullWidth onClick={() => navigate('/signup')}>
            بزن بریم
          </Button>
        ) : (
          <div className="flex justify-center">
            <Button variant="ghost" onClick={() => navigate('/signup')}>
              رد کردن
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
