// app/learn/general-mortgage-knowledge/mortgage-terminology/page.tsx
// The ebook's original "mortgage-terminology" section was reorganized into the unified Module 5 reader.
// Preserve the URL by redirecting to the reader.
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/learn/general-mortgage-knowledge');
}
