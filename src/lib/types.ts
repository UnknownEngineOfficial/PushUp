export type PushUpVariant = 
  | 'Regular'
  | 'Wide'
  | 'Close'
  | 'Diamond'
  | 'Pike'
  | 'Decline'
  | 'Archer'
  | string

export type SetType = 'regular' | 'drop' | 'max' | 'failure'

export interface PushUpSet {
  id: string
  reps: number
  variant: PushUpVariant
  type: SetType
  timestamp: number
  restDuration?: number
}

export interface TrainingSession {
  id: string
  date: string
  startTime: number
  endTime?: number
  sets: PushUpSet[]
  notes?: string
  totalReps: number
}

export interface Goal {
  id: string
  type: 'daily' | 'weekly' | 'monthly' | 'milestone'
  target: number
  description: string
  createdAt: number
  completedAt?: number
  isActive: boolean
}

export interface PersonalRecord {
  maxSingleSet: { reps: number; date: string; variant: PushUpVariant }
  maxSessionVolume: { reps: number; date: string }
  currentStreak: number
  longestStreak: number
}

export const DEFAULT_VARIANTS: PushUpVariant[] = [
  'Regular',
  'Wide',
  'Close',
  'Diamond',
  'Pike',
  'Decline',
  'Archer'
]
