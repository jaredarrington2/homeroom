// Contents-drawer/dashboard target for this Module 6 unit. The unit renders inside
// the unified MLO Activities reader; preserve the section URL by redirecting to its anchor.
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/learn/mlo-activities#closing');
}
