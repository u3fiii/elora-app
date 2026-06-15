import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { MockMobileKeyboard } from '../components/wizard/MockMobileKeyboard'
import { useMockKeyboardEnabled } from '../components/wizard/useMockKeyboardEnabled'
import { WizardAnimatedSlide } from '../components/wizard/animation'
import { WizardFooter } from '../components/wizard/WizardFooter'
import { WizardShell } from '../components/wizard/WizardShell'
import { BirthDateSlide } from '../components/wizard/slides/BirthDateSlide'
import { NameInputSlide } from '../components/wizard/slides/NameInputSlide'
import { RoleSelectionSlide } from '../components/wizard/slides/RoleSelectionSlide'
import { WIZARD_SLIDE_COUNT } from '../data/wizardData'
import { getDefaultChildBirthDate } from '../utils/jalali'
import type { WizardAnswers } from '../types'

function createInitialAnswers(): WizardAnswers {
  return { childBirthDate: getDefaultChildBirthDate() }
}

export function SetupWizardScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [slideIndex, setSlideIndex] = useState(0)
  const [answers, setAnswers] = useState<WizardAnswers>(createInitialAnswers)
  const [nameInputFocused, setNameInputFocused] = useState(false)

  useEffect(() => {
    setNameInputFocused(false)
  }, [slideIndex])

  useEffect(() => {
    if ((location.state as { resetWizard?: boolean } | null)?.resetWizard) {
      setSlideIndex(0)
      setAnswers(createInitialAnswers())
      navigate('/setup', { replace: true, state: null })
    }
  }, [location.state, navigate])
  const mockKeyboardEnabled = useMockKeyboardEnabled()
  const isNameInputSlide = slideIndex === 1 || slideIndex === 2
  const showMockKeyboard =
    isNameInputSlide && mockKeyboardEnabled && nameInputFocused
  const activeNameField = slideIndex === 1 ? 'userName' : 'childName'

  const isLastSlide = slideIndex === WIZARD_SLIDE_COUNT - 1
  const canContinue = (() => {
    switch (slideIndex) {
      case 0:
        return Boolean(answers.role)
      case 1:
        return (answers.userName?.trim().length ?? 0) >= 2
      case 2:
        return (answers.childName?.trim().length ?? 0) >= 2
      default:
        return true
    }
  })()

  const goToSlide = useCallback((index: number) => {
    if (index === slideIndex) return
    setSlideIndex(index)
  }, [slideIndex])

  const handleBack = () => {
    if (slideIndex === 0) return
    setSlideIndex((current) => current - 1)
  }

  const handleContinue = () => {
    if (!canContinue) return

    if (isLastSlide) {
      navigate('/home')
      return
    }

    setSlideIndex((current) => current + 1)
  }

  const renderSlide = () => {
    switch (slideIndex) {
      case 0:
        return (
          <RoleSelectionSlide
            selectedRole={answers.role}
            onSelectRole={(role) =>
              setAnswers((prev) => ({ ...prev, role }))
            }
          />
        )
      case 1:
        return (
          <NameInputSlide
            title="نام شما"
            subtitle="دوست داری در الورا با چه اسمی صدات بزنیم؟"
            placeholder="نام شما"
            value={answers.userName ?? ''}
            onChange={(userName) =>
              setAnswers((prev) => ({ ...prev, userName }))
            }
            onSubmit={handleContinue}
            onFocusChange={setNameInputFocused}
          />
        )
      case 2:
        return (
          <NameInputSlide
            title="نام کودک"
            subtitle="نام کودک دلبندت رو چی گذاشتید؟"
            placeholder="نام کودک"
            value={answers.childName ?? ''}
            onChange={(childName) =>
              setAnswers((prev) => ({ ...prev, childName }))
            }
            onSubmit={handleContinue}
            onFocusChange={setNameInputFocused}
          />
        )
      case 3:
        return (
          <BirthDateSlide
            value={answers.childBirthDate ?? getDefaultChildBirthDate()}
            onChange={(childBirthDate) =>
              setAnswers((prev) => ({ ...prev, childBirthDate }))
            }
          />
        )
      default:
        return null
    }
  }

  return (
    <WizardShell
      contentClassName={showMockKeyboard ? 'pb-[13.5rem]' : undefined}
      keyboard={
        showMockKeyboard ? (
          <MockMobileKeyboard
            onKey={(key) =>
              setAnswers((prev) => ({
                ...prev,
                [activeNameField]: `${prev[activeNameField] ?? ''}${key}`,
              }))
            }
            onBackspace={() =>
              setAnswers((prev) => ({
                ...prev,
                [activeNameField]: (prev[activeNameField] ?? '').slice(0, -1),
              }))
            }
            onSpace={() =>
              setAnswers((prev) => ({
                ...prev,
                [activeNameField]: `${prev[activeNameField] ?? ''} `,
              }))
            }
          />
        ) : undefined
      }
      footer={
        <WizardFooter
          activeIndex={slideIndex}
          onDotClick={goToSlide}
          showBack={slideIndex > 0}
          onBack={handleBack}
          continueDisabled={!canContinue}
          onContinue={handleContinue}
          continueLabel={isLastSlide ? 'شروع' : 'ادامه'}
        />
      }
    >
      <AnimatePresence mode="wait">
        <WizardAnimatedSlide slideKey={slideIndex}>
          {renderSlide()}
        </WizardAnimatedSlide>
      </AnimatePresence>
    </WizardShell>
  )
}
