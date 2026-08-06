// lib/accounts.ts — server-only account records in KV. The one place that knows how a
// Homeroom account is stored, so auth.ts, /api/signup and the admin dashboard agree.
//
// Key scheme (all under the same KV store as progress:*):
//   account:{accountId}        -> Account            the record itself
//   account:email:{email}      -> accountId          lookup for password sign-in
//   accounts                   -> Set<accountId>     the index the admin dashboard reads
//
// accountId is the value that ends up in the Auth.js JWT `sub`, so the progress blob for a
// signed-in user lives at `progress:u:{accountId}` (see lib/authUser.ts — the `u:` prefix
// was set by the Google scaffolding and is kept).
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import { kv } from './kvServer';

export type Account = {
  id: string;
  email: string;
  name: string;
  /** How they got in. Password accounts carry a hash; Google accounts don't. */
  provider: 'password' | 'google';
  passwordHash?: string;
  image?: string | null;
  createdAt: number;
  lastSeenAt: number;
  claimedOrphans?: string[]; // v6.5 — orphan device blobs merged into this account
  dismissedOrphans?: string[]; // v6.5 — orphan blobs the user chose not to claim
};

/** Public shape — never leaves the server with the hash attached. */
export type AccountSummary = Omit<Account, 'passwordHash'>;

const BCRYPT_ROUNDS = 10;
const INDEX_KEY = 'accounts';

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

/** Deliberately permissive — this gates typos, not deliverability. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

/** 8 chars is the floor. No composition rules — length is what matters. */
export function passwordProblem(password: string): string | null {
  if (password.length < 8) return 'Use at least 8 characters.';
  if (password.length > 200) return 'That password is too long.';
  return null;
}

export const strip = ({ passwordHash: _hash, ...rest }: Account): AccountSummary => rest;

export async function getAccount(id: string): Promise<Account | null> {
  return (await kv.get<Account>(`account:${id}`)) ?? null;
}

export async function getAccountByEmail(email: string): Promise<Account | null> {
  const id = await kv.get<string>(`account:email:${normalizeEmail(email)}`);
  return id ? getAccount(id) : null;
}

async function put(account: Account): Promise<Account> {
  await kv.set(`account:${account.id}`, account);
  await kv.set(`account:email:${normalizeEmail(account.email)}`, account.id);
  await kv.sadd(INDEX_KEY, account.id);
  return account;
}

/**
 * Create a password account. Returns null when the email is already taken — the caller
 * decides how to phrase that (see /api/signup, which does not confirm the address exists).
 */
export async function createPasswordAccount(
  email: string,
  password: string,
  name: string,
): Promise<Account | null> {
  const normalized = normalizeEmail(email);
  if (await getAccountByEmail(normalized)) return null;
  const now = Date.now();
  return put({
    id: randomUUID(),
    email: normalized,
    name: name.trim() || normalized.split('@')[0],
    provider: 'password',
    passwordHash: await bcrypt.hash(password, BCRYPT_ROUNDS),
    createdAt: now,
    lastSeenAt: now,
  });
}

/**
 * Check an email/password pair. Runs a throwaway compare when the account is missing or has
 * no hash, so a wrong email and a wrong password take the same time to answer.
 */
const DUMMY_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

export async function verifyPassword(email: string, password: string): Promise<Account | null> {
  const account = await getAccountByEmail(email);
  const hash = account?.passwordHash ?? DUMMY_HASH;
  const ok = await bcrypt.compare(password, hash);
  if (!ok || !account?.passwordHash) return null;
  return account;
}

/**
 * Upsert a Google account on sign-in, so OAuth users show up in the admin dashboard the
 * same as password users. Keyed on the Google `sub` so the id matches the JWT.
 */
export async function upsertGoogleAccount(input: {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}): Promise<Account> {
  const existing = await getAccount(input.id);
  const now = Date.now();
  return put({
    id: input.id,
    email: normalizeEmail(input.email),
    name: input.name?.trim() || normalizeEmail(input.email).split('@')[0],
    provider: 'google',
    image: input.image ?? null,
    createdAt: existing?.createdAt ?? now,
    lastSeenAt: now,
  });
}

/** Best-effort activity stamp — never block a request on it. */
export async function touchAccount(id: string): Promise<void> {
  try {
    const account = await getAccount(id);
    if (account) await kv.set(`account:${id}`, { ...account, lastSeenAt: Date.now() });
  } catch {
    /* non-fatal */
  }
}

export async function listAccounts(): Promise<AccountSummary[]> {
  const ids = (await kv.smembers<string[]>(INDEX_KEY)) ?? [];
  if (!ids.length) return [];
  const records = await Promise.all(ids.map((id) => getAccount(id)));
  return records
    .filter((a): a is Account => Boolean(a))
    .map(strip)
    .sort((a, b) => b.createdAt - a.createdAt);
}

/** Emails allowed into /admin. Comma-separated in ADMIN_EMAILS. */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const allow = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => normalizeEmail(e))
    .filter(Boolean);
  return allow.includes(normalizeEmail(email));
}
