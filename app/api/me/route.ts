// app/api/me/route.ts — who is this request. The client account control reads it once.
//   { authEnabled: false }                        → sign-in isn't configured yet (show Settings)
//   { authEnabled: true, signedIn: false }        → configured, not signed in (show "Sign in")
//   { authEnabled: true, signedIn: true, ... }    → signed in (show avatar + menu)
import { NextResponse } from 'next/server';

export async function GET() {
  if (!process.env.AUTH_SECRET) return NextResponse.json({ authEnabled: false, signedIn: false });
  try {
    const { auth } = await import('@/auth');
    const session = await auth();
    const user = session?.user as { id?: string; name?: string; image?: string } | undefined;
    if (!user?.id) return NextResponse.json({ authEnabled: true, signedIn: false });
    return NextResponse.json({
      authEnabled: true,
      signedIn: true,
      userId: `u:${user.id}`,
      name: user.name ?? null,
      image: user.image ?? null,
    });
  } catch {
    return NextResponse.json({ authEnabled: true, signedIn: false });
  }
}
