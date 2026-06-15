import { Navigate, Route, Routes } from 'react-router-dom'
import { MobileOnlyGate } from './components/MobileOnlyGate'
import { HomeSkeletonScreen } from './pages/HomeSkeletonScreen'
import { SetupWizardScreen } from './pages/SetupWizardScreen'

export default function App() {
  return (
    <MobileOnlyGate>
      <div className="relative mx-auto min-h-screen max-w-[430px] bg-background">
        <Routes>
          <Route path="/" element={<Navigate to="/setup" replace />} />
          <Route path="/setup" element={<SetupWizardScreen />} />
          <Route path="/home" element={<HomeSkeletonScreen />} />
          <Route path="*" element={<Navigate to="/setup" replace />} />
        </Routes>
      </div>
    </MobileOnlyGate>
  )
}
