// app/learn/front-matter/whos-in-the-room/page.tsx — deep-link into the Module 1 reader.
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/learn/front-matter#whos-in-the-room');
}
