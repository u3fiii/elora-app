interface HomeGreetingProps {
  parentName: string
  date: string
}

export function HomeGreeting({ parentName, date }: HomeGreetingProps) {
  return (
    <section className="px-[18px] pb-3 pt-3">
      <div className="flex items-center justify-between gap-3 px-2">
        <h1 className="text-lg font-extrabold text-home-heading">
          صبح بخیر، {parentName}
        </h1>
        <p className="shrink-0 text-xs text-home-muted">{date}</p>
      </div>
    </section>
  )
}
