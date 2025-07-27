import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Flashcard from '@/models/Flashcard';
import { calculateSRS } from '@/utils/srs';
import { SRSDifficulty } from '@/types';
import mongoose from 'mongoose';

interface Params {
  id: string;
}

// POST /api/flashcards/[id]/review - Review a flashcard and update SRS data
export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    const body = await request.json();
    const { difficulty } = body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid flashcard ID' },
        { status: 400 }
      );
    }
    
    // Validate difficulty
    if (!Object.values(SRSDifficulty).includes(difficulty)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid difficulty. Must be one of: again, hard, good, easy' 
        },
        { status: 400 }
      );
    }
    
    // Find the flashcard
    const flashcard = await Flashcard.findById(id);
    
    if (!flashcard) {
      return NextResponse.json(
        { success: false, error: 'Flashcard not found' },
        { status: 404 }
      );
    }
    
    // Calculate new SRS values
    const srsResult = calculateSRS(
      difficulty,
      flashcard.review.easeFactor,
      flashcard.review.interval,
      flashcard.review.repetitions
    );
    
    // Update the flashcard with new review data
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      id,
      {
        'review.easeFactor': srsResult.easeFactor,
        'review.interval': srsResult.interval,
        'review.repetitions': srsResult.repetitions,
        'review.nextReview': srsResult.nextReview,
        'review.lastReviewed': new Date()
      },
      { new: true, runValidators: true }
    ).populate('deckId', 'name');
    
    return NextResponse.json({ 
      success: true, 
      data: updatedFlashcard,
      srsInfo: {
        difficulty,
        previousValues: {
          easeFactor: flashcard.review.easeFactor,
          interval: flashcard.review.interval,
          repetitions: flashcard.review.repetitions
        },
        newValues: srsResult
      }
    });
  } catch (error: unknown) {
    console.error('Error reviewing flashcard:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to review flashcard' },
      { status: 500 }
    );
  }
}
