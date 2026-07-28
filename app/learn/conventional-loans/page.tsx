import SectionReader from '@/components/SectionReader';
import m5Conventional from '@/content/sections/m5-conventional';

export const metadata = {
  title: 'Conventional Loans — Homeroom',
};

export default function Page() {
  return <SectionReader section={m5Conventional} />;
}
