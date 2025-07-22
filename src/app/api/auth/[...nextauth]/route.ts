import { NextResponse } from 'next/server'

// Temporary placeholder - NextAuth configuration needs to be updated for Next.js 15 compatibility
export async function GET() {
  return NextResponse.json({ error: 'Authentication not configured' }, { status: 500 })
}

export async function POST() {
  return NextResponse.json({ error: 'Authentication not configured' }, { status: 500 })
}
