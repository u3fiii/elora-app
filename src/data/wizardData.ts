import type { ParentRole } from '../types'
import dadSelected from '../assets/onboarding/dad-selected.png'
import dad from '../assets/onboarding/dad.png'
import momSelected from '../assets/onboarding/mom-selected.png'
import mom from '../assets/onboarding/mom.png'
import otherSelected from '../assets/onboarding/other-selected.png'
import other from '../assets/onboarding/other.png'

export interface RoleOption {
  id: ParentRole
  label: string
  roleWord: string
  image: string
  imageSelected: string
}

export const roleOptions: RoleOption[] = [
  {
    id: 'mother',
    label: 'مادر',
    roleWord: 'مادر',
    image: mom,
    imageSelected: momSelected,
  },
  {
    id: 'father',
    label: 'پدر',
    roleWord: 'پدر',
    image: dad,
    imageSelected: dadSelected,
  },
  {
    id: 'other',
    label: 'دیگر',
    roleWord: 'والد',
    image: other,
    imageSelected: otherSelected,
  },
]

export const WIZARD_SLIDE_COUNT = 4
