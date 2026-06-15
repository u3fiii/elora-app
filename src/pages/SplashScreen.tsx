import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding')
    }, 1500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-primary-light">
        <div className="h-10 w-10 rounded-full bg-primary" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-textMain">الورا</h1>
    </div>
  )
}
