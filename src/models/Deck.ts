import mongoose, { Schema, Document } from 'mongoose';

export interface DeckDocument extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const DeckSchema = new Schema<DeckDocument>({
  name: {
    type: String,
    required: [true, 'Deck name is required'],
    trim: true,
    maxlength: [100, 'Deck name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    default: ''
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for flashcard count in this deck
DeckSchema.virtual('flashcardCount', {
  ref: 'Flashcard',
  localField: '_id',
  foreignField: 'deckId',
  count: true
});

export default mongoose.models.Deck || mongoose.model<DeckDocument>('Deck', DeckSchema);
