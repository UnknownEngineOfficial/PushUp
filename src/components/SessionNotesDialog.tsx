import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface SessionNotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (notes: string) => void
  onCancel: () => void
  initialNotes?: string
}

export function SessionNotesDialog({ open, onOpenChange, onSave, onCancel, initialNotes = '' }: SessionNotesDialogProps) {
  const [notes, setNotes] = useState(initialNotes)

  useEffect(() => {
    if (open) {
      setNotes(initialNotes)
    }
  }, [open, initialNotes])

  const handleSave = () => {
    onSave(notes)
    setNotes('')
    onOpenChange(false)
  }

  const handleSkip = () => {
    onSave('')
    setNotes('')
    onOpenChange(false)
  }

  const handleCancel = () => {
    onCancel()
    setNotes('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Notes (Optional)</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="session-notes">Notes</Label>
            <Textarea
              id="session-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did you feel? Any observations about technique, energy levels, or soreness?"
              rows={6}
              className="mt-2"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            You can save the session with or without notes, or cancel to continue training.
          </p>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="ghost" onClick={handleCancel} className="sm:mr-auto">
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSkip}>
            Skip & Save
          </Button>
          <Button onClick={handleSave}>
            Save with Notes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
