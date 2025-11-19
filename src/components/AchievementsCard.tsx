import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrainingSession } from '@/lib/types'
import { calculateStreaks, getVolumeByVariant } from '@/lib/stats'
import { 
  Trophy, Medal, Star, Fire, Lightning, Target, 
  Crown, Rocket, Flame, Mountains, Diamond, Sword,
  Heartbeat, Brain, Barbell, Briefcase, ChartLineUp,
  Atom, Sparkle, Infinity, GraduationCap, Gift
} from '@phosphor-icons/react'
import { differenceInDays, parseISO } from 'date-fns'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress?: number
  target?: number
  category: 'beginner' | 'volume' | 'streak' | 'mastery' | 'elite' | 'variety'
}

interface AchievementsCardProps {
  sessions: TrainingSession[]
}

export function AchievementsCard({ sessions }: AchievementsCardProps) {
  const totalReps = sessions.reduce((sum, s) => sum + s.totalReps, 0)
  const totalSessions = sessions.length
  const maxSessionReps = Math.max(...sessions.map(s => s.totalReps), 0)
  const allSets = sessions.flatMap(s => s.sets)
  const maxSetReps = Math.max(...allSets.map(s => s.reps), 0)
  
  const uniqueDates = new Set(sessions.map(s => s.date)).size
  const { currentStreak, longestStreak } = calculateStreaks(sessions)
  
  const volumeByVariant = getVolumeByVariant(sessions)
  const uniqueVariants = Object.keys(volumeByVariant).length
  const hasBalancedVariants = Object.values(volumeByVariant).filter(v => v >= 100).length >= 3
  
  const totalSets = allSets.length
  const avgRepsPerSet = totalSets > 0 ? totalReps / totalSets : 0
  
  const hasConsistentMonth = sessions.length > 0 && (() => {
    const sortedDates = [...new Set(sessions.map(s => s.date))].sort()
    for (let i = 0; i <= sortedDates.length - 30; i++) {
      const startDate = parseISO(sortedDates[i])
      const endDate = parseISO(sortedDates[Math.min(i + 29, sortedDates.length - 1)])
      const daySpan = differenceInDays(endDate, startDate)
      if (daySpan <= 30 && (i + 30) <= sortedDates.length) {
        return true
      }
    }
    return false
  })()
  
  const extremeSessions = sessions.filter(s => s.difficulty === 'extreme').length
  const perfectSetCount = allSets.filter(s => s.reps >= 25 && s.reps < 26).length
  const enduranceSets = allSets.filter(s => s.type === 'failure').length
  
  const achievements: Achievement[] = [
    {
      id: 'first-session',
      title: 'First Steps',
      description: 'Complete your first session',
      icon: <Star size={24} weight="fill" className="text-accent" />,
      unlocked: totalSessions >= 1,
      category: 'beginner'
    },
    {
      id: 'ten-sessions',
      title: 'Getting Started',
      description: 'Complete 10 training sessions',
      icon: <Sparkle size={24} weight="fill" className="text-accent" />,
      unlocked: totalSessions >= 10,
      progress: totalSessions,
      target: 10,
      category: 'beginner'
    },
    {
      id: 'hundred-reps',
      title: 'Centurion',
      description: '100 total push-ups',
      icon: <Gift size={24} weight="fill" className="text-primary" />,
      unlocked: totalReps >= 100,
      progress: totalReps,
      target: 100,
      category: 'beginner'
    },
    {
      id: 'century',
      title: 'Century Club',
      description: '100 reps in one session',
      icon: <Trophy size={24} weight="fill" className="text-primary" />,
      unlocked: maxSessionReps >= 100,
      progress: maxSessionReps,
      target: 100,
      category: 'volume'
    },
    {
      id: 'double-century',
      title: 'Double Century',
      description: '200 reps in one session',
      icon: <Crown size={24} weight="fill" className="text-primary" />,
      unlocked: maxSessionReps >= 200,
      progress: maxSessionReps,
      target: 200,
      category: 'volume'
    },
    {
      id: 'triple-century',
      title: 'Triple Threat',
      description: '300 reps in one session',
      icon: <Rocket size={24} weight="fill" className="text-primary" />,
      unlocked: maxSessionReps >= 300,
      progress: maxSessionReps,
      target: 300,
      category: 'elite'
    },
    {
      id: 'thousand',
      title: 'Grand Master',
      description: '1,000 total reps',
      icon: <Medal size={24} weight="fill" className="text-secondary" />,
      unlocked: totalReps >= 1000,
      progress: totalReps,
      target: 1000,
      category: 'volume'
    },
    {
      id: 'five-thousand',
      title: 'Elite Athlete',
      description: '5,000 total reps',
      icon: <Mountains size={24} weight="fill" className="text-secondary" />,
      unlocked: totalReps >= 5000,
      progress: totalReps,
      target: 5000,
      category: 'volume'
    },
    {
      id: 'ten-thousand',
      title: 'Push-Up Legend',
      description: '10,000 total reps',
      icon: <Diamond size={24} weight="fill" className="text-secondary" />,
      unlocked: totalReps >= 10000,
      progress: totalReps,
      target: 10000,
      category: 'elite'
    },
    {
      id: 'fifty-thousand',
      title: 'Immortal',
      description: '50,000 total reps',
      icon: <Infinity size={24} weight="fill" className="text-accent" />,
      unlocked: totalReps >= 50000,
      progress: totalReps,
      target: 50000,
      category: 'elite'
    },
    {
      id: 'three-day-streak',
      title: 'Building Habit',
      description: 'Train 3 days in a row',
      icon: <Flame size={24} weight="fill" className="text-primary" />,
      unlocked: longestStreak >= 3,
      progress: longestStreak,
      target: 3,
      category: 'streak'
    },
    {
      id: 'week-warrior',
      title: 'Week Warrior',
      description: 'Train 7 days in a row',
      icon: <Fire size={24} weight="fill" className="text-primary" />,
      unlocked: longestStreak >= 7,
      progress: longestStreak,
      target: 7,
      category: 'streak'
    },
    {
      id: 'two-week-streak',
      title: 'Fortnight Fighter',
      description: 'Train 14 days in a row',
      icon: <Sword size={24} weight="fill" className="text-primary" />,
      unlocked: longestStreak >= 14,
      progress: longestStreak,
      target: 14,
      category: 'streak'
    },
    {
      id: 'month-streak',
      title: 'Monthly Marathon',
      description: 'Train 30 days in a row',
      icon: <ChartLineUp size={24} weight="fill" className="text-secondary" />,
      unlocked: longestStreak >= 30,
      progress: longestStreak,
      target: 30,
      category: 'elite'
    },
    {
      id: 'hundred-day-streak',
      title: 'Unstoppable Force',
      description: 'Train 100 days in a row',
      icon: <Atom size={24} weight="fill" className="text-accent" />,
      unlocked: longestStreak >= 100,
      progress: longestStreak,
      target: 100,
      category: 'elite'
    },
    {
      id: 'fifty-set',
      title: 'Half Century',
      description: '50 reps in a single set',
      icon: <Lightning size={24} weight="fill" className="text-accent" />,
      unlocked: maxSetReps >= 50,
      progress: maxSetReps,
      target: 50,
      category: 'mastery'
    },
    {
      id: 'hundred-set',
      title: 'Iron Will',
      description: '100 reps in a single set',
      icon: <Barbell size={24} weight="fill" className="text-primary" />,
      unlocked: maxSetReps >= 100,
      progress: maxSetReps,
      target: 100,
      category: 'elite'
    },
    {
      id: 'dedicated',
      title: 'Dedicated',
      description: 'Complete 50 sessions',
      icon: <Target size={24} weight="fill" className="text-secondary" />,
      unlocked: totalSessions >= 50,
      progress: totalSessions,
      target: 50,
      category: 'mastery'
    },
    {
      id: 'hundred-sessions',
      title: 'Centurion Sessions',
      description: 'Complete 100 sessions',
      icon: <Briefcase size={24} weight="fill" className="text-secondary" />,
      unlocked: totalSessions >= 100,
      progress: totalSessions,
      target: 100,
      category: 'mastery'
    },
    {
      id: 'scholar',
      title: 'Scholar',
      description: 'Complete 365 sessions',
      icon: <GraduationCap size={24} weight="fill" className="text-accent" />,
      unlocked: totalSessions >= 365,
      progress: totalSessions,
      target: 365,
      category: 'elite'
    },
    {
      id: 'variety-expert',
      title: 'Variety Expert',
      description: 'Master 5 different variants',
      icon: <Brain size={24} weight="fill" className="text-secondary" />,
      unlocked: uniqueVariants >= 5,
      progress: uniqueVariants,
      target: 5,
      category: 'variety'
    },
    {
      id: 'balanced-training',
      title: 'Balanced Training',
      description: '100+ reps in 3 variants',
      icon: <Heartbeat size={24} weight="fill" className="text-primary" />,
      unlocked: hasBalancedVariants,
      category: 'variety'
    },
    {
      id: 'consistent-month',
      title: 'Consistent Champion',
      description: 'Train 30 days in one month',
      icon: <Fire size={24} weight="fill" className="text-accent" />,
      unlocked: hasConsistentMonth,
      category: 'streak'
    },
    {
      id: 'extreme-warrior',
      title: 'Extreme Warrior',
      description: '10 extreme difficulty sessions',
      icon: <Flame size={24} weight="fill" className="text-primary" />,
      unlocked: extremeSessions >= 10,
      progress: extremeSessions,
      target: 10,
      category: 'mastery'
    },
    {
      id: 'endurance-king',
      title: 'Endurance King',
      description: '25 sets to failure',
      icon: <Mountains size={24} weight="fill" className="text-secondary" />,
      unlocked: enduranceSets >= 25,
      progress: enduranceSets,
      target: 25,
      category: 'mastery'
    },
    {
      id: 'high-volume',
      title: 'Volume Beast',
      description: 'Complete 500 total sets',
      icon: <ChartLineUp size={24} weight="fill" className="text-primary" />,
      unlocked: totalSets >= 500,
      progress: totalSets,
      target: 500,
      category: 'volume'
    }
  ]

  const unlockedCount = achievements.filter(a => a.unlocked).length
  
  const categories = [
    { id: 'beginner', label: 'Beginner', color: 'text-accent' },
    { id: 'volume', label: 'Volume', color: 'text-primary' },
    { id: 'streak', label: 'Streak', color: 'text-chart-1' },
    { id: 'mastery', label: 'Mastery', color: 'text-secondary' },
    { id: 'variety', label: 'Variety', color: 'text-chart-3' },
    { id: 'elite', label: 'Elite', color: 'text-chart-5' }
  ] as const

  const achievementsByCategory = categories.map(cat => ({
    ...cat,
    achievements: achievements.filter(a => a.category === cat.id),
    unlockedCount: achievements.filter(a => a.category === cat.id && a.unlocked).length
  }))

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Trophy size={24} weight="bold" className="text-primary" />
          Achievements
        </h2>
        <Badge variant="secondary" className="text-base px-3 py-1">
          {unlockedCount} / {achievements.length}
        </Badge>
      </div>

      <div className="space-y-6">
        {achievementsByCategory.map(category => (
          <div key={category.id}>
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-semibold ${category.color}`}>
                {category.label}
              </h3>
              <span className="text-sm text-muted-foreground">
                {category.unlockedCount} / {category.achievements.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {category.achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-accent/5 border-accent/50'
                      : 'bg-muted/20 border-muted opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={achievement.unlocked ? '' : 'grayscale opacity-40'}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {!achievement.unlocked && achievement.progress !== undefined && achievement.target !== undefined && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress.toLocaleString()} / {achievement.target.toLocaleString()}</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-accent transition-all"
                              style={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
