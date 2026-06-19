import { ChevronLeft, ChevronRight, User } from 'lucide-react'
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
    <div className="relative flex h-dvh w-full min-w-0 flex-col overflow-hidden bg-white font-vazir text-home-heading">
      <MobileStatusBar />

      <header className="border-b border-[#E8E4DC] px-[18px] pb-4 pt-3">
        <div className="relative flex items-center justify-center">
          <h1 className="text-base font-extrabold text-home-heading">
            حساب کاربری
          </h1>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="absolute end-0 flex h-9 w-9 items-center justify-center rounded-full text-home-heading transition-colors hover:bg-[#F5F5F5]"
            aria-label="بازگشت"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>
      </header>

      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto px-[18px] pb-8 pt-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-home-mint">
            <User className="h-11 w-11 text-white" strokeWidth={2} />
          </div>

          <h2 className="mt-5 text-lg font-extrabold text-home-heading">
            {displayName}
          </h2>
          <p className="mt-2 text-xs text-home-muted">
            همراه الورا از تاریخ ۱۴۰۴/۰۲/۲۲
          </p>
        </div>

        <ul className="mt-8 space-y-3">
          {menuItems.map((label) => (
            <li key={label}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-[18px] bg-home-streakBg px-4 py-3.5 text-right transition-opacity hover:opacity-90"
              >
                <span className="text-sm font-bold text-home-heading">
                  {label}
                </span>
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
