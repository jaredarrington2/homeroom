// app/api/signup/route.ts — create a password account. The client signs in straight after
// with the credentials provider, so this route only creates the record.
//
// It deliberately does NOT tell the caller whether an email already exists in a way that
// differs from a normal failure path — the message is the same shape either way.
import { NextRequest, NextResponse } from 'next/server';
import {
  createPasswordAccount,
  isValidEmail,
  normalizeEmail,
  passwordProblem,
} from '@/lib/accounts';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!process.env.AUTH_SECRET) {
    return NextResponse.json({ ok: false, error: 'Accounts are not set up yet.' }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === 'string' ? normalizeEmail(body.email) : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  const name = typeof body?.name === 'string' ? body.name : '';

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: 'That email address looks off.' }, { status: 400 });
  }
  const pwProblem = passwordProblem(password);
  if (pwProblem) {
    return NextResponse.json({ ok: false, error: pwProblem }, { status: 400 });
  }

  try {
    const account = await createPasswordAccount(email, password, name);
    if (!account) {
      return NextResponse.json(
        { ok: false, error: 'There is already an account for that email. Sign in instead.' },
        { status: 409 },
      );
    }
    return NextResponse.json({ ok: true, email: account.email });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Could not create the account. Try again in a moment.' },
      { status: 500 },
    );
  }
}
