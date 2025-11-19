import { Card } from '@/components/ui/card'
import { TrainingSession, PersonalRecord } from '@/lib/types'
import { Trophy, Fire, ChartLine, Target } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { getLast7DaysVolume, getDailyReps, getWeeklyReps, getMonthlyReps } from '@/lib/stats'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface StatisticsViewProps {
  sessions: TrainingSession[]
  personalRecords: PersonalRecord
}

export function StatisticsView({ sessions, personalRecords }: StatisticsViewProps) {
  const todayReps = getDailyReps(sessions, new Date())
  const weekReps = getWeeklyReps(sessions, new Date())
  const monthReps = getMonthlyReps(sessions, new Date())
  const last7Days = getLast7DaysVolume(sessions)

  const totalReps = sessions.reduce((sum, s) => sum + s.totalReps, 0)

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Statistics</h1>
        <p className="text-muted-foreground">Your training progress and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="text-primary" size={24} weight="bold" />
            </div>
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Today</div>
          </div>
          <div className="font-display font-bold text-4xl">{todayReps}</div>
          <p className="text-sm text-muted-foreground mt-1">reps</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <ChartLine className="text-secondary" size={24} weight="bold" />
            </div>
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">This Week</div>
          </div>
          <div className="font-display font-bold text-4xl">{weekReps}</div>
          <p className="text-sm text-muted-foreground mt-1">reps</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/10 rounded-lg">
              <ChartLine className="text-accent" size={24} weight="bold" />
            </div>
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">This Month</div>
          </div>
          <div className="font-display font-bold text-4xl">{monthReps}</div>
          <p className="text-sm text-muted-foreground mt-1">reps</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Fire className="text-primary" size={24} weight="bold" />
            </div>
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Streak</div>
          </div>
          <div className="font-display font-bold text-4xl">{personalRecords.currentStreak}</div>
          <p className="text-sm text-muted-foreground mt-1">days</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Last 7 Days Volume</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar dataKey="reps" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-primary" size={28} weight="bold" />
            <h2 className="text-xl font-semibold">Personal Records</h2>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Max Single Set</div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-bold text-3xl">{personalRecords.maxSingleSet.reps}</span>
                <Badge variant="outline">{personalRecords.maxSingleSet.variant}</Badge>
              </div>
              {personalRecords.maxSingleSet.date && (
                <p className="text-xs text-muted-foreground mt-1">{personalRecords.maxSingleSet.date}</p>
              )}
            </div>

            <div className="border-l-4 border-secondary pl-4">
              <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Max Session Volume</div>
              <div className="font-display font-bold text-3xl">{personalRecords.maxSessionVolume.reps}</div>
              {personalRecords.maxSessionVolume.date && (
                <p className="text-xs text-muted-foreground mt-1">{personalRecords.maxSessionVolume.date}</p>
              )}
            </div>

            <div className="border-l-4 border-accent pl-4">
              <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Longest Streak</div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-bold text-3xl">{personalRecords.longestStreak}</span>
                <span className="text-muted-foreground">days</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Overall Stats</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Total Reps All Time</div>
              <div className="font-display font-bold text-3xl text-primary">{totalReps}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Total Sessions</div>
              <div className="font-display font-bold text-3xl">{sessions.length}</div>
            </div>
            {sessions.length > 0 && (
              <div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Average Per Session</div>
                <div className="font-display font-bold text-3xl">
                  {Math.round(totalReps / sessions.length)}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
