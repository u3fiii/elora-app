import clsx from 'clsx'
import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { HomeContentCard } from '../../types'

interface HomeForYouCarouselProps {
  cards: HomeContentCard[]
}

const AUTOPLAY_MS = 6000
const TWEEN_FACTOR_BASE = 0.72
const MIN_PEEK_SCALE = 0.94

const numberWithinRange = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max)

export function HomeForYouCarousel({ cards }: HomeForYouCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'center',
      containScroll: false,
      loop: cards.length > 1,
    },
    [],
  )

  const setTweenNodes = useCallback((api: EmblaCarouselType) => {
    tweenNodes.current = api.slideNodes().map(
      (slideNode) =>
        slideNode.querySelector('[data-embla-scale]') as HTMLElement,
    )
  }, [])

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  const tweenScale = useCallback(
    (api: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = api.internalEngine()
      const scrollProgress = api.scrollProgress()
      const slidesInView = api.slidesInView()
      const isScrollEvent = eventName === 'scroll'

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.slideRegistry[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const scale = numberWithinRange(tweenValue, MIN_PEEK_SCALE, 1)
          const tweenNode = tweenNodes.current[slideIndex]

          if (tweenNode) {
            tweenNode.style.transform = `scale(${scale})`
          }
        })
      })
    },
    [],
  )

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)
    onSelect(emblaApi)

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('select', onSelect)
      .on('reInit', onSelect)

    return () => {
      emblaApi
        .off('reInit', setTweenNodes)
        .off('reInit', setTweenFactor)
        .off('reInit', tweenScale)
        .off('scroll', tweenScale)
        .off('select', onSelect)
        .off('reInit', onSelect)
    }
  }, [emblaApi, onSelect, setTweenFactor, setTweenNodes, tweenScale])

  useEffect(() => {
    if (!emblaApi || cards.length <= 1) return

    const timer = window.setInterval(() => {
      emblaApi.scrollNext()
    }, AUTOPLAY_MS)

    return () => window.clearInterval(timer)
  }, [cards.length, emblaApi, selectedIndex])

  const goToSlide = (index: number) => {
    emblaApi?.scrollTo(index)
  }

  if (cards.length === 0) return null

  return (
    <section className="mt-8">
      <div className="overflow-hidden" ref={emblaRef} dir="ltr">
        <div className="-ms-2 flex touch-pan-y touch-pinch-zoom">
          {cards.map((card) => (
            <div
              key={card.id}
              className="min-w-0 flex-[0_0_80%] ps-2"
            >
              <div
                data-embla-scale
                className="h-[128px] origin-center overflow-hidden rounded-[20px] shadow-[0_2px_14px_rgba(0,0,0,0.06)] will-change-transform [backface-visibility:hidden]"
              >
                <img
                  src={card.imageSrc}
                  alt={card.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {cards.length > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {cards.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`اسلاید ${index + 1}`}
              aria-current={index === selectedIndex}
              className={clsx(
                'h-2 rounded-full transition-all duration-200',
                index === selectedIndex
                  ? 'w-4 bg-home-teal'
                  : 'w-2 bg-[#D8D4CA]',
              )}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
