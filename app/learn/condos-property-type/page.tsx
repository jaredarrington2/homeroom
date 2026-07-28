import SectionReader from '@/components/SectionReader';
import m5Condo from '@/content/sections/m5-condo';

export const metadata = {
  title: 'Condos — Property Type — Homeroom',
};

export default function Page() {
  return <SectionReader section={m5Condo} />;
}
