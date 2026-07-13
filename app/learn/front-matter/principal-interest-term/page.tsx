// app/learn/front-matter/principal-interest-term/page.tsx — deep-link into the Module 1 reader.
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/learn/front-matter#principal-interest-term');
}
