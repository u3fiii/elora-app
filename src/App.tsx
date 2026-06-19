import { Navigate, Route, Routes } from 'react-router-dom'
import { CalendarScreen } from './pages/CalendarScreen'
import { HomeScreen } from './pages/HomeScreen'
import { ProfileScreen } from './pages/ProfileScreen'
import { ProfileSuccessScreen } from './pages/ProfileSuccessScreen'
import { SetupWizardScreen } from './pages/SetupWizardScreen'

export default function App() {
  return (
    <div className="flex min-h-dvh w-full justify-center bg-[#E8E4DC]">
      <div className="relative h-dvh w-[430px] max-w-full shrink-0 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.12)]">
        <Routes>
          <Route path="/" element={<Navigate to="/setup" replace />} />
          <Route path="/setup" element={<SetupWizardScreen />} />
          <Route path="/profile-success" element={<ProfileSuccessScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/calendar" element={<CalendarScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<Navigate to="/setup" replace />} />
        </Routes>
      </div>
    </div>
  )
}
