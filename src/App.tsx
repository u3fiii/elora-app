import { Navigate, Route, Routes } from 'react-router-dom'
import { MobileOnlyGate } from './components/MobileOnlyGate'
import { HomeSkeletonScreen } from './pages/HomeSkeletonScreen'
import { ProfileSuccessScreen } from './pages/ProfileSuccessScreen'
import { SetupWizardScreen } from './pages/SetupWizardScreen'

export default function App() {
  return (
    <MobileOnlyGate>
      <div className="relative mx-auto h-dvh w-full max-w-[430px] overflow-hidden">
        <Routes>
          <Route path="/" element={<Navigate to="/setup" replace />} />
          <Route path="/setup" element={<SetupWizardScreen />} />
          <Route path="/profile-success" element={<ProfileSuccessScreen />} />
          <Route path="/home" element={<HomeSkeletonScreen />} />
          <Route path="*" element={<Navigate to="/setup" replace />} />
        </Routes>
      </div>
    </MobileOnlyGate>
  )
}
