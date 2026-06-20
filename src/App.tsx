import { Navigate, Route, Routes } from 'react-router-dom'
import { MainTabShell } from './layouts/MainTabShell'
import { CalendarScreen } from './pages/CalendarScreen'
import { ChatScreen } from './pages/ChatScreen'
import { HomeScreen } from './pages/HomeScreen'
import { LibraryScreen } from './pages/LibraryScreen'
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
          <Route element={<MainTabShell />}>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/calendar" element={<CalendarScreen />} />
            <Route path="/library" element={<LibraryScreen />} />
            <Route path="/chat" element={<ChatScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/setup" replace />} />
        </Routes>
      </div>
    </div>
  )
}
