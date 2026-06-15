import { useNavigate } from 'react-router-dom'
import { WizardBackButton } from '../components/wizard/WizardBackButton'

export function HomeSkeletonScreen() {
  const navigate = useNavigate()

  const handleBackToSetup = () => {
    navigate('/setup', { state: { resetWizard: true } })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-5">
      <h1 className="mb-8 text-center text-xl font-bold text-textMain">
        به الورا خوش‌ آمدید!
      </h1>
      <WizardBackButton label="بازگشت" onClick={handleBackToSetup} />
    </div>
  )
}
