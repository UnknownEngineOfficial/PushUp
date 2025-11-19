import { Card } from '@/components/ui/card'
import { TrainingSession, PersonalRecord } from '@/lib/types'
import { Trophy, Fire, ChartLine, Target, ClockClockwise, TrendUp, TrendDown, ArrowUp, ArrowDown } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getLast7DaysVolume, getLastNDaysVolume, getLastNMonthsVolume, getAllTimeVolumeByMonth, getDailyReps, getWeeklyReps, getMonthlyReps, getYearlyReps, getVolumeByVariant, getBestTimeOfDay, getAverageSetReps, getProgressComparison } from '@/lib/stats'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { AchievementsCard } from '@/components/AchievementsCard'
import { useState } from 'react'

interface StatisticsViewProps {
  sessions: TrainingSession[]
  personalRecords: PersonalRecord
}

export function StatisticsView({ sessions, personalRecords }: StatisticsViewProps) {
  const [volumeRange, setVolumeRange] = useState<'7days' | '30days' | '12months' | 'all'>('7days')
  
  const todayReps = getDailyReps(sessions, new Date())
  const weekReps = getWeeklyReps(sessions, new Date())
  const monthReps = getMonthlyReps(sessions, new Date())
  const yearReps = getYearlyReps(sessions, new Date())
  const progressComparison = getProgressComparison(sessions)
  
  const volumeData = volumeRange === '7days' 
    ? getLast7DaysVolume(sessions)
    : volumeRange === '30days'
    ? getLastNDaysVolume(sessions, 30)
    : volumeRange === '12months'
    ? getLastNMonthsVolume(sessions, 12)
    : getAllTimeVolumeByMonth(sessions)
  
  const volumeByVariant = getVolumeByVariant(sessions)
  const bestTime = getBestTimeOfDay(sessions)
  const avgSetReps = getAverageSetReps(sessions)

  const totalReps = sessions.reduce((sum, s) => sum + s.totalReps, 0)

  const variantData = Object.entries(volumeByVariant).map(([variant, reps]) => ({
    name: variant,
    value: reps
  })).sort((a, b) => b.value - a.value)

  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))'
  ]

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
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">This Year</div>
          </div>
          <div className="font-display font-bold text-4xl">{yearReps}</div>
          <p className="text-sm text-muted-foreground mt-1">reps</p>
        </Card>
      </div>

      {sessions.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendUp size={24} weight="bold" className="text-primary" />
              <h3 className="font-semibold text-lg">Weekly Progress</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-display font-bold text-xl">{progressComparison.thisWeek}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Week</span>
                <span className="font-display font-bold text-xl text-muted-foreground">
                  {progressComparison.lastWeek}
                </span>
              </div>
              {progressComparison.lastWeek > 0 && (
                <div className="pt-3 border-t flex items-center justify-between">
                  <span className="text-sm font-medium">Change</span>
                  <div className="flex items-center gap-2">
                    {progressComparison.weekChange > 0 ? (
                      <>
                        <ArrowUp size={20} weight="bold" className="text-green-500" />
                        <span className="font-bold text-green-500">+{progressComparison.weekChange}%</span>
                      </>
                    ) : progressComparison.weekChange < 0 ? (
                      <>
                        <ArrowDown size={20} weight="bold" className="text-red-500" />
                        <span className="font-bold text-red-500">{progressComparison.weekChange}%</span>
                      </>
                    ) : (
                      <span className="font-bold text-muted-foreground">0%</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendUp size={24} weight="bold" className="text-secondary" />
              <h3 className="font-semibold text-lg">Monthly Progress</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Month</span>
                <span className="font-display font-bold text-xl">{progressComparison.thisMonth}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Month</span>
                <span className="font-display font-bold text-xl text-muted-foreground">
                  {progressComparison.lastMonth}
                </span>
              </div>
              {progressComparison.lastMonth > 0 && (
                <div className="pt-3 border-t flex items-center justify-between">
                  <span className="text-sm font-medium">Change</span>
                  <div className="flex items-center gap-2">
                    {progressComparison.monthChange > 0 ? (
                      <>
                        <ArrowUp size={20} weight="bold" className="text-green-500" />
                        <span className="font-bold text-green-500">+{progressComparison.monthChange}%</span>
                      </>
                    ) : progressComparison.monthChange < 0 ? (
                      <>
                        <ArrowDown size={20} weight="bold" className="text-red-500" />
                        <span className="font-bold text-red-500">{progressComparison.monthChange}%</span>
                      </>
                    ) : (
                      <span className="font-bold text-muted-foreground">0%</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">Training Volume</h2>
          <Tabs value={volumeRange} onValueChange={(v) => setVolumeRange(v as any)}>
            <TabsList>
              <TabsTrigger value="7days" className="text-xs sm:text-sm">7D</TabsTrigger>
              <TabsTrigger value="30days" className="text-xs sm:text-sm">30D</TabsTrigger>
              <TabsTrigger value="12months" className="text-xs sm:text-sm">12M</TabsTrigger>
              <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                angle={volumeRange === 'all' || volumeRange === '30days' ? -45 : 0}
                textAnchor={volumeRange === 'all' || volumeRange === '30days' ? 'end' : 'middle'}
                height={volumeRange === 'all' || volumeRange === '30days' ? 80 : 30}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bestTime && (
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <ClockClockwise className="text-accent" size={24} weight="bold" />
              <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Peak Hour</div>
            </div>
            <div className="font-display font-bold text-3xl">{bestTime.hour}:00</div>
            <p className="text-sm text-muted-foreground mt-1">{bestTime.avgReps} avg reps</p>
          </Card>
        )}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendUp className="text-secondary" size={24} weight="bold" />
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Avg Set</div>
          </div>
          <div className="font-display font-bold text-3xl">{avgSetReps}</div>
          <p className="text-sm text-muted-foreground mt-1">reps per set</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Fire className="text-primary" size={24} weight="bold" />
            <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Current Streak</div>
          </div>
          <div className="font-display font-bold text-3xl">{personalRecords.currentStreak}</div>
          <p className="text-sm text-muted-foreground mt-1">days in a row</p>
        </Card>
      </div>

      {variantData.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Volume by Variant</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={variantData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {variantData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {variantData.map((variant, index) => (
                <div key={variant.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium">{variant.name}</span>
                  </div>
                  <span className="font-display font-semibold text-lg">{variant.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

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

      <AchievementsCard sessions={sessions} />
    </div>
  )
}
