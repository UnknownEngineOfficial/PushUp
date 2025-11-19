import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DownloadSimple, Trash } from '@phosphor-icons/react'
import { TrainingSession } from '@/lib/types'
import { exportToCSV, exportToJSON } from '@/lib/stats'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface SettingsViewProps {
  sessions: TrainingSession[]
  onClearData: () => void
}

export function SettingsView({ sessions, onClearData }: SettingsViewProps) {
  const handleExportCSV = () => {
    const csv = exportToCSV(sessions)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pushup-tracker-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('CSV exported successfully!')
  }

  const handleExportJSON = () => {
    const json = exportToJSON(sessions)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pushup-tracker-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('JSON exported successfully!')
  }

  const handleClearAllData = () => {
    onClearData()
    toast.success('All data cleared')
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your data and preferences</p>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Export Data</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Download your training data for backup or analysis in external tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleExportCSV}
            disabled={sessions.length === 0}
            className="flex-1"
          >
            <DownloadSimple className="mr-2" weight="bold" />
            Export as CSV
          </Button>
          <Button
            onClick={handleExportJSON}
            disabled={sessions.length === 0}
            variant="outline"
            className="flex-1"
          >
            <DownloadSimple className="mr-2" weight="bold" />
            Export as JSON
          </Button>
        </div>
        {sessions.length === 0 && (
          <p className="text-xs text-muted-foreground mt-3">
            No data to export yet. Start tracking your workouts first!
          </p>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Version:</span> 1.0.0
          </div>
          <div>
            <span className="font-medium">Total Sessions:</span> {sessions.length}
          </div>
          <div>
            <span className="font-medium">Total Reps:</span>{' '}
            {sessions.reduce((sum, s) => sum + s.totalReps, 0)}
          </div>
        </div>
      </Card>

      <Card className="p-6 border-destructive/50">
        <h2 className="text-xl font-semibold mb-4 text-destructive">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete all your training data. This action cannot be undone.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={sessions.length === 0}>
              <Trash className="mr-2" weight="bold" />
              Clear All Data
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all your training sessions, goals, and personal records.
                This action cannot be undone. Consider exporting your data first.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearAllData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete Everything
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  )
}
