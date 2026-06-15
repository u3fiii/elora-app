import clsx from 'clsx'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { roleOptions } from '../../../data/wizardData'
import type { ParentRole } from '../../../types'
import { WizardAnimatedItem } from '../animation'

interface RoleSelectionSlideProps {
  selectedRole?: ParentRole
  onSelectRole: (role: ParentRole) => void
}

interface RoleCardProps {
  option: (typeof roleOptions)[number]
  isSelected: boolean
  onSelect: (role: ParentRole) => void
}

function RoleCard({ option, isSelected, onSelect }: RoleCardProps) {
  const controls = useAnimation()
  const selectedScale = 1.01
  const pulsePeakScale = 1.02

  useEffect(() => {
    if (!isSelected) {
      void controls.start({
        scale: 1,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
      })
    }
  }, [controls, isSelected])

  const handleClick = () => {
    onSelect(option.id)
    void controls
      .start({
        scale: 0.99,
        transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] },
      })
      .then(() =>
        controls.start({
          scale: selectedScale,
          transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] },
        }),
      )
      .then(() =>
        controls.start({
          scale: pulsePeakScale,
          transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] },
        }),
      )
      .then(() =>
        controls.start({
          scale: selectedScale,
          transition: { duration: 0.09, ease: [0.4, 0, 0.2, 1] },
        }),
      )
  }

  return (
    <motion.button
      type="button"
      animate={controls}
      initial={{ scale: 1 }}
      onClick={handleClick}
      className={clsx(
        'relative flex w-full items-center justify-between overflow-hidden rounded-2xl px-5 py-3.5 transition-colors duration-300 ease-in-out',
        isSelected
          ? 'animate-wizard-card-pulse border-4 border-wizard-cardBorder bg-wizard-cardSelected'
          : 'border-4 border-transparent bg-wizard-card/80',
      )}
    >
      <span className="relative z-10 text-lg font-semibold text-white">
        {option.label}
      </span>
      <img
        src={isSelected ? option.imageSelected : option.image}
        alt=""
        className={clsx(
          'relative z-10 h-[76px] w-[92px] object-contain',
          isSelected ? 'mix-blend-screen' : 'brightness-0 invert',
        )}
      />
    </motion.button>
  )
}

export function RoleSelectionSlide({
  selectedRole,
  onSelectRole,
}: RoleSelectionSlideProps) {
  const selectedOption = roleOptions.find((option) => option.id === selectedRole)

  return (
    <div>
      <div className="mb-8 text-center">
        <WizardAnimatedItem>
          <h2 className="text-2xl font-bold text-textMain">
            من یک{' '}
            {selectedOption ? selectedOption.roleWord : '...'} هستم.
          </h2>
        </WizardAnimatedItem>

        <WizardAnimatedItem>
          <p className="mt-2 text-sm font-semibold text-wizard-title">
            نقش خود را مشخص کنید.
          </p>
        </WizardAnimatedItem>
      </div>

      <div className="space-y-3">
        {roleOptions.map((option) => {
          const isSelected = selectedRole === option.id

          return (
            <WizardAnimatedItem key={option.id}>
              <RoleCard
                option={option}
                isSelected={isSelected}
                onSelect={onSelectRole}
              />
            </WizardAnimatedItem>
          )
        })}
      </div>
    </div>
  )
}
