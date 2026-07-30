// app/admin/page.tsx — the account dashboard. Server-gated by requireAdmin() (ADMIN_EMAILS
// allowlist on the verified session), then the table itself is a client component so the
// orphan-claim button can act without a round trip through a form action.
import { requireAdmin } from '@/lib/requireAccount';
import AdminTable from '@/components/AdminTable';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Accounts — Homeroom' };

export default async function AdminPage() {
  const account = await requireAdmin();
  return <AdminTable adminEmail={account.email ?? ''} />;
}
