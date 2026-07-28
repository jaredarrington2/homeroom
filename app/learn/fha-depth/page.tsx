import SectionReader from '@/components/SectionReader';
import m5FHADepth from '@/content/sections/m5-fha-depth';

export const metadata = {
  title: 'FHA Depth — Homeroom',
};

export default function Page() {
  return <SectionReader section={m5FHADepth} />;
}
