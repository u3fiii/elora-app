interface HomeGreetingProps {
  parentName: string
}

export function HomeGreeting({ parentName }: HomeGreetingProps) {
  return (
    <section className="px-[18px] pb-3 pt-3">
      <h1 className="px-2 text-lg font-extrabold text-home-heading">
        صبح بخیر، {parentName}
      </h1>
    </section>
  )
}
