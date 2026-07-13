'use client';
// components/AccountMenu.tsx — the top-right account control. Reads /api/me once and renders:
//   auth not configured  → the plain Settings link (byte-identical to before Slice B)
//   configured, signed out → "Sign in"
//   signed in            → avatar + a small menu (Settings · Sign out)
// Desktop only, mirroring where the Settings link lived.
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Me = { authEnabled: boolean; signedIn: boolean; name?: string | null; image?: string | null };

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
    return <a href="/api/auth/signin" className={linkCls}>Sign in</a>;
  }

  const initial = (me.name ?? '?').trim().charAt(0).toUpperCase() || '?';
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
        <div className="absolute right-0 mt-2 w-40 border border-hairline bg-paper py-1 shadow-sm z-50">
          <Link href="/settings" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-ink hover:bg-royal-faint">
            Settings
          </Link>
          <a href="/api/auth/signout" className="block px-3 py-2 text-sm text-ink hover:bg-royal-faint">
            Sign out
          </a>
        </div>
      )}
    </div>
  );
}
