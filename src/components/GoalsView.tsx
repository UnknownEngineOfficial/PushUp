import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Goal, TrainingSession } from '@/lib/types'
import { Target, Plus, Trophy, Trash } from '@phosphor-icons/react'
import { getDailyReps, getWeeklyReps, getMonthlyReps } from '@/lib/stats'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface GoalsViewProps {
  goals: Goal[]
  sessions: TrainingSession[]
  onAddGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void
  onDeleteGoal: (id: string) => void
  onCompleteGoal: (id: string) => void
}

export function GoalsView({ goals, sessions, onAddGoal, onDeleteGoal, onCompleteGoal }: GoalsViewProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    type: 'daily' as Goal['type'],
    target: '',
    description: ''
  })

  const handleCreateGoal = () => {
    if (!newGoal.target || parseInt(newGoal.target) <= 0) {
      toast.error('Please enter a valid target')
      return
    }

    onAddGoal({
      type: newGoal.type,
      target: parseInt(newGoal.target),
      description: newGoal.description,
      isActive: true
    })

    setNewGoal({ type: 'daily', target: '', description: '' })
    setIsDialogOpen(false)
    toast.success('Goal created!')
  }

  const getProgress = (goal: Goal): number => {
    const today = new Date()
    let current = 0

    switch (goal.type) {
      case 'daily':
        current = getDailyReps(sessions, today)
        break
      case 'weekly':
        current = getWeeklyReps(sessions, today)
        break
      case 'monthly':
        current = getMonthlyReps(sessions, today)
        break
      case 'milestone':
        const maxSingleSet = sessions.reduce((max, session) => {
          const sessionMax = Math.max(...session.sets.map(s => s.reps), 0)
          return Math.max(max, sessionMax)
        }, 0)
        current = maxSingleSet
        break
    }

    return Math.min((current / goal.target) * 100, 100)
  }

  const getCurrentValue = (goal: Goal): number => {
    const today = new Date()
    
    switch (goal.type) {
      case 'daily':
        return getDailyReps(sessions, today)
      case 'weekly':
        return getWeeklyReps(sessions, today)
      case 'monthly':
        return getMonthlyReps(sessions, today)
      case 'milestone':
        return sessions.reduce((max, session) => {
          const sessionMax = Math.max(...session.sets.map(s => s.reps), 0)
          return Math.max(max, sessionMax)
        }, 0)
    }
  }

  const activeGoals = goals.filter(g => g.isActive && !g.completedAt)
  const completedGoals = goals.filter(g => g.completedAt)

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Goals</h1>
          <p className="text-muted-foreground">Track your training targets</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" weight="bold" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="goal-type">Goal Type</Label>
                <Select 
                  value={newGoal.type} 
                  onValueChange={(v) => setNewGoal({ ...newGoal, type: v as Goal['type'] })}
                >
                  <SelectTrigger id="goal-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Target</SelectItem>
                    <SelectItem value="weekly">Weekly Target</SelectItem>
                    <SelectItem value="monthly">Monthly Target</SelectItem>
                    <SelectItem value="milestone">Milestone (Max Reps)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="goal-target">Target Reps</Label>
                <Input
                  id="goal-target"
                  type="number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  placeholder="e.g., 100"
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="goal-description">Description (optional)</Label>
                <Input
                  id="goal-description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="e.g., Daily push-up challenge"
                />
              </div>
              <Button onClick={handleCreateGoal} className="w-full">
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {activeGoals.length === 0 && completedGoals.length === 0 ? (
        <Card className="p-12 text-center">
          <Target className="mx-auto mb-4 text-muted-foreground" size={48} weight="light" />
          <h3 className="text-xl font-semibold mb-2">No goals yet</h3>
          <p className="text-muted-foreground mb-4">Create your first goal to start tracking progress</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2" weight="bold" />
            Create Goal
          </Button>
        </Card>
      ) : (
        <>
          {activeGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Active Goals</h2>
              <div className="space-y-4">
                {activeGoals.map((goal) => {
                  const progress = getProgress(goal)
                  const current = getCurrentValue(goal)
                  const isCompleted = current >= goal.target

                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="capitalize">
                                {goal.type}
                              </Badge>
                              {isCompleted && (
                                <Badge className="bg-secondary text-secondary-foreground">
                                  <Trophy className="mr-1" size={14} weight="bold" />
                                  Completed!
                                </Badge>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold">
                              {goal.description || `${goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} Goal`}
                            </h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              onDeleteGoal(goal.id)
                              toast.success('Goal deleted')
                            }}
                          >
                            <Trash size={18} weight="bold" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-baseline justify-between">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="font-display font-bold text-2xl">
                              {current} <span className="text-base text-muted-foreground">/ {goal.target}</span>
                            </span>
                          </div>
                          <Progress value={progress} className="h-3" />
                          <p className="text-xs text-muted-foreground text-right">
                            {Math.round(progress)}% complete
                          </p>
                        </div>

                        {isCompleted && !goal.completedAt && (
                          <Button
                            className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                            onClick={() => {
                              onCompleteGoal(goal.id)
                              toast.success('🎉 Goal completed!', { duration: 3000 })
                            }}
                          >
                            <Trophy className="mr-2" weight="bold" />
                            Mark as Complete
                          </Button>
                        )}
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {completedGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Completed Goals</h2>
              <div className="space-y-4">
                {completedGoals.map((goal) => (
                  <Card key={goal.id} className="p-6 opacity-75">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className="bg-secondary text-secondary-foreground mb-2">
                          <Trophy className="mr-1" size={14} weight="bold" />
                          Completed
                        </Badge>
                        <h3 className="text-lg font-semibold">
                          {goal.description || `${goal.type.charAt(0).toUpperCase() + goal.type.slice(1)} Goal`}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Target: {goal.target} reps
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDeleteGoal(goal.id)}
                      >
                        <Trash size={18} weight="bold" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
