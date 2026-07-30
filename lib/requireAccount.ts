// lib/requireAccount.ts — the real gate. Server components call this at the top of a route
// group's layout; middleware.ts only does the cheap cookie-presence redirect ahead of it.
//
// With AUTH_SECRET unset (local dev without accounts configured) it lets everything through,
// so the app stays runnable before the env vars exist.
import { redirect } from 'next/navigation';
import { sessionAccount } from './authUser';
import { isAdminEmail } from './accounts';

export async function requireAccount(callbackUrl = '/learn') {
  if (!process.env.AUTH_SECRET) return null;
  const account = await sessionAccount();
  if (!account) redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  return account;
}

export async function requireAdmin() {
  const account = await requireAccount('/admin');
  // Auth unconfigured: /admin is meaningless without accounts, so send them home.
  if (!account) redirect('/');
  if (!isAdminEmail(account.email)) redirect('/learn');
  return account;
}
