// lib/module6/formExplorer.ts
// The form-explorer reference surface: Explore (rail + form sheet), Easily confused (computed
// field collisions across sections), and Drill (which section / which form). A lookup companion
// to "Learn the forms" — the "Easily confused" tab lives here, not in the lesson. Ported from the
// module 6 expansion prototype (form-explorer.html); adapted to fill a scoped root.

import { FORMS } from '@/content/module6/forms';
import { esc } from './formrender';

const CONF_NOTES: Record<string, string> = {
  'alimony': 'Received as income in 1e. Owed as an obligation in 2d. Same word, opposite direction of the money.',
  'child support': 'Received in 1e; owed in 2d. Ask yourself who writes the check.',
  'separate maintenance': 'Received in 1e; owed in 2d.',
  'position or title': '1b is the job held now. 1d is a job held before.',
  'creditor name': '2c is a debt the borrower already owes. 4b is a new mortgage being taken out alongside this one.',
  'scope of work': 'Pages 4–6 state the scope for this appraisal. Page 7 gives the instructions for scope generally.',
};

function shuffle<T>(a: T[]): T[] { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

export function initFormExplorer(root: HTMLElement): () => void {
  const byId = (id: string) => root.querySelector<HTMLElement>('#' + id)!;

  /* ---------- explore ---------- */
  let active = FORMS[0].id;
  const rail = byId('rail');
  FORMS.forEach(f => {
    const b = document.createElement('button');
    b.className = 'fbtn' + (f.id === active ? ' on' : ''); b.type = 'button'; b.dataset.id = f.id;
    b.innerHTML = '<span class="fn">' + esc(f.name) + '</span>' + (f.aka ? '<span class="fa">' + esc(f.aka) + '</span>' : '');
    b.addEventListener('click', () => { active = f.id; renderRail(); renderSheet(); });
    rail.appendChild(b);
  });
  function renderRail() { Array.from(rail.querySelectorAll<HTMLElement>('.fbtn')).forEach(b => b.classList.toggle('on', b.dataset.id === active)); }

  function renderSheet() {
    const f = FORMS.find(x => x.id === active)!;
    let h = '<div class="sheet"><div class="sheethead"><h2>' + esc(f.name) + '</h2>' + (f.aka ? '<p class="aka">' + esc(f.aka) + '</p>' : '') + '</div>';
    h += '<div class="meta"><div><span class="ml">who completes it</span><span class="mv">' + esc(f.who) + '</span></div>' +
      '<div><span class="ml">when it’s used</span><span class="mv">' + esc(f.when) + '</span></div></div>';
    if (f.note) h += '<div class="note">' + esc(f.note) + '</div>';
    h += '<div class="seclist">';
    f.sections.forEach((s, i) => {
      h += '<div class="sec' + (i === 0 ? ' open' : '') + '" data-s="' + s.id + '">';
      h += '<button class="sechead" type="button"><span class="chev"></span><span class="st">' + esc(s.name) + '</span><span class="cnt">' + s.fields.length + ' field' + (s.fields.length === 1 ? '' : 's') + '</span></button>';
      h += '<div class="secbody"><p class="purpose">' + esc(s.purpose) + '</p>';
      h += '<p class="lbl">what goes on the form</p><div class="fields"><ul>';
      s.fields.forEach(fl => { h += '<li>' + esc(fl) + '<span class="fill"></span></li>'; });
      h += '</ul></div>';
      if (s.rules.length) { h += '<p class="lbl">rules</p><ul class="rules">'; s.rules.forEach(r => h += '<li>' + esc(r) + '</li>'); h += '</ul>'; }
      if (s.trap) { h += '<div class="trap"><span class="tl">where people lose the point</span>' + esc(s.trap) + '</div>'; }
      h += '</div></div>';
    });
    h += '</div></div>';
    byId('sheet').innerHTML = h;
    root.querySelectorAll<HTMLElement>('#sheet .sechead').forEach(b => {
      b.addEventListener('click', () => b.parentElement!.classList.toggle('open'));
    });
  }
  renderSheet();

  /* ---------- easily confused (computed, not hand-listed) ---------- */
  function secName(fid: string, sid: string) { const f = FORMS.find(x => x.id === fid)!; return f.sections.find(s => s.id === sid)!.name; }
  function formName(fid: string) { return FORMS.find(x => x.id === fid)!.name; }
  const fmap: Record<string, [string, string][]> = {};
  FORMS.forEach(f => f.sections.forEach(s => s.fields.forEach(fl => {
    const k = fl.toLowerCase().trim(); (fmap[k] = fmap[k] || []).push([f.id, s.id]);
  })));
  const AMBIG = Object.entries(fmap).filter(([k, v]) => v.length > 1 && CONF_NOTES[k]);
  const AMBIG_KEYS = new Set(Object.entries(fmap).filter(([, v]) => v.length > 1).map(([k]) => k));
  let ch = '<h3>The same words, two different places</h3><p class="cl">These fields appear on more than one section. Getting them right is a question of direction, not vocabulary.</p>';
  AMBIG.forEach(([k, locs]) => {
    ch += '<div class="pair">';
    locs.slice(0, 2).forEach(([fid, sid]) => {
      ch += '<div><p class="pw">' + esc(k.charAt(0).toUpperCase() + k.slice(1)) + '</p><p class="ps">' + esc(secName(fid, sid)) + '</p><p class="pd">' + esc(formName(fid)) + '</p></div>';
    });
    ch += '<div class="pt" style="padding:13px 18px;">' + esc(CONF_NOTES[k]) + '</div></div>';
  });
  byId('conf').innerHTML = ch;

  /* ---------- drill ---------- */
  /* two modes: which SECTION of a known form, and which FORM entirely. */
  const formOf: Record<string, Set<string>> = {};
  FORMS.forEach(f => f.sections.forEach(s => s.fields.forEach(fl => {
    const k = fl.toLowerCase().trim(); (formOf[k] = formOf[k] || new Set()).add(f.id);
  })));
  interface Q { field: string; fid: string; sid: string; }
  const POOL_SEC: Q[] = [], POOL_FORM: Q[] = [];
  FORMS.forEach(f => f.sections.forEach(s => s.fields.forEach(fl => {
    const k = fl.toLowerCase().trim();
    if (fl.length > 60) return;
    if (!AMBIG_KEYS.has(k) && f.sections.length > 1) POOL_SEC.push({ field: fl, fid: f.id, sid: s.id });
    if (formOf[k].size === 1) POOL_FORM.push({ field: fl, fid: f.id, sid: s.id });
  })));
  let asked = 0, right = 0, q: Q | null = null, mode = 'sec';
  function nextQ() {
    mode = Math.random() < 0.55 ? 'sec' : 'form';
    const pool = mode === 'sec' ? POOL_SEC : POOL_FORM;
    q = pool[Math.floor(Math.random() * pool.length)];
    const f = FORMS.find(x => x.id === q!.fid)!;
    const box = byId('dopts'); box.innerHTML = '';
    byId('dfield').textContent = q.field;

    if (mode === 'sec') {
      byId('dq').textContent = 'this belongs in which section?';
      byId('dform').textContent = 'on the ' + f.name;
      const others = shuffle(f.sections.filter(s => s.id !== q!.sid)).slice(0, 3);
      const opts = shuffle([f.sections.find(s => s.id === q!.sid)!, ...others]);
      opts.forEach(s => {
        const b = document.createElement('button'); b.className = 'dopt'; b.type = 'button'; b.textContent = s.name;
        b.addEventListener('click', () => answer(s.id === q!.sid, b, s.name, s.purpose)); box.appendChild(b);
      });
    } else {
      byId('dq').textContent = 'this belongs on which form?';
      byId('dform').textContent = '';
      const others = shuffle(FORMS.filter(x => x.id !== q!.fid)).slice(0, 3);
      const opts = shuffle([f, ...others]);
      opts.forEach(x => {
        const b = document.createElement('button'); b.className = 'dopt'; b.type = 'button'; b.textContent = x.name;
        b.addEventListener('click', () => answer(x.id === q!.fid, b, f.name, f.who + ' completes it — ' + f.when.charAt(0).toLowerCase() + f.when.slice(1) + '.')); box.appendChild(b);
      });
    }
    byId('dfb').classList.remove('show');
  }
  function answer(ok: boolean, btn: HTMLElement, correctLabel: string, explain: string) {
    if (byId('dfb').classList.contains('show')) return;
    asked++; if (ok) right++;
    Array.from(byId('dopts').children).forEach(b => {
      (b as HTMLButtonElement).disabled = true;
      if (b.textContent === correctLabel) b.classList.add('right');
      else if (b === btn && !ok) b.classList.add('wrong');
    });
    byId('dsc').textContent = right + ' / ' + asked;
    const t = byId('dteach');
    t.className = 'teach' + (ok ? '' : ' miss');
    t.textContent = (ok ? '' : 'It’s ' + correctLabel + '. ') + explain;
    byId('dfb').classList.add('show');
  }
  byId('dnext').addEventListener('click', nextQ);
  nextQ();

  /* ---------- tabs ---------- */
  root.querySelectorAll<HTMLElement>('.tab').forEach(t => {
    t.addEventListener('click', () => {
      root.querySelectorAll('.tab').forEach(x => x.classList.toggle('on', x === t));
      ['explore', 'confuse', 'drill'].forEach(p => {
        byId('pane-' + p).classList.toggle('hide', p !== t.dataset.tab);
      });
    });
  });

  return () => { /* listeners live on nodes React tears down on unmount */ };
}
