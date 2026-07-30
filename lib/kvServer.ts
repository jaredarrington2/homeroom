// lib/kvServer.ts — server-only Vercel KV client, explicitly initialized.
// The linked KV store exposes the standard KV_REST_API_URL / KV_REST_API_TOKEN env vars;
// we also accept the UPSTASH_REDIS_REST_* names in case the store is later relinked via the
// Upstash marketplace integration. @vercel/kv is Upstash-compatible either way.
//
// LOCAL DEV FALLBACK: the KV vars are set on Production only, so `npm run dev` historically
// had no store at all — accounts and progress could not be exercised locally. When the vars
// are absent AND we are not in a production build, fall back to an in-process Map that
// implements the handful of commands this app uses. It is per-process and disappears on
// restart, which is what you want for local testing. In production a missing URL still
// produces the real client (and therefore a loud failure) rather than silently pretending
// to persist.
import { createClient, type VercelKV } from '@vercel/kv';

const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

type Stored = { value: unknown; expiresAt: number | null };

// The store hangs off globalThis: Next's dev server compiles each route in its own module
// registry, so a module-local Map would give /api/signup and /api/auth their own separate
// stores — an account created by one would be invisible to the other.
const globalStore = globalThis as typeof globalThis & { __homeroomKv?: Map<string, Stored> };

/** The subset of the KV surface this app calls. */
function memoryKv() {
  const store = (globalStore.__homeroomKv ??= new Map<string, Stored>());

  const live = (key: string): Stored | undefined => {
    const hit = store.get(key);
    if (!hit) return undefined;
    if (hit.expiresAt !== null && hit.expiresAt < Date.now()) {
      store.delete(key);
      return undefined;
    }
    return hit;
  };

  return {
    async get<T>(key: string): Promise<T | null> {
      return (live(key)?.value as T) ?? null;
    },
    async set(key: string, value: unknown, opts?: { ex?: number }) {
      store.set(key, { value, expiresAt: opts?.ex ? Date.now() + opts.ex * 1000 : null });
      return 'OK';
    },
    async incr(key: string): Promise<number> {
      const next = Number(live(key)?.value ?? 0) + 1;
      store.set(key, { value: next, expiresAt: live(key)?.expiresAt ?? null });
      return next;
    },
    async sadd(key: string, ...members: string[]): Promise<number> {
      const set = new Set<string>((live(key)?.value as string[]) ?? []);
      const before = set.size;
      members.flat().forEach((m) => set.add(m));
      store.set(key, { value: Array.from(set), expiresAt: null });
      return set.size - before;
    },
    async smembers<T>(key: string): Promise<T> {
      return (((live(key)?.value as string[]) ?? []) as unknown) as T;
    },
    async keys(pattern: string): Promise<string[]> {
      const re = new RegExp('^' + pattern.split('*').map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*') + '$');
      return Array.from(store.keys()).filter((k) => re.test(k) && live(k));
    },
    async del(...keys: string[]): Promise<number> {
      return keys.flat().filter((k) => store.delete(k)).length;
    },
  };
}

const useMemory = (!url || !token) && process.env.NODE_ENV !== 'production';

if (useMemory && !globalStore.__homeroomKv) {
  // eslint-disable-next-line no-console
  console.warn('[kv] No KV_REST_API_* env vars — using an in-memory store for local dev.');
}

export const kv = (useMemory ? memoryKv() : createClient({ url: url!, token: token! })) as VercelKV;
