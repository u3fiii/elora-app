import clsx from 'clsx'
import { Check } from 'lucide-react'
import type { SupplementaryQuestion } from '../../../data/supplementaryWizardData'
import { WizardAnimatedItem } from '../animation'

interface SupplementaryQuestionSlideProps {
  question: SupplementaryQuestion
  selectedOptionId?: string
  onSelectOption: (optionId: string) => void
}

export function SupplementaryQuestionSlide({
  question,
  selectedOptionId,
  onSelectOption,
}: SupplementaryQuestionSlideProps) {
  return (
    <div>
      <div className="mb-8 text-center">
        <WizardAnimatedItem>
          <h2 className="text-2xl font-bold leading-relaxed text-textMain">
            {question.question}
          </h2>
        </WizardAnimatedItem>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id

          return (
            <WizardAnimatedItem key={option.id}>
              <button
                type="button"
                onClick={() => onSelectOption(option.id)}
                className={clsx(
                  'flex w-full items-center rounded-full px-5 py-3.5 transition-colors duration-200',
                  isSelected
                    ? 'bg-wizard-cardSelected text-white'
                    : 'bg-wizard-card text-white',
                )}
              >
                <span
                  className={clsx(
                    'me-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
                    isSelected
                      ? 'border-white bg-white text-wizard-cardSelected'
                      : 'border-white bg-transparent',
                  )}
                >
                  {isSelected ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : null}
                </span>

                <span className="flex-1 text-start text-sm font-semibold">
                  {option.label}
                </span>
              </button>
            </WizardAnimatedItem>
          )
        })}
      </div>
    </div>
  )
}
