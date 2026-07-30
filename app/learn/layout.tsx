// app/learn/layout.tsx — study content requires an account. requireAccount() is the real gate
// (middleware.ts only does the cheap cookie-presence redirect); it no-ops when AUTH_SECRET
// is unset so the app still runs before accounts are configured.
import { requireAccount } from '@/lib/requireAccount';

export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  await requireAccount('/learn');
  return <>{children}</>;
}
