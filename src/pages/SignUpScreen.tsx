import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

export function SignUpScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="flex min-h-screen flex-col justify-center bg-background px-6 py-12">
      <h1 className="mb-8 text-center text-2xl font-bold text-textMain">
        ساخت حساب کاربری
      </h1>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/setup')
        }}
      >
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-textMuted">
            نام
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-textMain outline-none focus:border-primary"
            placeholder="نام خود را وارد کنید"
          />
        </div>

        <div>
          <label
            htmlFor="contact"
            className="mb-1.5 block text-sm text-textMuted"
          >
            ایمیل یا شماره موبایل
          </label>
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-textMain outline-none focus:border-primary"
            placeholder="example@email.com"
            dir="ltr"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm text-textMuted"
          >
            رمز عبور
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-textMain outline-none focus:border-primary"
            placeholder="••••••••"
            dir="ltr"
          />
        </div>

        <div className="pt-4">
          <Button type="submit" fullWidth>
            ثبت‌نام و شروع
          </Button>
        </div>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-textMuted">یا</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        fullWidth
        className="flex items-center justify-center gap-2"
        onClick={() => navigate('/setup')}
      >
        <GoogleIcon />
        ورود با گوگل
      </Button>

      <p className="mt-6 text-center text-sm text-textMuted">
        حساب کاربری دارید؟{' '}
        <button type="button" className="font-semibold text-primary">
          ورود
        </button>
      </p>
    </div>
  )
}
