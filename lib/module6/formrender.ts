// lib/module6/formrender.ts
// Turns each field string into the control a real form would use (ruled line, yes/no row,
// checkbox row, field group, or signature line) + FOVERRIDE for the 3 mis-heuristic fields.
// Ported verbatim from the module 6 expansion prototype's formrender.js — the visual +
// interaction ground truth. Returns HTML strings; the two engines inject them into a
// scoped root (imperative hydration, the ClozeProse precedent).

export const esc = (s: unknown): string =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);
const clean = (s: string): string => s.replace(/^and\s+/i, '').trim();

type Override =
  | { k: 'yesno'; q: string }
  | { k: 'checks'; label: string; opts: string[] };

/* a few fields the heuristics get wrong */
const FOVERRIDE: Record<string, Override> = {
  'Whether the information relates to the primary or secondary borrower':
    { k: 'checks', label: 'This sheet relates to', opts: ['Primary borrower', 'Secondary borrower'] },
  'Whether a borrower lives in a community-property state':
    { k: 'yesno', q: 'Does a borrower live in a community-property state?' },
  'Whether the property is in a community-property state':
    { k: 'yesno', q: 'Is the property in a community-property state?' },
};

/* ---- turn a field string into the control a real form would use ---- */
function fkind(t: string): string {
  t = t.trim();
  if (/signature|signs and dates|sign and date/i.test(t)) return 'sign';
  if (/^(Does|Is|Are|Will|Has|Have|Do|Any|Could)\b/i.test(t) || t.endsWith('?')) return 'yesno';
  if (/^Whether\b/i.test(t)) return 'yesno';
  if (/:/.test(t) && t.split(':')[1].split(/,\s*| or /).filter(Boolean).length >= 2) return 'checks';
  if ((t.match(/,/g) || []).length >= 2) return 'group';
  return 'line';
}

export function fieldHTML(t: string, hi: boolean): string {
  const H = hi ? ' hi' : '';
  const ov = FOVERRIDE[t];
  if (ov && ov.k === 'yesno')
    return '<div class="frow yn' + H + '"><span class="fq">' + esc(ov.q) + '</span>' +
      '<span class="ynb"><i class="box"></i>Yes</span><span class="ynb"><i class="box"></i>No</span></div>';
  if (ov && ov.k === 'checks')
    return '<div class="frow' + H + '"><span class="flabel">' + esc(ov.label) + '</span>' +
      '<span class="checks">' + ov.opts.map(o => '<span class="ck"><i class="box"></i>' + esc(o) + '</span>').join('') + '</span></div>';
  const k = fkind(t);
  if (k === 'yesno') {
    let q = t.trim();
    if (/^Whether\s+/i.test(q)) {
      const r = q.replace(/^Whether\s+/i, '');
      let m;
      if ((m = r.match(/^(it’s|its)\s+(.+)$/i))) q = 'Is it ' + m[2];
      else if ((m = r.match(/^(.+?)\s+has been\s+(.+)$/i))) q = 'Has ' + m[1] + ' been ' + m[2];
      else if ((m = r.match(/^(.+?)\s+(is|are|was|were)\s+(.+)$/i))) q = cap(m[2]) + ' ' + m[1] + ' ' + m[3];
      else if ((m = r.match(/^(.+?)\s+(will|may|can|could)\s+(.+)$/i))) q = cap(m[2]) + ' ' + m[1] + ' ' + m[3];
      else q = cap(r);
    }
    q = cap(q); if (!q.endsWith('?')) q += '?';
    return '<div class="frow yn' + H + '"><span class="fq">' + esc(q) + '</span>' +
      '<span class="ynb"><i class="box"></i>Yes</span><span class="ynb"><i class="box"></i>No</span></div>';
  }
  if (k === 'checks') {
    const i = t.indexOf(':');
    const label = t.slice(0, i).trim();
    const opts = t.slice(i + 1).split(/,\s*| or /).map(clean).filter(Boolean).slice(0, 8);
    return '<div class="frow' + H + '"><span class="flabel">' + esc(label) + '</span>' +
      '<span class="checks">' + opts.map(o => '<span class="ck"><i class="box"></i>' + esc(o) + '</span>').join('') + '</span></div>';
  }
  if (k === 'group') {
    const cells = t.split(/,\s*|;\s*/).map(clean).filter(Boolean).slice(0, 6);
    return '<div class="frow grp' + H + '">' + cells.map(c =>
      '<span class="cell"><span class="flabel">' + esc(cap(c)) + '</span><span class="fline"></span></span>').join('') + '</div>';
  }
  if (k === 'sign') {
    return '<div class="frow sign' + H + '"><span class="flabel">' + esc(t) + '</span>' +
      '<span class="fline tall"><b>&times;</b></span></div>';
  }
  return '<div class="frow' + H + '"><span class="flabel">' + esc(t) + '</span><span class="fline"></span></div>';
}

export function bandNo(name: string): string { const p = name.split('·'); return p.length > 1 ? p[0].trim() : ''; }
export function bandName(name: string): string { const p = name.split('·'); return (p.length > 1 ? p.slice(1).join('·') : p[0]).trim(); }
