interface GreetingProps {
  parentName: string
  date: string
}

export function Greeting({ parentName, date }: GreetingProps) {
  return (
    <div className="px-4 pb-4">
      <h1 className="text-xl font-bold text-textMain">
        صبح بخیر، {parentName}
      </h1>
      <p className="mt-1 text-sm text-textMuted">{date}</p>
    </div>
  )
}
