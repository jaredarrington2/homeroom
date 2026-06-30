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

export function pickCharacter(want: string[], avoid: string[], sectionId: string): ManifestEntry | null {
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
  if (!candidates.length) {
    const all = manifest.filter(e => e.kind !== 'property');
    return all[hashString(sectionId) % all.length] ?? null;
  }
  return candidates[hashString(sectionId) % candidates.length];
}

export function pickProperty(want: string[], sectionId: string): ManifestEntry | null {
  const manifest = getManifest();
  const candidates = manifest.filter(entry => {
    if (entry.kind !== 'property') return false;
    const relevance = (entry.mortgage_relevance ?? []).map(r => r.toLowerCase());
    return want.some(w => relevance.some(r => r.includes(w.toLowerCase())));
  });
  if (!candidates.length) {
    const all = manifest.filter(e => e.kind === 'property');
    if (!all.length) return null;
    return all[hashString(sectionId) % all.length];
  }
  return candidates[hashString(sectionId) % candidates.length];
}
