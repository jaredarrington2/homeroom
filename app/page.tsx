// app/page.tsx — the old dashboard's three cards became the top nav (Slice C).
// Home is now Learn: everything starts from the course.
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/learn');
}
