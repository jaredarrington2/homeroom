'use client';
// components/MobileAccountLinks.tsx — the account rows in TopBar's mobile dropdown.
// AccountMenu is desktop-only (it's an avatar popover); without this, a phone has no way to
// sign out. Same /api/me shape, same three states.
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

type Me = { authEnabled: boolean; signedIn: boolean; email?: string | null; isAdmin?: boolean };

const ROW = 'block w-full text-left py-2 text-sm text-ink-muted hover:text-ink transition-colors';

export default function MobileAccountLinks({ onNavigate }: { onNavigate: () => void }) {
  const [me, setMe] = useState<Me | null>(null);

  useEffect(() => {
    fetch('/api/me')
      .then((r) => (r.ok ? r.json() : null))
      .then(setMe)
      .catch(() => setMe({ authEnabled: false, signedIn: false }));
  }, []);

  if (!me || !me.authEnabled) {
    return <Link href="/settings" onClick={onNavigate} className={ROW}>Settings</Link>;
  }
  if (!me.signedIn) {
    return <Link href="/login" onClick={onNavigate} className={ROW}>Sign in</Link>;
  }
  return (
    <>
      {me.isAdmin && <Link href="/admin" onClick={onNavigate} className={ROW}>Accounts</Link>}
      <Link href="/settings" onClick={onNavigate} className={ROW}>Settings</Link>
      <button onClick={() => signOut({ callbackUrl: '/' })} className={ROW}>Sign out</button>
    </>
  );
}
