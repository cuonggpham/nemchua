import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Flashcard from '@/models/Flashcard';
import mongoose from 'mongoose';

interface Params {
  id: string;
}

// GET /api/flashcards/[id] - Get a specific flashcard
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid flashcard ID' },
        { status: 400 }
      );
    }
    
    const flashcard = await Flashcard.findById(id).populate('deckId', 'name');
    
    if (!flashcard) {
      return NextResponse.json(
        { success: false, error: 'Flashcard not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: flashcard });
  } catch (error) {
    console.error('Error fetching flashcard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch flashcard' },
      { status: 500 }
    );
  }
}

// PUT /api/flashcards/[id] - Update a flashcard
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    const body = await request.json();
    const { front, back, reading, example, tags } = body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid flashcard ID' },
        { status: 400 }
      );
    }
    
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
    
    const flashcard = await Flashcard.findByIdAndUpdate(
      id,
      {
        front: front.trim(),
        back: back.trim(),
        reading: reading?.trim() || '',
        example: example?.trim() || '',
        tags: Array.isArray(tags) ? tags.map((tag: string) => tag.trim()).filter(Boolean) : []
      },
      { new: true, runValidators: true }
    ).populate('deckId', 'name');
    
    if (!flashcard) {
      return NextResponse.json(
        { success: false, error: 'Flashcard not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: flashcard });
  } catch (error: unknown) {
    console.error('Error updating flashcard:', error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update flashcard' },
      { status: 500 }
    );
  }
}

// DELETE /api/flashcards/[id] - Delete a flashcard
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid flashcard ID' },
        { status: 400 }
      );
    }
    
    const flashcard = await Flashcard.findByIdAndDelete(id);
    
    if (!flashcard) {
      return NextResponse.json(
        { success: false, error: 'Flashcard not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Flashcard deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete flashcard' },
      { status: 500 }
    );
  }
}
