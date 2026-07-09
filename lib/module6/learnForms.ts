// lib/module6/learnForms.ts
// The "Learn the forms" engine — one continuous page: read a form's sections (fields as real
// controls, rules, traps), then scroll into practice where entries appear one at a time and you
// file each onto its section band. Home screen shows the next lesson + a trail of finished ones.
// Progress is in-tab only. Ported from the module 6 expansion prototype (learn-the-forms.html),
// the visual + interaction ground truth; adapted to fill a scoped root instead of document.*.

import { FORMS, CHUNKS, CLOZE, PAYOFF, type Chunk, type Cloze } from '@/content/module6/forms';
import { ART } from './art';
import { fieldHTML, bandNo, bandName, esc } from './formrender';

interface Rung {
  kind: 'lesson' | 'mastery' | 'gauntlet';
  id: string;
  title: string;
  sub: string;
  form?: string;
  chunk?: Chunk;
}
interface Entry {
  t: 'sort' | 'whichform' | 'cloze';
  fid?: string;
  sid?: string;
  field?: string;
  seen?: string[];
  cloze?: Cloze;
}

const F = (id: string) => FORMS.find(f => f.id === id)!;
const S = (fid: string, sid: string) => F(fid).sections.find(s => s.id === sid)!;
function shuffle<T>(a: T[]): T[] { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 l4.5 4.5 L19 7" fill="none" stroke="#15803D" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const TICKW = '<svg class="rd" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 l4.5 4.5 L19 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export function initLearnForms(root: HTMLElement): () => void {
  const byId = (id: string) => root.querySelector<HTMLElement>('#' + id)!;

  /* ---------- rungs ---------- */
  const RUNGS: Rung[] = [];
  CHUNKS.forEach((c, i) => {
    RUNGS.push({ kind: 'lesson', id: c.id, chunk: c, form: c.form, title: c.title, sub: F(c.form).name });
    const next = CHUNKS[i + 1], fc = CHUNKS.filter(x => x.form === c.form);
    if ((!next || next.form !== c.form) && fc.length > 1)
      RUNGS.push({ kind: 'mastery', id: 'm-' + c.form, form: c.form, title: 'Mastery: ' + F(c.form).name, sub: 'Every section, mixed' });
  });
  RUNGS.push({ kind: 'gauntlet', id: 'all-forms', title: 'All nine forms', sub: 'Every form, mixed' });

  const state: { done: string[] } = { done: [] };
  const nextIndex = () => RUNGS.findIndex(r => !state.done.includes(r.id));

  function seenSecs(chunk: Chunk): string[] {
    const i = CHUNKS.findIndex(c => c.id === chunk.id), ids: string[] = [];
    CHUNKS.slice(0, i + 1).filter(c => c.form === chunk.form).forEach(c => ids.push(...c.secs));
    return ids;
  }

  /* ---------- entries the drill will ask for ---------- */
  function drillEntries(rung: Rung): Entry[] {
    const e: Entry[] = [];
    if (rung.kind === 'lesson') {
      const ch = rung.chunk!, fid = ch.form, seen = seenSecs(ch);
      if (seen.length >= 2) {
        const pool: Entry[] = [];
        ch.secs.forEach(sid => shuffle(S(fid, sid).fields.filter(x => x.length <= 80).slice()).slice(0, 2)
          .forEach(fl => pool.push({ t: 'sort', fid, sid, field: fl, seen })));
        shuffle(pool).slice(0, 4).forEach(x => e.push(x));
      } else {
        shuffle(S(fid, ch.secs[0]).fields.filter(x => x.length <= 80).slice()).slice(0, 2)
          .forEach(fl => e.push({ t: 'whichform', fid, field: fl }));
      }
      CLOZE.filter(c => c.chunk === ch.id).forEach(c => e.push({ t: 'cloze', cloze: c }));
    } else if (rung.kind === 'mastery') {
      const fid = rung.form!, f = F(fid), all = f.sections.map(s => s.id), pool: Entry[] = [];
      f.sections.forEach(s => s.fields.filter(x => x.length <= 80).forEach(fl => pool.push({ t: 'sort', fid, sid: s.id, field: fl, seen: all })));
      shuffle(pool).slice(0, 6).forEach(x => e.push(x));
      const ids = CHUNKS.filter(c => c.form === fid).map(c => c.id);
      CLOZE.filter(c => ids.includes(c.chunk)).forEach(c => e.push({ t: 'cloze', cloze: c }));
    } else {
      const all: { fid: string; field: string; key: string }[] = [];
      FORMS.forEach(f => f.sections.forEach(s => s.fields.forEach(fl => {
        if (fl.length > 58) return; all.push({ fid: f.id, field: fl, key: fl.toLowerCase().trim() });
      })));
      const cnt: Record<string, Set<string>> = {}; all.forEach(x => { (cnt[x.key] = cnt[x.key] || new Set()).add(x.fid); });
      shuffle(all.filter(x => cnt[x.key].size === 1)).slice(0, 8).forEach(x => e.push({ t: 'whichform', fid: x.fid, field: x.field }));
      shuffle(CLOZE.slice()).slice(0, 4).forEach(c => e.push({ t: 'cloze', cloze: c }));
    }
    return e;
  }

  /* ---------- home ---------- */
  function renderHome() {
    const i = nextIndex(), box = byId('uphere');
    if (i === -1) { box.innerHTML = '<div class="next"><p class="ntitle">You’ve finished every form.</p></div>'; }
    else {
      const r = RUNGS[i];
      const secN = r.kind === 'lesson' ? r.chunk!.secs.length : r.kind === 'mastery' ? F(r.form!).sections.length : 0;
      const scope = r.kind === 'gauntlet' ? '9 forms' : secN + ' section' + (secN === 1 ? '' : 's');
      box.innerHTML = '<div class="next"><p class="nlabel">up next</p><p class="nform">' + esc(r.sub) + '</p>' +
        '<p class="ntitle">' + esc(r.title) + '</p><p class="nsize">' + scope + '</p>' +
        '<button class="btn" id="start">Start</button></div>';
      byId('start').addEventListener('click', () => startRung(i));
    }
    const t = byId('trail');
    if (!state.done.length) { t.classList.add('hide'); return; }
    t.classList.remove('hide');
    let h = '<p class="thead">' + state.done.length + ' finished</p>';
    state.done.forEach(id => {
      const r = RUNGS.find(x => x.id === id)!;
      h += '<div class="titem">' + TICK + '<span>' + esc(r.title) + '</span><span class="tf">' + esc(r.sub) + '</span></div>';
    });
    t.innerHTML = h;
  }

  /* ---------- the outline ("see what's covered") ---------- */
  (function () {
    let last: string | null = null, h = '';
    RUNGS.forEach(r => {
      if (r.kind === 'gauntlet') { h += '<p class="ogroup">' + esc(r.title) + '</p>'; return; }
      const g = F(r.form!).name;
      if (g !== last) { h += '<p class="ogroup">' + esc(g) + '</p>'; last = g; }
      h += '<p class="oitem">' + esc(r.title) + '</p>';
    });
    byId('obody').innerHTML = h;
  })();
  byId('otoggle').addEventListener('click', () => {
    const b = byId('obody'), open = b.classList.toggle('show');
    byId('otoggle').textContent = open ? "Hide what's covered" : "See what's covered";
  });

  /* ---------- the lesson: one continuous page ---------- */
  let rung: Rung | null = null, entries: Entry[] = [], ei = 0, misses = 0;

  function show(w: 'home' | 'lesson') {
    (['home', 'lesson'] as const).forEach(s => byId('screen-' + s).classList.toggle('hide', s !== w));
    window.scrollTo(0, 0);
  }

  function rowHTML(fid: string, sid: string, cls: string): string {
    const s = S(fid, sid);
    let h = '<div class="row ' + cls + '" data-sec="' + sid + '">';
    h += '<button class="rowhead" type="button"><span class="bn">' + esc(bandNo(s.name)) + '</span>' +
      '<span class="bt">' + esc(bandName(s.name)) + '</span>' + TICKW + '<span class="chev"></span></button>';
    h += '<div class="rowbody">';
    h += '<div class="instr">' + esc(s.purpose) + '</div>';
    h += '<div class="fields">' + s.fields.map(x => fieldHTML(x, false)).join('') + '</div>';
    if (s.rules.length) {
      const peg = ART[fid + '/' + sid];
      h += '<div class="prose">';
      if (peg) h += '<img class="peg ' + peg.side + '" src="' + peg.src + '" alt="' + esc(peg.alt) + '" style="shape-outside:url(' + peg.src + ')">';
      h += '<ul class="rules">' + s.rules.map(r => '<li>' + esc(r) + '</li>').join('') + '</ul></div>';
    }
    if (s.trap) h += '<div class="trap"><span class="tl">where people lose the point</span>' + esc(s.trap) + '</div>';
    h += '</div></div>';
    return h;
  }

  function renderForm(fid: string, mine: string[], seen: string[]) {
    const f = F(fid);
    byId('fhead').innerHTML =
      '<div class="fhead"><div class="ftop"><p class="fname">' + esc(f.name) + '</p>' +
      (f.aka ? '<p class="faka">' + esc(f.aka) + '</p>' : '') + '</div>' +
      '<div class="fmeta"><div><span class="ml">who completes it</span><span class="mv">' + esc(f.who) + '</span></div>' +
      '<div><span class="ml">when it’s used</span><span class="mv">' + esc(f.when) + '</span></div></div></div>';
    const list = byId('seclist');
    list.innerHTML = f.sections.map(s => {
      const cls = mine.includes(s.id) ? 'now' : seen.includes(s.id) ? 'met' : 'later';
      return rowHTML(fid, s.id, cls);
    }).join('');
    list.querySelectorAll('.row.now').forEach(r => r.classList.add('open', 'read'));
    list.querySelectorAll('.row:not(.later) .rowhead').forEach(b => {
      b.addEventListener('click', () => {
        const row = b.parentElement!;
        row.classList.toggle('open');
        if (row.classList.contains('open')) row.classList.add('read');
      });
    });
  }

  /* mark the entry on the real form above, in its own row */
  function inkOnForm(fid: string, sid: string, field: string) {
    const row = root.querySelector<HTMLElement>('.row[data-sec="' + sid + '"]');
    if (!row) return;
    row.classList.add('read');
    const idx = S(fid, sid).fields.indexOf(field);
    const rows = row.querySelectorAll<HTMLElement>('.fields > .frow');
    if (rows[idx]) rows[idx].classList.add('hi');
  }

  function startRung(i: number) {
    rung = RUNGS[i]; entries = drillEntries(rung); ei = 0; misses = 0;
    show('lesson');
    byId('practice').innerHTML = '';
    if (rung.kind === 'gauntlet') {
      byId('fhead').innerHTML = ''; byId('seclist').innerHTML = '';
    } else {
      const fid = rung.kind === 'lesson' ? rung.chunk!.form : rung.form!;
      const mine = rung.kind === 'lesson' ? rung.chunk!.secs : F(fid).sections.map(s => s.id);
      const seen = rung.kind === 'lesson' ? seenSecs(rung.chunk!) : F(fid).sections.map(s => s.id);
      renderForm(fid, mine, seen);
      if (rung.kind === 'mastery') root.querySelectorAll('.row').forEach(r => r.classList.remove('open'));
    }
    addEntry();
  }

  /* each entry is appended below the last one; answered entries stay put */
  function addEntry() {
    const e = entries[ei], host = byId('practice');
    const box = document.createElement('div'); box.className = 'entry';
    const count = '<span class="ecount">' + (ei + 1) + ' of ' + entries.length + '</span>';

    if (e.t === 'sort') {
      box.innerHTML = '<div class="etop"><p class="ask">Which section does this belong in?</p>' + count + '</div>' +
        '<p class="slip">' + esc(e.field) + '</p>' +
        '<div class="picker">' + e.seen!.map(id => {
          const s = S(e.fid!, id);
          return '<button class="pband" type="button" data-sec="' + id + '"><span class="bn">' + esc(bandNo(s.name)) +
            '</span><span class="bt">' + esc(bandName(s.name)) + '</span></button>';
        }).join('') + '</div>';
      host.appendChild(box);
      box.querySelectorAll<HTMLElement>('.pband').forEach(b => {
        b.addEventListener('click', () => {
          if (box.classList.contains('done')) return;
          if (b.dataset.sec === e.sid) {
            box.classList.add('done');
            box.querySelectorAll<HTMLButtonElement>('.pband').forEach(x => { x.disabled = true; if (x !== b) x.classList.add('gone'); });
            b.classList.add('right');
            const s = S(e.fid!, e.sid!);
            const filed = document.createElement('div'); filed.className = 'filed';
            filed.innerHTML = fieldHTML(e.field!, true) + '<p class="why">' + esc(s.purpose) + '</p>';
            box.appendChild(filed);
            inkOnForm(e.fid!, e.sid!, e.field!);
            advance();
          } else { misses++; b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 380); }
        });
      });
    }
    else if (e.t === 'whichform') {
      const f = F(e.fid!), opts = shuffle([f, ...shuffle(FORMS.filter(x => x.id !== e.fid)).slice(0, 3)]);
      box.innerHTML = '<div class="etop"><p class="ask">Which form does this go on?</p>' + count + '</div>' +
        '<p class="slip">' + esc(e.field) + '</p><div class="opts"></div>';
      host.appendChild(box);
      mkOpts(box, opts.map(o => o.name), f.name, f.who + ' completes it — ' + f.when.charAt(0).toLowerCase() + f.when.slice(1) + '.');
    }
    else {
      const z = e.cloze!, q = esc(z.q).replace('___', '<span class="blank">&nbsp;</span>');
      box.innerHTML = '<div class="etop"><p class="ask">Fill the blank</p>' + count + '</div>' +
        '<p class="slip cloze">' + q + '</p><div class="opts"></div>';
      host.appendChild(box);
      mkOpts(box, shuffle([z.a, ...z.d]), z.a, '', () => {
        const b = box.querySelector<HTMLElement>('.blank'); if (b) { b.textContent = z.a; b.classList.add('filled'); }
      });
    }
    if (ei > 0) box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function mkOpts(box: HTMLElement, labels: string[], correct: string, explain: string, onRight?: () => void) {
    const wrap = box.querySelector('.opts')!;
    labels.forEach(lb => {
      const b = document.createElement('button'); b.className = 'opt'; b.type = 'button'; b.textContent = lb;
      b.addEventListener('click', () => {
        if (box.classList.contains('done')) return;
        if (lb === correct) {
          box.classList.add('done');
          b.classList.add('right');
          (Array.from(wrap.children) as HTMLButtonElement[]).forEach(x => { x.disabled = true; if (x !== b) x.classList.add('gone'); });
          if (onRight) onRight();
          if (explain) { const w = document.createElement('p'); w.className = 'why'; w.textContent = explain; box.appendChild(w); }
          advance();
        } else { misses++; b.classList.add('wrong'); b.disabled = true; setTimeout(() => b.classList.remove('wrong'), 360); }
      });
      wrap.appendChild(b);
    });
  }

  function advance() {
    ei++;
    if (ei < entries.length) { setTimeout(addEntry, 420); return; }
    setTimeout(finish, 420);
  }

  function finish() {
    if (!rung) return;
    if (!state.done.includes(rung.id)) state.done.push(rung.id);
    const pay = rung.kind === 'lesson' ? PAYOFF[rung.chunk!.id]
      : rung.kind === 'mastery' ? 'Every section of the ' + F(rung.form!).name + ', placed without a chunk to narrow it down.'
        : 'Any field, any of the nine forms.';
    const sc = misses === 0 ? 'No wrong taps.' : misses + ' wrong tap' + (misses === 1 ? '' : 's') + ' across ' + entries.length + ' questions.';
    const end = document.createElement('div'); end.className = 'finish';
    end.innerHTML = '<svg class="tick" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 25 l11 11 L40 13" fill="none" stroke="#15803D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '<p class="pay">' + esc(pay) + '</p><p class="sc">' + esc(sc) + '</p>' +
      '<button class="btn wide" id="backhome">Continue</button>';
    byId('practice').appendChild(end);
    byId('backhome').addEventListener('click', () => { renderHome(); show('home'); });
    end.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  byId('quit').addEventListener('click', () => { renderHome(); show('home'); });
  renderHome();

  return () => { /* listeners live on nodes React tears down on unmount; nothing global to clean */ };
}
