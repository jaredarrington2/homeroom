// app/page.tsx — the landing page for signed-out visitors. Anyone with a session goes
// straight to the course, which is what / did for everyone before this page existed (and
// keeps the top bar's Homeroom link meaning "back to Learn" for people studying).
import { redirect } from 'next/navigation';
import { sessionAccount } from '@/lib/authUser';
import HomeLanding from '@/components/home/HomeLanding';

// The session read has to happen per request; without this / can be prerendered at build
// time (AUTH_SECRET unset there) and then serve the landing page to signed-in users too.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const account = await sessionAccount();
  if (account) redirect('/learn');
  return <HomeLanding />;
}
