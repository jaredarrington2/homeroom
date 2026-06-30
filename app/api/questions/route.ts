import { NextResponse } from 'next/server';
import { getQuestions } from '@/lib/content';

export async function GET() {
  return NextResponse.json(getQuestions());
}
