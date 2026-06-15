import type { Transition, Variants } from 'framer-motion'

export const WIZARD_STAGGER_ENTER = 0.1
export const WIZARD_STAGGER_EXIT = 0.06
export const WIZARD_ITEM_OFFSET_Y = 8
export const WIZARD_ITEM_SCALE_FROM = 0.94

export const wizardItemTransition: Transition = {
  duration: 0.3,
  ease: 'easeOut',
}

export const wizardItemExitTransition: Transition = {
  duration: 0.22,
  ease: 'easeIn',
}

export const wizardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: WIZARD_STAGGER_ENTER,
    },
  },
  exit: {
    transition: {
      staggerChildren: WIZARD_STAGGER_EXIT,
      staggerDirection: -1,
    },
  },
}

export const wizardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: WIZARD_ITEM_OFFSET_Y,
    scale: WIZARD_ITEM_SCALE_FROM,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: wizardItemTransition,
  },
  exit: {
    opacity: 0,
    y: WIZARD_ITEM_OFFSET_Y,
    scale: WIZARD_ITEM_SCALE_FROM,
    transition: wizardItemExitTransition,
  },
}
