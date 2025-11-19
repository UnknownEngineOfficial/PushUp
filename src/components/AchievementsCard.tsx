import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrainingSession } from '@/lib/types'
import { Trophy, Medal, Star, Fire, Lightning, Target } from '@phosphor-icons/react'

interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  unlocked: boolean
  progress?: number
  target?: number
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
  
  const achievements: Achievement[] = [
    {
      id: 'first-session',
      title: 'First Steps',
      description: 'Complete your first session',
      icon: <Star size={24} weight="fill" className="text-accent" />,
      unlocked: totalSessions >= 1
    },
    {
      id: 'century',
      title: 'Century Club',
      description: '100 reps in one session',
      icon: <Trophy size={24} weight="fill" className="text-primary" />,
      unlocked: maxSessionReps >= 100,
      progress: maxSessionReps,
      target: 100
    },
    {
      id: 'thousand',
      title: 'Grand Master',
      description: '1000 total reps',
      icon: <Medal size={24} weight="fill" className="text-secondary" />,
      unlocked: totalReps >= 1000,
      progress: totalReps,
      target: 1000
    },
    {
      id: 'week-warrior',
      title: 'Week Warrior',
      description: 'Train 7 days in a row',
      icon: <Fire size={24} weight="fill" className="text-primary" />,
      unlocked: uniqueDates >= 7,
      progress: uniqueDates,
      target: 7
    },
    {
      id: 'fifty-set',
      title: 'Half Century',
      description: '50 reps in a single set',
      icon: <Lightning size={24} weight="fill" className="text-accent" />,
      unlocked: maxSetReps >= 50,
      progress: maxSetReps,
      target: 50
    },
    {
      id: 'dedicated',
      title: 'Dedicated',
      description: 'Complete 50 sessions',
      icon: <Target size={24} weight="fill" className="text-secondary" />,
      unlocked: totalSessions >= 50,
      progress: totalSessions,
      target: 50
    }
  ]

  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Trophy size={24} weight="bold" className="text-primary" />
          Achievements
        </h2>
        <Badge variant="secondary">
          {unlockedCount} / {achievements.length}
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {achievements.map(achievement => (
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
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {!achievement.unlocked && achievement.progress !== undefined && achievement.target !== undefined && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress} / {achievement.target}</span>
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
    </Card>
  )
}
