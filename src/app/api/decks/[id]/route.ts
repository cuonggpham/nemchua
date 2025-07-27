import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Deck from '@/models/Deck';
import Flashcard from '@/models/Flashcard';
import mongoose from 'mongoose';

interface Params {
  id: string;
}

// GET /api/decks/[id] - Get a specific deck
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid deck ID' },
        { status: 400 }
      );
    }
    
    const deck = await Deck.findById(id).populate('flashcardCount');
    
    if (!deck) {
      return NextResponse.json(
        { success: false, error: 'Deck not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: deck });
  } catch (error) {
    console.error('Error fetching deck:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch deck' },
      { status: 500 }
    );
  }
}

// PUT /api/decks/[id] - Update a deck
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    const body = await request.json();
    const { name, description } = body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid deck ID' },
        { status: 400 }
      );
    }
    
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Deck name is required' },
        { status: 400 }
      );
    }
    
    const deck = await Deck.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        description: description?.trim() || ''
      },
      { new: true, runValidators: true }
    );
    
    if (!deck) {
      return NextResponse.json(
        { success: false, error: 'Deck not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: deck });
  } catch (error: unknown) {
    console.error('Error updating deck:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update deck' },
      { status: 500 }
    );
  }
}

// DELETE /api/decks/[id] - Delete a deck and its flashcards
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid deck ID' },
        { status: 400 }
      );
    }
    
    // Start a transaction to ensure data consistency
    const session = await mongoose.startSession();
    
    try {
      await session.withTransaction(async () => {
        // Delete all flashcards in this deck
        await Flashcard.deleteMany({ deckId: id }).session(session);
        
        // Delete the deck
        const deletedDeck = await Deck.findByIdAndDelete(id).session(session);
        
        if (!deletedDeck) {
          throw new Error('Deck not found');
        }
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Deck and all its flashcards deleted successfully' 
      });
    } finally {
      await session.endSession();
    }
  } catch (error: unknown) {
    console.error('Error deleting deck:', error);
    
    if (error instanceof Error && error.message === 'Deck not found') {
      return NextResponse.json(
        { success: false, error: 'Deck not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to delete deck' },
      { status: 500 }
    );
  }
}
