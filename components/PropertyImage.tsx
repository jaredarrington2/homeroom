import Image from 'next/image';
import { pickProperty } from '@/lib/characters';

interface PropertyImageProps {
  tags: string[];
  sectionId: string;
  maxHeight?: number;
}

export default function PropertyImage({ tags, sectionId, maxHeight = 240 }: PropertyImageProps) {
  const entry = pickProperty(tags, sectionId);
  if (!entry) return null;
  const src = `/properties/${entry.filename}`;
  return (
    <div className="flex justify-center" aria-hidden="true">
      <Image
        src={src}
        alt=""
        width={maxHeight}
        height={maxHeight}
        style={{ maxHeight, width: 'auto', objectFit: 'contain' }}
        loading="eager"
        unoptimized
      />
    </div>
  );
}
