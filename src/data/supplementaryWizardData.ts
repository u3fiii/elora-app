import type { ParentRole } from '../types'

export interface SupplementaryOption {
  id: string
  label: string
}

export interface SupplementaryQuestion {
  id: string
  question: string
  options: SupplementaryOption[]
}

const underlyingConditionQuestion: SupplementaryQuestion = {
  id: 'underlying-condition',
  question: 'آیا بیماری زمینه‌ای خاصی داری؟',
  options: [
    { id: 'none', label: 'ندارم' },
    { id: 'diabetes', label: 'دیابت' },
    { id: 'blood-pressure', label: 'فشار خون' },
    { id: 'thyroid', label: 'مشکلات تیروئید' },
    { id: 'heart', label: 'بیماری قلبی' },
    {
      id: 'anxiety-depression',
      label: 'اضطراب یا افسردگی تشخیص داده شده',
    },
    { id: 'other', label: 'سایر بیماری‌ها' },
  ],
}

const pregnancyStatusQuestion: SupplementaryQuestion = {
  id: 'pregnancy-status',
  question: 'وضعیت بارداری‌ات چطور بود؟',
  options: [
    { id: 'no-issues', label: 'بدون مشکل خاص' },
    { id: 'high-risk', label: 'بارداری پرخطر' },
    { id: 'gestational-diabetes', label: 'دیابت بارداری' },
    { id: 'gestational-hypertension', label: 'فشار خون بارداری' },
    { id: 'preterm', label: 'زایمان زودرس' },
  ],
}

const physicalStatusQuestion: SupplementaryQuestion = {
  id: 'physical-status',
  question: 'وضعیت جسمی‌ات در حال حاضر به چه صورته؟',
  options: [
    { id: 'stable', label: 'خوب و پایدار' },
    { id: 'postpartum-recovery', label: 'در حال ریکاوری بعد از زایمان' },
    { id: 'fatigue', label: 'خستگی و ضعف' },
    { id: 'medical-supervision', label: 'تحت نظر پزشک' },
  ],
}

const childrenCountQuestion: SupplementaryQuestion = {
  id: 'children-count',
  question: 'چندتا فرزند دارید؟',
  options: [
    { id: '1', label: '1' },
    { id: '2', label: '2' },
    { id: '3', label: '3' },
    { id: 'more-than-3', label: 'بیشتر از 3' },
  ],
}

export function getSupplementaryQuestions(
  role?: ParentRole,
): SupplementaryQuestion[] {
  if (role === 'father') {
    return [underlyingConditionQuestion, childrenCountQuestion]
  }

  return [
    underlyingConditionQuestion,
    pregnancyStatusQuestion,
    physicalStatusQuestion,
    childrenCountQuestion,
  ]
}
