import { TrainingSession, PersonalRecord, PushUpVariant } from './types'
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, differenceInDays, parseISO } from 'date-fns'

export function calculateTotalReps(sessions: TrainingSession[], startDate: Date, endDate: Date): number {
  return sessions
    .filter(s => {
      const sessionDate = parseISO(s.date)
      return sessionDate >= startDate && sessionDate <= endDate
    })
    .reduce((sum, session) => sum + session.totalReps, 0)
}

export function getDailyReps(sessions: TrainingSession[], date: Date): number {
  return calculateTotalReps(sessions, startOfDay(date), endOfDay(date))
}

export function getWeeklyReps(sessions: TrainingSession[], date: Date): number {
  return calculateTotalReps(sessions, startOfWeek(date, { weekStartsOn: 1 }), endOfWeek(date, { weekStartsOn: 1 }))
}

export function getMonthlyReps(sessions: TrainingSession[], date: Date): number {
  return calculateTotalReps(sessions, startOfMonth(date), endOfMonth(date))
}

export function calculatePersonalRecords(sessions: TrainingSession[]): PersonalRecord {
  let maxSingleSet: { reps: number; date: string; variant: PushUpVariant } = { reps: 0, date: '', variant: 'Regular' }
  let maxSessionVolume = { reps: 0, date: '' }
  
  sessions.forEach(session => {
    if (session.totalReps > maxSessionVolume.reps) {
      maxSessionVolume = { reps: session.totalReps, date: session.date }
    }
    
    session.sets.forEach(set => {
      if (set.reps > maxSingleSet.reps) {
        maxSingleSet = { reps: set.reps, date: session.date, variant: set.variant }
      }
    })
  })
  
  const { currentStreak, longestStreak } = calculateStreaks(sessions)
  
  return {
    maxSingleSet,
    maxSessionVolume,
    currentStreak,
    longestStreak
  }
}

export function calculateStreaks(sessions: TrainingSession[]): { currentStreak: number; longestStreak: number } {
  if (sessions.length === 0) return { currentStreak: 0, longestStreak: 0 }
  
  const uniqueDates = [...new Set(sessions.map(s => s.date))].sort()
  
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 1
  
  const today = format(new Date(), 'yyyy-MM-dd')
  const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd')
  
  if (uniqueDates.includes(today) || uniqueDates.includes(yesterday)) {
    currentStreak = 1
    
    for (let i = uniqueDates.length - 1; i > 0; i--) {
      const current = parseISO(uniqueDates[i])
      const previous = parseISO(uniqueDates[i - 1])
      const daysDiff = differenceInDays(current, previous)
      
      if (daysDiff === 1) {
        currentStreak++
      } else {
        break
      }
    }
  }
  
  for (let i = 1; i < uniqueDates.length; i++) {
    const current = parseISO(uniqueDates[i])
    const previous = parseISO(uniqueDates[i - 1])
    const daysDiff = differenceInDays(current, previous)
    
    if (daysDiff === 1) {
      tempStreak++
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 1
    }
  }
  
  longestStreak = Math.max(longestStreak, tempStreak, currentStreak)
  
  return { currentStreak, longestStreak }
}

export function getVolumeByVariant(sessions: TrainingSession[]): Record<string, number> {
  const volumeMap: Record<string, number> = {}
  
  sessions.forEach(session => {
    session.sets.forEach(set => {
      if (!volumeMap[set.variant]) {
        volumeMap[set.variant] = 0
      }
      volumeMap[set.variant] += set.reps
    })
  })
  
  return volumeMap
}

export function getLast7DaysVolume(sessions: TrainingSession[]): { date: string; reps: number }[] {
  const result: { date: string; reps: number }[] = []
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = format(date, 'yyyy-MM-dd')
    const reps = getDailyReps(sessions, date)
    result.push({ date: format(date, 'MMM dd'), reps })
  }
  
  return result
}

export function exportToCSV(sessions: TrainingSession[]): string {
  let csv = 'Date,Time,Variant,Reps,Set Type,Notes\n'
  
  sessions.forEach(session => {
    session.sets.forEach(set => {
      const time = format(new Date(set.timestamp), 'HH:mm:ss')
      const notes = session.notes?.replace(/,/g, ';') || ''
      csv += `${session.date},${time},${set.variant},${set.reps},${set.type},${notes}\n`
    })
  })
  
  return csv
}

export function exportToJSON(sessions: TrainingSession[]): string {
  return JSON.stringify(sessions, null, 2)
}
