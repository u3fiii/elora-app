interface PlaceholderScreenProps {
  title: string
}

export function PlaceholderScreen({ title }: PlaceholderScreenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 pb-24">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-light">
        <div className="h-8 w-8 rounded-full bg-primary opacity-60" />
      </div>
      <h1 className="text-2xl font-bold text-textMain">{title}</h1>
      <p className="mt-2 text-center text-sm text-textMuted">
        این بخش به‌زودی در دسترس خواهد بود.
      </p>
    </div>
  )
}
