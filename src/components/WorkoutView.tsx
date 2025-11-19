import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Plus, ClockCountdown, Note, Check, ArrowCounterClockwise, Trophy, Target, TrendUp, Lightning } from '@phosphor-icons/react'
import { PushUpVariant, PushUpSet, SetType, DEFAULT_VARIANTS, TrainingSession, Goal, WorkoutTemplate } from '@/lib/types'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { getWeeklyReps, getSessionAverage, getBestTimeOfDay } from '@/lib/stats'
import { WorkoutTemplateDialog } from '@/components/WorkoutTemplateDialog'
import { useKV } from '@github/spark/hooks'

interface WorkoutViewProps {
  currentSets: PushUpSet[]
  sessions: TrainingSession[]
  goals: Goal[]
  onAddReps: (reps: number, variant: PushUpVariant, type: SetType) => void
  onEndSession: () => void
  onUndoLastSet: () => void
}

export function WorkoutView({ currentSets, sessions, goals, onAddReps, onEndSession, onUndoLastSet }: WorkoutViewProps) {
  const [selectedVariant, setSelectedVariant] = useState<PushUpVariant>('Regular')
  const [selectedType, setSelectedType] = useState<SetType>('regular')
  const [customReps, setCustomReps] = useState('')
  const [lastAction, setLastAction] = useState<{ reps: number; timestamp: number } | null>(null)
  const [restTimer, setRestTimer] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [templates] = useKV<WorkoutTemplate[]>('workout-templates', [])
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null)
  const [sessionTimer, setSessionTimer] = useState(0)

  const handleStartTemplate = (template: WorkoutTemplate) => {
    template.sets.forEach((set, index) => {
      setTimeout(() => {
        onAddReps(set.reps, set.variant, set.type)
      }, index * 100)
    })
  }

  useEffect(() => {
    let interval: number | undefined
    if (isResting && restTimer > 0) {
      interval = window.setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsResting(false)
            toast.success('Rest period complete!')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isResting, restTimer])

  useEffect(() => {
    let interval: number | undefined
    if (sessionStartTime) {
      interval = window.setInterval(() => {
        setSessionTimer(Math.floor((Date.now() - sessionStartTime) / 1000))
      }, 1000)
    } else {
      setSessionTimer(0)
    }
    return () => clearInterval(interval)
  }, [sessionStartTime])

  useEffect(() => {
    if (currentSets.length > 0 && !sessionStartTime) {
      setSessionStartTime(Date.now())
    } else if (currentSets.length === 0 && sessionStartTime) {
      setSessionStartTime(null)
    }
  }, [currentSets.length])

  const handleAddReps = (reps: number) => {
    onAddReps(reps, selectedVariant, selectedType)
    setLastAction({ reps, timestamp: Date.now() })
    setCustomReps('')
    
    toast.success(`Added ${reps} reps!`, {
      duration: 2000,
    })

    setTimeout(() => setLastAction(null), 3000)
  }

  const handleUndo = () => {
    if (lastAction && Date.now() - lastAction.timestamp < 3000 && currentSets.length > 0) {
      onUndoLastSet()
      setLastAction(null)
      toast.success('Last set removed')
    }
  }

  const startRestTimer = (seconds: number) => {
    setRestTimer(seconds)
    setIsResting(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const totalRepsToday = currentSets.reduce((sum, set) => sum + set.reps, 0)
  const weeklyReps = getWeeklyReps(sessions, new Date())
  const sessionAverage = getSessionAverage(sessions)
  const bestTime = getBestTimeOfDay(sessions)
  
  const activeWeeklyGoal = goals.find(g => g.type === 'weekly' && g.isActive)
  const weeklyProgress = activeWeeklyGoal ? Math.min((weeklyReps / activeWeeklyGoal.target) * 100, 100) : 0

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Workout</h1>
        <div className="font-display font-bold text-7xl text-primary mb-1">{totalRepsToday}</div>
        <p className="text-muted-foreground uppercase text-sm tracking-wider font-medium">Reps in Current Session</p>
        {sessionTimer > 0 && (
          <div className="mt-2 flex items-center justify-center gap-2 text-muted-foreground">
            <ClockCountdown size={16} weight="bold" />
            <span className="text-sm font-medium">{formatTime(sessionTimer)}</span>
          </div>
        )}
      </div>

      {activeWeeklyGoal && (
        <Card className="p-4 bg-secondary/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target size={20} weight="bold" className="text-secondary" />
              <span className="font-semibold text-sm">Weekly Goal</span>
            </div>
            <span className="text-sm font-semibold">{weeklyReps} / {activeWeeklyGoal.target}</span>
          </div>
          <Progress value={weeklyProgress} className="h-2" />
        </Card>
      )}

      {sessions.length >= 3 && (
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendUp size={16} weight="bold" className="text-accent" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Avg Session</span>
            </div>
            <div className="font-display font-bold text-2xl">{sessionAverage}</div>
          </Card>
          {bestTime && (
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={16} weight="bold" className="text-accent" />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Best Time</span>
              </div>
              <div className="font-display font-bold text-2xl">{bestTime.hour}:00</div>
            </Card>
          )}
        </div>
      )}

      {currentSets.length === 0 && (
        <div className="flex justify-center">
          <WorkoutTemplateDialog 
            templates={templates || []} 
            onStartTemplate={handleStartTemplate}
            trigger={
              <Button variant="outline" size="lg" className="gap-2">
                <Lightning weight="fill" />
                Quick Start Template
              </Button>
            }
          />
        </div>
      )}

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Variant</label>
            <Select value={selectedVariant} onValueChange={(v) => setSelectedVariant(v as PushUpVariant)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEFAULT_VARIANTS.map(variant => (
                  <SelectItem key={variant} value={variant}>{variant}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Set Type</label>
            <div className="flex gap-2">
              {(['regular', 'max', 'drop', 'failure'] as SetType[]).map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                  className="flex-1 capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            onClick={() => handleAddReps(1)}
            className="w-full h-24 text-3xl font-display font-bold"
            variant="outline"
          >
            <Plus className="mr-2" weight="bold" /> 1
          </Button>
        </motion.div>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            onClick={() => handleAddReps(5)}
            className="w-full h-24 text-3xl font-display font-bold"
            variant="outline"
          >
            <Plus className="mr-2" weight="bold" /> 5
          </Button>
        </motion.div>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            size="lg"
            onClick={() => handleAddReps(10)}
            className="w-full h-24 text-3xl font-display font-bold bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Plus className="mr-2" weight="bold" /> 10
          </Button>
        </motion.div>
      </div>

      <Card className="p-4">
        <label className="block text-sm font-medium mb-2 uppercase tracking-wide">Custom Amount</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={customReps}
            onChange={(e) => setCustomReps(e.target.value)}
            placeholder="Enter reps"
            className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            min="1"
          />
          <Button
            onClick={() => {
              const reps = parseInt(customReps)
              if (reps > 0 && reps <= 200) {
                handleAddReps(reps)
              } else if (reps > 200) {
                toast.error('That seems high! Are you sure?')
              }
            }}
            disabled={!customReps || parseInt(customReps) <= 0}
          >
            <Check weight="bold" />
          </Button>
        </div>
      </Card>

      {isResting && (
        <Card className="p-6 bg-secondary text-secondary-foreground">
          <div className="text-center">
            <ClockCountdown className="mx-auto mb-2" size={32} weight="bold" />
            <div className="font-display font-bold text-4xl mb-1">{formatTime(restTimer)}</div>
            <p className="text-sm uppercase tracking-wide">Rest Time Remaining</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResting(false)}
              className="mt-3"
            >
              Skip Rest
            </Button>
          </div>
        </Card>
      )}

      {!isResting && currentSets.length > 0 && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => startRestTimer(60)}
            className="flex-1"
          >
            <ClockCountdown className="mr-2" weight="bold" />
            1 min
          </Button>
          <Button
            variant="outline"
            onClick={() => startRestTimer(90)}
            className="flex-1"
          >
            <ClockCountdown className="mr-2" weight="bold" />
            90 sec
          </Button>
          <Button
            variant="outline"
            onClick={() => startRestTimer(120)}
            className="flex-1"
          >
            <ClockCountdown className="mr-2" weight="bold" />
            2 min
          </Button>
        </div>
      )}

      {currentSets.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Current Session</h3>
          <div className="space-y-2">
            {currentSets.map((set, index) => (
              <div key={set.id} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-2xl text-muted-foreground w-8">
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-xl">{set.reps}</span>
                      <Badge variant="outline">{set.variant}</Badge>
                      {set.type !== 'regular' && (
                        <Badge variant="secondary" className="capitalize">{set.type}</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            className="w-full mt-4"
            variant="default"
            onClick={onEndSession}
          >
            <Check className="mr-2" weight="bold" />
            End Session
          </Button>
        </Card>
      )}

      <AnimatePresence>
        {lastAction && Date.now() - lastAction.timestamp < 3000 && currentSets.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 md:bottom-6 z-50"
          >
            <Button variant="secondary" onClick={handleUndo} className="shadow-lg gap-2">
              <ArrowCounterClockwise weight="bold" />
              Undo last set
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
