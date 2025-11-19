import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrainingSession } from '@/lib/types'
import { Calendar, Note, ListChecks } from '@phosphor-icons/react'
import { format } from 'date-fns'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface HistoryViewProps {
  sessions: TrainingSession[]
}

export function HistoryView({ sessions }: HistoryViewProps) {
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const groupedByDate = sortedSessions.reduce((acc, session) => {
    if (!acc[session.date]) {
      acc[session.date] = []
    }
    acc[session.date].push(session)
    return acc
  }, {} as Record<string, TrainingSession[]>)

  return (
    <div className="flex flex-col gap-6 px-6 py-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">History</h1>
        <p className="text-muted-foreground">Your training sessions</p>
      </div>

      {sessions.length === 0 ? (
        <Card className="p-12 text-center">
          <Calendar className="mx-auto mb-4 text-muted-foreground" size={48} weight="light" />
          <h3 className="text-xl font-semibold mb-2">No sessions yet</h3>
          <p className="text-muted-foreground">Start your first workout to see your history here</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedByDate).map(([date, dateSessions]) => (
            <Card key={date} className="overflow-hidden">
              <div className="bg-muted px-6 py-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} weight="bold" />
                    <span className="font-semibold">{format(new Date(date), 'EEEE, MMMM d, yyyy')}</span>
                  </div>
                  <Badge variant="secondary">
                    {dateSessions.reduce((sum, s) => sum + s.totalReps, 0)} reps
                  </Badge>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {dateSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg overflow-hidden">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={session.id} className="border-0">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              <ListChecks size={24} weight="bold" className="text-primary" />
                              <div className="text-left">
                                <div className="font-semibold">
                                  Session at {format(new Date(session.startTime), 'HH:mm')}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {session.sets.length} sets · {session.totalReps} reps
                                </div>
                              </div>
                            </div>
                            <div className="font-display font-bold text-2xl text-primary">
                              {session.totalReps}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-2 pt-2">
                            {session.sets.map((set, index) => (
                              <div
                                key={set.id}
                                className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-md"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="font-display font-bold text-xl text-muted-foreground w-6">
                                    {index + 1}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-display font-semibold text-lg">{set.reps}</span>
                                    <Badge variant="outline">{set.variant}</Badge>
                                    {set.type !== 'regular' && (
                                      <Badge variant="secondary" className="capitalize">
                                        {set.type}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {format(new Date(set.timestamp), 'HH:mm:ss')}
                                </span>
                              </div>
                            ))}
                          </div>
                          {session.notes && (
                            <div className="mt-4 p-3 bg-accent/10 rounded-md border border-accent/20">
                              <div className="flex items-start gap-2">
                                <Note size={18} weight="bold" className="text-accent mt-0.5" />
                                <div>
                                  <div className="text-xs font-medium text-accent uppercase tracking-wide mb-1">
                                    Notes
                                  </div>
                                  <p className="text-sm">{session.notes}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
