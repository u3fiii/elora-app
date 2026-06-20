import { MobileStatusBar } from '../components/home/MobileStatusBar'

interface MainTabPlaceholderScreenProps {
  title: string
  description?: string
}

export function MainTabPlaceholderScreen({
  title,
  description = 'این بخش به‌زودی در دسترس خواهد بود.',
}: MainTabPlaceholderScreenProps) {
  return (
    <div className="relative flex h-full w-full min-w-0 flex-col overflow-hidden bg-home-bg font-vazir text-home-heading">
      <MobileStatusBar />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-28 pt-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-home-mint/35">
          <div className="h-9 w-9 rounded-full bg-home-teal/70" />
        </div>
        <h1 className="mt-5 text-lg font-extrabold text-home-heading">{title}</h1>
        <p className="mt-2 max-w-xs text-sm leading-6 text-home-muted">{description}</p>
      </div>
    </div>
  )
}
