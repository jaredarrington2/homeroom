// lib/authUser.ts — server-only resolution of the KV user id for a request.
//   signed in  -> "u:{accountId}"      (progress:u:{accountId})
//   otherwise  -> the anon localStorage uuid, unchanged  (progress:{uuid})
//
// SECURITY: the X-User-Id header is client-supplied, so it is only ever honoured when it is
// a bare UUID. Without that check a caller could send `X-User-Id: u:<someone's account id>`
// and read or overwrite that account's progress — the header must never be able to name an
// account key. A live session always wins over the header.
//
// The dynamic import of @/auth is kept: with no AUTH_SECRET configured next-auth is never
// loaded, so the anonymous flow stays exactly as it was before accounts existed.
export async function sessionAccount(): Promise<{
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
} | null> {
  if (!process.env.AUTH_SECRET) return null;
  try {
    const { auth } = await import('@/auth');
    const session = await auth();
    const user = session?.user as
      | { id?: string; email?: string | null; name?: string | null; image?: string | null }
      | undefined;
    if (!user?.id) return null;
    return {
      id: user.id,
      email: user.email ?? null,
      name: user.name ?? null,
      image: user.image ?? null,
    };
  } catch {
    return null;
  }
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function resolveUserId(headerUserId: string | null): Promise<string | null> {
  const account = await sessionAccount();
  if (account) return `u:${account.id}`;
  return headerUserId && UUID_RE.test(headerUserId) ? headerUserId : null;
}
