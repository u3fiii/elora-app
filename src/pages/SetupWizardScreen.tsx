import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { getSupplementaryQuestions } from '../data/supplementaryWizardData'
import { WIZARD_SLIDE_COUNT } from '../data/wizardData'
import type { OtherRoleDetail, WizardAnswers } from '../types'
import { MockMobileKeyboard } from '../components/wizard/MockMobileKeyboard'
import { OtherRoleDetailSheet } from '../components/wizard/OtherRoleDetailSheet'
import { OtherRoleNoticeSheet } from '../components/wizard/OtherRoleNoticeSheet'
import { ProfileCreatingSheet } from '../components/wizard/ProfileCreatingSheet'
import { SupplementaryWizardFooter } from '../components/wizard/SupplementaryWizardFooter'
import { useMockKeyboardEnabled } from '../components/wizard/useMockKeyboardEnabled'
import { WizardAnimatedSlide } from '../components/wizard/animation'
import { WizardFooter } from '../components/wizard/WizardFooter'
import { WizardHeader } from '../components/wizard/WizardHeader'
import { WizardShell } from '../components/wizard/WizardShell'
import { BirthDateSlide } from '../components/wizard/slides/BirthDateSlide'
import { NameInputSlide } from '../components/wizard/slides/NameInputSlide'
import { RoleSelectionSlide } from '../components/wizard/slides/RoleSelectionSlide'
import { SupplementaryQuestionSlide } from '../components/wizard/slides/SupplementaryQuestionSlide'
import type { ParentRole } from '../types'

type SetupPhase = 'initial' | 'creating-profile' | 'supplementary'
type OtherRoleSheetStep = 'detail' | 'notice' | null

function createInitialAnswers(): WizardAnswers {
  return {}
}

export function SetupWizardScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [phase, setPhase] = useState<SetupPhase>('initial')
  const [slideIndex, setSlideIndex] = useState(0)
  const [supplementaryIndex, setSupplementaryIndex] = useState(0)
  const [answers, setAnswers] = useState<WizardAnswers>(createInitialAnswers)
  const [supplementaryAnswers, setSupplementaryAnswers] = useState<
    Record<string, string>
  >({})
  const [nameInputFocused, setNameInputFocused] = useState(false)
  const [otherRoleSheetStep, setOtherRoleSheetStep] =
    useState<OtherRoleSheetStep>(null)

  const resetWizard = useCallback(() => {
    setPhase('initial')
    setSlideIndex(0)
    setSupplementaryIndex(0)
    setAnswers(createInitialAnswers())
    setSupplementaryAnswers({})
    setNameInputFocused(false)
    setOtherRoleSheetStep(null)
  }, [])

  useEffect(() => {
    setNameInputFocused(false)
  }, [slideIndex, supplementaryIndex, phase])

  useEffect(() => {
    if ((location.state as { resetWizard?: boolean } | null)?.resetWizard) {
      resetWizard()
      navigate('/setup', { replace: true, state: null })
    }
  }, [location.state, navigate, resetWizard])

  const mockKeyboardEnabled = useMockKeyboardEnabled()
  const supplementaryQuestions = useMemo(
    () => getSupplementaryQuestions(answers.role),
    [answers.role],
  )
  const supplementaryQuestionCount = supplementaryQuestions.length
  const isInitialPhase = phase === 'initial'
  const isNameInputSlide = isInitialPhase && (slideIndex === 1 || slideIndex === 2)
  const showMockKeyboard =
    isNameInputSlide && mockKeyboardEnabled && nameInputFocused
  const activeNameField = slideIndex === 1 ? 'userName' : 'childName'

  const isLastInitialSlide = slideIndex === WIZARD_SLIDE_COUNT - 1
  const isLastSupplementarySlide =
    supplementaryIndex === supplementaryQuestionCount - 1

  const currentSupplementaryQuestion = supplementaryQuestions[supplementaryIndex]
  const currentSupplementaryAnswer =
    supplementaryAnswers[currentSupplementaryQuestion?.id ?? '']

  const canContinueInitial = (() => {
    switch (slideIndex) {
      case 0:
        return answers.role === 'mother' || answers.role === 'father'
      case 1:
        return (answers.userName?.trim().length ?? 0) >= 2
      case 2:
        return (
          Boolean(answers.childGender) &&
          (answers.childName?.trim().length ?? 0) >= 2
        )
      case 3:
        return Boolean(answers.childBirthDate)
      default:
        return true
    }
  })()

  const goToSlide = useCallback((index: number) => {
    if (!isInitialPhase || index === slideIndex) return
    setSlideIndex(index)
  }, [isInitialPhase, slideIndex])

  const goToSupplementarySlide = useCallback((index: number) => {
    if (phase !== 'supplementary' || index === supplementaryIndex) return
    setSupplementaryIndex(index)
  }, [phase, supplementaryIndex])

  const handleBack = () => {
    if (!isInitialPhase || slideIndex === 0) return
    setSlideIndex((current) => current - 1)
  }

  const handleInitialContinue = () => {
    if (!canContinueInitial) return

    if (isLastInitialSlide) {
      setPhase('creating-profile')
      return
    }

    setSlideIndex((current) => current + 1)
  }

  const handleProfileCreated = useCallback(() => {
    setPhase('supplementary')
  }, [])

  const finishSupplementary = () => {
    navigate('/profile-success', {
      state: { childName: answers.childName },
      replace: true,
    })
  }

  const advanceSupplementary = () => {
    if (isLastSupplementarySlide) {
      finishSupplementary()
      return
    }

    setSupplementaryIndex((current) => current + 1)
  }

  const handleSupplementaryContinue = () => {
    if (!currentSupplementaryAnswer) return
    advanceSupplementary()
  }

  const handleSupplementarySkip = () => {
    advanceSupplementary()
  }

  const handleSupplementarySelect = (optionId: string) => {
    if (!currentSupplementaryQuestion) return

    setSupplementaryAnswers((prev) => ({
      ...prev,
      [currentSupplementaryQuestion.id]: optionId,
    }))
  }

  const handleSelectRole = (role: ParentRole) => {
    if (role === 'other') {
      setOtherRoleSheetStep('detail')
      return
    }

    setAnswers((prev) => ({
      ...prev,
      role,
      otherRoleDetail: undefined,
    }))
    setOtherRoleSheetStep(null)
  }

  const handleOtherRoleDetailSelect = (detail: OtherRoleDetail) => {
    setAnswers((prev) => ({ ...prev, otherRoleDetail: detail }))
    setOtherRoleSheetStep('notice')
  }

  const handleOtherRoleNoticeDismiss = () => {
    setOtherRoleSheetStep(null)
  }

  const renderInitialSlide = () => {
    switch (slideIndex) {
      case 0:
        return (
          <RoleSelectionSlide
            selectedRole={answers.role}
            onSelectRole={handleSelectRole}
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
            onSubmit={handleInitialContinue}
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
            selectedGender={answers.childGender}
            onGenderChange={(childGender) =>
              setAnswers((prev) => ({ ...prev, childGender }))
            }
            onSubmit={handleInitialContinue}
            onFocusChange={setNameInputFocused}
          />
        )
      case 3:
        return (
          <BirthDateSlide
            value={answers.childBirthDate}
            onChange={(childBirthDate) =>
              setAnswers((prev) => ({ ...prev, childBirthDate }))
            }
          />
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    if (phase === 'supplementary') {
      return (
        <SupplementaryQuestionSlide
          question={currentSupplementaryQuestion}
          selectedOptionId={currentSupplementaryAnswer}
          onSelectOption={handleSupplementarySelect}
        />
      )
    }

    return renderInitialSlide()
  }

  const activeSlideKey =
    phase === 'supplementary' ? `supplementary-${supplementaryIndex}` : slideIndex

  return (
    <>
      <WizardShell
        header={
          <WizardHeader
            activeIndex={
              phase === 'supplementary' ? supplementaryIndex : slideIndex
            }
            onDotClick={
              phase === 'supplementary'
                ? goToSupplementarySlide
                : goToSlide
            }
            title={
              phase === 'supplementary' ? 'اطلاعات تکمیلی' : 'اطلاعات اولیه'
            }
            slideCount={
              phase === 'supplementary'
                ? supplementaryQuestionCount
                : WIZARD_SLIDE_COUNT
            }
          />
        }
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
          phase === 'supplementary' ? (
            <SupplementaryWizardFooter
              continueDisabled={!currentSupplementaryAnswer}
              onContinue={handleSupplementaryContinue}
              onSkip={handleSupplementarySkip}
              continueLabel={isLastSupplementarySlide ? 'شروع' : 'بعدی'}
            />
          ) : (
            <WizardFooter
              showBack={slideIndex > 0}
              onBack={handleBack}
              continueDisabled={!canContinueInitial}
              onContinue={handleInitialContinue}
              continueLabel={isLastInitialSlide ? 'شروع' : 'ادامه'}
            />
          )
        }
      >
        <AnimatePresence mode="wait">
          <WizardAnimatedSlide slideKey={activeSlideKey}>
            {renderContent()}
          </WizardAnimatedSlide>
        </AnimatePresence>
      </WizardShell>

      {phase === 'creating-profile' ? (
        <ProfileCreatingSheet onComplete={handleProfileCreated} />
      ) : null}

      <OtherRoleDetailSheet
        open={otherRoleSheetStep === 'detail'}
        onSelect={handleOtherRoleDetailSelect}
      />

      <OtherRoleNoticeSheet
        open={otherRoleSheetStep === 'notice'}
        onDismiss={handleOtherRoleNoticeDismiss}
      />
    </>
  )
}
