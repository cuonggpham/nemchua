import { DifficultyRating } from '@prisma/client'

export interface SpacedRepetitionResult {
  interval: number
  repetitions: number
  easinessFactor: number
  nextReviewDate: Date
}

/**
 * Simplified SM-2 algorithm for spaced repetition
 * @param quality - Quality of response (0-3 corresponding to Again, Hard, Good, Easy)
 * @param repetitions - Number of times the card has been reviewed
 * @param easinessFactor - Current easiness factor (2.5 default)
 * @param interval - Current interval in days
 * @returns Updated spaced repetition data
 */
export function calculateSpacedRepetition(
  quality: DifficultyRating,
  repetitions: number,
  easinessFactor: number,
  interval: number
): SpacedRepetitionResult {
  let newEasinessFactor = easinessFactor
  let newRepetitions = repetitions
  let newInterval = interval

  // Convert DifficultyRating to quality score
  const qualityMap: Record<DifficultyRating, number> = {
    AGAIN: 0,
    HARD: 1,
    GOOD: 2,
    EASY: 3
  }

  const q = qualityMap[quality]

  // If quality < 2 (AGAIN or HARD), reset repetitions
  if (q < 2) {
    newRepetitions = 0
    newInterval = 1
  } else {
    // Update easiness factor
    newEasinessFactor = Math.max(
      1.3,
      newEasinessFactor + (0.1 - (3 - q) * (0.08 + (3 - q) * 0.02))
    )

    newRepetitions += 1

    // Calculate new interval
    if (newRepetitions === 1) {
      newInterval = 1
    } else if (newRepetitions === 2) {
      newInterval = 6
    } else {
      newInterval = Math.round(interval * newEasinessFactor)
    }
  }

  // Calculate next review date
  const nextReviewDate = new Date()
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval)

  return {
    interval: newInterval,
    repetitions: newRepetitions,
    easinessFactor: newEasinessFactor,
    nextReviewDate
  }
}

/**
 * Get cards that need to be reviewed
 * @param nextReviewDate - The next review date of the card
 * @returns true if card needs review
 */
export function shouldReviewCard(nextReviewDate: Date): boolean {
  return new Date() >= nextReviewDate
}

/**
 * Calculate retention rate based on spaced repetition data
 */
export function getRetentionRate(repetitions: number, easinessFactor: number): number {
  const baseRate = 0.9
  const repetitionBonus = Math.min(repetitions * 0.05, 0.3)
  const easinessBonus = (easinessFactor - 1.3) * 0.1
  
  return Math.min(baseRate + repetitionBonus + easinessBonus, 0.98)
}
