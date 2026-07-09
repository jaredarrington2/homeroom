import fs from 'fs';
import path from 'path';
import type { ManifestEntry } from './types';

let _manifest: ManifestEntry[] | null = null;

function getManifest(): ManifestEntry[] {
  if (_manifest) return _manifest;
  const file = path.join(process.cwd(), 'content', 'manifest.json');
  _manifest = JSON.parse(fs.readFileSync(file, 'utf-8'));
  return _manifest!;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}

/** Deterministically pick one entry from a pool, salting the hash with a slot index so
 *  sibling picks on the same page diverge, and preferring entries not already used on the
 *  page (round-robin) — falling back to the full pool only once everything's been used.
 *  Pure + deterministic so SSR stays stable; just far less collision-prone. */
function pickFrom(pool: ManifestEntry[], sectionId: string, slot: number, exclude?: Set<string>): ManifestEntry | null {
  if (!pool.length) return null;
  const fresh = exclude ? pool.filter(e => !exclude.has(e.filename)) : pool;
  const usable = fresh.length ? fresh : pool;
  const chosen = usable[hashString(`${sectionId}:${slot}`) % usable.length];
  exclude?.add(chosen.filename);
  return chosen;
}

export function pickCharacter(
  want: string[],
  avoid: string[],
  sectionId: string,
  slot = 0,
  exclude?: Set<string>,
): ManifestEntry | null {
  const manifest = getManifest();
  const candidates = manifest.filter(entry => {
    if (entry.kind === 'property') return false;
    const allTags = [
      ...entry.tags.concept,
      ...entry.tags.domain,
      ...entry.use_cases,
      ...(entry.mortgage_roles ?? []),
    ].map(t => t.toLowerCase());
    const avoidTags = entry.avoid_for.map(t => t.toLowerCase());
    const matches = want.some(w => allTags.some(t => t.includes(w.toLowerCase())));
    const blocked = avoid.some(a => avoidTags.some(t => t.includes(a.toLowerCase())));
    return matches && !blocked;
  });
  const pool = candidates.length ? candidates : manifest.filter(e => e.kind !== 'property');
  return pickFrom(pool, sectionId, slot, exclude);
}

export function pickProperty(
  want: string[],
  sectionId: string,
  slot = 0,
  exclude?: Set<string>,
): ManifestEntry | null {
  const manifest = getManifest();
  const candidates = manifest.filter(entry => {
    if (entry.kind !== 'property') return false;
    const relevance = (entry.mortgage_relevance ?? []).map(r => r.toLowerCase());
    return want.some(w => relevance.some(r => r.includes(w.toLowerCase())));
  });
  const pool = candidates.length ? candidates : manifest.filter(e => e.kind === 'property');
  return pickFrom(pool, sectionId, slot, exclude);
}
