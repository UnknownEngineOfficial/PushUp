import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster } from '@/components/ui/sonner'
import { WorkoutView } from '@/components/WorkoutView'
import { StatisticsView } from '@/components/StatisticsView'
import { HistoryView } from '@/components/HistoryView'
import { GoalsView } from '@/components/GoalsView'
import { SettingsView } from '@/components/SettingsView'
import { SessionNotesDialog } from '@/components/SessionNotesDialog'
import { TrainingSession, PushUpSet, Goal, PushUpVariant, SetType } from '@/lib/types'
import { calculatePersonalRecords } from '@/lib/stats'
import { format } from 'date-fns'
import { ListChecks, ChartLine, Calendar, Target, Gear } from '@phosphor-icons/react'
import { toast } from 'sonner'

function App() {
  const [sessions, setSessions] = useKV<TrainingSession[]>('training-sessions', [])
  const [goals, setGoals] = useKV<Goal[]>('goals', [])
  const [currentView, setCurrentView] = useState<'workout' | 'statistics' | 'history' | 'goals' | 'settings'>('workout')
  const [currentSets, setCurrentSets] = useState<PushUpSet[]>([])
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null)
  const [notesDialogOpen, setNotesDialogOpen] = useState(false)
  const [sessionNotes, setSessionNotes] = useState('')

  const safeSession = sessions || []
  const safeGoals = goals || []
  const personalRecords = calculatePersonalRecords(safeSession)

  const handleAddReps = (reps: number, variant: PushUpVariant, type: SetType) => {
    if (sessionStartTime === null) {
      setSessionStartTime(Date.now())
    }

    const newSet: PushUpSet = {
      id: `set-${Date.now()}-${Math.random()}`,
      reps,
      variant,
      type,
      timestamp: Date.now()
    }

    setCurrentSets((prevSets) => [...prevSets, newSet])
  }

  const handleEndSession = () => {
    if (currentSets.length === 0) {
      toast.error('No sets to save')
      return
    }

    setNotesDialogOpen(true)
  }

  const handleSaveSession = (notes: string) => {
    if (currentSets.length === 0) return

    const newSession: TrainingSession = {
      id: `session-${Date.now()}`,
      date: format(new Date(), 'yyyy-MM-dd'),
      startTime: sessionStartTime || Date.now(),
      endTime: Date.now(),
      sets: currentSets,
      notes: notes || undefined,
      totalReps: currentSets.reduce((sum, set) => sum + set.reps, 0)
    }

    setSessions((prevSessions) => [...(prevSessions || []), newSession])
    
    setCurrentSets([])
    setSessionStartTime(null)
    setSessionNotes('')
    
    toast.success('Session saved!', {
      description: `${newSession.totalReps} reps logged`
    })

    setCurrentView('statistics')
  }

  const handleAddGoal = (goalData: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      createdAt: Date.now()
    }
    setGoals((prevGoals) => [...(prevGoals || []), newGoal])
  }

  const handleDeleteGoal = (id: string) => {
    setGoals((prevGoals) => (prevGoals || []).filter(g => g.id !== id))
  }

  const handleCompleteGoal = (id: string) => {
    setGoals((prevGoals) =>
      (prevGoals || []).map(g => 
        g.id === id ? { ...g, completedAt: Date.now(), isActive: false } : g
      )
    )
  }

  const handleClearData = () => {
    setSessions([])
    setGoals([])
    setCurrentSets([])
    setSessionStartTime(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pb-20 md:pb-6">
        {currentView === 'workout' && (
          <WorkoutView
            currentSets={currentSets}
            onAddReps={handleAddReps}
            onEndSession={handleEndSession}
          />
        )}
        {currentView === 'statistics' && (
          <StatisticsView sessions={safeSession} personalRecords={personalRecords} />
        )}
        {currentView === 'history' && <HistoryView sessions={safeSession} />}
        {currentView === 'goals' && (
          <GoalsView
            goals={safeGoals}
            sessions={safeSession}
            onAddGoal={handleAddGoal}
            onDeleteGoal={handleDeleteGoal}
            onCompleteGoal={handleCompleteGoal}
          />
        )}
        {currentView === 'settings' && (
          <SettingsView sessions={safeSession} onClearData={handleClearData} />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden">
        <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as any)} className="w-full">
          <TabsList className="w-full h-16 rounded-none grid grid-cols-5 bg-card">
            <TabsTrigger value="workout" className="flex-col gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <ListChecks size={24} weight="bold" />
              <span className="text-xs">Workout</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex-col gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <ChartLine size={24} weight="bold" />
              <span className="text-xs">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-col gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Calendar size={24} weight="bold" />
              <span className="text-xs">History</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex-col gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Target size={24} weight="bold" />
              <span className="text-xs">Goals</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-col gap-1 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Gear size={24} weight="bold" />
              <span className="text-xs">Settings</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as any)}>
          <TabsList className="bg-card border shadow-lg">
            <TabsTrigger value="workout" className="gap-2">
              <ListChecks size={20} weight="bold" />
              Workout
            </TabsTrigger>
            <TabsTrigger value="statistics" className="gap-2">
              <ChartLine size={20} weight="bold" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Calendar size={20} weight="bold" />
              History
            </TabsTrigger>
            <TabsTrigger value="goals" className="gap-2">
              <Target size={20} weight="bold" />
              Goals
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Gear size={20} weight="bold" />
              Settings
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <SessionNotesDialog
        open={notesDialogOpen}
        onOpenChange={setNotesDialogOpen}
        onSave={handleSaveSession}
        initialNotes={sessionNotes}
      />

      <Toaster />
    </div>
  )
}

export default App