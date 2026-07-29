// app/learn/mlo-activities/refi-process/page.tsx
// Contents-drawer/dashboard target for this refinance unit. The unit renders inside
// the unified Refinances reader; preserve the section URL by redirecting to its anchor.
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/learn/mlo-activities/refinances#refi-process');
}
