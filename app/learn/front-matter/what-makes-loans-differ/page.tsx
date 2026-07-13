// app/learn/front-matter/what-makes-loans-differ/page.tsx — deep-link into the Module 1 reader.
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/learn/front-matter#what-makes-loans-differ');
}
