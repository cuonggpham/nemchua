import { ObjectId } from 'mongodb';

export interface ReviewData {
  nextReview: Date;
  easeFactor: number;
  interval: number;
  repetitions: number;
  lastReviewed: Date | null;
}

export interface Flashcard {
  _id?: ObjectId;
  front: string;
  back: string;
  reading: string;
  example: string;
  tags: string[];
  deckId: ObjectId;
  review: ReviewData;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deck {
  _id?: ObjectId;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// SRS difficulty levels for review
export enum SRSDifficulty {
  AGAIN = 'again',     // Không nhớ - cần học lại
  HARD = 'hard',       // Khó - nhớ với khó khăn
  GOOD = 'good',       // Tốt - nhớ được
  EASY = 'easy'        // Dễ - nhớ rất tốt
}

// Study session statistics
export interface StudySession {
  deckId: ObjectId;
  totalCards: number;
  reviewedCards: number;
  newCards: number;
  againCards: number;
  hardCards: number;
  goodCards: number;
  easyCards: number;
  startTime: Date;
  endTime?: Date;
}
