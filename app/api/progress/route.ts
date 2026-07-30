// app/api/progress/route.ts — read/write the whole Progress blob for the current user.
//
// CACHING: this response is per-user and must never be stored by a shared cache. Next was
// serving it as `cache-control: public, max-age=0, must-revalidate` with no Vary on
// X-User-Id — publicly cacheable and keyed on URL alone, so any intermediary that ignores
// must-revalidate could hand one learner's progress to the next visitor. force-dynamic plus
// an explicit private/no-store header closes that.
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/kvServer';
import { emptyProgress, type Progress } from '@/lib/types';
import { resolveUserId } from '@/lib/authUser';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PRIVATE = {
  'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
  Vary: 'X-User-Id, Cookie',
};

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: PRIVATE });

export async function GET(req: NextRequest) {
  const userId = await resolveUserId(req.headers.get('X-User-Id'));
  if (!userId) return json(emptyProgress());
  try {
    const progress = await kv.get<Progress>(`progress:${userId}`);
    return json(progress ?? emptyProgress());
  } catch {
    return json(emptyProgress());
  }
}

export async function POST(req: NextRequest) {
  const userId = await resolveUserId(req.headers.get('X-User-Id'));
  if (!userId) return json({ ok: false }, 400);
  const progress = await req.json();
  try {
    await kv.set(`progress:${userId}`, progress);
    return json({ ok: true });
  } catch {
    return json({ ok: false }, 500);
  }
}
