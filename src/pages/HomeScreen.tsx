import {
  aiInsight,
  alertCards,
  babyProfile,
  dailyMotivation,
  dailyTasks,
  forYouContent,
  greetingDate,
  parentProfile,
  streakDays,
  todaysPlan,
} from '../data/mockData'
import { AIInsightCard } from '../components/home/AIInsightCard'
import { AlertCardsRow } from '../components/home/AlertCardsRow'
import { BabyHeader } from '../components/home/BabyHeader'
import { DailyTasksSection } from '../components/home/DailyTasksSection'
import { ForYouSection } from '../components/home/ForYouSection'
import { Greeting } from '../components/home/Greeting'
import { ProfileToggle } from '../components/home/ProfileToggle'
import { TodaysPlanSection } from '../components/home/TodaysPlanSection'

export function HomeScreen() {
  return (
    <div className="min-h-screen bg-background pb-24 pt-2">
      <BabyHeader baby={babyProfile} />
      <Greeting parentName={parentProfile.name} date={greetingDate} />
      <AlertCardsRow cards={alertCards} />
      <ProfileToggle />
      <DailyTasksSection
        tasks={dailyTasks}
        motivation={dailyMotivation}
        streakDays={streakDays}
        babyName={babyProfile.name}
      />
      <AIInsightCard insight={aiInsight} />
      <ForYouSection
        content={forYouContent}
        babyName={babyProfile.name}
        ageMonths={babyProfile.ageMonths}
      />
      <TodaysPlanSection items={todaysPlan} />
    </div>
  )
}
