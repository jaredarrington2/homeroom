// rules-of-conduct moved out of Module 1 (exam-day housekeeping). Redirect to the reader index.
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/learn/front-matter');
}
