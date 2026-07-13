// lib/authUser.ts — server-only resolution of the KV user id for a request.
//   signed in  -> "u:{google-sub}"     (progress:u:{sub})
//   otherwise  -> the anon localStorage uuid, unchanged  (progress:{uuid})
// Fully guarded: with no AUTH_SECRET configured we never even import next-auth, so the
// progress routes behave exactly as they did before Slice B. The anon key scheme is left
// untouched (no "anon:" prefix) so existing progress is never orphaned.
export async function resolveUserId(headerUserId: string | null): Promise<string | null> {
  if (process.env.AUTH_SECRET) {
    try {
      const { auth } = await import('@/auth');
      const session = await auth();
      const sub = (session?.user as { id?: string } | undefined)?.id;
      if (sub) return `u:${sub}`;
    } catch {
      /* fall through to the anon id */
    }
  }
  return headerUserId;
}
