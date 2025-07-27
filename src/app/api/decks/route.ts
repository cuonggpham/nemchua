import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Deck from '@/models/Deck';

// GET /api/decks - Get all decks
export async function GET() {
  try {
    await dbConnect();
    
    const decks = await Deck.find({})
      .populate('flashcardCount')
      .sort({ updatedAt: -1 });
    
    return NextResponse.json({ success: true, data: decks });
  } catch (error) {
    console.error('Error fetching decks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch decks' },
      { status: 500 }
    );
  }
}

// POST /api/decks - Create a new deck
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { name, description } = body;
    
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Deck name is required' },
        { status: 400 }
      );
    }
    
    const deck = await Deck.create({
      name: name.trim(),
      description: description?.trim() || ''
    });
    
    return NextResponse.json(
      { success: true, data: deck },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error creating deck:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create deck' },
      { status: 500 }
    );
  }
}
