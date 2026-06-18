import { WIZARD_SLIDE_COUNT } from '../../data/wizardData'
import { WizardPagination } from './WizardPagination'

interface WizardHeaderProps {
  activeIndex: number
  onDotClick: (index: number) => void
  title?: string
  slideCount?: number
}

export function WizardHeader({
  activeIndex,
  onDotClick,
  title = 'اطلاعات اولیه',
  slideCount = WIZARD_SLIDE_COUNT,
}: WizardHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-base font-bold text-[#49A3AA]">{title}</h1>
      <div className="mt-3 flex justify-center">
        <WizardPagination
          activeIndex={activeIndex}
          slideCount={slideCount}
          onDotClick={onDotClick}
        />
      </div>
    </div>
  )
}
