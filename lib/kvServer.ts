// lib/kvServer.ts — server-only Vercel KV client, explicitly initialized.
// The linked KV store exposes the standard KV_REST_API_URL / KV_REST_API_TOKEN env vars;
// we also accept the UPSTASH_REDIS_REST_* names in case the store is later relinked via the
// Upstash marketplace integration. @vercel/kv is Upstash-compatible either way.
import { createClient } from '@vercel/kv';

export const kv = createClient({
  url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN!,
});
