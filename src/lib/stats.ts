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

export function getLastNDaysVolume(sessions: TrainingSession[], days: number): { date: string; reps: number }[] {
  const result: { date: string; reps: number }[] = []
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const reps = getDailyReps(sessions, date)
    result.push({ date: format(date, 'MMM dd'), reps })
  }
  
  return result
}

export function getLastNMonthsVolume(sessions: TrainingSession[], months: number): { date: string; reps: number }[] {
  const result: { date: string; reps: number }[] = []
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const start = startOfMonth(date)
    const end = endOfMonth(date)
    const reps = calculateTotalReps(sessions, start, end)
    result.push({ date: format(date, 'MMM yyyy'), reps })
  }
  
  return result
}

export function getAllTimeVolumeByMonth(sessions: TrainingSession[]): { date: string; reps: number }[] {
  if (sessions.length === 0) return []
  
  const monthlyMap: Record<string, number> = {}
  
  sessions.forEach(session => {
    const sessionDate = parseISO(session.date)
    const monthKey = format(sessionDate, 'yyyy-MM')
    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = 0
    }
    monthlyMap[monthKey] += session.totalReps
  })
  
  return Object.entries(monthlyMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, reps]) => ({
      date: format(parseISO(month + '-01'), 'MMM yyyy'),
      reps
    }))
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

export function getBestTimeOfDay(sessions: TrainingSession[]): { hour: number; avgReps: number } | null {
  if (sessions.length === 0) return null
  
  const hourlyStats: Record<number, { totalReps: number; count: number }> = {}
  
  sessions.forEach(session => {
    const hour = new Date(session.startTime).getHours()
    if (!hourlyStats[hour]) {
      hourlyStats[hour] = { totalReps: 0, count: 0 }
    }
    hourlyStats[hour].totalReps += session.totalReps
    hourlyStats[hour].count++
  })
  
  let bestHour = 0
  let bestAvg = 0
  
  Object.entries(hourlyStats).forEach(([hour, stats]) => {
    const avg = stats.totalReps / stats.count
    if (avg > bestAvg) {
      bestAvg = avg
      bestHour = parseInt(hour)
    }
  })
  
  return bestAvg > 0 ? { hour: bestHour, avgReps: Math.round(bestAvg) } : null
}

export function getSessionAverage(sessions: TrainingSession[]): number {
  if (sessions.length === 0) return 0
  const totalReps = sessions.reduce((sum, s) => sum + s.totalReps, 0)
  return Math.round(totalReps / sessions.length)
}

export function getAverageSetReps(sessions: TrainingSession[]): number {
  const allSets = sessions.flatMap(s => s.sets)
  if (allSets.length === 0) return 0
  const totalReps = allSets.reduce((sum, set) => sum + set.reps, 0)
  return Math.round(totalReps / allSets.length)
}

export function getYearlyReps(sessions: TrainingSession[], date: Date): number {
  const yearStart = new Date(date.getFullYear(), 0, 1)
  const yearEnd = new Date(date.getFullYear(), 11, 31, 23, 59, 59)
  return calculateTotalReps(sessions, yearStart, yearEnd)
}

export function getProgressComparison(sessions: TrainingSession[]): {
  thisWeek: number
  lastWeek: number
  thisMonth: number
  lastMonth: number
  weekChange: number
  monthChange: number
} {
  const now = new Date()
  
  const thisWeekStart = startOfWeek(now, { weekStartsOn: 1 })
  const thisWeekEnd = endOfWeek(now, { weekStartsOn: 1 })
  const lastWeekStart = startOfWeek(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), { weekStartsOn: 1 })
  const lastWeekEnd = endOfWeek(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), { weekStartsOn: 1 })
  
  const thisMonthStart = startOfMonth(now)
  const thisMonthEnd = endOfMonth(now)
  const lastMonthStart = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1))
  const lastMonthEnd = endOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1))
  
  const thisWeek = calculateTotalReps(sessions, thisWeekStart, thisWeekEnd)
  const lastWeek = calculateTotalReps(sessions, lastWeekStart, lastWeekEnd)
  const thisMonth = calculateTotalReps(sessions, thisMonthStart, thisMonthEnd)
  const lastMonth = calculateTotalReps(sessions, lastMonthStart, lastMonthEnd)
  
  const weekChange = lastWeek > 0 ? ((thisWeek - lastWeek) / lastWeek) * 100 : 0
  const monthChange = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0
  
  return {
    thisWeek,
    lastWeek,
    thisMonth,
    lastMonth,
    weekChange: Math.round(weekChange),
    monthChange: Math.round(monthChange)
  }
}
