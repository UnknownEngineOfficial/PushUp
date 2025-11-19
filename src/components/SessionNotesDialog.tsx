import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Smiley, SmileyMeh, SmileySad, SmileyXEyes } from '@phosphor-icons/react'

interface SessionNotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (notes: string, bodyWeight?: number, difficulty?: 'easy' | 'moderate' | 'hard' | 'extreme') => void
  onCancel: () => void
  initialNotes?: string
}

export function SessionNotesDialog({ open, onOpenChange, onSave, onCancel, initialNotes = '' }: SessionNotesDialogProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [bodyWeight, setBodyWeight] = useState('')
  const [difficulty, setDifficulty] = useState<'easy' | 'moderate' | 'hard' | 'extreme' | ''>('')

  useEffect(() => {
    if (open) {
      setNotes(initialNotes)
      setBodyWeight('')
      setDifficulty('')
    }
  }, [open, initialNotes])

  const handleSave = () => {
    const weight = bodyWeight ? parseFloat(bodyWeight) : undefined
    onSave(notes, weight, difficulty || undefined)
    setNotes('')
    setBodyWeight('')
    setDifficulty('')
    onOpenChange(false)
  }

  const handleSkip = () => {
    onSave('', undefined, undefined)
    setNotes('')
    setBodyWeight('')
    setDifficulty('')
    onOpenChange(false)
  }

  const handleCancel = () => {
    onCancel()
    setNotes('')
    setBodyWeight('')
    setDifficulty('')
    onOpenChange(false)
  }

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', icon: Smiley, color: 'text-green-500' },
    { value: 'moderate', label: 'Moderate', icon: SmileyMeh, color: 'text-yellow-500' },
    { value: 'hard', label: 'Hard', icon: SmileySad, color: 'text-orange-500' },
    { value: 'extreme', label: 'Extreme', icon: SmileyXEyes, color: 'text-red-500' },
  ] as const

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="body-weight">Body Weight (kg) - Optional</Label>
            <Input
              id="body-weight"
              type="number"
              step="0.1"
              value={bodyWeight}
              onChange={(e) => setBodyWeight(e.target.value)}
              placeholder="e.g. 75.5"
              className="mt-2"
            />
          </div>

          <div>
            <Label>How difficult was this session?</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {difficultyOptions.map(({ value, label, icon: Icon, color }) => (
                <Button
                  key={value}
                  type="button"
                  variant={difficulty === value ? 'default' : 'outline'}
                  onClick={() => setDifficulty(value)}
                  className="flex items-center gap-2 h-auto py-3"
                >
                  <Icon size={24} weight="bold" className={difficulty === value ? '' : color} />
                  <span>{label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="session-notes">Notes - Optional</Label>
            <Textarea
              id="session-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did you feel? Any observations about technique, energy levels, or soreness?"
              rows={4}
              className="mt-2"
            />
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="ghost" onClick={handleCancel} className="sm:mr-auto">
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSkip}>
            Skip & Save
          </Button>
          <Button onClick={handleSave}>
            Save Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
