import Image from 'next/image';
import { pickCharacter } from '@/lib/characters';

interface CharacterProps {
  tags: string[];
  avoid?: string[];
  sectionId: string;
  maxHeight?: number;
}

export default function Character({ tags, avoid = [], sectionId, maxHeight = 240 }: CharacterProps) {
  const entry = pickCharacter(tags, avoid, sectionId);
  if (!entry) return null;
  const src = `/characters/${entry.filename}`;
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
