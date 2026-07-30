// app/practice/layout.tsx — study content requires an account. requireAccount() is the real gate
// (middleware.ts only does the cheap cookie-presence redirect); it no-ops when AUTH_SECRET
// is unset so the app still runs before accounts are configured.
import { requireAccount } from '@/lib/requireAccount';

export default async function PracticeLayout({ children }: { children: React.ReactNode }) {
  await requireAccount('/practice');
  return <>{children}</>;
}
