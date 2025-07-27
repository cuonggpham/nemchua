import { SRSDifficulty } from '@/types';

export interface SRSResult {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: Date;
}

/**
 * SuperMemo 2 (SM-2) algorithm implementation for spaced repetition
 * Based on the original algorithm by Piotr Wozniak
 */
export function calculateSRS(
  difficulty: SRSDifficulty,
  currentEaseFactor: number = 2.5,
  currentInterval: number = 1,
  currentRepetitions: number = 0
): SRSResult {
  let easeFactor = currentEaseFactor;
  let interval = currentInterval;
  let repetitions = currentRepetitions;

  switch (difficulty) {
    case SRSDifficulty.AGAIN:
      // Reset progress - need to study again
      repetitions = 0;
      interval = 1;
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      break;

    case SRSDifficulty.HARD:
      // Decrease ease factor and repeat with shorter interval
      repetitions = 0;
      interval = Math.max(1, Math.floor(interval * 1.2));
      easeFactor = Math.max(1.3, easeFactor - 0.15);
      break;

    case SRSDifficulty.GOOD:
      // Standard progression
      repetitions += 1;
      if (repetitions === 1) {
        interval = 1;
      } else if (repetitions === 2) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      break;

    case SRSDifficulty.EASY:
      // Accelerated progression with increased ease factor
      repetitions += 1;
      easeFactor = Math.min(4.0, easeFactor + 0.15);
      
      if (repetitions === 1) {
        interval = 4;
      } else if (repetitions === 2) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      break;
  }

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    easeFactor: Math.round(easeFactor * 100) / 100, // Round to 2 decimal places
    interval,
    repetitions,
    nextReview
  };
}

/**
 * Check if a card is due for review
 */
export function isCardDue(nextReview: Date): boolean {
  return new Date() >= nextReview;
}

/**
 * Get cards that are due for review from a list of cards
 */
export function getDueCards<T extends { review: { nextReview: Date } }>(cards: T[]): T[] {
  return cards.filter(card => isCardDue(card.review.nextReview));
}

/**
 * Get difficulty label in Vietnamese
 */
export function getDifficultyLabel(difficulty: SRSDifficulty): string {
  switch (difficulty) {
    case SRSDifficulty.AGAIN:
      return 'Học lại';
    case SRSDifficulty.HARD:
      return 'Khó';
    case SRSDifficulty.GOOD:
      return 'Tốt';
    case SRSDifficulty.EASY:
      return 'Dễ';
    default:
      return 'Không xác định';
  }
}

/**
 * Get difficulty color for UI styling
 */
export function getDifficultyColor(difficulty: SRSDifficulty): string {
  switch (difficulty) {
    case SRSDifficulty.AGAIN:
      return 'bg-red-500 hover:bg-red-600';
    case SRSDifficulty.HARD:
      return 'bg-orange-500 hover:bg-orange-600';
    case SRSDifficulty.GOOD:
      return 'bg-green-500 hover:bg-green-600';
    case SRSDifficulty.EASY:
      return 'bg-blue-500 hover:bg-blue-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
}
