// Contents-drawer/dashboard target for the application unit. Maya's worked URLA now
// mounts inside the unified Module 6 reader; preserve the section URL by redirecting
// to its anchor.
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/learn/mlo-activities#application');
}
