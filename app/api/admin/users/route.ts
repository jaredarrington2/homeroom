// app/api/admin/users/route.ts — every account plus its progress, for the admin dashboard.
// Admin is an ADMIN_EMAILS allowlist check on the verified session; a non-admin session gets
// a 403 whether or not it can reach the page.
//
// Also surfaces ORPHAN blobs: progress:{uuid} keys with no account behind them — work done
// on a device before accounts existed. The dashboard can hand one to the signed-in admin,
// which is how pre-account progress gets recovered.
import { NextResponse } from 'next/server';
import { kv } from '@/lib/kvServer';
import { sessionAccount } from '@/lib/authUser';
import { isAdminEmail, listAccounts } from '@/lib/accounts';
import { courseStats, hasWork } from '@/lib/progressStats';
import type { Progress } from '@/lib/types';

export const dynamic = 'force-dynamic';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type AdminUserRow = {
  id: string;
  email: string;
  name: string;
  provider: 'password' | 'google';
  createdAt: number;
  lastSeenAt: number;
  isAdmin: boolean;
  sectionsRead: number;
  cardsKnown: number;
  answersRecorded: number;
  lastActivityAt: number | null;
};

export type OrphanRow = { anonId: string; sectionsRead: number; updatedAt: number | null };

function answerCount(p: Progress): number {
  const tally = (rec: Record<string, Record<string, unknown>> | undefined) =>
    Object.values(rec ?? {}).reduce((n, unit) => n + Object.keys(unit ?? {}).length, 0);
  return tally(p.cloze) + tally(p.synth) + tally(p.mcq);
}

export async function GET() {
  const account = await sessionAccount();
  if (!account) return NextResponse.json({ error: 'not signed in' }, { status: 401 });
  if (!isAdminEmail(account.email)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  const accounts = await listAccounts();

  const users: AdminUserRow[] = await Promise.all(
    accounts.map(async (a) => {
      let p: Progress | null = null;
      try {
        p = await kv.get<Progress>(`progress:u:${a.id}`);
      } catch {
        /* a missing blob just reads as zeroes */
      }
      const stats = p ? courseStats(p) : { sectionsRead: 0, sectionsPassed: 0, cardsKnown: 0 };
      return {
        id: a.id,
        email: a.email,
        name: a.name,
        provider: a.provider,
        createdAt: a.createdAt,
        lastSeenAt: a.lastSeenAt,
        isAdmin: isAdminEmail(a.email),
        sectionsRead: stats.sectionsRead,
        cardsKnown: stats.cardsKnown,
        answersRecorded: p ? answerCount(p) : 0,
        lastActivityAt: p?.updatedAt ?? null,
      };
    }),
  );

  // Orphans: pre-account device blobs. Bounded scan — this store holds tens of keys, not millions.
  const orphans: OrphanRow[] = [];
  try {
    const keys = await kv.keys('progress:*');
    const anonIds = keys
      .map((k) => k.slice('progress:'.length))
      .filter((id) => UUID_RE.test(id));
    for (const anonId of anonIds.slice(0, 200)) {
      const p = await kv.get<Progress>(`progress:${anonId}`);
      if (hasWork(p)) {
        orphans.push({
          anonId,
          sectionsRead: p?.completedUnits?.length ?? 0,
          updatedAt: p?.updatedAt ?? null,
        });
      }
    }
    orphans.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
  } catch {
    /* KV without KEYS support — the accounts table is still useful on its own */
  }

  // Filter out orphans that have been claimed or dismissed by the current admin
  const { getAccount } = await import('@/lib/accounts');
  const adminAccount = await getAccount(account.id);
  const claimed = adminAccount?.claimedOrphans ?? [];
  const dismissed = adminAccount?.dismissedOrphans ?? [];
  const visibleOrphans = orphans.filter((o) => !claimed.includes(o.anonId) && !dismissed.includes(o.anonId));

  return NextResponse.json(
    { users, orphans: visibleOrphans, adminEmail: account.email },
    { headers: { 'Cache-Control': 'private, no-store' } },
  );
}
