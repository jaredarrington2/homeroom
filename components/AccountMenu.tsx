'use client';
// components/AccountMenu.tsx — the top-right account control. Reads /api/me once and renders:
//   auth not configured  → the plain Settings link (byte-identical to before accounts landed)
//   configured, signed out → "Sign in"
//   signed in            → avatar + a small menu (Accounts · Settings · Sign out)
// Desktop only, mirroring where the Settings link lived.
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

type Me = {
  authEnabled: boolean;
  signedIn: boolean;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isAdmin?: boolean;
};

const ITEM = 'block w-full text-left px-3 py-2 text-sm text-ink hover:bg-royal-faint';

export default function AccountMenu() {
  const [me, setMe] = useState<Me | null>(null);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/me')
      .then((r) => (r.ok ? r.json() : null))
      .then(setMe)
      .catch(() => setMe({ authEnabled: false, signedIn: false }));
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const linkCls = 'hidden md:block text-sm text-ink-muted hover:text-ink transition-colors';

  // Unknown yet, or auth not set up: keep today's Settings link.
  if (!me || !me.authEnabled) {
    return <Link href="/settings" className={linkCls}>Settings</Link>;
  }
  if (!me.signedIn) {
    return <Link href="/login" className={linkCls}>Sign in</Link>;
  }

  const initial = (me.name ?? me.email ?? '?').trim().charAt(0).toUpperCase() || '?';
  return (
    <div className="relative hidden md:block" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} aria-label="Account menu" className="flex items-center">
        {me.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={me.image} alt="" width={28} height={28} className="rounded-full" referrerPolicy="no-referrer" />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-royal-faint text-xs font-medium text-royal">
            {initial}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 border border-hairline bg-paper py-1 shadow-sm z-50">
          {me.email && (
            <div className="px-3 pb-2 pt-1 text-xs text-ink-faint truncate border-b border-hairline mb-1">
              {me.email}
            </div>
          )}
          {me.isAdmin && (
            <Link href="/admin" onClick={() => setOpen(false)} className={ITEM}>
              Accounts
            </Link>
          )}
          <Link href="/settings" onClick={() => setOpen(false)} className={ITEM}>
            Settings
          </Link>
          <button onClick={() => signOut({ callbackUrl: '/' })} className={ITEM}>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
