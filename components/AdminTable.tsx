'use client';
// components/AdminTable.tsx — the /admin body. Every account, how far each has got, and the
// pre-account device blobs that are still sitting unclaimed in KV.
//
// Design follows the app's canon: hairline rules, no fills, mono eyebrows, Fraunces heading.
import { useCallback, useEffect, useState } from 'react';

type UserRow = {
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
type OrphanRow = { anonId: string; sectionsRead: number; updatedAt: number | null };

const TOTAL_UNITS = 17;

function when(ts: number | null | undefined): string {
  if (!ts) return '—';
  const days = Math.floor((Date.now() - ts) / 86_400_000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const TH = 'text-left font-mono text-[10px] uppercase tracking-eyebrow text-ink-faint font-normal py-2';
const TD = 'py-3 text-sm text-ink align-top';

export default function AdminTable({ adminEmail }: { adminEmail: string }) {
  const [users, setUsers] = useState<UserRow[] | null>(null);
  const [orphans, setOrphans] = useState<OrphanRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch('/api/admin/users')
      .then(async (r) => {
        if (!r.ok) throw new Error(r.status === 403 ? 'Not an admin account.' : 'Could not load accounts.');
        return r.json();
      })
      .then((d) => {
        setUsers(d.users ?? []);
        setOrphans(d.orphans ?? []);
      })
      .catch((e) => setError(e.message));
  }, []);

  useEffect(load, [load]);

  async function claim(anonId: string) {
    setClaiming(anonId);
    setNote(null);
    try {
      const res = await fetch('/api/admin/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ anonId }),
      });
      const data = await res.json().catch(() => ({}));
      setNote(
        res.ok
          ? `Merged into ${adminEmail} — ${data.sectionsRead} sections read. Reload the reader to see it.`
          : (data.error ?? 'Could not merge that record.'),
      );
      if (res.ok) load();
    } finally {
      setClaiming(null);
    }
  }

  if (error) {
    return <p className="text-sm text-incorrect py-16 text-center">{error}</p>;
  }
  if (!users) {
    return <p className="text-sm text-ink-muted py-16 text-center">Loading accounts…</p>;
  }

  const active = users.filter((u) => u.sectionsRead > 0 || u.answersRecorded > 0).length;

  return (
    <div className="max-w-canvas mx-auto">
      <div className="font-mono text-[11px] uppercase tracking-eyebrow text-royal mb-3">Admin</div>
      <h1 className="font-display text-4xl font-semibold tracking-display text-ink leading-[1.05] mb-10">
        Accounts
      </h1>

      <div className="flex gap-12 border-y border-hairline py-5 mb-10">
        {[
          ['accounts', users.length],
          ['have started', active],
          ['unclaimed devices', orphans.length],
        ].map(([label, value]) => (
          <div key={label as string}>
            <div className="font-display text-3xl font-semibold text-ink leading-none">{value as number}</div>
            <div className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-faint mt-2">
              {label as string}
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 ? (
        <p className="text-sm text-ink-muted">
          No accounts yet. The first person to sign up shows here.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[46rem]">
            <thead>
              <tr className="border-b border-hairline">
                <th className={TH}>Person</th>
                <th className={TH}>Sign-in</th>
                <th className={TH}>Sections read</th>
                <th className={TH}>Answers</th>
                <th className={TH}>Cards known</th>
                <th className={TH}>Joined</th>
                <th className={TH}>Last active</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-hairline">
                  <td className={TD}>
                    <div className="font-medium">
                      {u.name}
                      {u.isAdmin && (
                        <span className="ml-2 font-mono text-[9px] uppercase tracking-eyebrow text-royal">
                          admin
                        </span>
                      )}
                    </div>
                    <div className="text-ink-muted text-xs mt-0.5">{u.email}</div>
                  </td>
                  <td className={`${TD} text-ink-muted`}>{u.provider === 'google' ? 'Google' : 'Password'}</td>
                  <td className={TD}>
                    {u.sectionsRead}
                    <span className="text-ink-faint"> / {TOTAL_UNITS}</span>
                  </td>
                  <td className={TD}>{u.answersRecorded}</td>
                  <td className={TD}>{u.cardsKnown}</td>
                  <td className={`${TD} text-ink-muted`}>{when(u.createdAt)}</td>
                  <td className={`${TD} text-ink-muted`}>{when(u.lastActivityAt ?? u.lastSeenAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {orphans.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold tracking-display text-ink mb-2">
            Progress from before accounts
          </h2>
          <p className="text-sm text-ink-muted max-w-reading mb-6 leading-relaxed">
            Work saved against a browser rather than an account. Claiming one merges it into{' '}
            {adminEmail} — nothing already on that account is overwritten.
          </p>
          {note && <p className="text-sm text-royal mb-4">{note}</p>}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[34rem]">
              <thead>
                <tr className="border-b border-hairline">
                  <th className={TH}>Device record</th>
                  <th className={TH}>Sections read</th>
                  <th className={TH}>Last saved</th>
                  <th className={TH} />
                </tr>
              </thead>
              <tbody>
                {orphans.map((o) => (
                  <tr key={o.anonId} className="border-b border-hairline">
                    <td className={`${TD} font-mono text-xs text-ink-muted`}>{o.anonId.slice(0, 8)}…</td>
                    <td className={TD}>{o.sectionsRead}</td>
                    <td className={`${TD} text-ink-muted`}>{when(o.updatedAt)}</td>
                    <td className={`${TD} text-right`}>
                      <button
                        onClick={() => claim(o.anonId)}
                        disabled={claiming === o.anonId}
                        className="text-sm text-royal hover:underline disabled:opacity-50"
                      >
                        {claiming === o.anonId ? 'Merging…' : 'Claim'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
