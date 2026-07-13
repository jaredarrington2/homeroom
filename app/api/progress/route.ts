import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/kvServer';
import { emptyProgress, type Progress } from '@/lib/types';
import { resolveUserId } from '@/lib/authUser';

export async function GET(req: NextRequest) {
  const userId = await resolveUserId(req.headers.get('X-User-Id'));
  if (!userId) return NextResponse.json(emptyProgress());
  try {
    const progress = await kv.get<Progress>(`progress:${userId}`);
    return NextResponse.json(progress ?? emptyProgress());
  } catch {
    return NextResponse.json(emptyProgress());
  }
}

export async function POST(req: NextRequest) {
  const userId = await resolveUserId(req.headers.get('X-User-Id'));
  if (!userId) return NextResponse.json({ ok: false }, { status: 400 });
  const progress = await req.json();
  try {
    await kv.set(`progress:${userId}`, progress);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
