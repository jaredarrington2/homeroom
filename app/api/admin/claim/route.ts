// app/api/admin/claim/route.ts — adopt an orphan device blob into the signed-in admin's
// account. This is the recovery path for work done before accounts existed: /admin lists the
// pre-account progress:{uuid} blobs, and one click merges the chosen one in.
//
// This is the ONLY path that moves an anonymous blob onto an account. Sign-in deliberately
// does not do it automatically: a stale homeroom_user_id in a shared browser would be
// inherited by whoever signed up next. Here it takes an admin, on a named record, on purpose.
// The copy MERGES, so nothing already on the admin's account is dropped (see mergeProgress).
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/kvServer';
import { sessionAccount } from '@/lib/authUser';
import { isAdminEmail } from '@/lib/accounts';
import { mergeProgress } from '@/lib/progressStats';
import { emptyProgress, type Progress } from '@/lib/types';

export const dynamic = 'force-dynamic';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  const account = await sessionAccount();
  if (!account) return NextResponse.json({ ok: false, error: 'not signed in' }, { status: 401 });
  if (!isAdminEmail(account.email)) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });

  const body = await req.json().catch(() => null);
  const anonId = typeof body?.anonId === 'string' ? body.anonId : '';
  if (!UUID_RE.test(anonId)) return NextResponse.json({ ok: false, error: 'bad id' }, { status: 400 });

  try {
    const anon = await kv.get<Progress>(`progress:${anonId}`);
    if (!anon) return NextResponse.json({ ok: false, error: 'no such blob' }, { status: 404 });

    const key = `progress:u:${account.id}`;
    const mine = (await kv.get<Progress>(key)) ?? emptyProgress();
    const merged = mergeProgress(mine, anon);
    await kv.set(key, merged);
    return NextResponse.json({ ok: true, sectionsRead: merged.completedUnits.length });
  } catch {
    return NextResponse.json({ ok: false, error: 'kv' }, { status: 500 });
  }
}
