import { NextResponse } from 'next/server';
import { getFlashcards } from '@/lib/content';

export async function GET() {
  return NextResponse.json(getFlashcards());
}
