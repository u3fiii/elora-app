import { ChevronLeft, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MobileStatusBar } from '../components/home/MobileStatusBar'
import { homeParentName } from '../data/homeData'

interface ProfileLocationState {
  userName?: string
}

const menuItems = [
  'اطلاعات کاربری',
  'اطلاعات فرزند',
  'کد خانوادگی',
  'پشتیبانی',
  'تنظیمات',
] as const

export function ProfileScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const profileState = location.state as ProfileLocationState | null
  const userName = profileState?.userName?.trim() || homeParentName
  const displayName = `${userName} درستکار`

  const handleLogout = () => {
    navigate('/setup', { replace: true, state: { resetWizard: true } })
  }

  return (
    <div className="relative flex h-full w-full min-w-0 flex-col overflow-hidden bg-white font-vazir text-home-heading">
      <MobileStatusBar />

      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-[18px] pb-28 pt-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-home-mint">
            <User className="h-11 w-11 text-white" strokeWidth={2} />
          </div>

          <h1 className="mt-5 text-lg font-extrabold text-home-heading">{displayName}</h1>
          <p className="mt-2 text-xs text-home-muted">همراه الورا از تاریخ ۱۴۰۴/۰۲/۲۲</p>
        </div>

        <ul className="mt-8 space-y-3">
          {menuItems.map((label) => (
            <li key={label}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-[18px] bg-home-streakBg px-4 py-3.5 text-right transition-opacity hover:opacity-90"
              >
                <span className="text-sm font-bold text-home-heading">{label}</span>
                <ChevronLeft className="h-4 w-4 shrink-0 text-home-muted" />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-10 w-full rounded-full border border-home-teal py-3.5 text-sm font-bold text-home-teal transition-colors hover:bg-home-doneBg"
        >
          خارج شدن از اکانت
        </button>
      </div>
    </div>
  )
}
