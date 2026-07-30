// app/api/me/route.ts — who is this request. The client account control reads it once.
//   { authEnabled: false }                        → sign-in isn't configured yet (show Settings)
//   { authEnabled: true, signedIn: false }        → configured, not signed in (show "Sign in")
//   { authEnabled: true, signedIn: true, ... }    → signed in (show avatar + menu)
// Also reports whether Google is wired up, so /login can hide the button until it is, and
// whether this account is on the ADMIN_EMAILS allowlist, so the menu can show the dashboard.
import { NextResponse } from 'next/server';
import { sessionAccount } from '@/lib/authUser';
import { isAdminEmail, touchAccount } from '@/lib/accounts';
import { googleEnabled } from '@/auth';

export const dynamic = 'force-dynamic';

const PRIVATE = { 'Cache-Control': 'private, no-store', Vary: 'Cookie' };
const json = (body: unknown) => NextResponse.json(body, { headers: PRIVATE });

export async function GET() {
  if (!process.env.AUTH_SECRET) return json({ authEnabled: false, signedIn: false });
  const account = await sessionAccount();
  if (!account) return json({ authEnabled: true, googleEnabled, signedIn: false });

  void touchAccount(account.id);

  return json({
    authEnabled: true,
    googleEnabled,
    signedIn: true,
    userId: `u:${account.id}`,
    name: account.name,
    email: account.email,
    isAdmin: isAdminEmail(account.email),
    image: account.image,
  });
}
