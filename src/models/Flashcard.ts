import mongoose, { Schema, Document } from 'mongoose';

export interface ReviewDataDocument {
  nextReview: Date;
  easeFactor: number;
  interval: number;
  repetitions: number;
  lastReviewed: Date | null;
}

export interface FlashcardDocument extends Document {
  front: string;
  back: string;
  reading: string;
  example: string;
  tags: string[];
  deckId: mongoose.Types.ObjectId;
  review: ReviewDataDocument;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewDataSchema = new Schema<ReviewDataDocument>({
  nextReview: {
    type: Date,
    default: () => new Date()
  },
  easeFactor: {
    type: Number,
    default: 2.5,
    min: 1.3,
    max: 4.0
  },
  interval: {
    type: Number,
    default: 1,
    min: 1
  },
  repetitions: {
    type: Number,
    default: 0,
    min: 0
  },
  lastReviewed: {
    type: Date,
    default: null
  }
}, { _id: false });

const FlashcardSchema = new Schema<FlashcardDocument>({
  front: {
    type: String,
    required: [true, 'Front content is required'],
    trim: true,
    maxlength: [200, 'Front content cannot exceed 200 characters']
  },
  back: {
    type: String,
    required: [true, 'Back content is required'],
    trim: true,
    maxlength: [500, 'Back content cannot exceed 500 characters']
  },
  reading: {
    type: String,
    trim: true,
    maxlength: [100, 'Reading cannot exceed 100 characters'],
    default: ''
  },
  example: {
    type: String,
    trim: true,
    maxlength: [500, 'Example cannot exceed 500 characters'],
    default: ''
  },
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: function(tags: string[]) {
        return tags.length <= 10;
      },
      message: 'Cannot have more than 10 tags'
    }
  },
  deckId: {
    type: Schema.Types.ObjectId,
    ref: 'Deck',
    required: [true, 'Deck ID is required']
  },
  review: {
    type: ReviewDataSchema,
    default: () => ({})
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for efficient queries
FlashcardSchema.index({ deckId: 1 });
FlashcardSchema.index({ 'review.nextReview': 1 });
FlashcardSchema.index({ tags: 1 });

export default mongoose.models.Flashcard || mongoose.model<FlashcardDocument>('Flashcard', FlashcardSchema);
