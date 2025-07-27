import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Flashcard from '@/models/Flashcard';
import Deck from '@/models/Deck';
import mongoose from 'mongoose';

// GET /api/flashcards - Get flashcards with optional filters
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const deckId = searchParams.get('deckId');
    const due = searchParams.get('due') === 'true';
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');
    
    const query: Record<string, unknown> = {};
    
    // Filter by deck
    if (deckId) {
      if (!mongoose.Types.ObjectId.isValid(deckId)) {
        return NextResponse.json(
          { success: false, error: 'Invalid deck ID' },
          { status: 400 }
        );
      }
      query.deckId = deckId;
    }
    
    // Filter by due cards
    if (due) {
      query['review.nextReview'] = { $lte: new Date() };
    }
    
    const flashcards = await Flashcard.find(query)
      .populate('deckId', 'name')
      .sort({ 'review.nextReview': 1, updatedAt: -1 })
      .limit(limit)
      .skip(skip);
    
    const total = await Flashcard.countDocuments(query);
    
    return NextResponse.json({ 
      success: true, 
      data: flashcards,
      pagination: {
        total,
        limit,
        skip,
        hasMore: skip + flashcards.length < total
      }
    });
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch flashcards' },
      { status: 500 }
    );
  }
}

// POST /api/flashcards - Create a new flashcard
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { front, back, reading, example, tags, deckId } = body;
    
    // Validate required fields
    if (!front || front.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Front content is required' },
        { status: 400 }
      );
    }
    
    if (!back || back.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Back content is required' },
        { status: 400 }
      );
    }
    
    if (!deckId || !mongoose.Types.ObjectId.isValid(deckId)) {
      return NextResponse.json(
        { success: false, error: 'Valid deck ID is required' },
        { status: 400 }
      );
    }
    
    // Check if deck exists
    const deck = await Deck.findById(deckId);
    if (!deck) {
      return NextResponse.json(
        { success: false, error: 'Deck not found' },
        { status: 404 }
      );
    }
    
    // Create flashcard
    const flashcard = await Flashcard.create({
      front: front.trim(),
      back: back.trim(),
      reading: reading?.trim() || '',
      example: example?.trim() || '',
      tags: Array.isArray(tags) ? tags.map((tag: string) => tag.trim()).filter(Boolean) : [],
      deckId: new mongoose.Types.ObjectId(deckId)
    });
    
    // Populate deck info
    await flashcard.populate('deckId', 'name');
    
    return NextResponse.json(
      { success: true, data: flashcard },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating flashcard:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create flashcard' },
      { status: 500 }
    );
  }
}
