import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WorkoutTemplate } from '@/lib/types'
import { Lightning, ListChecks } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface WorkoutTemplateDialogProps {
  templates: WorkoutTemplate[]
  onStartTemplate: (template: WorkoutTemplate) => void
  trigger?: React.ReactNode
}

const DEFAULT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: 'pyramid',
    name: 'Pyramid',
    description: 'Build up and back down',
    sets: [
      { reps: 10, variant: 'Regular', type: 'regular' },
      { reps: 15, variant: 'Regular', type: 'regular' },
      { reps: 20, variant: 'Regular', type: 'regular' },
      { reps: 15, variant: 'Regular', type: 'regular' },
      { reps: 10, variant: 'Regular', type: 'regular' },
    ],
    createdAt: Date.now()
  },
  {
    id: 'variety-blast',
    name: 'Variety Blast',
    description: 'Different variants',
    sets: [
      { reps: 15, variant: 'Regular', type: 'regular' },
      { reps: 12, variant: 'Wide', type: 'regular' },
      { reps: 10, variant: 'Diamond', type: 'regular' },
      { reps: 12, variant: 'Close', type: 'regular' },
      { reps: 15, variant: 'Regular', type: 'regular' },
    ],
    createdAt: Date.now()
  },
  {
    id: 'hundred-club',
    name: '100 Club',
    description: 'Get to 100 reps',
    sets: [
      { reps: 25, variant: 'Regular', type: 'regular' },
      { reps: 25, variant: 'Regular', type: 'regular' },
      { reps: 25, variant: 'Regular', type: 'regular' },
      { reps: 25, variant: 'Regular', type: 'regular' },
    ],
    createdAt: Date.now()
  },
  {
    id: 'endurance-test',
    name: 'Endurance Test',
    description: 'Push to failure',
    sets: [
      { reps: 30, variant: 'Regular', type: 'max' },
      { reps: 20, variant: 'Regular', type: 'regular' },
      { reps: 15, variant: 'Regular', type: 'regular' },
      { reps: 10, variant: 'Regular', type: 'failure' },
    ],
    createdAt: Date.now()
  }
]

export function WorkoutTemplateDialog({ templates, onStartTemplate, trigger }: WorkoutTemplateDialogProps) {
  const [open, setOpen] = useState(false)
  
  const allTemplates = [...DEFAULT_TEMPLATES, ...templates]
  
  const handleSelectTemplate = (template: WorkoutTemplate) => {
    onStartTemplate(template)
    setOpen(false)
    toast.success(`Starting ${template.name}!`, {
      description: `${template.sets.length} sets ready`
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Lightning weight="bold" />
            Quick Start
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Workout Templates</DialogTitle>
          <DialogDescription>
            Start a pre-built workout routine
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 mt-4">
          {allTemplates.map(template => {
            const totalReps = template.sets.reduce((sum, set) => sum + set.reps, 0)
            return (
              <Card 
                key={template.id} 
                className="p-4 hover:border-primary cursor-pointer transition-colors"
                onClick={() => handleSelectTemplate(template)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Lightning size={20} weight="fill" className="text-accent" />
                      {template.name}
                    </h3>
                    {template.description && (
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    )}
                  </div>
                  <Badge variant="secondary">{totalReps} reps</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ListChecks size={16} weight="bold" />
                  <span>{template.sets.length} sets</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {template.sets.map((set, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {set.reps} {set.variant}
                    </Badge>
                  ))}
                </div>
              </Card>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
