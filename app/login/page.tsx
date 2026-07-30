'use client';
// app/login/page.tsx — the branded sign-in / sign-up page (replaces Auth.js's default screen
// via pages.signIn in auth.ts). On-brand: the wordmark, a Fraunces headline on the cream
// loose-paper surface the reader uses, email + password, and Google when it's configured.
//
// One page, two modes. The toggle keeps the typed email so switching after "no account for
// that email" doesn't cost anything.
import { signIn } from 'next-auth/react';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden className="shrink-0">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.41 5.41 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.47.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

const FIELD =
  'w-full border border-hairline bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint ' +
  'focus:border-royal focus:outline-none transition-colors';

function LoginInner() {
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '/learn';

  const [mode, setMode] = useState<'signin' | 'signup'>(
    params.get('mode') === 'signup' ? 'signup' : 'signin',
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(
    params.get('error') ? 'That didn’t work. Give it another try.' : null,
  );
  const [busy, setBusy] = useState(false);
  const [googleOn, setGoogleOn] = useState(false);

  useEffect(() => {
    fetch('/api/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => setGoogleOn(Boolean(me?.googleEnabled)))
      .catch(() => setGoogleOn(false));
  }, []);

  const signup = mode === 'signup';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (signup) {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data?.error ?? 'Could not create the account.');
          return;
        }
      }

      const res = await signIn('credentials', { email, password, redirect: false });
      if (res?.error) {
        setError(
          signup
            ? 'The account was created but sign-in failed. Try signing in.'
            : 'No account matches that email and password.',
        );
        return;
      }

      // NOTE: signing in deliberately does NOT adopt this device's anonymous progress.
      // A stale homeroom_user_id in a shared browser would otherwise be inherited by
      // whoever signs up next — the exact cross-user leak accounts exist to stop. Study
      // routes are gated now, so no new anonymous progress accrues; the pre-account blobs
      // that already exist are recovered deliberately from /admin instead.
      //
      // Full document load, NOT router.push: ProgressProvider is mounted app-wide and has
      // already loaded a blob for whoever was here before (a signed-out visitor loads the
      // device's anonymous one). A client-side navigation keeps that stale state, and since
      // useProgress debounce-saves the WHOLE blob, the first interaction would write the
      // previous identity's progress onto this account. Remounting the provider is the fix.
      window.location.assign(callbackUrl);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-[72vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="border border-hairline bg-loose-paper px-8 py-12 sm:px-12">
          <div className="font-mono text-[11px] uppercase tracking-eyebrow text-royal mb-8 text-center">
            Homeroom
          </div>

          <h1 className="font-display text-4xl font-semibold tracking-display text-ink leading-[1.05] mb-4 text-center">
            {signup ? 'Start the course' : 'Welcome back'}
          </h1>
          <p className="text-sm text-ink-muted leading-relaxed mb-9 max-w-xs mx-auto text-center">
            {signup
              ? 'Your reading, cards, and scores stay with your account — laptop to phone.'
              : 'Pick up where you left off.'}
          </p>

          {error && <p className="text-sm text-incorrect mb-5 text-center">{error}</p>}

          <form onSubmit={onSubmit} className="space-y-3">
            {signup && (
              <input
                className={FIELD}
                type="text"
                autoComplete="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              className={FIELD}
              type="email"
              required
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={FIELD}
              type="password"
              required
              minLength={signup ? 8 : undefined}
              autoComplete={signup ? 'new-password' : 'current-password'}
              placeholder={signup ? 'Password — at least 8 characters' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-royal py-3 text-sm font-medium text-paper hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {busy ? 'One moment…' : signup ? 'Create account' : 'Sign in'}
            </button>
          </form>

          {googleOn && (
            <>
              <div className="flex items-center gap-3 my-6">
                <span className="h-px flex-1 bg-hairline" />
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-ink-faint">or</span>
                <span className="h-px flex-1 bg-hairline" />
              </div>
              <button
                onClick={() => signIn('google', { callbackUrl })}
                className="w-full flex items-center justify-center gap-3 border border-hairline bg-paper py-3 text-sm font-medium text-ink hover:border-royal hover:bg-royal-faint transition-colors"
              >
                <GoogleG />
                Continue with Google
              </button>
            </>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => {
              setMode(signup ? 'signin' : 'signup');
              setError(null);
            }}
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            {signup ? 'Already have an account? Sign in' : 'New here? Create an account →'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
