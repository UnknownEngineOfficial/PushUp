import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface SessionNotesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (notes: string) => void
  initialNotes?: string
}

export function SessionNotesDialog({ open, onOpenChange, onSave, initialNotes = '' }: SessionNotesDialogProps) {
  const [notes, setNotes] = useState(initialNotes)

  const handleSave = () => {
    onSave(notes)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Session Notes</DialogTitle>
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
            Add notes about your technique, how you felt, or any other observations from this session.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Notes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
