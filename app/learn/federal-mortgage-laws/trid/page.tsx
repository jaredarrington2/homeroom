// app/learn/federal-mortgage-laws/trid/page.tsx
// Superseded by the unified Section 3 reader. Preserve the URL by redirecting to
// this law's unit on the reader page.
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/learn/federal-mortgage-laws#trid');
}
