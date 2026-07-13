// app/api/progress/reset/route.ts — clear part or all of a user's progress (Slice B).
// Body: { scope: "answers" | "unit:<id>" | "module:<chapterId>" | "all" }.
// Reads the current blob, filters it, writes it back — one KV write. Returns the new blob so
// the client can adopt it without a follow-up GET. Works for anon and (later) signed-in users.
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@/lib/kvServer';
import { emptyProgress, type Progress } from '@/lib/types';
import { getChapterTree } from '@/lib/content';
import { applyReset, parseScope } from '@/lib/progressReset';
import { resolveUserId } from '@/lib/authUser';

export async function POST(req: NextRequest) {
  const userId = await resolveUserId(req.headers.get('X-User-Id'));
  if (!userId) return NextResponse.json({ ok: false }, { status: 400 });

  const { scope: rawScope } = await req.json().catch(() => ({ scope: null }));
  if (typeof rawScope !== 'string') {
    return NextResponse.json({ ok: false, error: 'missing scope' }, { status: 400 });
  }

  // Resolve a module scope's unit ids from the chapter tree.
  let moduleUnitIds: string[] | undefined;
  if (rawScope.startsWith('module:')) {
    const chapterId = rawScope.slice('module:'.length);
    const chapter = getChapterTree().parts.flatMap((p) => p.chapters).find((c) => c.id === chapterId);
    if (!chapter) return NextResponse.json({ ok: false, error: 'unknown module' }, { status: 400 });
    moduleUnitIds = chapter.sections.map((s) => s.id);
  }

  const scope = parseScope(rawScope, moduleUnitIds);
  if (!scope) return NextResponse.json({ ok: false, error: 'bad scope' }, { status: 400 });

  try {
    const current = (await kv.get<Progress>(`progress:${userId}`)) ?? emptyProgress();
    const next = { ...applyReset(current, scope), updatedAt: Date.now() };
    await kv.set(`progress:${userId}`, next);
    return NextResponse.json({ ok: true, progress: next });
  } catch {
    return NextResponse.json({ ok: false, error: 'kv' }, { status: 500 });
  }
}
