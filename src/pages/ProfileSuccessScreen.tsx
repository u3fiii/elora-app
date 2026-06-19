import { motion } from 'framer-motion'
import { Home } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import welcomeIllustration from '../assets/welcome-illustration.png'
import {
  WIZARD_STAGGER_ENTER,
  WizardAnimatedItem,
  WizardAnimatedSlide,
  wizardItemTransition,
  wizardItemVariants,
} from '../components/wizard/animation'
import { WizardShell } from '../components/wizard/WizardShell'

export function ProfileSuccessScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const childName =
    (location.state as { childName?: string } | null)?.childName?.trim() ||
    'کودکت'

  const handleEnterApp = () => {
    navigate('/home', { replace: true })
  }

  return (
    <WizardShell
      contentClassName="relative min-h-0 flex-1 p-0"
      contentPaddingTop={0}
      footer={
        <motion.div
          variants={wizardItemVariants}
          initial="hidden"
          animate="visible"
          transition={{
            ...wizardItemTransition,
            delay: WIZARD_STAGGER_ENTER * 3,
          }}
        >
          <button
            type="button"
            onClick={handleEnterApp}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#49A3AA] py-3.5 text-sm font-bold text-white transition-transform active:scale-[0.98]"
          >
            <Home className="h-5 w-5" strokeWidth={2.25} />
            <span>ورود به اپلیکیشن</span>
          </button>
        </motion.div>
      }
    >
      <div
        dir="ltr"
        className="absolute inset-x-0 bottom-[5.5rem] top-0 flex items-center justify-center px-5"
      >
        <div dir="rtl" className="w-full max-w-[20rem] text-center">
          <WizardAnimatedSlide slideKey="profile-success" className="w-full">
            <div className="flex w-full flex-col items-center">
              <WizardAnimatedItem className="flex w-full justify-center">
                <img
                  src={welcomeIllustration}
                  alt=""
                  className="mb-8 block w-[min(100%,12rem)] object-contain"
                />
              </WizardAnimatedItem>

              <WizardAnimatedItem className="w-full">
                <h1 className="mb-4 text-2xl font-bold text-textMain">
                  پروفایل با موفقیت ساخته شد!
                </h1>
              </WizardAnimatedItem>

              <WizardAnimatedItem className="w-full">
                <p className="text-sm font-semibold leading-7 text-wizard-title">
                  اطلاعات لازم رو گرفتیم و الورا الان آماده‌ست تا کنار تو و{' '}
                  {childName} باشه.
                </p>
              </WizardAnimatedItem>
            </div>
          </WizardAnimatedSlide>
        </div>
      </div>
    </WizardShell>
  )
}
